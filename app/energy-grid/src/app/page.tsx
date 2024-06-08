"use client";

import { HomeView } from "@client/views/HomeView";
import styles from "./page.module.css";
import { context as AnchorContext, getEnvContext } from "@client/contexts/AnchorContext";

export default function Home() {
  return (
    <main className={styles.main}>
      <AnchorContext.Provider value={getEnvContext()}>
        <HomeView />
      </AnchorContext.Provider>
    </main>
  );
}
