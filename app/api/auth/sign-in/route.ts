import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";
import { connectToDb } from "@/utils/connectMongoDb";

interface Body {
  username: string;
  password: string;
}
export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const { username, password } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "username is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "password is required" },
        { status: 400 }
      );
    }

    // check if user exist
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // compare password with hashed password
    const ispasswordCorrect = bcrypt.compare(password, user.password);
    if (!ispasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid passeord" },
        { status: 400 }
      );
    }
    // generate token
    const userID = user._id;

    if (process.env.JWT_SECRET) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const alg = "HS256";
      const token = await new jose.SignJWT({ id: userID })
        .setProtectedHeader({ alg })
        .setExpirationTime("10d")
        .sign(secret);

      cookies().set({
        name: "tweethub_auth",
        value: token,
        httpOnly: true,
        path: "/",
      });
    }

    // send user data
    const userData = {
      _id: user._id,
      username: username,
      profilePic: user.profilePic,
    };
    return NextResponse.json(
      { message: "sign in successful", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" });
  }
}
