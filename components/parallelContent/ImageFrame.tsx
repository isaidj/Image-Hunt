import React from "react";
import ImageProps from "@/utils/imagePropsInterface";
import Image from "next/image";
import Link from "next/link";
import DownloadButton from "../DownloadButton";
import { upperFirstLetter } from "@/utils/textFunctions";
import {
  IconInstagram,
  IconTwitter,
  IconUnplash,
  IconWeb,
} from "@/assets/Icons";
const ImageFrame = ({
  image,
  loading,
  fullPage = false,
}: {
  image: ImageProps;
  loading: boolean;
  fullPage?: boolean;
}) => {
  return (
    <>
      <Image
        alt=""
        src={fullPage ? image.urls.regular : image.urls.regular}
        height={image.height}
        width={image.width}
        priority={true}
        placeholder="blur"
        blurDataURL={image.blur_hash}
        className={`w-full object-cover  col-span-2  ${
          fullPage ? "" : "aspect-square cursor-zoom-in"
        }`}
        onClick={() => {
          if (fullPage) {
            return;
          }
          window.location.href = "/photos/" + image.slug; //Verificate if its posible to use router push to avoid reload. I dont find a way to do it.
        }}
        unoptimized={true}
      />

      <div className=" p-4 px-6 ">
        <div className="flex justify-between w-full ">
          <div className="flex flex-col-reverse gap-2 items-start sm:flex-row sm:items-center">
            <p className="">
              Taken by{" "}
              <Link
                href={"https://unsplash.com/" + image.user.username}
                //underline
                className=" underline hover:text-blue-700"
              >
                {image.user.name}
              </Link>
            </p>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                alt=""
                src={image.user.profile_image.medium}
                height={32}
                width={32}
                className="w-full object-cover"
                unoptimized={true}
              />
            </div>
          </div>
          <DownloadButton image={image} />
        </div>
        <div className="flex justify-between w-full ">
          <h3 className="text-xl font-bold">
            {upperFirstLetter(image.alt_description)}
          </h3>
        </div>
        Original Size: {image.width} x {image.height}
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
        <div className="flex justify-center w-full p-4">
          <a href="https://unsplash.com/" className="flex text-center gap-2 ">
            Powered by Unsplash
            <IconUnplash className="w-6 h-6 " />
          </a>
        </div>
      </div>
    </>
  );
};

export default ImageFrame;
