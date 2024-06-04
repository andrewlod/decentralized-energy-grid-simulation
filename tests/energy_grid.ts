import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EnergyGrid } from "../target/types/energy_grid";
import { getDummyEnergyDevice, getLocalAccount, initializeEnergyDevice, validateEnergyDevice } from "./util";
import { BN } from "bn.js";
import bnModule from "bn.js";
import { assert, expect } from "chai";
import chai from "chai";
import chaiBigNumber from "chai-bn";

chai.use(chaiBigNumber(bnModule));

describe("Energy Grid", () => {
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.EnergyGrid as Program<EnergyGrid>;

  it("Initializes", async () => {
    const dummy = getDummyEnergyDevice();
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);
    
    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    validateEnergyDevice(energyDevice, dummy);
  });

  it("Adds to Active Time", async () => {
    const walletKeypair = await getLocalAccount();
    const dummy = getDummyEnergyDevice();

    const [energyDevicePDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        walletKeypair.publicKey.toBuffer(),
        Buffer.from("_"),
        Buffer.from(dummy.name)
      ],
      program.programId
    );

    const now = Date.now() / 1000;
    await program.methods.addActiveTime(new BN(3600))
      .accounts({
        energyDevice: energyDevicePDA,
        authority: walletKeypair.publicKey
      })
      .rpc();

    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    const compare = new BN(now + 3600);
    expect(energyDevice.activeUntil).to.be.bignumber.closeTo(compare, new BN(60), `${energyDevice.activeUntil} is not close to ${compare}`);
  });
});
