import { HomeView } from "@client/views/HomeView";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeView />
    </main>
  );
}
