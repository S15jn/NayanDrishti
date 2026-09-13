import User from "../models/User.js";
import bcrypt from "bcryptjs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["admin", "doctor", "receptionist"];

const normalizeEmail = (email = "") => String(email).trim().toLowerCase();
const normalizeStaffId = (staffId = "") => String(staffId).trim().toUpperCase();
const normalizeRole = (role = "") => String(role).trim().toLowerCase();

const isStrongPassword = (password = "") =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password);

export const addUser = async (req, res) => {
  try {
    const { staffId, name, email, password, role, specialization } = req.body;

    if (!staffId || !name || !email || !password || !role) {
      return res.status(400).json({
        message: "Staff ID, name, email, password and role are required",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedStaffId = normalizeStaffId(staffId);
    const normalizedRole = normalizeRole(role);

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    if (!roles.includes(normalizedRole)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase and number",
      });
    }

    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { staffId: normalizedStaffId }],
    });

    if (existing) {
      return res.status(400).json({
        message:
          existing.email === normalizedEmail
            ? "Email already exists"
            : "Staff ID already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      staffId: normalizedStaffId,
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,
      specialization: String(specialization || "").trim(),
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json({
      message: "User created successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error("ADD USER ERROR:", err);
    return res.status(500).json({ message: "User creation failed" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -failedLoginAttempts -lockUntil")
      .sort({ createdAt: -1 })
      .lean();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch users" });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (req.user._id.toString() === id && isActive === false) {
      return res.status(400).json({
        message: "You cannot disable your own account",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: Boolean(isActive) },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password -failedLoginAttempts -lockUntil");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User updated",
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: "User update failed" });
  }
};