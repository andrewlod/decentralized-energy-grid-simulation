"use client";

import { createQR, encodeURL } from "@solana/pay";
import { FC, useEffect, useRef } from "react";

const SOLANA_PAY_URL = `${window.location.protocol}//${window.location.host}/api/transaction`;

export const HomeView: FC = ({ }) => {

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
    <div>
      <h1>Home</h1>
      <div ref={qrRef} />
    </div>
  );
};