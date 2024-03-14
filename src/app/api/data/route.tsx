import { connect } from "@/dbConfig/db";
import Data from "@/models/data.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connect();
  try {
    const data = await Data.find({});
    // console.warn(response)
    return NextResponse.json(
      { data, message: "Data fetched" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
