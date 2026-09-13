import mongoose from "mongoose";

const { Schema } = mongoose;

const safeMixed = {
  type: Schema.Types.Mixed,
  default: () => ({}),
};

const recordSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
      index: true,
    },

    history: safeMixed,
    refraction: safeMixed,
    examination: safeMixed,

    advice: {
      medical: safeMixed,
      diagnosis: {
        diagnosis: {
          type: String,
          default: "",
          trim: true,
          maxlength: 10000,
        },
        prescription: {
          type: String,
          default: "",
          trim: true,
          maxlength: 10000,
        },
      },
      followUp: {
        date: {
          type: String,
          default: "",
          trim: true,
        },
        time: {
          type: String,
          default: "",
          trim: true,
        },
      },
    },

    diagnosis: {
      type: String,
      default: "",
      trim: true,
      maxlength: 10000,
    },

    prescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 10000,
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

    medical: safeMixed,

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

recordSchema.pre("validate", function syncAdviceFields(next) {
  const adviceDiagnosis = this.advice?.diagnosis || {};
  const followUp = this.advice?.followUp || {};

  if (!this.diagnosis && adviceDiagnosis.diagnosis) {
    this.diagnosis = adviceDiagnosis.diagnosis;
  }

  if (!this.prescription && adviceDiagnosis.prescription) {
    this.prescription = adviceDiagnosis.prescription;
  }

  if (!this.medical || Object.keys(this.medical).length === 0) {
    this.medical = this.advice?.medical || {};
  }

  if (!this.followUpTime && followUp.time) {
    this.followUpTime = followUp.time;
  }

  if (!this.followUpDate && followUp.date) {
    this.followUpDate = followUp.date;
  }

  next();
});

recordSchema.index({ patientId: 1, updatedAt: -1 });
recordSchema.index({ appointmentId: 1, patientId: 1 });

export default mongoose.model("Record", recordSchema);