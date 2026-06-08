import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Intern from "@/models/Intern";
import Task from "@/models/Task";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();

    const totalInterns = await Intern.countDocuments();
    const activeInterns = await Intern.countDocuments({ status: "Active" });

    const pendingTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const totalAttendance = await Attendance.countDocuments();
    const presentAttendance = await Attendance.countDocuments({
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presentAttendance / totalAttendance) * 100)
        : 0;

    const taskStats = {
      pending: await Task.countDocuments({ status: "Pending" }),
      inProgress: await Task.countDocuments({ status: "In Progress" }),
      completed: completedTasks,
    };

    const recentTasks = await Task.find()
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 })
      .limit(3);

    const recentAttendance = await Attendance.find()
      .populate("intern", "name")
      .sort({ createdAt: -1 })
      .limit(3);

    const recentActivities = [
      ...recentTasks.map((task) => ({
        type: "Task",
        message: `Task assigned: ${task.title} to ${
          task.assignedTo?.name || "Intern"
        }`,
        createdAt: task.createdAt,
      })),
      ...recentAttendance.map((record) => ({
        type: "Attendance",
        message: `Attendance marked: ${
          record.intern?.name || "Intern"
        } - ${record.status}`,
        createdAt: record.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const attendanceAnalytics = [
      { month: "Jan", attendance: 0 },
      { month: "Feb", attendance: 0 },
      { month: "Mar", attendance: 0 },
      { month: "Apr", attendance: 0 },
      { month: "May", attendance: 0 },
      { month: "Jun", attendance: attendancePercentage },
    ];

    return NextResponse.json(
      {
        totalInterns,
        activeInterns,
        pendingTasks,
        completedTasks,
        attendancePercentage,
        taskStats,
        attendanceAnalytics,
        recentActivities,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load dashboard data", error: error.message },
      { status: 500 }
    );
  }
}