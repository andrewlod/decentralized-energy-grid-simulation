"use client";

import { EnergyDevice } from "@client/components/EnergyDevice";
import { SolanaPayQR } from "@client/components/SolanaPayQR";
import { FC } from "react";

export const HomeView: FC = ({ }) => {
  return (
    <div>
      <h1>Home</h1>
      <SolanaPayQR />
      <EnergyDevice />
    </div>
  );
};