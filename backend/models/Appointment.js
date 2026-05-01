import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    bookedBy: {
      type: String,
      enum: ["USER", "RECEPTION"],
      default: "USER",
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    token: {
      type: Number,
    },

    specialization: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    amount: {
      type: Number,
      default: 0,
    },

    followUpDate: {
      type: Date,
    },

    notes: {
      type: String,
      default: "",
    },

    visited: {
      type: Boolean,
      default: false,
    },

    cancelledBy: {
      type: String,
      enum: ["USER", "RECEPTION", "DOCTOR"],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================
    UNIQUE SLOT PROTECTION
========================= */
// Same date + same time = no duplicate booking
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

/* =========================
    FAST QUERY INDEXES
========================= */

// For today's appointments
appointmentSchema.index({ date: 1 });

// For doctor dashboard
appointmentSchema.index({ doctorId: 1, date: 1 });

// For queue (token order)
appointmentSchema.index({ date: 1, token: 1 });

export default mongoose.model("Appointment", appointmentSchema);
