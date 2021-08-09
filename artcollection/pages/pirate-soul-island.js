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
        const blogs = snap.docs.map((doc) => ({
          // get the unique doc from firestore doc, this will be the post url
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);

  return (
    <div>
      <div style={{ borderBottom: "1px solid #313131" }}>
        {" "}
        <ImageGallery showIndex={true} indexSeparator={" | "} items={images} />
      </div>

      <button onClick={() => console.log(images)}>Check</button>
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
