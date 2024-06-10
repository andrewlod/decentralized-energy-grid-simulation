import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EnergyGrid } from "../target/types/energy_grid";
import { getDummyEnergyDevice, getLocalAccount, initializeEnergyDevice, validateEnergyDevice } from "./util";
import { BN } from "bn.js";
import bnModule from "bn.js";
import { expect } from "chai";
import chai from "chai";
import chaiBigNumber from "chai-bn";

chai.use(chaiBigNumber(bnModule));

describe("Energy Grid", () => {
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.EnergyGrid as Program<EnergyGrid>;

  it("Initializes", async () => {
    const dummy = getDummyEnergyDevice("My Initialized Energy Device");
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);
    
    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    validateEnergyDevice(energyDevice, dummy);
  });

  it("Modifies the Energy Device", async () => {
    const walletKeypair = await getLocalAccount();
    const dummy = getDummyEnergyDevice("My Modified Energy Device");
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);

    const newData = {
      name: "Foo",
      activeUntil: new BN(12345),
      outputPowerW: 1337,
      capacityKwh: 13337,
      latitude: -13.37,
      longitude: 13.37
    }

    await program.methods.modify(
      newData.name,
      newData.activeUntil,
      newData.outputPowerW,
      newData.capacityKwh,
      newData.latitude,
      newData.longitude
    )
      .accounts({
        energyDevice: energyDevicePDA,
        authority: walletKeypair.publicKey
      })
      .rpc();

    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    validateEnergyDevice(energyDevice, newData);
  });

  it("Modifies the Energy Device - Partial Data", async () => {
    const walletKeypair = await getLocalAccount();
    const dummy = getDummyEnergyDevice("My Modified Energy Device 2");
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);

    const newData = {
      name: "Foo",
      outputPowerW: 1337,
      capacityKwh: 13337,
      longitude: 13.37
    }

    await program.methods.modify(
      newData.name,
      null,
      newData.outputPowerW,
      newData.capacityKwh,
      null,
      newData.longitude
    )
      .accounts({
        energyDevice: energyDevicePDA,
        authority: walletKeypair.publicKey
      })
      .rpc();

    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    validateEnergyDevice(energyDevice, {
      ...dummy,
      ...newData
    });
  });

  it("Adds to Active Time", async () => {
    const walletKeypair = await getLocalAccount();
    const dummy = getDummyEnergyDevice("My Active Energy Device");
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);

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
