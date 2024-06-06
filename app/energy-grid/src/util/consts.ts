import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { EnergyGrid, IDL } from "@/idl/energy_grid"
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const {
  CONNECTION_URL,
  MERCHANT_SECRET_KEY,
  ENERGY_DEVICE_NAME
} = process.env;

export const CONNECTION = new Connection(CONNECTION_URL || "https://api.devnet.solana.com");

export const MERCHANT = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MERCHANT_SECRET_KEY)));
export const MERCHANT_WALLET = new NodeWallet(MERCHANT);

const provider = new anchor.AnchorProvider(CONNECTION, MERCHANT_WALLET, {
  commitment: "processed",
});

export const PROGRAM = new Program<EnergyGrid>(IDL, provider);

export const [ENERGY_DEVICE_PDA] = anchor.web3.PublicKey.findProgramAddressSync(
  [
    MERCHANT.publicKey.toBuffer(),
    Buffer.from("_"),
    Buffer.from(ENERGY_DEVICE_NAME)
  ],
  PROGRAM.programId
);