"use client";

import { createQR, encodeURL } from "@solana/pay";
import { FC, useEffect, useRef } from "react";

let SOLANA_PAY_URL: string = "";

if (typeof window !== "undefined") {
  SOLANA_PAY_URL = `${window.location.protocol}//${window.location.host}/api/transaction`;
  console.log(SOLANA_PAY_URL);
}

export const HomeView: FC = ({ }) => {

  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(encodeURL({ link: new URL(SOLANA_PAY_URL) }))
    const qr = createQR(
      `solana:${SOLANA_PAY_URL}`,
      360
    );

    if (qrRef.current != null) {
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div ref={qrRef} />
    </div>
  );
};