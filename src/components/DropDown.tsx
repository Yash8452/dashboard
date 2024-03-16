"use client";
import React, { useEffect, useState } from "react";
import { useData } from "@/context/DataContext";
import Sample from "./Chart/Sample";

const DropDown = ({ filter, k }: any) => {
  console.log(filter);
  const { fetchData, filteredData, setFilteredData } = useData();
  // const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilteredData = async (val: string) => {
    setIsLoading(true);
    try {
      const response: any = await fetchData(filter, val);
      // console.log(response);
      const responseData = response.data;
      setFilteredData(responseData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //   working fine ---    first
  const filterValues = async (filter: any) => {
    setIsLoading(true);
    try {
      const response: any = await fetchData(filter); // Wait for the promise to resolve
      const responseData = response.data;
      setValues(responseData);
      // console.log(responseData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterValues(filter);
  }, [filter]);
  // console.log("*", values);
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    await fetchFilteredData(selectedFilter); // Use t
  };

  return (
    <>
      <div className="flex justify-center">
        <form className="w-44  p-2">
          <fieldset>
            <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
              {isLoading ? (
                <div>Loading...</div> // Show loading indicator when isLoading is true
              ) : (
                <>
                  <select
                    onChange={handleChange}
                    className="appearance-none w-full py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option value={filter}>{filter}</option>

                    {values &&
                      Array.isArray(values) &&
                      values.map((val: any, k) => (
                        <option
                          value={val}
                          onClick={() => fetchFilteredData(val)}
                          className="p-1 text-center cursor-pointer border-b-gray-500"
                          key={k}
                        >
                          {val}
                        </option>
                      ))}
                  </select>
                </>
              )}

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
      {/* <section className="flex h-full flex-row flex-wrap mt-4 m-8">
        <Sample />
      </section> */}
    </>
  );
};

export default DropDown;
