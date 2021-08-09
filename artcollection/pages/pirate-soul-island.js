import Head from "next/head";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/Collection.module.css";

export default function Home() {
  const [art, setArt] = useState([]);

  const [original, setOriginal] = useState("");
  const [description, setDescription] = useState("");
  const [lore, setLore] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("Art")
      .orderBy("number")
      .onSnapshot((snap) => {
        const art = snap.docs.map((doc) => ({
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
          slideDuration={600}
          slideInterval={5000}
        />
      </div>

      {art.map((res) => (
        <div className={styles.container}>
          {" "}
          <h3>{res.description}</h3>
          <img src={res.original} />
          <p>{res.lore}</p>
        </div>
      ))}
    </div>
  );
}
