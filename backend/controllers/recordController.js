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

  return {
    patientId: payload.patientId,
    appointmentId: payload.appointmentId,
    history: payload.history || {},
    refraction: payload.refraction || {},
    examination: payload.examination || {},
    diagnosis: payload.diagnosis || "",
    prescription: payload.prescription || "",
    followUpDate: payload.followUpDate || null,
    medical: payload.medical || {},
  };
};

export const saveRecord = async (req, res) => {
  try {
    const payload = buildRecordPayload(req.body);

    if (!payload.patientId || !payload.appointmentId) {
      return res.status(400).json({
        message: "patientId and appointmentId are required",
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
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Get records by patient
export const getPatientRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await Record.find({ patientId }).sort({
      updatedAt: -1,
    });

    return res.json(records);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
