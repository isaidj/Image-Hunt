//useImages of unplash
import { useState, useEffect } from "react";

const key_unsplash = process.env.KEY_UNPLASH;

import ImageProps from "@/utils/imagePropsInterface";
import axios from "axios";

export function useImages(
  search: string | undefined,
  page: number
): { images: ImageProps[]; loading: boolean; hasMore: boolean } {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setImages([]);
  }, [search]);
  const params: Record<string, any> = {
    client_id: key_unsplash,
    page: page,
    per_page: 20,
  };

  if (search !== "") {
    params["query"] = search;
  }
  const url =
    search === ""
      ? "https://api.unsplash.com/photos"
      : "https://api.unsplash.com/search/photos";

  useEffect(() => {
    setLoading(true);
    let cancel: any;
    axios({
      method: "GET",
      url: url,
      params: params,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (search === "") {
          setImages((prevImages) => {
            return [...prevImages, ...res.data];
          });
        } else {
          setImages((prevImages) => {
            return [...prevImages, ...res.data.results];
          });
        }
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [search, page]);

  return { images, loading, hasMore };
}
//useImages of unplash

export function useImage(id: string): {
  image: ImageProps | null;
  loading: boolean;
} {
  const [image, setImage] = useState<ImageProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    let cancel: any;
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos/${id}`,
      params: {
        client_id: key_unsplash,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)), //esto es para cancelar la peticion si se hace otra
    })
      .then((res) => {
        setImage(res.data);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [id]);

  return { image, loading };
}
