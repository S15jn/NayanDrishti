import React from "react";

function Diagnosis({ formData = {}, setFormData, data, setData, saveNow, status }) {

  // ✅ support both patterns safely
  const currentData =
    formData && Object.keys(formData).length ? formData : data || {};

  const isSectionMode = !!setData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ SECTION MODE (safe update)
    if (isSectionMode) {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } 
    // ✅ FULL FORM MODE
    else if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-5">

      {/* TITLE */}
      <h3 className="text-lg font-bold">Diagnosis & Prescription</h3>

      {/* DIAGNOSIS */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Diagnosis
        </label>

        <textarea
          name="diagnosis"
          placeholder="Enter diagnosis..."
          value={currentData.diagnosis || ""}
          onChange={handleChange}
          className="input w-full h-24"
        />
      </div>

      {/* PRESCRIPTION */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Prescription
        </label>

        <textarea
          name="prescription"
          placeholder="Write medicines / instructions..."
          value={currentData.prescription || ""}
          onChange={handleChange}
          className="input w-full h-28"
        />
      </div>

      {/* FOLLOW UP */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Follow Up Date
        </label>

        <input
          type="date"
          name="followUpDate"
          value={currentData.followUpDate || ""}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* 🔥 SAVE BAR */}
      {saveNow && (
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={saveNow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>

          <span className="text-sm text-gray-500">
            {status === "saving" && "Saving..."}
            {status === "saved" && "Saved ✅"}
            {status === "error" && "Error ❌"}
          </span>
        </div>
      )}

    </div>
  );
}

export default Diagnosis;