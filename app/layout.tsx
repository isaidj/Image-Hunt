import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Nav";
import NavBarContextProvider from "@/context/NavBarContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImageHunt",
  description: "ImageHunt is a website to search for high quality images.",
};

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarContextProvider>
          {props.children} {props.modal}
        </NavBarContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
