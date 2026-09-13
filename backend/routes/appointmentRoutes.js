import express from "express";
import rateLimit from "express-rate-limit";

import {
  bookAppointment,
  receptionBookAppointment,
  searchPatient,
  getTodayAppointments,
  getTodayPatientCount,
  getNextPatient,
  completeAppointment,
} from "../controllers/appointmentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

const publicBookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many booking attempts. Please try again later.",
  },
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many search requests. Please slow down.",
  },
});

router.post("/book", publicBookingLimiter, bookAppointment);

router.post(
  "/reception-book",
  authMiddleware,
  roleMiddleware(["admin", "receptionist"]),
  receptionBookAppointment,
);

router.get(
  "/today",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "receptionist"]),
  getTodayAppointments,
);

router.get(
  "/today-count",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "receptionist"]),
  getTodayPatientCount,
);

router.get(
  "/search",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "receptionist"]),
  searchLimiter,
  searchPatient,
);

router.get(
  "/next",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "receptionist"]),
  getNextPatient,
);

router.put(
  "/complete/:id",
  authMiddleware,
  roleMiddleware(["admin", "doctor"]),
  completeAppointment,
);

export default router;