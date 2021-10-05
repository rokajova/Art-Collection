import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/NukedNations.module.css";

export default function Home() {
  const [art, setArt] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // for adding data
  const [TI, setTI] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(0);

  const submitCondition = TI && number && description;
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("NukedNations")
      .add({
        tokenId: TI,
        contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        number: parseInt(number),
        description: description,
      });

    setTI("");
    // setCA("");
    setNumber(0);
    setDescription("");
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("NukedNations")
      .orderBy("number")
      .onSnapshot((snap) => {
        const art = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArt(art);
      });
  }, [searchTerm]);

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
        <nft-card
          contractAddress={res.contractAddress}
          tokenId={res.tokenId}
        ></nft-card>
      </div>
    ));

  return (
    <>
      <Head>
        <title>Nuked Nations | Collection</title>
        <meta name="keywords" content="nft-collection" />
        <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
      </Head>
      <div className={styles.container}>
        <div className={styles.iframe}>
          {" "}
          <iframe
            src="https://opensea.io/collection/nukednations?embed=true"
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>{" "}
      </div>
    </>
  );
}
