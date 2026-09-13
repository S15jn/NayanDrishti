import React from "react";

const emptyProcedure = {
  name: "",
  eye: "",
  notes: "",
};

const Procedures = ({ data = [], setData }) => {

  const updateProcedures = (updated) => {
    if (!setData) return;
    setData(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateProcedures(updated);
  };

  const addRow = () => {
    updateProcedures([...data, { ...emptyProcedure }]);
  };

  const deleteRow = (index) => {
    updateProcedures(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Procedures</h3>

      {data.length === 0 && (
        <div className="text-gray-400 text-sm">No procedures added</div>
      )}

      {data.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-3 items-center bg-gray-50 p-3 rounded"
        >
          {/* Procedure Name */}
          <input
            type="text"
            placeholder="Procedure Name"
            className="border p-2 rounded"
            value={item.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />

          {/* Eye */}
          <select
            className="border p-2 rounded"
            value={item.eye}
            onChange={(e) => handleChange(i, "eye", e.target.value)}
          >
            <option value="">Select Eye</option>
            <option value="OD">OD (Right)</option>
            <option value="OS">OS (Left)</option>
            <option value="OU">OU (Both)</option>
          </select>

          {/* Delete */}
          <button
            onClick={() => deleteRow(i)}
            className="bg-red-500 text-white px-3 py-2 rounded"
          >
            Remove
          </button>

          {/* Notes full width */}
          <textarea
            placeholder="Notes"
            className="border p-2 rounded col-span-3"
            value={item.notes}
            onChange={(e) => handleChange(i, "notes", e.target.value)}
          />
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addRow}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Procedure
      </button>
    </div>
  );
};

export default Procedures;