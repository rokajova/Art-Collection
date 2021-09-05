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

  return (
    <div className={styles.container}>
      {" "}
      {/* Items */}
      <div className={styles.portfolio}>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=1080" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="#1" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=108" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles.item}>
          <img src="https://unsplash.it/300?image=100" />
          <div className={styles.description}>
            <h3 className={styles.title}>Title</h3>
            <a href="#2" className={styles.button}>
              More Info
            </a>
          </div>
        </div>
      </div>
      {/* Lightbox */}
      <div className={styles.lightboxes}>
        <div id="1" className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <a href="#" className={styles.close}></a>
            <img src="https://unsplash.it/900/400?image=1080" />
            <h3 className={styles.lightboxTitle}>Title</h3>
            <p className={styles.lightboxBody}>Text here!</p>
          </div>
        </div>

        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <a href="#" className={styles.close}></a>
            <img src="https://unsplash.it/900/400?image=108" />
            <h3 className={styles.lightboxTitle}>Title</h3>
            <p className={styles.lightboxBody}>Text here!</p>
          </div>
        </div>

        <div id="2" className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <a href="#!" className={styles.close}></a>
            <img src="https://unsplash.it/900/400?image=10" />
            <h3 className={styles.lightboxTitle}>Title</h3>
            <p className={styles.lightboxBody}>Text here!</p>
          </div>
        </div>

        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <a href="#" className={styles.close}></a>
            <img src="https://unsplash.it/900/400?image=10" />
            <h3 className={styles.lightboxTitle}>Title</h3>
            <p className={styles.lightboxBody}>Text here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
