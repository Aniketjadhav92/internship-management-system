import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import Attendance from "@/models/Attendance";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const internId = params.internId;

    const totalTasks = await Task.countDocuments({
      assignedTo: internId,
    });

    const completedTasks = await Task.countDocuments({
      assignedTo: internId,
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      assignedTo: internId,
      status: { $ne: "Completed" },
    });

    const totalAttendance = await Attendance.countDocuments({
      intern: internId,
    });

    const presentDays = await Attendance.countDocuments({
      intern: internId,
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presentDays / totalAttendance) * 100)
        : 0;

    const recentTasks = await Task.find({
      assignedTo: internId,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    const recentAttendance = await Attendance.find({
      intern: internId,
    })
      .sort({ date: -1 })
      .limit(3);

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      attendancePercentage,
      recentTasks,
      recentAttendance,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}