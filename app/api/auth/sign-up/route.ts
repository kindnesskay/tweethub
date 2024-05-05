import User from "@/models/user.model";
import generateUsernameProfilePic from "@/utils/generateUsernameProfilePic";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import hashPassword from "@/utils/hashPassword";
import { validatePassword } from "@/utils/validatePassword";
import * as jose from "jose";
import { connectToDb } from "@/utils/connectMongoDb";
// Define interface for request body
interface Body {
  email: string;
  password: string;
  confirm_password: string;
}
type message = {
  message: string;
};
export async function POST(req: NextRequest) {
  // Assert the type of req.body using
  await connectToDb();

  const { email, password, confirm_password } = await req.json();

  try {
    if (!email) {
      return NextResponse.json(
        { message: "email is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "password is required" },
        { status: 400 }
      );
    }
    if (password != confirm_password) {
      return NextResponse.json(
        { message: "password do not match" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }
    // set proifle image based on username
    const name_from_email = email.split("@")[0];
    const profilePic = generateUsernameProfilePic(name_from_email);
    // validate password
    const validPassword = validatePassword(password);
    if (validPassword.valid) {
      const message = validPassword.error;
      return NextResponse.json({ message }, { status: 400 });
    }
    // generate salt and hash password
    const hashed_password = await hashPassword(password);
    // Add to user model
    const newUser = new User({
      email,
      password: hashed_password,
      profilePic,
    });
    await newUser.save();
    const userID = newUser._id;
    // generate jwt
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({ id: userID })
      .setProtectedHeader({ alg })
      .setExpirationTime("10d")
      .sign(secret);
    // set cookie header
    cookies().set({
      name: "tweethub_auth",
      value: jwt,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json(
      { id: userID, email: newUser.email },
      { status: 201 }
    );
  } catch (error) {
    console.log("sign up error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
