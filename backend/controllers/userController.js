import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// ADD USER 
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    });

    res.json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success",
      token,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
