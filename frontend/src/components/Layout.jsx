import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-60 bg-blue-600 text-white p-5">
        <h2 className="text-xl font-bold mb-5">Nayan Drishti</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/admin">Admin</Link>
          <Link to="/doctor">Doctor</Link>
          <Link to="/reception">Reception</Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1">
        <div className="bg-white p-4 shadow flex justify-between">
          <h2>Dashboard</h2>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;