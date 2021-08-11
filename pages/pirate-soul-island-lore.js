import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/Collection.module.css";

export default function Home() {
  const [art, setArt] = useState([]);

  const [toggler, setToggler] = useState(false);

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
      {art.map((res) => (
        <div>
          <h2>{res.description}</h2>
          <img className={styles.image} src={res.original} />
          <p>{res.lore}</p>
          <hr className={styles.horLine} />
        </div>
      ))}
      <div>
        {" "}
        <h3>The End.</h3>
      </div>
      <div>
        <a
          href="https://opensea.io/collection/pirate-soul-island"
          target="_blank"
        >
          {" "}
          <img className={styles.openseaLogo} src="./oslogo.png" />
        </a>
      </div>
    </div>
  );
}
