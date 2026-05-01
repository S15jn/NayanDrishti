import { useState, useEffect } from "react";
import API from "../services/api";

function ReceptionDashboard() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    age: "",
    email: "",
    date: "",
    specialization: "Eye",
  });

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
const total = patients.length;

const paid = patients.filter(p => p.paymentStatus === "Paid").length;
const unpaid = total - paid;
  const loadToday = async () => {
    try {
      setLoading(true);
      const res = await API.get("/appointments/today");
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToday();
  }, []);

  const handleBook = async () => {
    try {
      if (!form.name || !form.mobile || !form.date) {
        return alert("Please fill required fields");
      }

      await API.post("/appointments/book", form);

      setForm({
        name: "",
        mobile: "",
        age: "",
        email: "",
        date: "",
        specialization: "Eye",
      });

      loadToday();
    } catch {
      alert("Error booking appointment");
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim() === "") {
        loadToday();
      } else {
        handleSearch();
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/appointments/search?query=${search.trim()}`
      );
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async (id) => {
    try {
      await API.put(`/appointments/payment/${id}`);
      loadToday();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT PANEL */}
      <div className="w-1/3 bg-white p-5 shadow space-y-4">
        <h2 className="text-xl font-bold">Reception Panel</h2>

        {/* FORM */}
        <div className="space-y-2">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="date"
            className="input"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
<select
  className="input"
  value={form.time}
  onChange={(e) => setForm({ ...form, time: e.target.value })}
>
  <option value="">Select Time</option>
  <option>10:00 AM</option>
  <option>10:30 AM</option>
  <option>11:00 AM</option>
  <option>11:30 AM</option>
</select>
          <button
            onClick={handleBook}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Book Appointment
          </button>
        </div>

        {/* SEARCH */}
        <div>
          <h3 className="font-semibold mb-2">Search Patient</h3>

          <input
            className="input"
            placeholder="Name or Mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-2/3 p-5 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>

        {loading ? (
          <p>Loading...</p>
        ) : patients.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          patients.map((item) => {
            const patient = item.patientId || item;

            return (
              <div
                key={item._id || item.mobile}
                className="bg-white p-4 mb-3 rounded shadow"
              >
                <h3 className="font-semibold text-lg">
                  {patient.name || "No Name"}
                </h3>

                <p>{patient.mobile}</p>
                <p>Age: {patient.age || "N/A"}</p>

                {item._id && (
                  <div className="mt-2 flex justify-between items-center">
                    <span>
                      Status: {item.paymentStatus || "Unpaid"}
                    </span>

                    <button
                      onClick={() => handlePayment(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Mark Paid
                    </button>
                  </div>
                )}
                
              </div>
            );
          })
        )}
        <div className="grid grid-cols-3 gap-3 mb-4">
  <div className="bg-white p-3 rounded shadow text-center">
    <p className="text-sm text-gray-500">Total</p>
    <p className="text-xl font-bold">{total}</p>
  </div>

  <div className="bg-green-100 p-3 rounded text-center">
    <p className="text-sm">Paid</p>
    <p className="text-xl font-bold">{paid}</p>
  </div>

  <div className="bg-red-100 p-3 rounded text-center">
    <p className="text-sm">Unpaid</p>
    <p className="text-xl font-bold">{unpaid}</p>
  </div>
</div>
      </div>
    </div>
  );
}

export default ReceptionDashboard;