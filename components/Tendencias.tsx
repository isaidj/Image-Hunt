"use client";
import React from "react";

const Tendencias = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <div className="flex flex-col items-start gap-7 ml-2">
      {Object.keys(list_tendencias).map((key, index) => (
        <div key={index}>
          <h2 className="font-medium text-sm">{key}</h2>
          <div className="flex flex-col items-start ml-2 border-l-2 border-gray-600 pl-2">
            {list_tendencias[key as keyof typeof list_tendencias].map(
              (item, index) => (
                <label
                  key={index}
                  onClick={(e) => {
                    onSearch(item.value);
                  }}
                  className="font-light text-xs text-slate-200 border-b-2 border-transparent cursor-pointer whitespace-nowrap  hover:text-gray-400 hover:border-b-2 hover:border-gray-600 transition duration-300"
                >
                  {item.label}
                </label>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export const TendenciasHorizontal = ({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      id="scroll_horizontal_menu"
      className=" flex mt-5 sm:hidden flex-col space-y-4 sm:max-w-xs after:absolute after:content-['.'] after:text-transparent after:right-0 after:w-32 after:bg-gradient-to-r from-transparent to-black after:z-10 overflow-x-scroll scrollbar-hide"
    >
      <div className="flex flex-row items-start gap-7 ml-3">
        {Object.keys(list_tendencias).map((key, index) => (
          <label
            key={index}
            onClick={(e) => {
              // console.log(key);
              onSearch(key.toLowerCase());
            }}
            className="text-slate-200 border-b-2 border-transparent cursor-pointer whitespace-nowrap  hover:text-gray-400 hover:border-b-2 hover:border-gray-600 transition duration-300"
          >
            {key}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Tendencias;

const list_tendencias = {
  Countries: [
    { label: "Iceland", value: "iceland" },
    { label: "Egypt", value: "egypt" },
    { label: "Japan", value: "japan" },
    { label: "Brazil", value: "brazil" },
    { label: "Thailand", value: "thailand" },
    { label: "New Zealand", value: "new zealand" },
    { label: "Kenya", value: "kenya" },
    { label: "Greece", value: "greece" },
  ],
  Animals: [
    { label: "Siberian Tiger", value: "siberian tiger" },
    { label: "Snow Leopard", value: "snow leopard" },
    { label: "Polar Bear", value: "polar bear" },
    { label: "Red Panda", value: "red panda" },
    { label: "Hummingbird", value: "hummingbird" },
    { label: "Octopus", value: "octopus" },
    { label: "Peacock", value: "peacock" },
  ],
  Places: [
    { label: "Santorini", value: "santorini" },
    { label: "Bora Bora", value: "bora bora" },
    { label: "Cappadocia", value: "cappadocia" },
    { label: "Great Barrier Reef", value: "great barrier reef" },
    { label: "Antelope Canyon", value: "antelope canyon" },
  ],
  Movies: [
    { label: "Inception", value: "inception" },
    { label: "Blade Runner 2049", value: "blade runner 2049" },
    { label: "The Matrix", value: "the matrix" },
    { label: "Interstellar", value: "interstellar" },
    { label: "Avengers: Endgame", value: "avengers endgame" },
    {
      label: "Star Wars",
      value: "star wars",
    },
    { label: "Jurassic Park", value: "jurassic park" },
  ],
  Technologies: [
    { label: "Artificial Intelligence", value: "artificial intelligence" },
    { label: "Blockchain", value: "blockchain" },
    { label: "Augmented Reality", value: "augmented reality" },
    { label: "5G", value: "5g" },
    { label: "Quantum Computing", value: "quantum computing" },
    { label: "Biotechnology", value: "biotechnology" },
    { label: "Renewable Energy", value: "renewable energy" },
  ],
  Books: [
    { label: "1984", value: "1984" },
    { label: "The Lord of the Rings", value: "the lord of the rings" },
    { label: "Brave New World", value: "brave new world" },
    { label: "Dune", value: "dune" },
    { label: "Harry Potter series", value: "harry potter series" },

    { label: "To Kill a Mockingbird", value: "to kill a mockingbird" },
  ],
  Hobbies: [
    { label: "Photography", value: "photography" },
    { label: "Cooking", value: "cooking" },
    { label: "Gardening", value: "gardening" },
    {
      label: "Playing a Musical Instrument",
      value: "playing a musical instrument",
    },
    { label: "Hiking", value: "hiking" },
    { label: "Painting", value: "painting" },
    { label: "Yoga", value: "yoga" },
  ],
  Sports: [
    { label: "Soccer", value: "soccer" },
    { label: "Basketball", value: "basketball" },
    { label: "Tennis", value: "tennis" },
    { label: "Swimming", value: "swimming" },
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Golf", value: "golf" },
    { label: "Volleyball", value: "volleyball" },
  ],
};
