import { connect } from "@/dbConfig/db";
import dataModel from "@/models/data.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connect();

  const url = new URL(req.url);
  let filter = url.searchParams.get("filter");
  let value = url.searchParams.get("value");

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
    const query: Record<string, any> = {};

    if (filter === "end_year" && value !== null) {
      // Convert value to a number if filter is "end_value"
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        console.log("Numeric value:", numericValue);
        // Check if conversion was successful
        query[filter] = numericValue;
      } else {
        return NextResponse.json(
          {
            message: "Invalid value for 'end_value'. Must be a valid number.",
            success: false,
          },
          { status: 400 }
        );
      }
    } else if (value !== null && value !== "") {
      query[filter] = value;
    }

    // Add the additional filtering condition here
    query["$or"] = [
      { end_year: { $exists: true } }, // Include records where end_year exists
      { end_year: "" }, // Include records with empty end_year
    ];

    console.log("Constructed query:", query);

    const data = await dataModel.find(query);

    console.log("Resulting data:", data);

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
