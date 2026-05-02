import express from "express";
import {
  saveRecord,
  getPatientRecords,
} from "../controllers/recordController.js";

const router = express.Router();

router.post("/save", saveRecord);
router.get("/:patientId", getPatientRecords);

export default router;
