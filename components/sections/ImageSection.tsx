import ImageProps from "@/utils/imagePropsInterface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const ImagesSection = ({
  images,
  loading,
}: {
  images: ImageProps[];
  loading: boolean;
}) => {
  if (loading) {
    return <Skeleton count={8} height={400} width={"100%"} />;
  }
  if (loading === false && images.length === 0) {
    return <h1>No hay resultados</h1>;
  }

  return images.map((img, index) => {
    return (
      <Link
        key={img.id}
        href={`/photos/${img.slug}`}
        scroll={false}
        className="relative"
      >
        <ImageCard img={img} />
      </Link>
    );
  });
};
export default ImagesSection;
const ImageCard = ({ img }: { img: ImageProps }) => {
  const [divInfo, setDivInfo] = useState<boolean>(false);
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
        onMouseEnter={() => setDivInfo(true)}
        onMouseLeave={() => setDivInfo(false)}
        unoptimized={true}
      />
      {divInfo && (
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

const Skeleton = ({ count, height, width }: any) => {
  return (
    <>
      {Array(count)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="card mb-3  relative rounded-2xl cursor-pointer animate-pulse bg-gray-900"
            style={{ height, width }}
          />
        ))}
    </>
  );
};
