import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Counter from "../models/Counter.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";
import User from "../models/User.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const CONSULTATION_AMOUNT = 500;

const normalizeMobile = (mobile = "") =>
  String(mobile).replace(/\D/g, "").slice(-10);

const normalizeEmail = (email = "") => String(email).trim().toLowerCase();

const normalizeText = (value = "") => String(value).trim();

const normalizeGender = (gender = "") => {
  const value = normalizeText(gender).toLowerCase();

  if (value === "male") return "Male";
  if (value === "female") return "Female";
  if (value === "others" || value === "other") return "Others";

  return normalizeText(gender);
};

const normalizeTime = (time = "") => normalizeText(time);

const validatePatientInput = ({
  name,
  mobile,
  email,
  age,
  gender,
  date,
  time,
  specialization,
}) => {
  const cleanName = normalizeText(name);
  const cleanMobile = normalizeMobile(mobile);
  const cleanEmail = normalizeEmail(email);
  const cleanGender = normalizeGender(gender);
  const cleanTime = normalizeTime(time);
  const cleanSpecialization = normalizeText(specialization || "Eye");
  const cleanAge = Number(age);

  if (
    !cleanName ||
    !cleanMobile ||
    age === "" ||
    !cleanGender ||
    !date ||
    !cleanTime
  ) {
    return "Required fields missing";
  }

  if (!mobileRegex.test(cleanMobile)) {
    return "Please enter a valid Indian mobile number";
  }

  if (cleanEmail && !emailRegex.test(cleanEmail)) {
    return "Please enter a valid email address";
  }

  if (!["Male", "Female", "Others"].includes(cleanGender)) {
    return "Invalid gender";
  }

  if (!Number.isFinite(cleanAge) || cleanAge < 0 || cleanAge > 130) {
    return "Invalid age";
  }

  if (!timeRegex.test(cleanTime)) {
    return "Invalid appointment time";
  }

  if (!cleanSpecialization) {
    return "Specialization is required";
  }

  const selectedDate = new Date(date);
  if (Number.isNaN(selectedDate.getTime())) {
    return "Invalid appointment date";
  }

  return "";
};

const getCouponDiscount = (couponCode = "") => {
  const code = normalizeText(couponCode).toUpperCase();

  const coupons = {
    EYE50: 50,
    FREE100: 100,
  };

  return coupons[code] || 0;
};

const buildPayment = ({
  paymentMode,
  couponCode,
  customDiscount = 0,
  allowManualDiscount = false,
}) => {
  const cleanMode = normalizeText(paymentMode || "CASH").toUpperCase();
  const allowedModes = ["CASH", "ONLINE", "UPI", "CARD"];

  if (!allowedModes.includes(cleanMode)) {
    return {
      error: "Invalid payment mode",
    };
  }

  const couponDiscount = getCouponDiscount(couponCode);
  const manualDiscount = allowManualDiscount ? Number(customDiscount || 0) : 0;

  if (!Number.isFinite(manualDiscount) || manualDiscount < 0) {
    return {
      error: "Invalid manual discount",
    };
  }

  const discount = Math.min(
    Math.max(couponDiscount + manualDiscount, 0),
    CONSULTATION_AMOUNT,
  );

  const finalAmount = Math.max(CONSULTATION_AMOUNT - discount, 0);

  return {
    amount: CONSULTATION_AMOUNT,
    discount,
    finalAmount,
    paymentMode: cleanMode,
    paymentStatus: cleanMode === "CASH" ? "Unpaid" : "Paid",
    couponCode: normalizeText(couponCode).toUpperCase(),
  };
};

const getSelectedDate = (date) => {
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate;
};

