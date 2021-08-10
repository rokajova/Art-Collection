import Head from "next/head";
import Image from "next/image";
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
    <div>
      <div className={styles.container}>
        {art.map((res) => (
          <div>
            <h3>
              <a>{res.description}</a>
            </h3>
            <img src={res.original} />
            <p>{res.lore}</p>
          </div>
        ))}
        <h3>The End.</h3>
      </div>
    </div>
  );
}
