import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const attendance = await Attendance.find({
      intern: params.internID,
    }).sort({ date: -1 });

    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch intern attendance",
        error: error.message,
      },
      { status: 500 }
    );
  }
}