const getNextToken = async (date, scope = "global") => {
  const key = new Date(date).toISOString().split("T")[0];

  const counter = await Counter.findOneAndUpdate(
    { date: key, scope },
    { $inc: { sequence: 1 } },
    {
      returnDocument: "after",
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  return counter.sequence;
};

const upsertPatient = async ({ name, mobile, email, age, gender }) => {
  const cleanMobile = normalizeMobile(mobile);
  const cleanEmail = normalizeEmail(email);

  return Patient.findOneAndUpdate(
    { mobile: cleanMobile },
    {
      $set: {
        name: normalizeText(name),
        mobile: cleanMobile,
        email: cleanEmail,
        age: Number(age),
        gender,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );
};

const sendBookingMessages = async ({
  name,
  mobile,
  email,
  selectedDate,
  time,
  token,
  paymentStatus,
  finalAmount,
}) => {
  const formattedDate = selectedDate.toLocaleDateString("en-IN");

  if (email) {
    sendEmail(
      email,
      "Appointment Confirmed",
      `Hello ${name},

Your appointment is confirmed.

Date: ${formattedDate}
Time: ${time}
Token: ${token}

Payment: ${paymentStatus}
Amount: Rs ${finalAmount}

- Nayan Drishti Clinic`,
    ).catch((err) => console.log("Email failed:", err.message));
  }

  sendWhatsApp({
    to: mobile,
    name,
    date: formattedDate,
    time,
    token,
  }).catch((err) => console.log("WhatsApp failed:", err.message));
};
const resolveDoctorId = async (doctorId, specialization) => {
  // If doctorId is already provided, use it
  if (doctorId) {
    return doctorId;
  }

  // Otherwise automatically find active doctor
  const doctor = await User.findOne({
    role: "doctor",
    isActive: true,
    specialization: {
      $regex: `^${String(specialization || "Eye").trim()}$`,
      $options: "i",
    },
  }).select("_id");

  if (!doctor) {
    throw new Error("No active doctor found for this specialization");
  }

  return doctor._id;
};

const createAppointment = async ({
  body,
  bookedBy,
  allowManualDiscount = false,
  requireSlotRule,
}) => {
  const validationError = validatePatientInput(body);
  if (validationError) {
    return { error: validationError, status: 400 };
  }

  const cleanMobile = normalizeMobile(body.mobile);
  const cleanEmail = normalizeEmail(body.email);
  const cleanTime = normalizeTime(body.time);
  const cleanGender = normalizeGender(body.gender);
  const cleanSpecialization = normalizeText(body.specialization || "Eye");
  const selectedDate = getSelectedDate(body.date);

  const resolvedDoctorId = await resolveDoctorId(
    body.doctorId,
    cleanSpecialization,
  );

  const minute = Number(cleanTime.split(":")[1]);
  const slotAllowed = requireSlotRule(minute);

  if (!slotAllowed.ok) {
    return { error: slotAllowed.message, status: 400 };
  }

  const patient = await upsertPatient({
    name: body.name,
    mobile: cleanMobile,
    email: cleanEmail,
    age: body.age,
    gender: cleanGender,
  });

  const existing = await Appointment.findOne({
    date: selectedDate,
    time: cleanTime,
    doctorId: resolvedDoctorId,
    status: { $ne: "Cancelled" },
  });

  if (existing) {
    return { error: "Slot already booked", status: 409 };
  }

  const payment = buildPayment({
    paymentMode: body.paymentMode,
    couponCode: body.couponCode,
    customDiscount: body.customDiscount,
    allowManualDiscount,
  });

  if (payment.error) {
    return { error: payment.error, status: 400 };
  }

  const token = await getNextToken(selectedDate, String(resolvedDoctorId));
  const appointment = await Appointment.create({
    patientId: patient._id,
    doctorId: resolvedDoctorId,
    date: selectedDate,
    time: cleanTime,
    specialization: cleanSpecialization,
    token,
    bookedBy,
    notes: normalizeText(body.notes || ""),
    ...payment,
  });

  await sendBookingMessages({
    name: patient.name,
    mobile: cleanMobile,
    email: cleanEmail,
    selectedDate,
    time: cleanTime,
    token,
    paymentStatus: appointment.paymentStatus,
    finalAmount: appointment.finalAmount,
  });

  return { appointment };
};

export const bookAppointment = async (req, res) => {
  try {
    const result = await createAppointment({
      body: req.body,
      bookedBy: "USER",
      requireSlotRule: (minute) => ({
        ok: minute % 10 === 5,
        message: "Users can only book slots ending with 05, 15, 25, 35, 45, 55",
      }),
    });

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: result.appointment,
    });
  } catch (err) {
    console.error("BOOK ERROR:", err);

    if (err.code === 11000) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    return res.status(500).json({ message: "Appointment booking failed" });
  }
};

export const receptionBookAppointment = async (req, res) => {
  try {
    const result = await createAppointment({
      body: req.body,
      bookedBy: "RECEPTION",
      allowManualDiscount: true,
      requireSlotRule: (minute) => ({
        ok: minute % 10 === 0,
        message:
          "Reception can only book slots ending with 00, 10, 20, 30, 40, 50",
      }),
    });

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: result.appointment,
    });
  } catch (err) {
    console.error("RECEPTION BOOK ERROR:", err);

    if (err.code === 11000) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    return res.status(500).json({ message: "Appointment booking failed" });
  }
};

export const getTodayAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const query = {
      date: { $gte: today, $lt: tomorrow },
    };

    if (req.user?.role === "doctor") {
      query.doctorId = req.user._id;
    }

    const data = await Appointment.find(query)
      .populate("patientId", "name mobile age gender email")
      .populate("doctorId", "name role specialization")
      .sort({ token: 1 })
      .lean();

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch appointments" });
  }
};

export const getTodayPatientCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const query = {
      date: { $gte: today, $lt: tomorrow },
    };

    if (req.user?.role === "doctor") {
      query.doctorId = req.user._id;
    }

    const count = await Appointment.countDocuments(query);

    return res.json({ totalPatients: count });
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch patient count" });
  }
};

export const searchPatient = async (req, res) => {
  try {
    const query = normalizeText(req.query.query || "");

    if (query.length < 2) {
      return res.json([]);
    }

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const patients = await Patient.find({
      $or: [
        { name: { $regex: escaped, $options: "i" } },
        { mobile: { $regex: escaped, $options: "i" } },
      ],
    })
      .limit(20)
      .select("name mobile age gender email")
      .lean();

    return res.json(patients);
  } catch (err) {
    return res.status(500).json({ message: "Patient search failed" });
  }
};

export const getNextPatient = async (req, res) => {
  try {
    const query = {
      status: "Pending",
    };

    if (req.user?.role === "doctor") {
      query.doctorId = req.user._id;
    }

    const next = await Appointment.findOne(query)
      .populate("patientId", "name mobile age gender email")
      .sort({ date: 1, token: 1 })
      .lean();

    return res.json(next);
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch next patient" });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "Completed";
    appointment.visited = true;

    await appointment.save();

    return res.json({ message: "Completed" });
  } catch (err) {
    return res.status(500).json({ message: "Unable to complete appointment" });
  }
};
