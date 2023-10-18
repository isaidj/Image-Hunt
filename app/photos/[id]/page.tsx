"use client";
import React, { useEffect } from "react";
import { useImage } from "@/hooks/useUnplash";
import ImageFrame from "@/components/parallelContent/ImageFrame";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { image, loading } = useImage(id);
  if (image === null) {
    return <div></div>;
  }
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <ImageFrame image={image} loading={loading} />
      </div>
    </div>
  );
}
