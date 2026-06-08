import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import Intern from "@/models/Intern";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tasks", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const {
      title,
      description,
      assignedTo,
      priority,
      status,
      deadline,
    } = await req.json();

    if (!title || !description || !assignedTo || !deadline) {
      return NextResponse.json(
        { message: "Title, description, intern and deadline are required" },
        { status: 400 }
      );
    }

    const intern = await Intern.findById(assignedTo);

    if (!intern) {
      return NextResponse.json(
        { message: "Assigned intern not found" },
        { status: 404 }
      );
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority: priority || "Medium",
      status: status || "Pending",
      deadline,
    });

    const populatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "name email"
    );

    return NextResponse.json(
      {
        message: "Task created successfully",
        task: populatedTask,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create task", error: error.message },
      { status: 500 }
    );
  }
}