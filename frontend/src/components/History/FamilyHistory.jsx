export default function FamilyHistory({ data = {}, setData }) {
  const safeSetData = (value) => {
    if (typeof setData === "function") {
      setData(value);
    }
  };

  const updateField = (field, value) => {
    safeSetData((prev = {}) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          Family
        </p>
        <h2 className="text-lg font-bold text-slate-900">Family History</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add relevant hereditary eye disease or systemic medical history.
        </p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Family History
          </label>
          <textarea
            value={data.familyHistory || ""}
            onChange={(e) => updateField("familyHistory", e.target.value)}
            className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            placeholder="Example: Glaucoma in father, diabetes in mother..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Medical History
          </label>
          <textarea
            value={data.medicalHistory || ""}
            onChange={(e) => updateField("medicalHistory", e.target.value)}
            className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            placeholder="Example: Hypertension, diabetes, thyroid disorder..."
          />
        </div>
      </div>
    </div>
  );
}