import { connect } from "@/dbConfig/db";
import dataModel from "@/models/data.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connect();

  const url = new URL(req.url);
  const filter = url.searchParams.get("filter");
  const value = url.searchParams.get("value");

  try {
    if (!filter || !value) {
      return NextResponse.json(
        {
          message: "Both filter and value parameters are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // Construct the query dynamically
    const query: Record<string, string | null | undefined> = {};
    query[filter] = value;

    const data = await dataModel.find(query);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No Data found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data, message: "Filtered Data found", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
