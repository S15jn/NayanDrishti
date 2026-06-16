import User from "../models/User.js";
import bcrypt from "bcryptjs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["admin", "doctor", "receptionist"];

export const addUser = async (req, res) => {
  try {
    const { staffId, name, email, password, role } = req.body;

    if (!staffId || !name || !email || !password || !role) {
      return res.status(400).json({
        message: "Staff ID, name, email, password and role are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    if (!roles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedStaffId = staffId.trim().toUpperCase();

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      staffId: normalizedStaffId,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.json({
      message: "User created successfully",
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (req.user._id.toString() === id && isActive === false) {
      return res.status(400).json({
        message: "You cannot disable your own admin account",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: Boolean(isActive) },
      { returnDocument: "after" },
    ).select("-password");

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
    return res.status(500).json({ message: err.message });
  }
};
