import { connect } from "@/dbConfig/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { username, password } = requestBody;

  if (!username || !password) {
    return NextResponse.json(
      { message: "Please provide both username and password", success: false },
      { status: 400 }
    );
  }

  await connect();

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Compare passwords
    const passwordMatch: boolean = user.password === password;

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials", success: false },
        { status: 401 }
      );
    }

    //crete token data
    const tokenData = {
      username: user.username,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET_KEY!, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    //set to cookies
    const response = NextResponse.json(
      { message: "Login Successfull", user, success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
