"use client";

import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Connection, Keypair } from "@solana/web3.js";
import { createContext } from "react";
import * as IDL from "@client/idl/energy_grid.json";

type AnchorContextConstructor = {
  url: string;
  programId: string;
  idl: anchor.Idl;
}

export class AnchorContext {
  readonly connection: Connection;
  readonly program: anchor.Program;
  readonly provider: anchor.AnchorProvider;

  constructor(options: AnchorContextConstructor) {
    this.connection = new Connection(options.url);
    this.provider = new anchor.AnchorProvider(this.connection, new NodeWallet(new Keypair()), {
      commitment: "processed",
    });

    this.program = new anchor.Program(options.idl, this.provider);
  }
}

export function getEnvContext() {
  return new AnchorContext({
    url: process.env.NEXT_PUBLIC_CONNECTION_URL || "https://api.devnet.solana.com",
    programId: IDL.address,
    idl: IDL as anchor.Idl,
  });
}

export const context = createContext(getEnvContext());