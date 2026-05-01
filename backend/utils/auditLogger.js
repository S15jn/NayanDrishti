import AuditLog from "../models/AuditLog.js";

export const logAction = async ({
  req,
  action,
  entity,
  entityId,
  details = {},
}) => {
  try {
    await AuditLog.create({
      userId: req.user?.id,
      role: req.user?.role,
      action,
      entity,
      entityId,
      details,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};
