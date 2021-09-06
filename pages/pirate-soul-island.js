import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import styles from "../styles/Collection.module.css";
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

  const artPerPage = 3;
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
    <div className={styles.container}>
      {/* Items */}
      <div className={styles.portfolio}>{displayArt}</div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
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
  );
}
