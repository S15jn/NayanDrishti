import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    specialization: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/appointments/book", 
        {
          ...form,
          bookedBy: "USER"
        }
      );

      setSuccess("Appointment booked successfully!");

      setForm({
        name: "",
        mobile: "",
        email: "",
        date: "",
        time: "",
        specialization: ""
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Booking failed");
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

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value })
            }
            required
          />

          {/* EMAIL (NOW COMPULSORY) */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* SPECIALIZATION */}
          <select
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="Eye">Eye</option>
            <option value="General">General</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            value={form.date}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            required
          />

          {/* TIME */}
          <input
            type="time"
            value={form.time}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            required
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
          >
            {loading ? "Booking..." : "Confirm Appointment"}
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