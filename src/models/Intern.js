import mongoose from "mongoose";

const InternSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      default: "intern123",
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      default: "intern",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Intern ||
  mongoose.model("Intern", InternSchema);