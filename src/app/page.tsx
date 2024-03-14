"use client";
import { Header } from "@/components/Header";
import Layout from "../components/Layout";

export default function Home() {
  const fetchData = async () => {
    const response = await fetch("/api/data", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log response data
    } else {
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  };
  return (
    <Layout>
      <Header />
      <main className="flex min-h-screen bg-red-500 flex-col items-center justify-around pt-4 p-24">
        <button onClick={fetchData}>Click</button>
      </main>
    </Layout>
  );
}
