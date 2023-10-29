import ImageProps from "@/utils/imagePropsInterface";
import Image from "next/image";
import { useState } from "react";

const ImageCard = ({ img, props }: { img: ImageProps; props?: any }) => {
  const [footerInfo, setFooterInfo] = useState<boolean>(false);
  return (
    <>
      <Image
        src={img.urls.small}
        className="card mb-3  relative rounded-2xl cursor-pointer animate-fade-in"
        alt={img.alt_description}
        width={img.width}
        height={img.height}
        priority={true}
        placeholder="blur"
        blurDataURL={img.blur_hash}
        onMouseOver={() => setFooterInfo(true)}
        onMouseOut={() => setFooterInfo(false)}
        unoptimized={true}
        {...props}
      />
      {footerInfo && (
        <div className="absolute bottom-0 left-0 w-full h-auto px-2 bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center pointer-events-none">
          <div className="flex justify-start items-center space-x-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                alt=""
                src={img.user.profile_image.small}
                height={32}
                width={32}
                priority={false}
                className="w-full object-cover"
                unoptimized={true}
              />
            </div>
            <h2 className="text-white text-sm font-bold">{img.user.name}</h2>
          </div>
          <h1 className="text-white text-xs font-mono ">
            {img.alt_description}
          </h1>
        </div>
      )}
    </>
  );
};

export default ImageCard;
