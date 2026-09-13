import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;

const normalizeEmail = (email = "") => String(email).trim().toLowerCase();
const normalizeStaffId = (staffId = "") => String(staffId).trim().toUpperCase();
const normalizeRole = (role = "") => String(role).trim().toLowerCase();
const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      staffId: user.staffId,
      role: user.role,
    },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "8h" },
  );
};

export const login = async (req, res) => {
  try {
    const { staffId, email, password, role } = req.body;
    const requestedRole = normalizeRole(role);

    if (!staffId || !email || !password || !role) {
      return res.status(400).json({
        message: "Staff ID, email, password and role are required",
      });
    }

    const normalizedStaffId = normalizeStaffId(staffId);
    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({
      staffId: {
        $regex: `^\\s*${escapeRegex(normalizedStaffId)}\\s*$`,
        $options: "i",
      },
      email: {
        $regex: `^\\s*${escapeRegex(normalizedEmail)}\\s*$`,
        $options: "i",
      },
    }).select("+password +failedLoginAttempts +lockUntil");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(423).json({
        message: "Account temporarily locked. Try again later.",
      });
    }

    if (normalizeRole(user.role) !== requestedRole) {
      return res.status(403).json({ message: "Invalid role" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    const isHashedPassword = String(user.password || "").startsWith("$2");
    const isMatch = isHashedPassword
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
      }

      await user.save();

      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    user.lastLoginAt = new Date();

    if (!isHashedPassword) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        staffId: user.staffId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const getMe = async (req, res) => {
  return res.json({
    user: {
      id: req.user._id,
      staffId: req.user.staffId,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive,
    },
  });
};