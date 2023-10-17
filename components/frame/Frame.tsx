import Image from "next/image";
import { ImageProps } from "@/utils/imagePropsInterface";
import { IconInstagram } from "@/assets/Icons.tsx";

const key_unsplash = process.env.KEY_UNPLASH;
export default function Frame({ image }: { image: ImageProps | null }) {
  if (image === null) {
    return (
      <div className="w-full h-full bg-gray-200">
        <div className="animate-pulse bg-gray-300 w-full h-full"></div>
      </div>
    );
  }
  return (
    <>
      <Image
        alt=""
        src={image.urls.regular}
        height={600}
        width={600}
        className="w-full object-cover aspect-square col-span-2"
      />

      <div className="backdrop-filter backdrop-blur-lg  p-4 px-6 ">
        <h3>{image.alt_description}</h3>

        <p className="mt-2">Taken by {image.user.name} </p>
        <p className="mt-2">Taken by {image.user.name} </p>
        <p className="mt-2">Taken by {image.user.name} </p>
        <p className="mt-2">Taken by {image.user.name} </p>
        <div className="flex mt-4 gap-3">
          <IconInstagram className="w-6 h-6" />
        </div>
      </div>
    </>
  );
}
