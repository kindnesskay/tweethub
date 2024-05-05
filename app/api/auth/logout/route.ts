import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("tweethub_auth");
  if (cookie) {
    cookies().delete("tweethub_auth");
    return NextResponse.redirect(new URL("/", req.url));
  }
}
