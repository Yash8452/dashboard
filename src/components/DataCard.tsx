"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
const DataCard = ({ data, k }: any) => {
  // console.log("daata", data);

  return (
    <>
      <Card className="w-[300px]">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle>Topic: {data.topic}</CardTitle>
            <CardDescription>Insight: {data.insight}</CardDescription>
            <CardDescription>Sector: {data.sector}</CardDescription>
            <CardDescription>Intensity: {data.intensity}</CardDescription>
            <CardDescription>PESTLE: {data.pestle}</CardDescription>
            <CardDescription>Source: {data.source}</CardDescription>
          </div>
          <CardDescription>Title: {data.title}</CardDescription>
        </CardHeader>
      </Card>

      {/* <div className="w-[300px] p-2 h-[400px] overflow-scroll  bg-slate-300 shadow-md rounded-md border">
        <div className="p-6 flex flex-col">
          <h2 className="text-center">Project Details</h2>
        </div>

        {Object.keys(data).map((k) => (
          <div
            key={k}
            className="px-1 py-1 text-[10px] font-semibold text-gray-900"
          >
            <strong>{k}: </strong> {data[k]}
          </div>
        ))}
      </div> */}
    </>
  );
};

export default DataCard;
