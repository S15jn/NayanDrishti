function Diagnosis({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          value={formData.diagnosis || ""}
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
          value={formData.prescription || ""}
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
          value={formData.followUpDate || ""}
          onChange={handleChange}
          className="input"
        />
      </div>

    </div>
  );
}

export default Diagnosis;