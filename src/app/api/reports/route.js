import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Intern from "@/models/Intern";
import Task from "@/models/Task";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();

    const interns = await Intern.find().sort({ createdAt: -1 });

    const totalInterns = await Intern.countDocuments();
    const activeInterns = await Intern.countDocuments({ status: "Active" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });

    const totalAttendance = await Attendance.countDocuments();
    const presentAttendance = await Attendance.countDocuments({
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presentAttendance / totalAttendance) * 100)
        : 0;

    const attendanceReport = await Promise.all(
      interns.map(async (intern) => {
        const present = await Attendance.countDocuments({
          intern: intern._id,
          status: "Present",
        });

        const absent = await Attendance.countDocuments({
          intern: intern._id,
          status: "Absent",
        });

        const leave = await Attendance.countDocuments({
          intern: intern._id,
          status: "Leave",
        });

        return {
          internId: intern._id,
          name: intern.name,
          present,
          absent,
          leave,
        };
      })
    );

    const performanceReport = await Promise.all(
      interns.map(async (intern) => {
        const assigned = await Task.countDocuments({
          assignedTo: intern._id,
        });

        const completed = await Task.countDocuments({
          assignedTo: intern._id,
          status: "Completed",
        });

        const rate =
          assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

        return {
          internId: intern._id,
          name: intern.name,
          assigned,
          completed,
          rate,
        };
      })
    );

    const attendanceTrend = [
      { month: "Jan", attendance: 0 },
      { month: "Feb", attendance: 0 },
      { month: "Mar", attendance: 0 },
      { month: "Apr", attendance: 0 },
      { month: "May", attendance: 0 },
      { month: "Jun", attendance: attendancePercentage },
    ];

    const taskCompletionTrend = [
      { month: "Jan", completed: 0 },
      { month: "Feb", completed: 0 },
      { month: "Mar", completed: 0 },
      { month: "Apr", completed: 0 },
      { month: "May", completed: 0 },
      { month: "Jun", completed: completedTasks },
    ];

    return NextResponse.json(
      {
        stats: {
          totalInterns,
          activeInterns,
          attendancePercentage,
          completedTasks,
        },
        attendanceReport,
        performanceReport,
        attendanceTrend,
        taskCompletionTrend,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load reports", error: error.message },
      { status: 500 }
    );
  }
}