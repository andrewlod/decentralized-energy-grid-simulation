"use client";

import { HomeView } from "@client/views/HomeView";
import styles from "./page.module.css";
import { context as AnchorContext, getEnvContext } from "@client/contexts/AnchorContext";
import { ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  }
});

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeProvider theme={darkTheme}>
        <AnchorContext.Provider value={getEnvContext()}>
          <HomeView />
        </AnchorContext.Provider>
      </ThemeProvider>
    </main>
  );
}
