//Navbarcontext
"use client";
import Nav from "@/components/Nav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

export const NavBarContext = createContext<any>({});

const NavBarContextProvider = ({ children }: any) => {
  //--------------------- State and hooks ---------------------
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [input, setInput] = useState<string | undefined>(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState<number>(1);
  //-------------- Functions -------------------------------
  const handleSubmmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const value = form.get("input-text");
    setInput(value as string);

    //-----actualiza los parametros de la url-----
    setPage(1);
    const params = new URLSearchParams();

    if (pathName === "/") {
      params.append("search", value as string);
      router.push(`${pathName}?${params.toString()}`);
    } else {
      router.push(`/?search=${value}`);
    }
  };

  const handleTrend = (value: string) => {
    setInput(value);
    setPage(1);
    const params = new URLSearchParams();
    params.append("search", value);
    router.push(`${pathName}?${params.toString()}`);
  };

  const values: {
    input: string | undefined;
    setInput: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleSubmmit: (e: any) => void;
    handleTrend: (value: string) => void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  } = {
    input,
    setInput,
    handleSubmmit,
    handleTrend,
    page,
    setPage,
  };

  return (
    <NavBarContext.Provider value={values}>
      <Nav input={input} handleSubmmit={handleSubmmit} />
      {children}
    </NavBarContext.Provider>
  );
};
export default NavBarContextProvider;

export const useNavBar = () => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("useNavBar debe estar dentro del proveedor NavBarContext");
  }
  return context;
};
