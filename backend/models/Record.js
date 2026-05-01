import mongoose from "mongoose";

/* =========================
   COMMON SCHEMAS
========================= */

// Examination (multi-select + comment)
const examFieldSchema = new mongoose.Schema({
  values: [String],
  comment: String,
});

// History row (used in multiple sections)
const historyRowSchema = new mongoose.Schema({
  name: String,
  eye: String, 
  duration: String,
  unit: String,
  comment: String,
});

// Refraction prescription
const prescriptionSchema = new mongoose.Schema({
  sph: String,
  cyl: String,
  axis: String,
  vision: String,
});

// Refraction eye schema
const eyeRefractionSchema = new mongoose.Schema({
  ucva: String,
  pinhole: String,
  glass: String,

  distant: prescriptionSchema,
  near: prescriptionSchema,

  typeOfLens: String,
  lensMaterial: String,
  lensTint: String,
  frameMaterial: String,
  ipd: String,
  size: String,

  comments: String,
});

/* =========================
   MAIN RECORD SCHEMA
========================= */

const recordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    /* =========================
       HISTORY
    ========================= */

    complaints: [historyRowSchema],

    ophthalmicHistory: [historyRowSchema],

    systemicHistory: [
      {
        name: String,
        duration: String,
        unit: String,
        comment: String,
      },
    ],

    familyHistory: {
      family: String,
      medical: String,
    },

    allergies: {
      drugAllergies: {
        selected: [String],
        comment: String,
      },
      contactAllergies: [String],
    },

    /* =========================
       REFRACTION (NEW)
    ========================= */

    refraction: {
      right: eyeRefractionSchema,
      left: eyeRefractionSchema,
    },

    /* =========================
       EXAMINATION
    ========================= */

    examination: {
      appearance: { right: examFieldSchema, left: examFieldSchema },
      injury: { right: examFieldSchema, left: examFieldSchema },
      conjunctiva: { right: examFieldSchema, left: examFieldSchema },
      cornea: { right: examFieldSchema, left: examFieldSchema },
      pupil: { right: examFieldSchema, left: examFieldSchema },
      iris: { right: examFieldSchema, left: examFieldSchema },
      lens: { right: examFieldSchema, left: examFieldSchema },
    },

    examNotes: String,
    fundusDiagram: String,

    /* =========================
       DIAGNOSIS
    ========================= */

    diagnosis: String,
    prescription: String,

    medicines: [
      {
        name: String,
        dose: String,
        duration: String,
      },
    ],

    followUpDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);