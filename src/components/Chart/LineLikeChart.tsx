import { useData } from "@/context/DataContext";
import { Chart, ChartData } from "chart.js/auto";
import React from "react";
import { Line, Pie, Radar } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { colors, getGridColor } from "@/utils/constants";
import { useTheme } from "next-themes";

export default function () {
  //   Chart.register({
  //     id: "line",
  //     beforeDraw: (chart, args, options) => {
  //       const {
  //         ctx,
  //         chartArea: { top, right, bottom, left, width, height },
  //       } = chart;

  //       ctx.save();

  //       // Draw your custom arc here if needed

  //       ctx.restore();
  //     },
  //   });
  const { filteredData } = useData();
  let uniqueLikelihood: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueLikelihood.includes(i.intensity) && i.intensity !== "") {
      uniqueLikelihood.push(i.intensity);
    }
  });

  let uniqueCountry: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueCountry.includes(i.country) && i.country !== "") {
      uniqueCountry.push(i.country);
    }
  });

  uniqueCountry.sort((a, b) => a - b);

  const likelihoodData = uniqueLikelihood.map((item) => {
    return {
      likelihood: item,
      country: uniqueCountry.map((yearItem) => ({
        country: yearItem,
        count: filteredData.filter(
          (i) => i.likelihood === item && i.country === yearItem
        ).length,
      })),
    };
  });
  //   console.log("likelihood", likelihoodData);

  const data: ChartData<"line", number[], string> = {
    labels: uniqueCountry, //x-axis
    datasets: [
      {
        label: "Likelihood based on Country ",
        data: likelihoodData.map((i) => i.likelihood),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const { theme } = useTheme();

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
            <CardTitle>Likelihood based on Country</CardTitle>
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
