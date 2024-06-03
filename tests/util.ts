import { fs } from 'mz';
import { Keypair } from '@solana/web3.js';
import os from 'os';
import path from 'path';
import yaml from 'yaml';

const CONFIG_FILE_PATH = path.resolve(
  os.homedir(),
  '.config',
  'solana',
  'cli',
  'config.yml'
);

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