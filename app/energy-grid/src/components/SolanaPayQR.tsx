"use client";

import { Box, Grid } from "@mui/material";
import { createQR, encodeURL } from "@solana/pay";
import { FC, useEffect, useRef } from "react";

let SOLANA_PAY_URL: string = "";

if (typeof window !== "undefined") {
  SOLANA_PAY_URL = `${window.location.protocol}//${window.location.host}/api/transaction`;
}

type SolanaPayQRProps = {
  activeTimeMinutes: number;
}

export const SolanaPayQR: FC<SolanaPayQRProps> = ({ activeTimeMinutes }) => {

  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const qr = createQR(
      encodeURL({
        link: new URL(`${SOLANA_PAY_URL}?activeTimeMinutes=${activeTimeMinutes}`)
      }),
      window.innerWidth * 0.15
    );

    if (qrRef.current != null) {
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, [activeTimeMinutes]);

  return (
    <Grid container sx={{ height: "100%" }} alignItems={"center"}>
      <Grid container spacing={2} direction={"column"} alignItems={"center"} justifyItems={"center"}>
        <Grid item xs={2}>
          <h2 style={{ color: "white" }}>Pay with Solana Pay</h2>
        </Grid>
        <Grid item xs={10}>
          <div ref={qrRef} />
        </Grid>
      </Grid>
    </Grid>
  );
};