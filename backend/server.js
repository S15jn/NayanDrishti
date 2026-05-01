import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/appointments", appointmentRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/nayan-drishti")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
