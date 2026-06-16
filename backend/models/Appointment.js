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

    /* =========================
       PAYMENT DETAILS
    ========================= */

    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    paymentMode: {
      type: String,
      enum: ["CASH", "ONLINE", "UPI", "CARD"],
      default: "ONLINE",
    },

    amount: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    /* ========================= */

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

appointmentSchema.index(
  { date: 1, time: 1 },
  { unique: true },
);

/* =========================
   FAST QUERY INDEXES
========================= */

// Today's appointments
appointmentSchema.index({ date: 1 });

// Doctor dashboard
appointmentSchema.index({
  doctorId: 1,
  date: 1,
});

// Queue token order
appointmentSchema.index({
  date: 1,
  token: 1,
});

// Payment reports
appointmentSchema.index({
  paymentStatus: 1,
  paymentMode: 1,
});

export default mongoose.model(
  "Appointment",
  appointmentSchema,
);