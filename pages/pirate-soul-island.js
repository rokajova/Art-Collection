import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/PirateSoulIsland.module.css";

export default function Home() {
  const [art, setArt] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("Art")
      .orderBy("number")
      .onSnapshot((snap) => {
        const art = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArt(art);
      });
  }, []);

  const displayArt = art
    .filter((res) => {
      if (searchTerm == "") {
        return res;
      } else if (
        res.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return res;
      }
    })
    .map((res) => (
      <div className={styles.item}>
        <a href={"#" + res.number}>
          {" "}
          <img src={res.original} />
          <div className={styles.description}>
            <h3 className={styles.title}>{res.description}</h3>
          </div>
        </a>
      </div>
    ));

  return (
    <>
      {/* <Head>
        <title>Pirate Soul Island | Collection</title>
        <meta name="keywords" content="nft-collection" />
      </Head>
      <div className={styles.container}>
        <div className={styles.collectionDescription}>
          <p>
            "What untold secrets are hidden here? Why so many have entered, but
            so few returned? Why is it named Pirate Soul Island?"
            <br />
            Be apart of the Pirate Soul Island collection. 30 unrepeatable one
            of a kind AI drawn paintings will take you on a pirate adventure
            through a mystical island. Each painting has a piece of the complete
            story. Only 30 will be minted.
            <br />
            <Link href="https://opensea.io/collection/pirate-soul-island">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className={styles.portfolio}>{displayArt}</div>

        <div className={styles.lightboxes}>
          {art.map((res) => (
            <div id={res.number} className={styles.lightbox}>
              <div className={styles.lightboxContent}>
                <a href="#!" className={styles.close}></a>
                <img src={res.original} />
                <h3 className={styles.lightboxTitle}>{res.description}</h3>
                <p className={styles.lightboxBody}>
                  <i>{res.lore}</i>
                </p>
                <Link href={res.link}>
                  <a target="_blank">
                    {" "}
                    <img className={styles.oslogo} src="./oslogo.png" />{" "}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <>
        <Head>
          <title>Pirate Soul Island | Collection</title>
          <meta name="keywords" content="nft-collection" />
          <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
        </Head>
        <div className={styles.container}>
          <div className={styles.iframe}>
            {" "}
            <iframe
              src="https://opensea.io/collection/pirate-soul-island?embed=true"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>{" "}
        </div>
      </>
    </>
  );
}
