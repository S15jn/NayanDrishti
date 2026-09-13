import ChiefComplaints from "./ChiefComplaints";
import OphthalmicHistory from "./OphthalmicHistory";
import SystemicHistory from "./SystemicHistory";
import FamilyHistory from "./FamilyHistory";
import Allergies from "./Allergies";

const History = ({ data = {}, setData, saveNow, status }) => {
  const updateSection = (key, value) => {
    setData((prev = {}) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key] || {}) : value,
    }));
  };

  const statusText = {
    saving: "Saving...",
    saved: "Saved",
    error: "Save failed",
  };

  const statusClass = {
    saving: "text-amber-600 bg-amber-50 border-amber-200",
    saved: "text-emerald-700 bg-emerald-50 border-emerald-200",
    error: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Patient History
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Clinical History
            </h2>
          </div>

          <div
            className={`w-fit rounded-full border px-3 py-1 text-sm font-semibold ${
              statusClass[status] || "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {statusText[status] || "Ready"}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <ChiefComplaints
          data={data.chief || {}}
          setData={(v) => updateSection("chief", v)}
        />

        <OphthalmicHistory
          data={data.ophthalmic || {}}
          setData={(v) => updateSection("ophthalmic", v)}
        />

        <SystemicHistory
          data={data.systemic || {}}
          setData={(v) => updateSection("systemic", v)}
        />

        <FamilyHistory
          data={data.family || {}}
          setData={(v) => updateSection("family", v)}
        />

        <Allergies
          data={data.allergies || {}}
          setData={(v) => updateSection("allergies", v)}
        />
      </div>

      <div className="sticky bottom-0 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-slate-600">
            History changes are auto-saved. Use manual save before printing.
          </span>

          <button
            type="button"
            onClick={saveNow}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Save History
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;