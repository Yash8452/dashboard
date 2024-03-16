import { useData } from "@/context/DataContext";
import { Chart } from "chart.js/auto";
import React from "react";
import { Pie, Radar } from "react-chartjs-2";

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
  console.log(projectCount);
  console.log(uniqueRegion);

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
        borderWidth: 3,
      },
    },
  };
  return (
    <>
      <div style={{ width: "40%" }}>
        <h1 className="text-center font-extrabold text-gray-800">
          Total Projects based on Region
        </h1>
        <Radar data={data} options={options} />
      </div>
    </>
  );
}
