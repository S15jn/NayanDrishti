import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },

    entity: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
      index: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },

    details: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
      select: false,
    },

    ip: {
      type: String,
      default: "",
      trim: true,
      maxlength: 80,
    },

    userAgent: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  },
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ entity: 1, entityId: 1, createdAt: -1 });

export default mongoose.model("AuditLog", auditLogSchema);