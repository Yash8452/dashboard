import { useData } from "@/context/DataContext";
import { Chart } from "chart.js/auto";
import React from "react";
import { Pie } from "react-chartjs-2";

export default function () {
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

  let uniqueSectors: any[] = [];
  //using forEach because it doesn't return any array
  filteredData.forEach((i) => {
    if (!uniqueSectors.includes(i.sector) && i.sector !== "") {
      uniqueSectors.push(i.sector);
    }
  });

  let uniqueTopics: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueTopics.includes(i.topic) && i.topic !== "") {
      uniqueTopics.push(i.topic);
    }
  });

  let uniqueRegion: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueRegion.includes(i.region) && i.region !== "") {
      uniqueRegion.push(i.region);
    }
  });

  let uniqueCountry: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueCountry.includes(i.country) && i.country !== "") {
      uniqueCountry.push(i.country);
    }
  });

  let uniqueSource: any[] = [];
  filteredData.forEach((i) => {
    if (!uniqueSource.includes(i.source) && i.source !== "") {
      uniqueSource.push(i.source);
    }
  });

  let uniquePestle: any[] = [];
  filteredData.forEach((i) => {
    if (!uniquePestle.includes(i.pestle) && i.pestle !== "") {
      uniquePestle.push(i.pestle);
    }
  });

  const label = ["Country", "Region", "Source", "Topic", "Sector", "Pestle"];

  const data = {
    labels: label,
    datasets: [
      {
        label: "Total: ",
        data: [
          uniqueCountry.length,
          uniqueRegion.length,
          uniqueSource.length,
          uniqueTopics.length,
          uniqueSectors.length,
          uniquePestle.length,
        ],
        borderWidth: 1,
        hoverOffset: 5,
      },
    ],
  };

  const options = {};
  return (
    <>
      <div style={{ width: "40%" }}>
        <h1 className="text-center font-extrabold text-gray-800">
          TOTAL CATEGORY-sort with year/intensity
        </h1>
        <Pie data={data} options={options} />
      </div>
    </>
  );
}
