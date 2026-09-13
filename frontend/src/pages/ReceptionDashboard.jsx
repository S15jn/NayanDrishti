import { useState, useEffect } from "react";
import API from "../services/api";

function ReceptionDashboard() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    age: "",
    gender: "",
    email: "",
    date: "",
    time: "",

    specialization: "Eye",

    paymentMode: "CASH",

    couponCode: "",

    customDiscount: "",
  });

  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================
     STATS
  ========================= */

  const todayTotal = patients.length;

  const paidPatients =
    patients.filter(
      (p) => p.paymentStatus === "Paid",
    ).length;

  const unpaidPatients =
    todayTotal - paidPatients;

  const totalRevenue = patients.reduce(
    (acc, item) =>
      acc + (item.finalAmount || 0),
    0,
  );

  const currentMonth = new Date().getMonth();

  const monthlyPatients =
    patients.filter((p) => {
      const d = new Date(p.date);

      return (
        d.getMonth() === currentMonth
      );
    }).length;

  /* =========================
     BILL CALCULATION
  ========================= */

  let finalAmount = 500;

  if (form.couponCode === "EYE50") {
    finalAmount -= 50;
  }

  if (form.couponCode === "FREE100") {
    finalAmount -= 100;
  }

  if (form.customDiscount) {
    finalAmount -= Number(
      form.customDiscount,
    );
  }

  if (finalAmount < 0) {
    finalAmount = 0;
  }

  /* =========================
     LOAD TODAY APPOINTMENTS
  ========================= */

  const loadToday = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/appointments/today",
      );

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

  /* =========================
     BOOK APPOINTMENT
  ========================= */

  const handleBook = async () => {
    try {
      if (
        !form.name ||
        !form.mobile ||
        !form.age ||
        !form.gender ||
        !form.date ||
        !form.time
      ) {
        return alert(
          "Please fill required fields",
        );
      }

      const minute = Number(form.time.split(":")[1]);

      if (Number.isNaN(minute) || minute % 10 !== 0) {
        return alert(
          "Please select a valid reception slot ending with 00, 10, 20, 30, 40, or 50",
        );
      }

      await API.post(
        "/appointments/reception-book",
        form,
      );

      alert(
        "Appointment booked successfully",
      );

      setForm({
        name: "",
        mobile: "",
        age: "",
        gender: "",
        email: "",
        date: "",
        time: "",

        specialization: "Eye",

        paymentMode: "CASH",

        couponCode: "",

        customDiscount: "",
      });

      loadToday();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Booking failed. Please check backend server is running.",
      );
    }
  };

  /* =========================
     SEARCH
  ========================= */

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
        `/appointments/search?query=${search.trim()}`,
      );

      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* =========================
          LEFT PANEL
      ========================= */}

      <div className="w-1/3 bg-white p-5 shadow space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold">
          Reception Panel
        </h2>

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-100 p-3 rounded text-center">
            <p className="text-sm">
              Today Patients
            </p>

            <p className="text-xl font-bold">
              {todayTotal}
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded text-center">
            <p className="text-sm">
              Monthly Patients
            </p>

            <p className="text-xl font-bold">
              {monthlyPatients}
            </p>
          </div>

          <div className="bg-green-100 p-3 rounded text-center">
            <p className="text-sm">
              Paid
            </p>

            <p className="text-xl font-bold">
              {paidPatients}
            </p>
          </div>

          <div className="bg-red-100 p-3 rounded text-center">
            <p className="text-sm">
              Unpaid
            </p>

            <p className="text-xl font-bold">
              {unpaidPatients}
            </p>
          </div>
        </div>

        {/* =========================
            REVENUE
        ========================= */}

        <div className="bg-yellow-100 p-3 rounded text-center">
          <p className="text-sm">
            Today's Revenue
          </p>

          <p className="text-2xl font-bold">
            ₹{totalRevenue}
          </p>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <div className="space-y-2">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="input"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile: e.target.value,
              })
            }
          />

          <input
            className="input"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value,
              })
            }
          />

          {/* GENDER */}

          <select
            className="input"
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value,
              })
            }
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

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="input"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          {/* TIME */}

          <input
            type="time"
            className="input"
            value={form.time}
            min="00:00"
            step="600"
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
          />

          {/* SLOT INFO */}

          <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
            Reception booking allowed
            only on:
            <br />
            00, 10, 20, 30, 40, 50
            minutes
          </div>

          {/* PAYMENT MODE */}

          <select
            className="input"
            value={form.paymentMode}
            onChange={(e) =>
              setForm({
                ...form,
                paymentMode:
                  e.target.value,
              })
            }
          >
            <option value="CASH">
              Cash
            </option>

            <option value="ONLINE">
              Online
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
            className="input"
            placeholder="Coupon Code"
            value={form.couponCode}
            onChange={(e) =>
              setForm({
                ...form,
                couponCode:
                  e.target.value.toUpperCase(),
              })
            }
          />

          {/* DISCOUNT */}

          <input
            className="input"
            placeholder="Manual Discount"
            value={form.customDiscount}
            onChange={(e) =>
              setForm({
                ...form,
                customDiscount:
                  e.target.value,
              })
            }
          />

          {/* BILL */}

          <div className="bg-gray-100 rounded p-3">
            <div className="flex justify-between text-sm">
              <span>
                Consultation
              </span>

              <span>₹500</span>
            </div>

            <div className="flex justify-between font-semibold border-t mt-2 pt-2">
              <span>Total</span>

              <span>
                ₹{finalAmount}
              </span>
            </div>
          </div>

          {/* BUTTON */}

          <button
            onClick={handleBook}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Book Appointment
          </button>
        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div>
          <h3 className="font-semibold mb-2">
            Search Patient
          </h3>

          <input
            className="input"
            placeholder="Name or Mobile"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
          />
        </div>

        {/* =========================
            LOGOUT
        ========================= */}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* =========================
          RIGHT PANEL
      ========================= */}

      <div className="w-2/3 p-5 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Today's Appointments
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : patients.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          patients.map((item) => {
            const patient =
              item.patientId || item;

            return (
              <div
                key={
                  item._id ||
                  item.mobile
                }
                className="bg-white p-4 mb-3 rounded shadow"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {patient.name ||
                        "No Name"}
                    </h3>

                    <p>
                      {
                        patient.mobile
                      }
                    </p>

                    <p>
                      Age:{" "}
                      {patient.age ||
                        "N/A"}
                    </p>

                    <p>
                      Gender:{" "}
                      {patient.gender ||
                        "N/A"}
                    </p>

                    <p>
                      Time:{" "}
                      {item.time}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ₹
                      {item.finalAmount ||
                        500}
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        item.paymentMode
                      }
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.paymentStatus ===
                        "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        item.paymentStatus
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ReceptionDashboard;
