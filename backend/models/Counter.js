import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    scope: {
      type: String,
      default: "global",
      trim: true,
      index: true,
    },

    sequence: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

counterSchema.index({ date: 1, scope: 1 }, { unique: true });

export default mongoose.model("Counter", counterSchema);