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
  const [TI, setTI] = useState("");
  // const [CA, setCA] = useState("");
  const [number, setNumber] = useState(0);

  const submitCondition = TI && number;
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("NukedNations")
      .add({
        tokenId: TI,
        contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        number: parseInt(number),
      });

    setTI("");
    // setCA("");
    setNumber(0);
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

  //for pagination
  const artPerPage = 20;
  const pagesVisited = pageNumber * artPerPage;
  const pageCount = Math.ceil(art.length / artPerPage);
  const displayArt = art
    .slice(pagesVisited, pagesVisited + artPerPage)
    .map((res) => (
      <div className={styles.item}>
        <nft-card
          contractAddress={res.contractAddress}
          tokenId={res.tokenId}
        ></nft-card>
      </div>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
        {/* Populate with data from db */}
        {displayArt}
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
