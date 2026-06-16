import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Counter from "../models/Counter.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";

/* =====================================================
   USER BOOK APPOINTMENT
===================================================== */
export const bookAppointment = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      age,
      gender,
      date,
      time,
      specialization,

      paymentMode,
      couponCode,
    } = req.body;

    /* =========================
       REQUIRED VALIDATION
    ========================= */
    if (
      !name ||
      !mobile ||
      !age ||
      !gender ||
      !date ||
      !time ||
      !specialization
    ) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    /* =========================
       USER BOOKING RULE
       USER can only book odd slots
       Example:
       10:05
       10:15
       10:25
    ========================= */

    const minute = Number(time.split(":")[1]);

    if (minute % 10 !== 5) {
      return res.status(400).json({
        message:
          "Users can only book slots ending with 05, 15, 25, 35, 45, 55",
      });
    }

    /* =========================
       FIND OR CREATE PATIENT
    ========================= */
    let patient = await Patient.findOne({ mobile });

    if (!patient) {
      patient = await Patient.create({
        name,
        mobile,
        email: email || "",
        age,
        gender,
      });
    } else {
      patient.name = name;
      patient.email = email || patient.email;
      patient.age = age;
      patient.gender = gender;

      await patient.save();
    }

    /* =========================
       DATE FORMAT
    ========================= */
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    /* =========================
       SLOT CHECK
    ========================= */
    const existing = await Appointment.findOne({
      date: selectedDate,
      time,
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    /* =========================
       TOKEN
    ========================= */
    const token = await getNextToken(selectedDate);

    /* =========================
       PAYMENT LOGIC
    ========================= */

    let amount = 500;
    let discount = 0;

    /* COUPON SYSTEM */
    if (couponCode === "EYE50") {
      discount = 50;
    }

    if (couponCode === "FREE100") {
      discount = 100;
    }

    const finalAmount = amount - discount;

    /* =========================
       CREATE APPOINTMENT
    ========================= */
    const appointment = await Appointment.create({
      patientId: patient._id,

      date: selectedDate,
      time,

      specialization,
      token,

      bookedBy: "USER",

      paymentMode: paymentMode || "ONLINE",

      paymentStatus:
        paymentMode === "CASH" ? "Unpaid" : "Paid",

      amount,
      discount,
      couponCode: couponCode || "",
      finalAmount,
    });

    const formattedDate =
      selectedDate.toLocaleDateString("en-IN");

    /* =========================
       EMAIL
    ========================= */
    if (email) {
      sendEmail(
        email,
        "Appointment Confirmed",
        `Hello ${name},

Your appointment is confirmed.

Date: ${formattedDate}
Time: ${time}
Token: ${token}

Payment: ${appointment.paymentStatus}
Amount: ₹${finalAmount}

– Nayan Drishti Clinic`,
      ).catch((err) =>
        console.log("Email failed:", err.message),
      );
    }

    /* =========================
       WHATSAPP
    ========================= */
    sendWhatsApp({
      to: mobile,
      name,
      date: formattedDate,
      time,
      token,
    }).catch((err) =>
      console.log("WhatsApp failed:", err.message),
    );

    /* ========================= */

    res.json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    console.error("BOOK ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   RECEPTION BOOK APPOINTMENT
===================================================== */
export const receptionBookAppointment = async (
  req,
  res,
) => {
  try {
    const {
      name,
      mobile,
      email,
      age,
      gender,
      date,
      time,
      specialization,

      paymentMode,
      couponCode,
      customDiscount,
    } = req.body;

    if (
      !name ||
      !mobile ||
      !age ||
      !gender ||
      !date ||
      !time ||
      !specialization
    ) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    /* =========================
       RECEPTION RULE
       ONLY EVEN SLOT
       Example:
       10:00
       10:10
       10:20
    ========================= */

    const minute = Number(time.split(":")[1]);

    if (minute % 10 !== 0) {
      return res.status(400).json({
        message:
          "Reception can only book slots ending with 00, 10, 20, 30, 40, 50",
      });
    }

    let patient = await Patient.findOne({ mobile });

    if (!patient) {
      patient = await Patient.create({
        name,
        mobile,
        email: email || "",
        age,
        gender,
      });
    } else {
      patient.name = name;
      patient.email = email || patient.email;
      patient.age = age;
      patient.gender = gender;

      await patient.save();
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

    /* =========================
       PAYMENT
    ========================= */

    let amount = 500;
    let discount = 0;

    /* PREDEFINED COUPONS */
    if (couponCode === "EYE50") {
      discount = 50;
    }

    if (couponCode === "FREE100") {
      discount = 100;
    }

    /* MANUAL DISCOUNT */
    if (customDiscount) {
      discount += Number(customDiscount);
    }

    const finalAmount = Math.max(amount - discount, 0);

    const appointment = await Appointment.create({
      patientId: patient._id,

      date: selectedDate,
      time,

      specialization,

      token,

      bookedBy: "RECEPTION",

      paymentMode: paymentMode || "CASH",

      paymentStatus:
        paymentMode === "CASH"
          ? "Unpaid"
          : "Paid",

      amount,
      discount,
      couponCode: couponCode || "",
      finalAmount,
    });

    res.json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    console.error("RECEPTION BOOK ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   TODAY APPOINTMENTS
===================================================== */
export const getTodayAppointments = async (
  req,
  res,
) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const data = await Appointment.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate("patientId")
      .sort({ token: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   TODAY PATIENT COUNT
===================================================== */
export const getTodayPatientCount = async (
  req,
  res,
) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const count =
      await Appointment.countDocuments({
        date: { $gte: today },
      });

    res.json({
      totalPatients: count,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   SEARCH PATIENT
===================================================== */
export const searchPatient = async (
  req,
  res,
) => {
  try {
    const { query } = req.query;

    const patients = await Patient.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json(patients);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   NEXT PATIENT
===================================================== */
export const getNextPatient = async (
  req,
  res,
) => {
  try {
    const next = await Appointment.findOne({
      status: "Pending",
    })
      .populate("patientId")
      .sort({ token: 1 });

    res.json(next);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =====================================================
   TOKEN GENERATOR
===================================================== */
const getNextToken = async (date) => {
  const key = new Date(date)
    .toISOString()
    .split("T")[0];

 const counter = await Counter.findOneAndUpdate(
  { date: key },
  { $inc: { sequence: 1 } },
  {
    returnDocument: "after",
    upsert: true,
  },
);
};

/* =====================================================
   COMPLETE APPOINTMENT
===================================================== */
export const completeAppointment = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const appt =
      await Appointment.findById(id);

    if (!appt) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    appt.status = "Completed";

    appt.visited = true;

    await appt.save();

    res.json({
      message: "Completed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};