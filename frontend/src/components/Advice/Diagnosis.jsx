function Diagnosis({ data = {}, setField }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (typeof setField === "function") {
      setField(name, value);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Diagnosis
        </p>
        <h3 className="text-lg font-bold text-slate-900">
          Diagnosis & Prescription
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Add diagnosis and prescription details for the patient.
        </p>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Diagnosis
          </label>
          <textarea
            name="diagnosis"
            placeholder="Enter diagnosis..."
            value={data.diagnosis || ""}
            onChange={handleChange}
            className="min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Prescription
          </label>
          <textarea
            name="prescription"
            placeholder="Write medicines or instructions..."
            value={data.prescription || ""}
            onChange={handleChange}
            className="min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;