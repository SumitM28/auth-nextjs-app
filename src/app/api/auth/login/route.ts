import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse as res } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectdb();

    const { email, password } = await req.json();
    console.log(email, password);

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(
        { success: false, message: "User not found!" },
        { status: 400 }
      );
    }

    // check if password is correct or not
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.json(
        { success: false, message: "Invalid Password or Email" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = res.json(
      { success: true, message: "Login Successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return res.json({ message: error.message }, { status: 500 });
  }
}
