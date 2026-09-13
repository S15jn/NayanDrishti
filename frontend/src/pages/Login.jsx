import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

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
      if (
        !form.staffId ||
        !form.email ||
        !form.password ||
        !form.role
      ) {
        return alert(
          "Please fill all fields",
        );
      }

      setLoading(true);

      /* =========================
         CLEAN PAYLOAD
      ========================= */
      const payload = {
        staffId:
          form.staffId.trim().toUpperCase(),

        email: form.email
          .trim()
          .toLowerCase(),

        password: form.password,

        role: form.role,
      };

      console.log(
        "LOGIN PAYLOAD:",
        payload,
      );

      const res = await API.post(
        "/auth/login",
        payload,
      );

      console.log(
        "LOGIN RESPONSE:",
        res.data,
      );

      /* =========================
         SAVE USER DATA
      ========================= */
      localStorage.setItem(
        "token",
        res.data.token,
      );

      localStorage.setItem(
        "role",
        res.data.user.role,
      );

      localStorage.setItem(
        "staffId",
        res.data.user.staffId,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user),
      );

      localStorage.setItem(
        "doctor",
        JSON.stringify(res.data.user),
      );

      /* =========================
         NAVIGATION
      ========================= */
      if (
        res.data.user.role === "admin"
      ) {
        navigate("/admin");
      } else if (
        res.data.user.role === "doctor"
      ) {
        navigate("/doctor");
      } else {
        navigate("/reception");
      }
    } catch (err) {
      console.log(
        "LOGIN ERROR:",
        err.response?.data,
      );

      alert(
        err.response?.data?.message ||
          "Invalid credentials",
      );
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
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded transition"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* =========================
            DEBUG HELP
        ========================= */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Use exact Staff ID, Email &
          Role
        </div>
      </div>
    </div>
  );
}

export default Login;