import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Intern from "@/models/Intern";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const intern = await Intern.findById(params.id);

    if (!intern) {
      return NextResponse.json(
        { message: "Intern not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(intern, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch intern", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const data = await req.json();

    const updatedIntern = await Intern.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!updatedIntern) {
      return NextResponse.json(
        { message: "Intern not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Intern updated successfully",
        intern: updatedIntern,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update intern", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedIntern = await Intern.findByIdAndDelete(params.id);

    if (!deletedIntern) {
      return NextResponse.json(
        { message: "Intern not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Intern deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete intern", error: error.message },
      { status: 500 }
    );
  }
}