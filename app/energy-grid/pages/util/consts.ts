import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import * as IDL from "@server/idl/energy_grid.json";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const {
  CONNECTION_URL,
  MERCHANT_SECRET_KEY,
  ENERGY_DEVICE_NAME,
  ENERGY_DEVICE_OUTPUT_POWER,
  ENERGY_DEVICE_CAPACITY,
  ENERGY_DEVICE_LATITUDE,
  ENERGY_DEVICE_LONGITUDE
} = process.env;

export const CONNECTION = new Connection(CONNECTION_URL || "https://api.devnet.solana.com");

export const MERCHANT = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MERCHANT_SECRET_KEY)));
export const MERCHANT_WALLET = new NodeWallet(MERCHANT);

const provider = new anchor.AnchorProvider(CONNECTION, MERCHANT_WALLET, {
  commitment: "processed",
});

export const PROGRAM = new Program(IDL as anchor.Idl, provider);

export const [ENERGY_DEVICE_PDA] = anchor.web3.PublicKey.findProgramAddressSync(
  [
    MERCHANT.publicKey.toBuffer(),
    Buffer.from("_"),
    Buffer.from(ENERGY_DEVICE_NAME)
  ],
  PROGRAM.programId
);

CONNECTION.getAccountInfo(ENERGY_DEVICE_PDA)
  .then(accountInfo => {
    if (accountInfo === null) {
      PROGRAM.methods.initialize(
        ENERGY_DEVICE_NAME,
        parseFloat(ENERGY_DEVICE_OUTPUT_POWER),
        parseFloat(ENERGY_DEVICE_CAPACITY),
        parseFloat(ENERGY_DEVICE_LATITUDE),
        parseFloat(ENERGY_DEVICE_LONGITUDE)
      )
       .accounts({
          authority: MERCHANT.publicKey
        })
       .rpc();
    }
  });