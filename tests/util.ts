import * as anchor from "@coral-xyz/anchor";
import { fs } from 'mz';
import { Keypair } from '@solana/web3.js';
import os from 'os';
import path from 'path';
import yaml from 'yaml';
import { EnergyGrid } from '../target/types/energy_grid';
import { Program } from '@coral-xyz/anchor';
import { assert } from "chai";
import { BN } from "bn.js";

const CONFIG_FILE_PATH = path.resolve(
  os.homedir(),
  '.config',
  'solana',
  'cli',
  'config.yml'
);

interface EnergyDevice {
  name: string;
  activeUntil?: anchor.BN;
  outputPowerW: number;
  capacityKwh: number;
  latitude: number;
  longitude: number;
}

export async function createKeypairFromFile(filePath: string): Promise<Keypair> {
  const secretKeyString = await fs.readFile(filePath, { encoding: 'utf8' });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

export async function getLocalAccount(): Promise<Keypair> {
  const configYml = await fs.readFile(CONFIG_FILE_PATH, { encoding: 'utf8' });
  const keypairPath: string = await yaml.parse(configYml).keypair_path;
  return await createKeypairFromFile(keypairPath);
}

export function getDummyEnergyDevice(name: string): EnergyDevice {
  return {
    name,
    outputPowerW: 1100,
    capacityKwh: 50000,
    latitude: -25.4186261,
    longitude: -49.2377127
  }
}

export async function initializeEnergyDevice(device: EnergyDevice, program: Program<EnergyGrid>): Promise<anchor.web3.PublicKey> {
  const walletKeypair = await getLocalAccount();

  const [energyDevicePDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      walletKeypair.publicKey.toBuffer(),
      Buffer.from("_"),
      Buffer.from(device.name)
    ],
    program.programId
  );

  await program.methods.initialize(
    device.name,
    device.outputPowerW,
    device.capacityKwh,
    device.latitude,
    device.longitude
  )
    .accounts({
      authority: walletKeypair.publicKey
    })
    .rpc();

  return energyDevicePDA;
}

export function validateEnergyDevice(a: EnergyDevice, b: EnergyDevice) {
  if (b.activeUntil === undefined) {
    assert(a.activeUntil.eq(new BN(0)), `${a.activeUntil} is not 0.`);
  } else {
    assert(a.activeUntil.eq(b.activeUntil), `${a.activeUntil} is not ${b.activeUntil}.`);
  }

  assert.equal(a.name, b.name);
  assert.equal(a.outputPowerW, b.outputPowerW);
  assert.equal(a.capacityKwh, b.capacityKwh);
  assert.equal(a.latitude.toFixed(4), b.latitude.toFixed(4));
  assert.equal(a.longitude.toFixed(4), b.longitude.toFixed(4));
}