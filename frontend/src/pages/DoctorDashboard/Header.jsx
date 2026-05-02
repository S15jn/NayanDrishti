import React from "react";

const Header = ({ doctor }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex justify-between">
      <div>
        <h2 className="font-bold">
          {doctor?.name || "Doctor"}
        </h2>

        <p className="text-sm text-gray-500">
          ID: {doctor?.doctorId || "--"}
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("doctor");
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;