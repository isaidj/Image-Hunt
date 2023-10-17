"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageProps } from "@/utils/imagePropsInterface";
import Tendencias, { TendenciasHorizontal } from "@/components/Tendencias";
import { Button, Input, Navbar, Spacer } from "@nextui-org/react";
import Link from "next/link";
import styles from "../components/cards.module.css";
import photos from "@/photos";

const key_unsplash = process.env.KEY_UNPLASH;
const onSearchSubmit = async (value: string | undefined) => {
  let route = `https://api.unsplash.com/photos?client_id=${key_unsplash}&per_page=30`;
  if (value) {
    route = `https://api.unsplash.com/search/photos?client_id=${key_unsplash}&query=${value}&per_page=30`;
  }
  const response = await axios.get(route);
  console.log(response.data);
  return response.data;
};

export default function ImageHuntPage() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [input, setInput] = useState<string | undefined>("");
  const handleSubmmit = (e: any) => {
    e.preventDefault();
    onSearchSubmit(input).then((data) => {
      setImages(data.results ? data.results : data);
    });
  };
  const handleTrend = (value: string) => {
    onSearchSubmit(value).then((data) => {
      setImages(data.results ? data.results : data);
    });
  };

  useEffect(() => {
    onSearchSubmit(input).then((data) => {
      setImages(data.results ? data.results : data);
    });
  }, []);
  return (
    <main id="imagehunt" className={"flex flex-col space-y-4"}>
      <div
        // style={{ width: "100%" }}
        className={
          " z-10 flex flex-col items-center justify-between h-16 sticky top-0 bg-gray-950 p-2 md:flex-row md:justify-around md:items-center backdrop-filter backdrop-blur-lg bg-opacity-50"
        }
        // position="sticky"
      >
        <a
          className="text-2xl  text-white font-extralight whitespace-nowrap"
          href="/"
        >
          Image Hunt
        </a>

        <form onSubmit={handleSubmmit}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              name="input text"
              color="default"
              // startContent={<SearchIcon color="white" />}
              placeholder="Search for images ..."
              className=" bg-gray-950 text-white font-bold p-2 rounded-lg border border-gray-700 rounded-tr-none rounded-br-none border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className={
                "bg-gray-950 text-white font-bold p-2 rounded-lg hover:bg-gray-900 border border-gray-700 rounded-tl-none rounded-bl-none border-l-0"
              }
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        <TendenciasHorizontal onSearch={(value) => handleTrend(value)} />
      </div>
      <div className={"flex justify-start"}>
        <div className={"hidden sm:flex flex-col space-y-4 sm:max-w-xs "}>
          <Tendencias onSearch={(value) => handleTrend(value)} />
        </div>

        <div id="gallery" className={"flex flex-col space-y-4"}>
          <div className={styles.galleryImagesGrid}>
            {/* <ImagesSkeleton /> */}
            {images.map((img, index) => {
              return (
                <Link key={img.id} href={`/photos/${img.id}`} scroll={false}>
                  <img
                    // src={img.urls.regular}
                    src={img.urls.small}
                    className="card mb-3  relative rounded-2xl cursor-pointer"
                    // alt={img.alt_description}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-4">
        <h2 className="text-sm text-center text-zinc-300">
          Made with ❤️ by Isaí Hernández
        </h2>
        <h2 className="text-sm text-center text-zinc-300">
          © 2023 All rights reserved
        </h2>
      </div>
    </main>
  );
}
