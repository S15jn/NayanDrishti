import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    gender: "",
    date: "",
    time: "",
    specialization: "",

    paymentMode: "ONLINE",
    couponCode: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [finalAmount, setFinalAmount] = useState(500);

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    /* =========================
       COUPON CALCULATION
    ========================= */
    let amount = 500;

    if (updatedForm.couponCode === "EYE50") {
      amount -= 50;
    }

    if (updatedForm.couponCode === "FREE100") {
      amount -= 100;
    }

    setFinalAmount(amount);
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const minute = Number(form.time.split(":")[1]);

      if (Number.isNaN(minute) || minute % 10 !== 5) {
        return alert(
          "Please select a valid user slot ending with 05, 15, 25, 35, 45, or 55",
        );
      }

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          ...form,
          bookedBy: "USER",
        },
      );

      setSuccess("Appointment booked successfully!");

      setForm({
        name: "",
        mobile: "",
        email: "",
        age: "",
        gender: "",
        date: "",
        time: "",
        specialization: "",

        paymentMode: "ONLINE",
        couponCode: "",
      });

      setFinalAmount(500);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Booking failed. Please check backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm text-center">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* MOBILE */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* EMAIL OPTIONAL */}
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={form.email}
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          {/* AGE */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* GENDER */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Others">
              Others
            </option>
          </select>

          {/* SPECIALIZATION */}
          <select
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              Select Department
            </option>

            <option value="Eye">
              Eye Testing
            </option>
          </select>

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* TIME */}
          <input
            type="time"
            name="time"
            value={form.time}
            min="00:05"
            step="600"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* SLOT INFO */}
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            User booking allowed only on:
            <br />
            05, 15, 25, 35, 45, 55 minutes
          </div>

          {/* PAYMENT MODE */}
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="ONLINE">
              Online Payment
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="CARD">
              Card
            </option>
          </select>

          {/* COUPON */}
          <input
            type="text"
            name="couponCode"
            placeholder="Coupon Code"
            value={form.couponCode}
            className="w-full border p-2 rounded uppercase"
            onChange={handleChange}
          />

          {/* BILL SUMMARY */}
          <div className="border rounded p-3 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span>Consultation Fee</span>
              <span>₹500</span>
            </div>

            {form.couponCode === "EYE50" && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹50</span>
              </div>
            )}

            {form.couponCode === "FREE100" && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹100</span>
              </div>
            )}

            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
          >
            {loading
              ? "Booking..."
              : `Pay ₹${finalAmount} & Confirm`}
          </button>
        </form>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="mt-3 text-sm text-gray-500 hover:underline w-full text-center"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Appointment;
