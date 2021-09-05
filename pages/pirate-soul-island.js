import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/Collection.module.css";

export default function Home() {
  const [art, setArt] = useState([]);

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

  return (
    <div className={styles.container}>
      {/* Items */}
      <div className={styles.portfolio}>
        {art.map((res) => (
          <div className={styles.item}>
            <a href={"#" + res.number}>
              {" "}
              <img src={res.original} />
              <div className={styles.description}>
                <h3 className={styles.title}>{res.description}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Lightbox */}

      <div className={styles.lightboxes}>
        {art.map((res) => (
          <div id={res.number} className={styles.lightbox}>
            <div className={styles.lightboxContent}>
              <a href="#!" className={styles.close}></a>
              <img src={res.original} />
              <h3 className={styles.lightboxTitle}>{res.description}</h3>
              <p className={styles.lightboxBody}>{res.lore}</p>
              <a
                href="https://opensea.io/collection/pirate-soul-island"
                target="_blank"
              >
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
