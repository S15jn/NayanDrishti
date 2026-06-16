import express from "express";

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

/* =========================
   PUBLIC USER BOOKING
========================= */
router.post("/book", bookAppointment);

/* =========================
   RECEPTION BOOKING
========================= */
router.post(
  "/reception-book",
  authMiddleware,
  roleMiddleware(["admin", "receptionist"]),
  receptionBookAppointment,
);

/* =========================
   PROTECTED ROUTES
========================= */

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
  searchPatient,
);

router.get(
  "/next",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "receptionist"]),
  getNextPatient,
);

/* =========================
   COMPLETE APPOINTMENT
========================= */
router.put(
  "/complete/:id",
  authMiddleware,
  roleMiddleware(["admin", "doctor"]),
  completeAppointment,
);

export default router;