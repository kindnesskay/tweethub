import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("_auth")?.value;

  try {
    if (!cookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    } else {
      // User is authenticated, allow the request to proceed
      return NextResponse.rewrite(new URL(`${request.nextUrl.origin}/api/verify?token=${cookie}`));
    }
  } catch (error) {
    console.log(error);
  }
}
export const config = {
  matcher: "/",
  exclude: ["/favicon.ico", "/_next/static/"], // Add other static asset paths as needed
};
