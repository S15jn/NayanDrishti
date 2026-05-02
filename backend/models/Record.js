import mongoose from "mongoose";

const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
      index: true,
    },
    history: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
    refraction: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
    examination: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
    diagnosis: {
      type: String,
      default: "",
    },
    prescription: {
      type: String,
      default: "",
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    medical: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  { timestamps: true },
);

export default mongoose.model("Record", recordSchema);
