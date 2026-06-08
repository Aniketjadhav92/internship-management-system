import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const attendance = await Attendance.findById(params.id).populate(
      "intern",
      "name email phone"
    );

    if (!attendance) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance record", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const data = await req.json();

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    ).populate("intern", "name email phone");

    if (!updatedAttendance) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update attendance", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedAttendance = await Attendance.findByIdAndDelete(params.id);

    if (!deletedAttendance) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Attendance deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete attendance", error: error.message },
      { status: 500 }
    );
  }
}