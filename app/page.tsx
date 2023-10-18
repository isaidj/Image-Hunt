"use client";
import React, { useState, useEffect } from "react";
import { useImages } from "@/hooks/useUnplash";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ImageProps from "@/utils/imagePropsInterface";
import Link from "next/link";
import Tendencias, { TendenciasHorizontal } from "@/components/Tendencias";
import styles from "../components/cards.module.css";

export default function ImageHuntPage() {
  // ----------------State and hooks-------------------------------
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [input, setInput] = useState<string | undefined>(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState<number>(1);
  const { images, loading, hasMore } = useImages(input, page);

  //------------------Functions----------------------------------
  const handleSubmmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const value = form.get("input-text");
    setInput(value as string);

    //-----actualiza los parametros de la url-----
    setPage(1);
    const params = new URLSearchParams();
    params.append("search", value as string);
    if (input === "") {
      params.delete("search");
    }
    // window.history.replaceState({}, "", `${pathName}?${params.toString()}`);
    router.push(`${pathName}?${params.toString()}`);
  };
  const handleTrend = (value: string) => {
    setInput(value);
  };

  //------------------Render----------------------------------
  return (
    <main id="imagehunt" className={"flex flex-col space-y-4"}>
      <div
        className={
          " z-10 flex flex-col items-center justify-between h-16 sticky top-0 bg-gray-950 p-2 md:flex-row md:justify-around md:items-center backdrop-filter backdrop-blur-lg bg-opacity-50"
        }
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
              name="input-text"
              id="input-text"
              color="default"
              placeholder="Search for images ..."
              defaultValue={input}
              className=" bg-gray-950 text-white font-bold p-2 rounded-lg border border-gray-700 rounded-tr-none rounded-br-none border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
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

        <div id="gallery" className={"flex flex-col space-y-4 w-full"}>
          <div className={styles.galleryImagesGrid}>
            <ImagesSection images={images} loading={loading} />
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
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

const ImagesSection = ({
  images,
  loading,
}: {
  images: ImageProps[];
  loading: boolean;
}) => {
  if (loading) {
    return <Skeleton count={8} height={400} width={"100%"} />;
  }
  if (loading === false && images.length === 0) {
    return <h1>No hay resultados</h1>;
  }
  return images.map((img, index) => {
    return (
      <Link key={img.id} href={`/photos/${img.slug}`} scroll={false}>
        <img
          src={img.urls.small}
          className="card mb-3  relative rounded-2xl cursor-pointer"
          alt={img.alt_description}
        />
      </Link>
    );
  });
};

const Skeleton = ({ count, height, width }: any) => {
  return (
    <>
      {Array(count)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="card mb-3  relative rounded-2xl cursor-pointer animate-pulse bg-gray-900"
            style={{ height, width }}
          />
        ))}
    </>
  );
};
