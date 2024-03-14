import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//might be an issue///

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth";

  const token = request.cookies.get("token")?.value || "";
  // console.log(token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/auth"],
};
