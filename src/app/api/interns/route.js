import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Intern from "@/models/Intern";

export async function GET() {
  try {
    await connectDB();

    const interns = await Intern.find().sort({ createdAt: -1 });

    return NextResponse.json(interns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch interns", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const {
      name,
      email,
      phone,
      skills,
      joiningDate,
      status,
      password,
    } = await req.json();

    if (!name || !email || !phone || !skills || !joiningDate) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const existingIntern = await Intern.findOne({ email });

    if (existingIntern) {
      return NextResponse.json(
        { message: "Intern already exists with this email" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password || "intern123", 10);

    const intern = await Intern.create({
      name,
      email,
      phone,
      skills,
      joiningDate,
      status: status || "Active",
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Intern created successfully",
        intern,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create intern", error: error.message },
      { status: 500 }
    );
  }
}