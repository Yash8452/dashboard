"use client";
import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useData } from "@/context/DataContext";
import Chart, {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { colors } from "@/utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BarChart() {
  const { filteredData } = useData();

  let uniqueSectors: string[] = [];

  // Using forEach to add unique sector names to an array
  filteredData.forEach((i) => {
    if (!uniqueSectors.includes(i.sector) && i.sector !== "") {
      uniqueSectors.push(i.sector);
    }
  });

  // Counting the total number of projects in each sector uniquely
  const sectorCount = uniqueSectors.map((item) => ({
    sector: item,
    count: filteredData.filter((i) => i.sector === item).length,
  }));
  console.log(sectorCount);
  const labels = uniqueSectors;
  const data = {
    labels: labels,
    datasets: [
      {
        label: uniqueSectors.map((e) => e),
        data: sectorCount.map((e) => e.count), //
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  console.log("Data:", data);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div style={{ width: "90%" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
