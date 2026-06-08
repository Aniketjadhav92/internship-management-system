import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Intern from "@/models/Intern";

export async function GET() {
  try {
    await connectDB();

    const attendance = await Attendance.find()
      .populate("intern", "name email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { intern, date, status } = await req.json();

    if (!intern || !date || !status) {
      return NextResponse.json(
        { message: "Intern, date and status are required" },
        { status: 400 }
      );
    }

    const existingIntern = await Intern.findById(intern);

    if (!existingIntern) {
      return NextResponse.json(
        { message: "Intern not found" },
        { status: 404 }
      );
    }

    const attendance = await Attendance.create({
      intern,
      date,
      status,
    });

    const populatedAttendance = await Attendance.findById(
      attendance._id
    ).populate("intern", "name email phone");

    return NextResponse.json(
      {
        message: "Attendance marked successfully",
        attendance: populatedAttendance,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to mark attendance", error: error.message },
      { status: 500 }
    );
  }
}