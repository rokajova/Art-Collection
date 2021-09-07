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

  // for adding data
  const [description, setDescription] = useState();
  const [link, setLink] = useState();
  const [number, setNumber] = useState();
  const [original, setOriginal] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase.firestore().collection("NukedNations").add({
      description: description,
      link: link,
      number: number,
      original: original,
    });

    setDescription("");
    setLink("");
    setNumber("");
    setOriginal("");
  };

  //for pagination
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
  //

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

  const submitCondition = description && link && number && original;

  return (
    <>
      <Head>
        <title>Nuked Nations | Collection</title>
        <meta name="keywords" content="nft-collection" />
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
          placeholder="Title"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Opensea Link"
          value={link}
          onChange={({ target }) => setLink(target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Image Link"
          value={original}
          onChange={({ target }) => setOriginal(target.value)}
        />
        <br />
        {submitCondition ? (
          <button onClick={handleSubmit}>Post!</button>
        ) : (
          <button disabled>Post!</button>
        )}
      </form> */}

      {/* Items */}
      <div className={styles.collectionDescription}>
        <p>
          "A nuke for each nation of the world!"
          <br />
          Nuked Nations is a collection of 198 unrepeatable moving paintings
          drawn by artificial intelligence. <br /> Each painting represents a
          country. Each painting has 4 properties: continent, population, island
          nation, nuclear nation. Each painting has unique unlockable content.
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

      <div className={styles.container}></div>
    </>
  );
}
