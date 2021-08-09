import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Home() {
  const images = [
    {
      original: "/1.png",
    },
    {
      original: "/2.png",
    },
    {
      original: "3.png",
    },
  ];

  return (
    <div>
      <nav>
        <a onClick={() => console.log(images)}>/Pirate Soul Island/</a>
      </nav>
      <div style={{ borderBottom: "1px solid #313131" }}>
        {" "}
        <ImageGallery showIndex={true} indexSeparator={" | "} items={images} />
      </div>

      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
    </div>
  );
}
