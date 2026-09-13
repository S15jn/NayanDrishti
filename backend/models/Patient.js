import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9+\-\s]{7,15}$/;

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
      index: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [mobileRegex, "Please enter a valid mobile number"],
      index: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 130,
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
      validate: {
        validator(value) {
          return !value || emailRegex.test(value);
        },
        message: "Please enter a valid email",
      },
    },

    address: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

patientSchema.index({ name: "text", mobile: "text" });

export default mongoose.model("Patient", patientSchema);