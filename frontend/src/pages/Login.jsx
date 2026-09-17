import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    staffId: "",
    email: "",
    password: "",
    role: "",
  });

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     LOGIN
  ========================= */
  const handleLogin = async () => {
    try {
      /* =========================
         VALIDATION
      ========================= */
      if (
        !form.staffId.trim() ||
        !form.email.trim() ||
        !form.password ||
        !form.role
      ) {
        return alert(
          "Staff ID, email, password and role are required"
        );
      }

      setLoading(true);

      /* =========================
         LOGIN PAYLOAD
      ========================= */
      const payload = {
        staffId: form.staffId.trim().toUpperCase(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      };

      /*
       * Do NOT console.log payload.
       * Password should never be printed in console.
       */

      /* =========================
         API LOGIN
      ========================= */
      const res = await API.post(
        "/auth/login",
        payload
      );

      /* =========================
         CHECK RESPONSE
      ========================= */
      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error("Invalid server response");
      }

      const user = res.data.user;

      /* =========================
         SAVE AUTH DATA
      ========================= */
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "staffId",
        user.staffId
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      /* =========================
         DOCTOR DATA
         Only save if doctor
      ========================= */
      if (user.role === "doctor") {
        localStorage.setItem(
          "doctor",
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem("doctor");
      }

      /* =========================
         NAVIGATION
      ========================= */
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "doctor") {
        navigate("/doctor");
      } else if (user.role === "receptionist") {
        navigate("/reception");
      } else {
        alert("Invalid user role");
      }

    } catch (err) {
      /*
       * Do NOT print password,
       * email or complete payload.
       */

      const message =
        err.response?.data?.message ||
        err.message ||
        "Invalid credentials";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">

        {/* =========================
            TITLE
        ========================= */}
        <h2 className="text-2xl font-bold mb-5 text-center">
          Staff Login
        </h2>

        {/* =========================
            STAFF ID
        ========================= */}
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Staff ID"
          name="staffId"
          value={form.staffId}
          onChange={handleChange}
          autoComplete="username"
        />

        {/* =========================
            EMAIL
        ========================= */}
        <input
          className="w-full border p-2 rounded mb-3"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        {/* =========================
            PASSWORD
        ========================= */}
        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        {/* =========================
            ROLE SELECTOR
        ========================= */}
        <div className="flex justify-between gap-2 mb-4">

          {[
            "admin",
            "doctor",
            "receptionist",
          ].map((role) => (
            <button
              type="button"
              key={role}
              onClick={() =>
                setForm({
                  ...form,
                  role,
                })
              }
              className={`flex-1 px-3 py-2 rounded text-sm capitalize transition ${
                form.role === role
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {role}
            </button>
          ))}

        </div>

        {/* =========================
            LOGIN BUTTON
        ========================= */}
        <button
          type="button"
          disabled={loading}
          onClick={handleLogin}
          className={`${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white w-full py-2 rounded transition`}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* =========================
            HELP TEXT
        ========================= */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Use exact Staff ID, Email & Role
        </div>

      </div>
    </div>
  );
}

export default Login;