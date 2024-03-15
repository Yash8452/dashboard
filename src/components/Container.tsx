import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useData } from "@/context/DataContext";

const Container = () => {
  const { data, setData, filteredData } = useData();
  const [limit, setLimit] = useState(4);
  const limitedData = filteredData.slice(0, limit);
  // console.log(limitedData.length);

  return (
    <>
      <div>
        <section className="flex h-full flex-row flex-wrap mt-4 m-8">
          <input
            id="tab-one"
            type="radio"
            name="tabs"
            className="peer/tab-one opacity-0 absolute"
            defaultChecked
          />
          <label
            htmlFor="tab-one"
            className="bg-slate-300 text-center w-[50%] hover:bg-slate-200 peer-checked/tab-one:bg-black peer-checked/tab-one:text-white cursor-default p-4 rounded-t-3xl block"
          >
            DATA
          </label>
          <input
            id="tab-two"
            type="radio"
            name="tabs"
            className="peer/tab-two opacity-0 absolute"
          />
          <label
            htmlFor="tab-two"
            className="bg-slate-300 text-center w-[50%] hover:bg-slate-200 peer-checked/tab-two:bg-black peer-checked/tab-two:text-white cursor-default p-4 rounded-t-3xl block"
          >
            VISUALIZATION
          </label>

          <div className="basis-full h-0" />
          <div className="bg-black hidden peer-checked/tab-one:block  h-screen p-4 w-full">
            {limitedData && limitedData.length === 0 ? (
              <div style={{ margin: "1rem" }}>
                No data found, or please wait for a while.
              </div>
            ) : limitedData && limitedData.length > 0 ? (
              <div className="flex flex-wrap justify-center pt-5 gap-2">
                {limitedData.map((limitedData: any, k: any) => {
                  return <Card data={limitedData} key={k} />;
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="bg-black hidden peer-checked/tab-two:block  h-screen p-4 w-full">
            Second tab pane
            {/* Filter data ad dislay the chart */}
            {/* Charts */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Container;
