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
ChartJS.register(ArcElement, Tooltip, Legend);

export default function () {
  const { filteredData } = useData();

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

  const data: Chart.ChartData<"doughnut"> = {
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
      <div style={{ width: "40%", height: "400px" }}>
        {" "}
        {/* Adjust the height here */}
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
}
