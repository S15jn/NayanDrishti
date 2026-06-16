import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { staffId, email, password, role } = req.body;

    if (!staffId || !email || !password || !role) {
      return res.status(400).json({
        message: "Staff ID, email, password and role are required",
      });
    }

    const user = await User.findOne({
      staffId: staffId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Invalid role" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        staffId: user.staffId,
        role: user.role,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "8h" },
    );

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
    return res.status(500).json({ message: err.message });
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
