import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { useData } from "@/context/DataContext";

const filters = [
  "end_year",
  "intensity",
  "sector",
  "topic",
  "region",
  "country",
];

const FilterContainer = () => {
  const { fetchData } = useData();
  const [debouncedFetchData, setDebouncedFetchData] =
    useState<NodeJS.Timeout | null>(null);

  const debounceFetchData = () => {
    if (debouncedFetchData) {
      clearTimeout(debouncedFetchData);
    }
    setDebouncedFetchData(setTimeout(() => fetchData(), 300)); // Adjust delay as needed
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {filters.map((filter, k) => (
          <DropDown key={k} filter={filter} onChange={debounceFetchData} /> // Pass debounce function as onChange handler
        ))}
        <button
          onClick={() => fetchData()}
          className="text-white font-extrabold bg-rose-500 p-2"
        >
          RESET
        </button>
      </div>
    </>
  );
};

export default FilterContainer;
