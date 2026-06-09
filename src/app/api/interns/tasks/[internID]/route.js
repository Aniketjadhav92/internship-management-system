import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const tasks = await Task.find({
      assignedTo: params.internID,
    }).sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch intern tasks",
        error: error.message,
      },
      { status: 500 }
    );
  }
}