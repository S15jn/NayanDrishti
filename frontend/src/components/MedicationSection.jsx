import React, { useState } from "react";

const defaultRow = {
  name: "",
  type: "",
  quantity: 1,
  frequency: "",
  duration: "",
  taper: "",
  eye: "",
  instruction: "",
};

const MedicationSection = () => {
  const [rows, setRows] = useState([
    { ...defaultRow },
    { ...defaultRow },
    { ...defaultRow },
    { ...defaultRow },
    { ...defaultRow },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { ...defaultRow }]);
  };

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-md flex">

        {/* LEFT SIDE */}
        <div className="w-3/4 p-4">

          <h2 className="font-semibold mb-3">Medication</h2>

          {/* STORE */}
          <div className="flex items-center gap-3 mb-3">
            <label className="text-sm font-medium">Store:</label>
            <select className="border px-3 py-1 rounded w-64">
              <option>Ground Floor Pharmacy</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Frequency</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Taper</th>
                  <th className="p-2">Eye</th>
                  <th className="p-2">Instruction</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t">

                    <td className="p-1">
                      <input
                        className="border w-full px-2 py-1 rounded"
                        value={row.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                      />
                    </td>

                    <td className="p-1">
                      <input
                        className="border w-full px-2 py-1 rounded"
                        value={row.type}
                        onChange={(e) =>
                          handleChange(index, "type", e.target.value)
                        }
                      />
                    </td>

                    <td className="p-1">
                      <select
                        className="border w-full px-2 py-1 rounded"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((q) => (
                          <option key={q}>{q}</option>
                        ))}
                      </select>
                    </td>

                    <td className="p-1">
                      <select
                        className="border w-full px-2 py-1 rounded"
                        onChange={(e) =>
                          handleChange(index, "frequency", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option>1-0-1</option>
                        <option>0-1-0</option>
                        <option>1-1-1</option>
                      </select>
                    </td>

                    <td className="p-1">
                      <select
                        className="border w-full px-2 py-1 rounded"
                        onChange={(e) =>
                          handleChange(index, "duration", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option>3 Days</option>
                        <option>5 Days</option>
                        <option>7 Days</option>
                      </select>
                    </td>

                    <td className="p-1 text-blue-600 cursor-pointer text-xs">
                      + Add
                    </td>

                    <td className="p-1">
                      <select
                        className="border w-full px-2 py-1 rounded"
                        onChange={(e) =>
                          handleChange(index, "eye", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option>Left</option>
                        <option>Right</option>
                        <option>Both</option>
                      </select>
                    </td>

                    <td className="p-1">
                      <select
                        className="border w-full px-2 py-1 rounded"
                        onChange={(e) =>
                          handleChange(index, "instruction", e.target.value)
                        }
                      >
                        <option>Please Select</option>
                        <option>After Food</option>
                        <option>Before Food</option>
                      </select>
                    </td>

                    <td className="p-1 flex gap-2 justify-center">
                      <button className="bg-blue-500 text-white px-2 rounded">
                        👁
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 rounded"
                        onClick={() => deleteRow(index)}
                      >
                        ✕
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM */}
          <div className="mt-3 flex gap-3">
            <button
              onClick={addRow}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              + Add Row
            </button>

            <button className="bg-blue-600 text-white px-4 py-1 rounded">
              Save
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/4 border-l p-4 bg-gray-50">

          <button className="bg-green-500 text-white w-full py-2 rounded mb-2">
            Continue Same Treatment
          </button>

          <button className="bg-green-600 text-white w-full py-2 rounded mb-3">
            Save Medication Set
          </button>

          <div className="mb-3">
            <label className="text-sm">Select Medication Set Level</label>
            <select className="border w-full mt-1 px-2 py-1 rounded">
              <option>User</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search Medication Sets"
            className="border w-full px-2 py-1 rounded"
          />
        </div>

      </div>
    </div>
  );
};

export default MedicationSection;