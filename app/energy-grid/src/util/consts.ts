import { Connection, PublicKey } from "@solana/web3.js";

const {
  CONNECTION_URL,
  PROGRAM_ID
} = process.env;

export const CONNECTION = new Connection(CONNECTION_URL || "https://api.devnet.solana.com");

export const ENERGY_GRID_PROGRAM_ID = new PublicKey(PROGRAM_ID);