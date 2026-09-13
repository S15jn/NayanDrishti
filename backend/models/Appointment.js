import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    bookedBy: {
      type: String,
      enum: ["USER", "RECEPTION", "DOCTOR", "ADMIN"],
      default: "USER",
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },

    token: {
      type: Number,
      min: 1,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "No Show"],
      default: "Pending",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },

    paymentMode: {
      type: String,
      enum: ["CASH", "ONLINE", "UPI", "CARD", "NONE"],
      default: "ONLINE",
    },

    amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    couponCode: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    followUpTime: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    visited: {
      type: Boolean,
      default: false,
    },

    cancelledBy: {
      type: String,
      enum: ["USER", "RECEPTION", "DOCTOR", "ADMIN", null],
      default: null,
    },

    cancellationReason: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

appointmentSchema.index(
  { doctorId: 1, date: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $ne: "Cancelled" },
      doctorId: { $type: "objectId" },
    },
  },
);

appointmentSchema.index({ patientId: 1, date: -1 });
appointmentSchema.index({ doctorId: 1, date: 1, status: 1 });
appointmentSchema.index({ date: 1, token: 1 });
appointmentSchema.index({ paymentStatus: 1, paymentMode: 1 });

export default mongoose.model("Appointment", appointmentSchema);