import mongoose from "mongoose";

const schema = new mongoose.Schema(
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
    password: {
      type: String, // Corrected from "password" to "String"
    },
    role: {
      type: String,
      default: "user",
    },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    questionProgress: {
      type: [Number],
      default: Array(150).fill(0), // ⬅️ Each user starts with all questions unchecked
    },
  },
  { timestamps: true } // ⏱ Adds createdAt and updatedAt
);

export const User = mongoose.model("User", schema);
