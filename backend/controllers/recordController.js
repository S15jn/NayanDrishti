import mongoose from "mongoose";
import Record from "../models/Record.js";

const parseBody = (body) => {
  if (typeof body !== "string") {
    return body || {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
};

const buildRecordPayload = (body) => {
  const payload = parseBody(body);
  const advice = payload.advice || {};
  const adviceDiagnosis = advice.diagnosis || {};
  const followUp = advice.followUp || {};

  return {
    patientId: payload.patientId,
    appointmentId: payload.appointmentId,
    history: payload.history || {},
    refraction: payload.refraction || {},
    examination: payload.examination || {},
    advice,
    diagnosis: payload.diagnosis || adviceDiagnosis.diagnosis || "",
    prescription: payload.prescription || adviceDiagnosis.prescription || "",
    followUpDate: payload.followUpDate || followUp.date || null,
    followUpTime: payload.followUpTime || followUp.time || "",
    medical: payload.medical || advice.medical || {},
  };
};

export const saveRecord = async (req, res) => {
  try {
    const payload = buildRecordPayload(req.body);

    if (
      !mongoose.Types.ObjectId.isValid(payload.patientId) ||
      !mongoose.Types.ObjectId.isValid(payload.appointmentId)
    ) {
      return res.status(400).json({
        message: "Valid patientId and appointmentId are required",
      });
    }

    const record = await Record.findOneAndUpdate(
      { appointmentId: payload.appointmentId },
      { $set: payload },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.json({
      message: "Saved",
      record,
    });
  } catch (err) {
    console.error("SAVE RECORD ERROR:", err);
    return res.status(500).json({
      message: "Record save failed",
    });
  }
};

export const getPatientRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: "Valid patientId is required",
      });
    }

    const records = await Record.find({
      patientId,
      isDeleted: { $ne: true },
    })
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();

    return res.json(records);
  } catch (err) {
    return res.status(500).json({
      message: "Unable to fetch records",
    });
  }
};
