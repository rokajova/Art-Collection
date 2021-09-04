import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      {" "}
      <div className={styles.container}>
        <h2>
          {" "}
          <Link href="/pirate-soul-island">
            <a>Pirate Soul Island</a>
          </Link>
        </h2>
        <Link href="/pirate-soul-island">
          <Image
            src="/psi.png"
            height="400"
            width="500"
            className={styles.image}
          />
        </Link>
        <Link href="https://opensea.io/collection/pirate-soul-island">
          <a target="_blank" className={styles.button}>
            explore on Opensea!
          </a>
        </Link>
      </div>
      <div className={styles.container}>
        <h2>
          {" "}
          <Link href="/pirate-soul-island">
            <a>Nuked Nations</a>
          </Link>
        </h2>
        <Link href="/pirate-soul-island">
          <Image
            src="/psi.png"
            height="400"
            width="500"
            className={styles.image}
          />
        </Link>
        <Link href="https://opensea.io/collection/pirate-soul-island">
          <a target="_blank" className={styles.button}>
            explore on Opensea!
          </a>
        </Link>
      </div>
    </div>
  );
}
