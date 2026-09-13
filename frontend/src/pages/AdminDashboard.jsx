import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [form, setForm] = useState({
    staffId: "",
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async () => {
    try {
      setError("");

      await API.post("/users/add", form);

      alert("User added");

      setForm({
        staffId: "",
        name: "",
        email: "",
        password: "",
        role: "doctor",
      });

      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  const handleStatusChange = async (user) => {
    try {
      setError("");

      await API.patch(`/users/${user._id}/status`, {
        isActive: !user.isActive,
      });

      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-5 mb-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">
            Manage staff accounts and access
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-5 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Staff User</h3>

        <div className="grid md:grid-cols-5 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Staff ID e.g. DOC001"
            value={form.staffId}
            onChange={(e) =>
              setForm({ ...form, staffId: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password min 8 chars"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <div className="bg-white rounded shadow p-5">
        <h3 className="text-lg font-semibold mb-4">All Staff Users</h3>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">
                    Staff ID: {user.staffId}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm">
                    Role: <b>{user.role}</b>
                  </p>
                  <p
                    className={`text-sm ${
                      user.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </p>
                </div>

                <button
                  onClick={() => handleStatusChange(user)}
                  className={`px-4 py-2 rounded text-white ${
                    user.isActive ? "bg-red-500" : "bg-green-600"
                  }`}
                >
                  {user.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
