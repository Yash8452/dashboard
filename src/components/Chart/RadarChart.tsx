import { useData } from "@/context/DataContext";
import { Chart } from "chart.js/auto";
import React from "react";
import { Pie, Radar } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { colors, getGridColor } from "@/utils/constants";
import { useTheme } from "next-themes";

export default function RadarChart () {
  Chart.register({
    id: "arc",
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
  const { theme } = useTheme();
  let uniqueRegion: any[] = [];
  //using forEach because it doesn't return any array
  filteredData.forEach((i) => {
    if (!uniqueRegion.includes(i.region) && i.region !== "") {
      uniqueRegion.push(i.region);
    }
  });

  const projectCount = uniqueRegion.map((item) => ({
    region: item,
    count: filteredData.filter((i) => i.region === item).length,
  }));
  // console.log(projectCount);
  // console.log(uniqueRegion);

  const data = {
    labels: projectCount.map((i) => i.region),
    datasets: [
      {
        label: "PROJECTS", // Label for the dataset
        data: projectCount.map((i) => i.count), // Values for the dataset
        fill: true, // Optional: whether to fill the area under the radar
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Optional: fill color
        borderColor: "rgb(255, 99, 132)", // Optional: border color
        pointBackgroundColor: "rgb(255, 99, 132)", // Optional: point color
        pointBorderColor: "#fff", // Optional: point border color
        pointHoverBackgroundColor: "#fff", // Optional: point hover background color
        pointHoverBorderColor: "rgb(255, 99, 132)", // Optional: point hover border color
      },
    ],
  };
  const options = {
    elements: {
      line: {
        borderWidth: 2, // Increase border width for better visibility
      },
    },
    scales: {
      r: {
        grid: {
          color: colors,
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
            <CardTitle>Total Projects based on Region</CardTitle>
          </CardHeader>

          <CardContent className="h-[50vh] w-[30vw]">
            <Radar data={data} options={options} />
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
