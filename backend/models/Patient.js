import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  age: Number,
  email: String,
});

export default mongoose.model("Patient", patientSchema);