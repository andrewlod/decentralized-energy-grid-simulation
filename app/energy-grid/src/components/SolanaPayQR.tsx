"use client";

import { createQR, encodeURL } from "@solana/pay";
import { FC, useEffect, useRef } from "react";

let SOLANA_PAY_URL: string = "";

if (typeof window !== "undefined") {
  SOLANA_PAY_URL = `${window.location.protocol}//${window.location.host}/api/transaction`;
}

export const SolanaPayQR: FC = ({ }) => {

  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const qr = createQR(
      encodeURL({
        link: new URL(SOLANA_PAY_URL)
      }),
      360
    );

    if (qrRef.current != null) {
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, []);

  return (
    <div ref={qrRef} />
  );
};