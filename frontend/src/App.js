import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />

        {/* STAFF LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PRIVATE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
