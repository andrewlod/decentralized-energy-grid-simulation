"use client";

import { EnergyDevice } from "@client/components/EnergyDevice";
import { SolanaPayQR } from "@client/components/SolanaPayQR";
import { Grid } from "@mui/material";
import { FC } from "react";

export const HomeView: FC = ({ }) => {
  return (
    <Grid container direction={"column"} spacing={6} columns={12} alignItems={"center"} style={{ width: "100%", height: "100%" }}>
      <Grid item xs={2}>
        <h1 style={{ fontSize: "50px" }}>Energy Device {process.env.NEXT_PUBLIC_ENERGY_DEVICE_NAME}</h1>
      </Grid>
      <Grid item container xs={10} spacing={2} columns={12} style={{ width: "60%" }}>
        <Grid item xs={6}>
          <SolanaPayQR />
        </Grid>
        <Grid item xs={6}>
          <EnergyDevice />
        </Grid>
      </Grid>
    </Grid>
  );
};