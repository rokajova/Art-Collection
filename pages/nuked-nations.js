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

  return <div>Nuke Nations!</div>;
}
