import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ResponseData = {
  message: string;
};
export async function POST(req: NextRequest) {
  const res = await axios.post("http://localhost:5000/api/auth/sign-in", {
    username: "john",
    password: "123456",
  });
  const cookie = cookies().getAll();
  console.log(cookie);
  return NextResponse.json({ message: "Hello from Next.js!" });
}
