import User from "@/models/user.model";
import generateUsernameProfilePic from "@/utils/generateUsernameProfilePic";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import hashPassword from "@/utils/hashPassword";
import { validatePassword } from "@/utils/validatePassword";
import * as jose from "jose";
// Define interface for request body
interface Body {
  username: string;
  password: string;
  confirm_password: string;
}
type message = {
  message: string;
};
export async function POST(req: NextRequest) {
  // Assert the type of req.body using 'as'

  const { username, password, confirm_password } = req.body as unknown as Body;
  try {
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
    if (password != confirm_password) {
      return NextResponse.json(
        { message: "password do not match" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ username: username });

    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }
    // set proifle image based on username
    const profilePic = generateUsernameProfilePic(username);
    // validate password
    const validPassword = validatePassword(password);
    if (validPassword.valid) {
      const message = validPassword.error;
      return NextResponse.json({ message }, { status: 400 });
    }
    // generate salt and hash password
    const hashedPassword = await hashPassword(password);
    // Add to user model
    const newUser = new User({
      username,
      password: hashedPassword,
      profilePic,
    });
    const userID = newUser._id;
    // generate jwt
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setExpirationTime("10d")
      .sign(secret);

    console.log(jwt);

    cookies().set({
      name: "_auth",
      value: jwt,
      httpOnly: true,
      path: "/",
    });

    NextResponse.json(
      { id: userID, username: newUser.username },
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
