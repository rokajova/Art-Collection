import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Collections</title>
        <meta name="keywords" content="nft" />
      </Head>

      <div className={styles.container}>
        <div className={styles.portfolio}>
          <div className={styles.item}>
            <Link href="nukednations">
              <a>
                {" "}
                <img className={styles.featureImage} src="./nn.png" />
                <div className={styles.description}>
                  <h3 className={styles.title}>Nuked Nations</h3>
                </div>
              </a>
            </Link>
            <Link href="https://opensea.io/collection/nukednations">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </div>

          <div className={styles.item}>
            <Link href="pirate-soul-island">
              <a>
                {" "}
                <img className={styles.featureImage} src="./psi.png" />
                <div className={styles.description}>
                  <h3 className={styles.title}>Pirate Soul Island</h3>
                </div>
              </a>
            </Link>
            <Link href="https://opensea.io/collection/pirate-soul-island">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
