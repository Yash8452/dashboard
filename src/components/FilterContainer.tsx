import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";

const filters = ["sector", "topic", "region", "country", "source", "pestle"];

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
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div
        className={cn(
          "fixed flex-wrap top-10 inset-x-0 max-w-2xl mx-auto z-50"
        )}
      >
        <Menu setActive={setActive}>
          {filters.map((filter, k) => (
            <DropDown key={k} filter={filter} onChange={debounceFetchData} />
          ))}
        </Menu>
      </div>
      {/*     
      <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
        {filters.map((filter, k) => (
          <DropDown key={k} filter={filter} onChange={debounceFetchData} /> // Pass debounce function as onChange handler
        ))}
        <Button onClick={() => fetchData()}>RESET</Button>
      </div> */}
    </>
  );
};

export default FilterContainer;
