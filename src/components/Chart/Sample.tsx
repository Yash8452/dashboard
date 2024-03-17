import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useData } from "@/context/DataContext";
import { colors } from "@/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Skeleton } from "../ui/skeleton";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function () {
  const { filteredData } = useData();
  // const filteredData: any[] = [];
  const options = {
    maintainAspectRatio: false, // Allow the chart to not maintain aspect ratio
  };

  // Obtain unique pestle values from filteredData
  const uniquePestle: string[] = [
    ...new Set(filteredData.map((item) => item.pestle)),
  ];

  // Count occurrences of each pestle
  const pestleCount = uniquePestle.map((pestle) => ({
    pestle,
    count: filteredData.filter((item) => item.pestle === pestle).length,
  }));

  const data = {
    labels: uniquePestle,
    datasets: [
      {
        label: "Projects",

        data: pestleCount.map((i) => i.count),
        backgroundColor: colors,
        hoverOffset: 5,
        borderColor: "transparent", // Remove the border
      },
    ],
  };

  return (
    <>
      {filteredData && filteredData.length === 0 ? (
        <div className="flex justify-center items-center">
          <Skeleton className="h-full w-full md:h-[70vh] md:w-[40vw] rounded-xl" />
        </div>
      ) : filteredData && filteredData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Total Projects based on Pestle</CardTitle>
          </CardHeader>
          <CardContent className="h-[50vh] w-[30vw]">
            <Doughnut data={data} options={options} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center">
          <Skeleton className="h-full w-full md:h-[70vh] md:w-[40vw] rounded-xl" />
        </div>
      )}
    </>
  );
}
