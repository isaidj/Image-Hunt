"use client";
import React, { useContext, useState } from "react";
import { useImages } from "@/hooks/useUnplash";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Tendencias, { TendenciasHorizontal } from "@/components/Tendencias";
import styles from "../components/cards.module.css";

import Nav from "@/components/Nav";
import ImagesSection from "@/components/sections/ImageSection";
import { NavBarContext } from "@/context/NavBarContext";

export default function ImageHuntPage() {
  // ----------------State and hooks-------------------------------

  const { input, page, setPage, handleTrend } = useContext(NavBarContext);
  const { images, loading, hasMore } = useImages(input, page);

  return (
    <main id="imagehunt" className={"flex flex-col space-y-4"}>
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
