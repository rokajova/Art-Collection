import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import firebase from "../config/firebase";
import "firebase/storage";

export default function Home() {
  const [art, setArt] = useState([]);

  const images = [
    {
      original: "/1.png",
      descriptions: "Fuck",
    },
    {
      original: "/2.png",
      descriptions: "Fuck",
    },
    {
      original: "3.png",
      descriptions: "Fuck",
    },
  ];

  useEffect(() => {
    firebase
      .firestore()
      .collection("Art")
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
        <ImageGallery showIndex={true} indexSeparator={" | "} items={art} />
      </div>

      <button onClick={() => console.log(art)}>Check art</button>
      <button onClick={() => console.log(images)}>Check images</button>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
    </div>
  );
}
