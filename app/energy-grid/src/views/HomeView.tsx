"use client";

import { EnergyDevice } from "@client/components/EnergyDevice";
import { SolanaPayQR } from "@client/components/SolanaPayQR";
import { Grid } from "@mui/material";
import { FC } from "react";

export const HomeView: FC = ({ }) => {
  return (
    <Grid container spacing={2} columns={12} style={{ width: "60%" }}>
      <Grid item xs={6}>
        <SolanaPayQR />
      </Grid>
      <Grid item xs={6}>
        <EnergyDevice />
      </Grid>
    </Grid>
  );
};