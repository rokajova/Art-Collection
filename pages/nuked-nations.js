import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/NukedNations.module.css";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [art, setArt] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // for adding data
  const [TI, setTI] = useState();
  const [CA, setCA] = useState();
  const [number, setNumber] = useState();
  const submitCondition = TI && CA && number;
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase.firestore().collection("NukedNations").add({
      tokenId: TI,
      contractAddress: CA,
      number: number,
    });

    setTI("");
    setCA("");
    setNumber("");
  };

  //for pagination
  const artPerPage = 20;
  const pagesVisited = pageNumber * artPerPage;
  const pageCount = Math.ceil(art.length / artPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
          placeholder="contract address"
          value={CA}
          onChange={({ target }) => setCA(target.value)}
        />
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
            <Link href="https://opensea.io/collection/nuked-nations">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </p>
        </div>{" "}
        {/* Populate with data from db */}
        {art.map((res) => (
          <div className={styles.item}>
            <nft-card
              contractAddress={res.contractAddress}
              tokenId={res.tokenId}
            ></nft-card>
          </div>
        ))}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={10}
          containerClassName={styles.paginationBttns}
          previousLinkClassName={styles.previousBttns}
          nextLinkClassName={styles.nextBtn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </div>
    </>
  );
}
