"use client";
// import { Modal } from "@nextui-org/modal";
import React, { useEffect } from "react";
import Frame from "../../../../components/frame/Frame";
import Modal from "../../../../components/modal/Modal";
import axios from "axios";
import { ImageProps } from "@/utils/imagePropsInterface";
import Image from "next/image";
import { IconInstagram, IconTwitter, IconWeb } from "@/assets/Icons";
import { upperFirstLetter } from "@/utils/textFunctions";
import Link from "next/link";
import DownloadButton from "@/components/DownloadButton";
const key_unsplash = process.env.KEY_UNPLASH;
export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const [image, setImage] = React.useState<ImageProps | null>(null);
  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos/${id}?client_id=${key_unsplash}`)
      .then((response) => {
        setImage(response.data);
        console.log(response.data);
      });
  }, [id]);
  if (image === null) {
    return <div>Loading...</div>;
  }
  return (
    <Modal>
      <Image
        alt=""
        src={image.urls.regular}
        height={600}
        width={600}
        className="w-full object-cover aspect-square col-span-2"
      />

      <div className="  p-4 px-6 ">
        <div className="flex justify-between w-full ">
          <h3>{upperFirstLetter(image.alt_description)}</h3>
          <DownloadButton image={image} />
        </div>
        Original Size: {image.width} x {image.height}
        <p className="mt-2">Taken by {image.user.name} </p>
        <div className="flex gap-2 mt-2">
          <Link
            href={
              image.user.instagram_username
                ? "https://www.instagram.com/" + image.user.instagram_username
                : "#"
            }
          >
            <IconInstagram className="w-6 h-6" />
          </Link>
          <Link
            href={image.user.portfolio_url ? image.user.portfolio_url : "#"}
          >
            <IconWeb className="w-6 h-6" />
          </Link>
          <Link
            href={
              image.user.twitter_username
                ? "https://twitter.com/" + image.user.twitter_username
                : "#"
            }
            className="relative"
          >
            <IconTwitter className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
