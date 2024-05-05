import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("tweethub_auth")?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  } 
  
  
  // if(request.url.includes('auth') && cookie){
  //   // vlidate the cookie
  //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  //   const { payload } = await jose.jwtVerify(cookie, secret);
  //   // User is authenticated, allow the request to proceed
  //   return NextResponse.redirect(new URL("/contacts", request.url));
  // }
}
export const config = {
  matcher: ["/contacts:path*",],
  exclude: ["/favicon.ico", "/_next/static/"], // Add other static asset paths as needed
};
