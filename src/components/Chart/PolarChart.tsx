import React from "react";
import { PolarArea, Radar } from "react-chartjs-2";
import Chart, { ChartData } from "chart.js/auto"; // Import Chart.js with automatic imports
import { useData } from "@/context/DataContext";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { colors } from "@/utils/constants";

export default function () {
  // Register the radial linear scale
  // Chart.register({
  //   id: "radialLinear",
  //   type: Chart.LinearScale,
  //   position: "radial",
  // });

  const { filteredData } = useData();

  let uniqueTopics: string[] = [];

  // Using forEach to add unique topic names to an array
  filteredData.forEach((i) => {
    if (!uniqueTopics.includes(i.topic) && i.topic !== "") {
      uniqueTopics.push(i.topic);
    }
  });

  // Counting the total number of projects in each topic uniquely
  const topicCount = uniqueTopics.map((item) => ({
    topic: item,
    count: filteredData.filter((i) => i.topic === item).length,
  }));
  // console.log(topicCount);
  const labels = uniqueTopics;
  const data: ChartData<"polarArea", number[], string> = {
    labels: labels,

    datasets: [
      {
        label: uniqueTopics.join(", "),
        data: topicCount.map((e) => e.count), //
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
            <CardTitle>Total Projects based on Topic</CardTitle>
          </CardHeader>

          <CardContent className="h-[50vh] w-[30vw]">
            <PolarArea height={300} data={data} options={options} />
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
