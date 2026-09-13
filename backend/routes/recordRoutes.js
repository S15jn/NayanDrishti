import express from "express";

import {
  saveRecord,
  getPatientRecords,
} from "../controllers/recordController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/save",
  roleMiddleware(["admin", "doctor"]),
  saveRecord,
);

router.get(
  "/:patientId",
  roleMiddleware(["admin", "doctor", "receptionist"]),
  getPatientRecords,
);

export default router;