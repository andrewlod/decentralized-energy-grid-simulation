import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EnergyGrid } from "../target/types/energy_grid";
import { getLocalAccount } from "./util";
import { assert } from "chai";

describe("Energy Grid", () => {
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.EnergyGrid as Program<EnergyGrid>;

  it("Initializes", async () => {
    const deviceName = "My Energy Device";
    const deviceOutputPower = 1100;
    const deviceCapacity = 50000;
    const deviceLatitude = -25.4186261;
    const deviceLongitude = -49.2377127;

    const walletKeypair = await getLocalAccount();

    const [energyDevicePDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        walletKeypair.publicKey.toBuffer(),
        Buffer.from("_"),
        Buffer.from(deviceName)
      ],
      program.programId
    );

    await program.methods.initialize(
      deviceName,
      deviceOutputPower,
      deviceCapacity,
      deviceLatitude,
      deviceLongitude
    )
      .accounts({
        authority: walletKeypair.publicKey
      })
      .rpc();
    
    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);

    assert.equal(energyDevice.name, deviceName);
    assert.equal(energyDevice.isActive, false);
    assert.equal(energyDevice.outputPowerW, deviceOutputPower);
    assert.equal(energyDevice.capacityKwh, deviceCapacity);
    assert.equal(energyDevice.latitude.toFixed(4), deviceLatitude.toFixed(4));
    assert.equal(energyDevice.longitude.toFixed(4), deviceLongitude.toFixed(4));
  });
});
