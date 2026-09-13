import express from "express";
import rateLimit from "express-rate-limit";

import {
  addUser,
  getUsers,
  updateUserStatus,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

const adminWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many admin update requests. Please try again later.",
  },
});

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.post("/add", adminWriteLimiter, addUser);
router.get("/", getUsers);
router.patch("/:id/status", adminWriteLimiter, updateUserStatus);

export default router;