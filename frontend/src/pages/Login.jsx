import { useState } from "react";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else if (res.data.role === "doctor") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/reception";
      }

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/*  Role Buttons */}
        <div className="flex justify-between mb-3">
          {["admin", "doctor", "receptionist"].map((r) => (
            <button
              key={r}
              onClick={() => setForm({ ...form, role: r })}
              className={`px-3 py-1 rounded ${
                form.role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;