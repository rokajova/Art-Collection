import Head from "next/head";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
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
      <div style={{ borderBottom: "1px solid #313131" }}>
        {" "}
        <ImageGallery
          showIndex={true}
          indexSeparator={" | "}
          items={art}
          slideDuration={300}
          slideInterval={5000}
          showFullscreenButton={false}
        />
      </div>
      <div className={styles.container}>
        <h1>explore on Opensea</h1>
        {art.map((res) => (
          <span>
            {" "}
            <a>{res.description}</a>
          </span>
        ))}
      </div>
    </div>
  );
}
