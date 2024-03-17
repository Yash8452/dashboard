"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
// import Card from "./Card";
import { useData } from "@/context/DataContext";
import Sample from "./Chart/Sample";
import BarChart from "./Chart/BarChart";
import PolarChart from "./Chart/PolarChart";
import PieChart from "./Chart/PieChart";
import RadarChart from "./Chart/RadarChart";
import DataCard from "./DataCard";
import { Skeleton } from "./ui/skeleton";
import SkeletonCard from "./SkeletonCard";
import AreaChart from "./Chart/AreaChart";
import LineChart from "./Chart/LineChart";
import LineLikeChart from "./Chart/LineLikeChart";

const Container = () => {
  const { data, setData, filteredData } = useData();
  const [limit, setLimit] = useState(4);
  const limitedData = filteredData;
  // const limitedData = filteredData.slice(0, limit);
  // const limitedData: any[] = [];
  // console.log(filteredData.length);

  return (
    <>
      <Tabs defaultValue="account" className="mt-6 w-[100%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text Representation</TabsTrigger>
          <TabsTrigger value="visual">Visual Representation</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <Card>
            <CardContent className="space-y-2">
              {limitedData && limitedData.length === 0 ? (
                <div className="flex justify-center items-center">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : limitedData && limitedData.length > 0 ? (
                <div className="flex flex-wrap justify-center pt-5 gap-2">
                  {limitedData.map((limitedData: any, k: any) => {
                    return <DataCard data={limitedData} key={k} />;
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visual">
          <Card>
            <CardContent className="space-y-2">
              <div className="pt-10 flex  md:flex-wrap  gap-4  items-center justify-center md:justify-around ">
                <LineLikeChart />
                <RadarChart />
                <AreaChart />
                <PolarChart />
                <LineChart />
                <PieChart />
                <BarChart />
                <Sample />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
{
  /* <div>
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
            {/* Filter data ad dislay the chart */
}
{
  /* Charts */
}
//             <div className="pt-10 flex  md:flex-wrap  gap-4  items-center justify-center md:justify-around ">
//               <Sample />
//               <RadarChart />

//               <PolarChart />
//               <PieChart />
//               <BarChart />
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

export default Container;
