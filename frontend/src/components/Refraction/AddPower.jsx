import React from "react";

const AddPower = ({ value, onChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">Add Power</h2>

      <input
        placeholder="Add Power"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default AddPower;