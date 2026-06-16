import express from "express";

import {
  saveRecord,
  getPatientRecords,
} from "../controllers/recordController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin", "doctor"]));

router.post("/save", saveRecord);
router.get("/:patientId", getPatientRecords);

export default router;
