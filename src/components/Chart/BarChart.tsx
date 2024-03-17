"use client";
import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useData } from "@/context/DataContext";
import Chart, {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js/auto";
import { colors, getGridColor } from "@/utils/constants";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BarChart() {
  const { filteredData } = useData();

  let uniqueCountry: string[] = [];

  // Using forEach to add unique sector names to an array
  filteredData.forEach((i) => {
    if (!uniqueCountry.includes(i.country) && i.country !== "") {
      uniqueCountry.push(i.country);
    }
  });

  // Counting the total number of projects in each sector uniquely
  const sectorCount = uniqueCountry.map((item) => ({
    sector: item,
    count: filteredData.filter((i) => i.country === item).length,
  }));
  // console.log(sectorCount);
  const labels = uniqueCountry;

  const data: ChartData<"bar", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: uniqueCountry.join(", "), // Join the array of country names into a single string
        data: sectorCount.map((e) => e.count),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  // console.log("Data:", data);
  const { theme } = useTheme();
  const options = {
    scales: {
      x: {
        grid: {
          color: getGridColor(theme),
        },
      },
      y: {
        grid: {
          color: getGridColor(theme),
        },
      },
    },
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
            <CardTitle>Total Projects based on Country</CardTitle>
          </CardHeader>

          <CardContent className="h-[90vh]  w-[90vw]">
            <Bar data={data} options={options} />
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
