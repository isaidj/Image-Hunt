"use client";
import React, { useEffect } from "react";
import { useImage, useImagesRelated } from "@/hooks/useUnplash";
import ImageFrame from "@/components/parallelContent/ImageFrame";
import ImagesSection from "@/components/sections/ImageSection";
import ImagesSectionHorizontal from "@/components/sections/ImageSectionHorizontal";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [page, setPage] = React.useState<number>(1);
  const { image, loading } = useImage(id);
  const { images: related_images, loading: related_loading } = useImagesRelated(
    id,
    page,
    5
  );
  if (image === null) {
    return <div></div>;
  }
  return (
    <div className="container mx-auto my-10">
      <div className="w-full mx-auto border border-gray-700 md:w-1/2">
        <ImageFrame image={image} loading={loading} fullPage={true} />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-300">Related images</h2>
      <div
        id="related"
        className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4 md:grid-cols-5"
      >
        <ImagesSectionHorizontal
          images={related_images}
          loading={related_loading}
        />
      </div>
    </div>
  );
}
