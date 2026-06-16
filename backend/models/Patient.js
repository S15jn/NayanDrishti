import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Patient", patientSchema);