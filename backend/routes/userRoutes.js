import express from "express";
import {
  addUser,
  getUsers,
  updateUserStatus,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, roleMiddleware(["admin"]), addUser);
router.get("/", authMiddleware, roleMiddleware(["admin"]), getUsers);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateUserStatus,
);

export default router;
