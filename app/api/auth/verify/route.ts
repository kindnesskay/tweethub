import { NextRequest, NextResponse } from "next/server";
import VerifyToken from "@/utils/verifyToken";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("tokent");

  if (!token) {
    return NextResponse.rewrite(new URL(`/sign-in`));
  }

  try {
    const decodedToken = VerifyToken(token);

    if (!decodedToken) {
      // Handle unauthorized access (e.g., return 401 or redirect)
      return NextResponse.rewrite(new URL(`/sign-in`));
    }

    return NextResponse.rewrite(new URL(`/dashboard`));
  } catch (error) {
    // Handle errors from VerifyToken
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
