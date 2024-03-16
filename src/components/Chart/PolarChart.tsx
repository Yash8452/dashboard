import React from "react";
import { PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js with automatic imports
import { useData } from "@/context/DataContext";

export default function () {
  // Register the radial linear scale
  Chart.register({
    id: "radialLinear",
    type: Chart.LinearScale,
    position: "radial",
  });

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
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div style={{ width: "40%" }}>
      <h1 className="text-center font-extrabold text-gray-800">SECTORS</h1>
      <PolarArea height={300} data={data} options={options} />
    </div>
  );
}
