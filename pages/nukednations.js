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
  }, []);

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
      {/* adding data to db */}
      {/* <form style={{ padding: "30px", textAlign: "center" }}>
        <input
          type="number"
          placeholder="Number"
          value={number}
          onChange={({ target }) => setNumber(target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <input type="text" placeholder="contract address" disabled />
        <br />
        <input
          type="text"
          placeholder="token id"
          value={TI}
          onChange={({ target }) => setTI(target.value)}
        />
        <br />
        {submitCondition ? (
          <button onClick={handleSubmit}>Post!</button>
        ) : (
          <button disabled>Post!</button>
        )}
      </form> */}

      <div className={styles.container}>
        <div className={styles.collectionDescription}>
          <p>
            "A nuke for each nation of the world!"
            <br />
            Nuked Nations is a collection of 198 unrepeatable moving paintings
            drawn by artificial intelligence. <br /> Each painting represents a
            country. Each painting has 4 properties: continent, population,
            island nation, nuclear nation. Each painting has unique unlockable
            content.
            <br />
            Only 198 will ever be minted!
            <br />
            <Link href="https://opensea.io/collection/nukednations">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </p>
        </div>{" "}
        {/* <input
          type="text"
          placeholder="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        /> */}
        <br />
        {/* Populate with data from db */}
        {displayArt}
      </div>
    </>
  );
}
