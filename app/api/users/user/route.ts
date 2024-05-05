import User from "@/models/user.model";
import { connectToDb } from "@/utils/connectMongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Ivalid user id" }, { status: 400 });
  }

  const find_user = await User.findById(id);

  const user_data = {
    _id: find_user._id,
    email: find_user.email,
    profilePic: find_user.profilePic,
    bio: find_user.bio,
  };
  if (!user_data)
    return NextResponse.json({ message: "Ivalid user id" }, { status: 400 });

  return NextResponse.json({ ...user_data }, { status: 200 });
}
