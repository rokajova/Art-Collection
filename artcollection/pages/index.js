import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Home() {
  const images = [
    {
      original: "/1.png",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "/2.png",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "3.png",
    },
  ];

  return (
    <div>
      <nav>Pirate</nav>
      <ImageGallery
        showIndex={true}
        indexSeparator={" | "}
        showThumbnails={false}
        items={images}
      />
      <div>SHOW ALL</div>
    </div>
  );
}
