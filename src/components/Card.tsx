"use client";
import React from "react";

const Card = ({ data, k }: any) => {
  // console.log("daata", data.message);
  // let newData = data?.data;
  // console.log(newData);
  return (
    <>
      <div className="w-[300px] p-2 h-[400px] overflow-scroll  bg-slate-300 shadow-md rounded-md border">
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
      </div>
    </>
  );
};

export default Card;
