import ImageProps from "@/utils/imagePropsInterface";
import Image from "next/image";
import Link from "next/link";
const ImagesSectionHorizontal = ({
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
      <Link key={img.id} href={`/photos/${img.slug}`} scroll={false}>
        <Image
          src={img.urls.small}
          className="card mb-3  relative rounded-2xl cursor-pointer animate-fade-in object-cover w-full h-full"
          alt={img.alt_description}
          width={img.width}
          height={img.height}
          priority={true}
          placeholder="blur"
          blurDataURL={img.blur_hash}
          unoptimized={true}
        />
      </Link>
    );
  });
};
export default ImagesSectionHorizontal;
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
