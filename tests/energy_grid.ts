import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EnergyGrid } from "../target/types/energy_grid";
import { getDummyEnergyDevice, initializeEnergyDevice, validateEnergyDevice } from "./util";

describe("Energy Grid", () => {
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.EnergyGrid as Program<EnergyGrid>;

  it("Initializes", async () => {
    let dummy = getDummyEnergyDevice();
    const energyDevicePDA = await initializeEnergyDevice(dummy, program);
    
    const energyDevice = await program.account.energyDevice.fetch(energyDevicePDA);
    validateEnergyDevice(energyDevice, dummy);
  });
});
