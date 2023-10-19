"use client";
import React, { useState } from "react";
import { useImages } from "@/hooks/useUnplash";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Tendencias, { TendenciasHorizontal } from "@/components/Tendencias";
import styles from "../components/cards.module.css";

import Nav from "@/components/Nav";
import ImagesSection from "@/components/sections/ImageSection";

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
    router.push(`${pathName}?${params.toString()}`);
  };
  const handleTrend = (value: string) => {
    setInput(value);
    setPage(1);
    const params = new URLSearchParams();
    params.append("search", value);
    router.push(`${pathName}?${params.toString()}`);
  };

  //------------------Render----------------------------------
  return (
    <main id="imagehunt" className={"flex flex-col space-y-4"}>
      <Nav input={input} handleSubmmit={handleSubmmit} />
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
