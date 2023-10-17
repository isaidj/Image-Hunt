"use client";
import Frame from "@/components/frame/Frame";
import React, { useEffect } from "react";
import swagPhotos, { Photo } from "../../../photos";
import axios from "axios";
import { ImageProps } from "@/utils/imagePropsInterface";
import Link from "next/link";
import { IconInstagram, IconTwitter, IconWeb } from "@/assets/Icons";
import { upperFirstLetter } from "@/utils/textFunctions";
import Image from "next/image";
//nextjs
const key_unsplash = process.env.KEY_UNPLASH;
export default function PhotoPage({
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
    return <div></div>;
  }
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Image
          alt=""
          src={image.urls.regular}
          height={600}
          width={600}
          className="w-full object-cover aspect-square col-span-2"
        />

        <div className="backdrop-filter backdrop-blur-lg  p-4 px-6 ">
          <h3>{upperFirstLetter(image.alt_description)}</h3>

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
      </div>
    </div>
  );
}
