import getUserDataById from "@/utils/getUserDataById";
import verifyCookie from "@/utils/verifyCookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("tweethub_auth")?.value;
  if (!cookie) return NextResponse.json({ user: false }, { status: 400 });
  const payload = await verifyCookie(cookie);
  const { id } = payload;
  if (!id) return NextResponse.json({ user: false }, { status: 400 });
  const user = await getUserDataById(id);
  return NextResponse.json({ user: user }, { status: 200 });
}
