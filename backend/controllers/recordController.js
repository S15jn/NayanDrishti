import Record from "../models/Record.js";

export const saveRecord = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const record = await Record.findOneAndUpdate(
      { appointmentId },
      req.body,
      { new: true, upsert: true }
    );

    res.json({ message: "Saved", record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get records by patient
export const getPatientRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await Record.find({ patientId })
      .sort({ createdAt: -1 });

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


