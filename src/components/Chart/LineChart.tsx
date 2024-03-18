import { useData } from "@/context/DataContext";
import { Chart } from "chart.js/auto";
import React from "react";
import { Line, Pie, Radar } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { colors, getGridColor } from "@/utils/constants";
import { useTheme } from "next-themes";

export default function LineChart () {
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
  let uniqueIntensity: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueIntensity.includes(i.intensity) && i.intensity !== "") {
      uniqueIntensity.push(i.intensity);
    }
  });

  let uniqueYear: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueYear.includes(i.end_year) && i.end_year !== "") {
      uniqueYear.push(i.end_year);
    }
  });

  uniqueYear.sort((a, b) => a - b);

  const intensityData = uniqueIntensity.map((item) => {
    return {
      intensity: item,
      year: uniqueYear.map((yearItem) => ({
        year: yearItem,
        count: filteredData.filter(
          (i) => i.intensity === item && i.end_year === yearItem
        ).length,
      })),
    };
  });
  // console.log("intensity", intensityData);

  const data = {
    labels: uniqueYear, //x-axis
    datasets: [
      {
        label: "Intensity based on End Year ",
        data: intensityData.map((i) => i.intensity),
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
            <CardTitle>Intensity based on End Year </CardTitle>
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
