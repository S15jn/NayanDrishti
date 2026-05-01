import { useState, useEffect } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async () => {
    await API.post("/users/add", form);
    alert("User Added ");
    loadUsers();
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  window.location.href = "/";
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/*Add User */}
      <h3>Add User</h3>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
      </select>

      <button onClick={handleAdd}>Add User</button>

      <hr />

      {/*Users List */}
      <h3>All Users</h3>

      {users.map((u) => (
        <div key={u._id} style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
          <p><b>{u.name}</b></p>
          <p>{u.email}</p>
          <p>Role: {u.role}</p>

        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;