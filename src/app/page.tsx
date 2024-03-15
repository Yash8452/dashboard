"use client";
import { Header } from "@/components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import DropDown from "@/components/DropDown";
import data from "@/data/data.json";
import FilterContainer from "@/components/FilterContainer";
import Container from "@/components/Container";
import { DataProvider, useData } from "@/context/DataContext";
interface YearInterface {
  year: string;
}
export default function Home() {
  // console.log("merged", mergedYearData);
  return (
    <DataProvider>
      <Layout>
        <Header />

        <main className=" ">
          <div className="flex flex-col  justify-center space-x-1 p-2">
            <FilterContainer />
            <Container />
          </div>
        </main>
      </Layout>
    </DataProvider>
  );
}
