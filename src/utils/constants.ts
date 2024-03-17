import { useTheme } from "next-themes";

// Chartss
export const colors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(255, 128, 0)",
  "rgb(0, 128, 128)",
  "rgb(128, 0, 128)",
  "rgb(128, 128, 0)",
  "rgb(0, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(255, 0, 0)",
  "rgb(192, 192, 192)",
  "rgb(128, 128, 128)",
  "rgb(128, 0, 0)",
  "rgb(128, 128, 0)",
  "rgb(0, 128, 0)",
  "rgb(0, 128, 128)",
  "rgb(0, 0, 128)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 255)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 0)",
  "rgb(255, 0, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 225, 255)",
  "rgb(54, 90, 40)",
];


// console.log(theme);
export const getGridColor = (theme: string | undefined) => {
  return theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
};
