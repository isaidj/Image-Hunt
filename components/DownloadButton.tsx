import React from "react";
import { ImageProps } from "@/utils/imagePropsInterface";
import { IconDown } from "@/assets/Icons";
// "raw": "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9",
//      "full": "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80",
//      "regular": "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max",
//      "small": "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&&fm=jpg&w=400&fit=max",
//      "thumb": "https://images.un
const DownloadButton = ({ image }: { image: ImageProps }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleDownload = (imgUrl: string) => {
    //with blob
    const downloadBlob = (blob: Blob, fileName: string) => {
      const link = document.createElement("a");
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      // some browser needs the anchor to be in the doc
      document.body.appendChild(link);
      link.click();
      //remove the link
      document.body.removeChild(link);
    };

    const downloadFile = (url: string, fileName: string) => {
      fetch(url, {
        headers: new Headers({
          Origin: window.location.origin,
        }),
        mode: "cors",
      })
        .then((response) => response.blob())
        .then((blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          downloadBlob(blob, fileName);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch((e) => console.error(e));
    };
    downloadFile(imgUrl, "image.jpg");
  };

  return (
    <div
      onClick={handleOpen}
      className="relative flex items-center cursor-pointer border-2 border-neutral-800 bg-black rounded-lg  text-white text-center hover:bg-opacity-20 "
    >
      <div className="ml-2">Download</div>{" "}
      <IconDown
        className={`w-6 h-6 stroke-slate-950 ${
          open && "transform rotate-180"
        } transition-transform duration-300`}
      />
      {open && (
        <div className="flex flex-col w-full transform -translate-y-12 absolute bottom-0 left-0 bg-black text-white p-2 rounded-lg">
          <div
            className="flex gap-2 hover:bg-white hover:text-black"
            onClick={() => handleDownload(image.urls.full)}
          >
            Full size
          </div>
          <div
            className="flex gap-2 hover:bg-white hover:text-black"
            onClick={() => handleDownload(image.urls.regular)}
          >
            1080 px
          </div>
          <div
            className="flex gap-2 hover:bg-white hover:text-black"
            onClick={() => handleDownload(image.urls.small)}
          >
            400 px
          </div>
          <div
            className="flex gap-2 hover:bg-white hover:text-black"
            onClick={() => handleDownload(image.urls.thumb)}
          >
            200 px
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
