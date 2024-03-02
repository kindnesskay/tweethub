import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("_auth")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    // vlidate the cookie
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(cookie, secret);
    // User is authenticated, allow the request to proceed
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
export const config = {
  matcher: "/dashboard:path*",
  exclude: ["/favicon.ico", "/_next/static/"], // Add other static asset paths as needed
};
