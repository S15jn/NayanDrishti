import express from "express";
import rateLimit from "express-rate-limit";
import { login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, login);
router.get("/me", authMiddleware, getMe);

export default router;