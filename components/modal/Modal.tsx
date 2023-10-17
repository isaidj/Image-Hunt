"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null); //overlay is the black background
  const wrapper = useRef(null); //wrapper is the modal itself
  const router = useRouter(); //router is used to go back to previous page

  const onDismiss = useCallback(() => {
    //close modal and go back to previous page
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    //if user click on overlay, close modal
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    //if user press escape key, close modal
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    //add event listener to document
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed flex justify-center items-center z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-hidden backdrop-filter backdrop-blur-lg"
      >
        {children}
      </div>
    </div>
  );
}
