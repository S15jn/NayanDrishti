import express from "express";

import {
  bookAppointment,
  searchPatient,
  getTodayAppointments,
  getTodayPatientCount,
  getNextPatient,
  completeAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();
router.post("/book", bookAppointment); // public
router.get("/today", getTodayAppointments);
router.get("/today-count", getTodayPatientCount);
router.get("/search", searchPatient);
router.get("/next", getNextPatient);
router.put("/complete/:id", completeAppointment);

export default router;
