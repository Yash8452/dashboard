"use client";
import { Header } from "@/components/Header";
import Layout from "../components/Layout";
import FilterContainer from "@/components/FilterContainer";
import Container from "@/components/Container";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
interface YearInterface {
  year: string;
}
export default function Home() {
  // console.log("merged", mergedYearData);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DataProvider>
        <Layout>
          <Header />

          <main className="scrollbar">
            <div className="flex flex-col  justify-center items-center p-2 space-x-1 ">
              <FilterContainer />
              <Container />
            </div>
          </main>
        </Layout>
      </DataProvider>
    </ThemeProvider>
  );
}
