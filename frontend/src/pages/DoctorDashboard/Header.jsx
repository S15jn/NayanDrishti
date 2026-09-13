import React from "react";

const Header = ({ doctor }) => {
  const today = new Date().toLocaleDateString();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 shadow-xl text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {doctor?.name?.charAt(0) || "D"}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Dr. {doctor?.name || "Doctor"}
            </h1>

            <p className="text-blue-100">
              ID: {doctor?.doctorId || "--"}
            </p>

            <p className="text-sm text-blue-200">
              {today}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("doctor");
            window.location.href = "/login";
          }}
          className="bg-white text-red-600 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;