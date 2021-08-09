import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import firebase from "../config/firebase";
import "firebase/storage";

export default function Home() {
  const [art, setArt] = useState([]);

  const [original, setOriginal] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase.firestore().collection("Art").add({
      original: original,
      description: description,
    });

    setOriginal("");
    setDescription("");
  };

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

      <form>
        <input
          type="text"
          placeholder="original link"
          value={original}
          onChange={({ target }) => setOriginal(target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <button onClick={handleSubmit}>GET THAT SHIT IN THE DB</button>
      </form>

      <button onClick={() => console.log(art)}>Check art</button>
    </div>
  );
}
