"use client";
// import { Modal } from "@nextui-org/modal";
import React, { useEffect } from "react";
import Modal from "../../../../components/modal/Modal";
import { useImage } from "@/hooks/useUnplash";
import ImageFrame from "@/components/parallelContent/ImageFrame";
export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const { image, loading } = useImage(id);

  if (image === null) {
    return <div>Loading...</div>;
  }
  return (
    <Modal>
      <ImageFrame image={image} loading={loading} />
    </Modal>
  );
}
