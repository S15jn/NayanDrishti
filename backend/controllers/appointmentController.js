import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Counter from "../models/Counter.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";
export const bookAppointment = async (req, res) => {
  try {
    const { name, mobile, email, date, time, specialization } = req.body;

    if (!name || !mobile || !email || !date || !time || !specialization) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let patient = await Patient.findOne({ mobile });

    if (!patient) {
      patient = await Patient.create({ name, mobile, email });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const existing = await Appointment.findOne({
      date: selectedDate,
      time,
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }
    const token = await getNextToken(selectedDate);

    const appointment = await Appointment.create({
      patientId: patient._id,
      date: selectedDate,
      time,
      specialization,
      token,
      bookedBy: "USER",
    });

    const formattedDate = selectedDate.toLocaleDateString("en-IN");

  
    sendEmail(
      email,
      "Appointment Confirmed",
      `Hello ${name},

Your appointment is confirmed.
 ${formattedDate}
${time}
Token: ${token}

– Nayan Drishti Clinic`,
    ).catch((err) => console.log("Email failed:", err.message));

    sendWhatsApp({
      to: mobile,
      name,
      date: formattedDate,
      time,
      token,
    }).catch((err) => console.log("WhatsApp failed:", err.message));

    /* ========================= */

    res.json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    console.error("BOOK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getTodayAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const data = await Appointment.find({
      date: { $gte: today, $lt: tomorrow },
    })
      .populate("patientId")
      .sort({ token: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========================= */
export const getTodayPatientCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await Appointment.countDocuments({
      date: { $gte: today },
    });

    res.json({ totalPatients: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========================= */
export const searchPatient = async (req, res) => {
  try {
    const { query } = req.query;

    const patients = await Patient.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { mobile: { $regex: query, $options: "i" } },
      ],
    });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========================= */
export const getNextPatient = async (req, res) => {
  try {
    const next = await Appointment.findOne({
      status: "Pending",
    })
      .populate("patientId")
      .sort({ token: 1 });

    res.json(next);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========================= */
export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appt = await Appointment.findById(id);

    if (!appt) {
      return res.status(404).json({ message: "Not found" });
    }

    appt.status = "Completed";
    appt.visited = true;

    await appt.save();

    res.json({ message: "Completed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========================= */
const getNextToken = async (date) => {
  const key = new Date(date).toISOString().split("T")[0];

  const counter = await Counter.findOneAndUpdate(
    { date: key },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true },
  );

  return counter.sequence;
};
