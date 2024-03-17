import { connect } from "@/dbConfig/db";
import Data from "@/models/data.model";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";
interface DataItem {
  end_year: number;
  intensity: number;
  sector: string;
  topic: string;
  source: string;
  pestle: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  likelihood: number;
}
export async function GET(req: NextRequest) {
  await connect();

  try {
    const url = new URL(req.url);

    const fieldParam: any = url.searchParams.get("filter");
    console.log("params", fieldParam); //null
    const validKeys: (keyof DataItem)[] = [
      "end_year",
      "intensity",
      "sector",
      "source",
      "pestle",
      "topic",
      "insight",
      "url",
      "region",
      "start_year",
      "impact",
      "added",
      "published",
      "country",
      "likelihood",
    ];

    const field: keyof DataItem = validKeys.includes(fieldParam)
      ? fieldParam
      : "defaultField";

    // Fetch distinct values for the specified field from the database
    const data = await Data.distinct(field);

    // console.log(uniqueValues);

    return NextResponse.json(
      { data, message: "Unique values fetched" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
