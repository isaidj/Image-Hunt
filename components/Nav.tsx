import React from "react";

const Nav = ({
  input,
  handleSubmmit,
}: {
  input: string | undefined;
  handleSubmmit: (e: any) => void;
}) => {
  return (
    <div
      className={
        " z-10 flex flex-col items-center justify-between h-16 sticky top-0 bg-gray-950 p-2 md:flex-row md:justify-around md:items-center backdrop-filter backdrop-blur-lg bg-opacity-50"
      }
    >
      <a
        className="text-2xl  text-white font-extralight whitespace-nowrap"
        href="/"
      >
        Image Hunt
      </a>

      <form onSubmit={handleSubmmit}>
        <div className="flex items-center justify-center">
          <input
            type="text"
            name="input-text"
            id="input-text"
            color="default"
            placeholder="Search for images ..."
            defaultValue={input}
            className=" bg-gray-950 text-white font-light p-2 rounded-lg border border-gray-700 rounded-tr-none rounded-br-none border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            className={
              "bg-gray-950 text-zinc-200 font-bold p-2 rounded-lg hover:bg-gray-900 border border-gray-700 rounded-tl-none rounded-bl-none border-l-0"
            }
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Nav;
