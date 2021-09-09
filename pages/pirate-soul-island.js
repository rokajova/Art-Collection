import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/PirateSoulIsland.module.css";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [art, setArt] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

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

  const artPerPage = 30;
  const pagesVisited = pageNumber * artPerPage;

  const displayArt = art
    .slice(pagesVisited, pagesVisited + artPerPage)
    .map((res) => (
      <div className={styles.item}>
        <a href={"#" + res.number}>
          {" "}
          <img src={res.original} />
          <div className={styles.description}>
            <h3 className={styles.title}>{res.description}</h3>
          </div>
        </a>
      </div>
    ));

  const pageCount = Math.ceil(art.length / artPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Head>
        <title>Pirate Soul Island | Collection</title>
        <meta name="keywords" content="nft-collection" />
      </Head>
      <div className={styles.container}>
        {/* Items */}
        <div className={styles.collectionDescription}>
          <p>
            "What untold secrets are hidden here? Why so many have entered, but
            so few returned? Why is it named Pirate Soul Island?"
            <br />
            Be apart of the Pirate Soul Island collection. 30 unrepeatable one
            of a kind AI drawn paintings will take you on a pirate adventure
            through a mystical island. Each painting has a piece of the complete
            story. Only 30 will be minted.
            <br />
            <Link href="https://opensea.io/collection/pirate-soul-island">
              <a target="_blank">
                {" "}
                <img className={styles.oslogo} src="./oslogo.png" />{" "}
              </a>
            </Link>
          </p>
        </div>
        <div className={styles.portfolio}>{displayArt}</div>
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
        {/* Lightbox */}
        <div className={styles.lightboxes}>
          {art.map((res) => (
            <div id={res.number} className={styles.lightbox}>
              <div className={styles.lightboxContent}>
                <a href="#!" className={styles.close}></a>
                <img src={res.original} />
                <h3 className={styles.lightboxTitle}>{res.description}</h3>
                <p className={styles.lightboxBody}>
                  <i>{res.lore}</i>
                </p>
                <Link href={res.link}>
                  <a target="_blank">
                    {" "}
                    <img className={styles.oslogo} src="./oslogo.png" />{" "}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
