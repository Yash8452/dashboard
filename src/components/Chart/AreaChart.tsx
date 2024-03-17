import { useData } from "@/context/DataContext";
import { Chart, ChartData } from "chart.js/auto";
import React from "react";
import { Line, Pie, Radar } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { colors, getGridColor } from "@/utils/constants";
import { useTheme } from "next-themes";

export default function () {
  Chart.register({
    id: "line",
    beforeDraw: (chart, args, options) => {
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
      } = chart;

      ctx.save();

      // Draw your custom arc here if needed

      ctx.restore();
    },
  });
  const { filteredData } = useData();
  let uniquerelevance: any[] = [];
  filteredData.forEach((i) => {
    if (!uniquerelevance.includes(i.relevance) && i.relevance !== "") {
      uniquerelevance.push(i.relevance);
    }
  });

  let uniqueYear: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueYear.includes(i.start_year) && i.start_year !== "") {
      uniqueYear.push(i.start_year);
    }
  });

  uniqueYear.sort((a, b) => a - b);

  const relevanceData = uniquerelevance.map((item) => {
    return {
      relevance: item,
      year: uniqueYear.map((yearItem) => ({
        year: yearItem,
        count: filteredData.filter(
          (i) => i.relevance === item && i.start_year === yearItem
        ).length,
      })),
    };
  });
  // console.log("relevance", relevanceData);

  const { theme } = useTheme();
  const data: ChartData<"line", number[], string> = {
    labels: uniqueYear, //x-axis
    datasets: [
      {
        label: "Relavance based on Start Year",
        data: relevanceData.map((i) => i.relevance),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        fill: {
          target: "origin",
          above: colors[5], // Area will be red above the origin
        },
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
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
            <CardTitle>Relavance based on Start Year </CardTitle>
          </CardHeader>

          <CardContent className="h-[50vh] w-[30vw]">
            <Line data={data} options={options} />
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
