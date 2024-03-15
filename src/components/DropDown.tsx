"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Container from "./Container";

const DropDown = ({ filter }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to store the selected year
  const [values, setValues] = useState([]);
  const [limit, setLimit] = useState(5);
  const limitedData = data.slice(0, limit);

  const filterValues = async (filter: any) => {
    // console.log("in dd", filter);?
    try {
      const response = await fetch(
        `/api/data/filters/values?filter=${filter}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const temp = await response.json();
      const temp2 = temp?.uniqueValues;

      //   console.log("Response in dropdown", temp);
      setValues(temp2);
      // Don't log `values` here, it won't reflect the updated state immediately
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Log `values` after the component re-renders due to state update
  useEffect(() => {
    filterValues(filter);
    // console.log("Updated values:", values);
  }, [values]);

  const fetchFilteredData = async (year: string) => {
    console.log(filter);
    try {
      const response = await fetch(
        `/api/data/filters/${filter}?${filter}=${year}`,
        {
          method: "GET",
        }
      );
      if (response.status === 201) {
        const jsonData = await response.json();
        const filteredData = jsonData.data;
        setData(filteredData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setSelectedFilter(selectedFilter); // Update selected year in state
    fetchFilteredData(selectedFilter); // Fetch filtered data based on selected year
  };

  return (
    <>
      <div className="flex justify-center">
        <form className="w-44  p-2">
          <fieldset>
            <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
              <select
                onChange={handleChange}
                className="appearance-none w-full py-1 px-2 bg-white"
                name="whatever"
                id="frm-whatever"
              >
                <option value={filter}>{filter}</option>

                {values.map((val: any) => (
                  <option
                    value={val}
                    onClick={() => fetchFilteredData(val)}
                    className="p-1 text-center cursor-pointer border-b-gray-500"
                    key={val}
                  >
                    {val}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      {/* DATA */}
      {/* <Container limitedData={limitedData} data={data} /> */}
    </>
  );
};

export default DropDown;
