import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        const userRole = res.data?.user?.role;

        if (role && userRole !== role) {
          localStorage.clear();
          setAllowed(false);
        } else {
          localStorage.setItem("role", userRole);
          setAllowed(true);
        }
      } catch (err) {
        localStorage.clear();
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    };

    verifyUser();
  }, [role]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
