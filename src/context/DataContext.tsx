import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface DataContextProps {
  children: ReactNode;
}
interface IFilters {
  endYear: string | null;
  topics: string[];
  sector: string | null;
  region: string | null;
  PEST: string | null;
  source: string | null;
  SWOT: string | null;
  country: string | null;
  city: string | null;
}

interface DataContextValue {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;

  values: any[];
  setValues: React.Dispatch<React.SetStateAction<any[]>>;

  filteredData: any[];
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;

  fetchData: (filter?: string, val?: string) => void;

  filters: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);

  const fetchData = async (filter?: string, val?: string) => {
    try {
      let url = "/api/data";
      if (filter) {
        if (val) {
          url += `/filters/byFilter?filter=${filter}&value=${val}`;
          const response = await fetch(url, { method: "GET" }); //for filtered data
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const responseData = await response.json();
          return responseData;
        } else {
          url += `/filters/values?filter=${filter}`; //for filter values eg end_data:[2012,2016,...]
          const response = await fetch(url, { method: "GET" });
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const responseData = await response.json();
          return responseData;

          //   const data = responseData.data;
          //   console.log("data for filters", data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Updated dependency array

  const value: DataContextValue = {
    data,
    setData,
    values,
    setValues,
    filteredData,
    setFilteredData,
    fetchData,
    filters: function (value: React.SetStateAction<any[]>): void {
      throw new Error("Function not implemented.");
    },
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
