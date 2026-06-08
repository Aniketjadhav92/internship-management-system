import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intern",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);