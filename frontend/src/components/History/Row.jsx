import { durationUnits, eyeOptions } from "./config";

const Row = ({ row, index, updateRow, removeRow, showEye = true }) => {
  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass = "mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500 md:hidden";

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid md:items-center ${
        showEye ? "md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.4fr_44px]" : "md:grid-cols-[1.4fr_0.8fr_0.8fr_1.6fr_44px]"
      } gap-3`}
    >
      <div>
        <label className={labelClass}>Name</label>
        <input
          value={row.name || ""}
          readOnly
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none"
        />
      </div>

      {showEye && (
        <div>
          <label className={labelClass}>Eye</label>
          <select
            value={row.eye || ""}
            onChange={(e) => updateRow(index, "eye", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select eye</option>
            {eyeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className={labelClass}>Duration</label>
        <input
          type="number"
          min="0"
          value={row.duration || ""}
          onChange={(e) => updateRow(index, "duration", e.target.value)}
          className={fieldClass}
          placeholder="Duration"
        />
      </div>

      <div>
        <label className={labelClass}>Unit</label>
        <select
          value={row.unit || ""}
          onChange={(e) => updateRow(index, "unit", e.target.value)}
          className={fieldClass}
        >
          <option value="">Unit</option>
          {durationUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Comment</label>
        <input
          value={row.comment || ""}
          onChange={(e) => updateRow(index, "comment", e.target.value)}
          className={fieldClass}
          placeholder="Comment..."
        />
      </div>

      <button
        type="button"
        onClick={() => removeRow(index)}
        title="Remove"
        className="mt-3 flex h-10 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-red-600 transition hover:bg-red-100 md:mt-0 md:w-10"
      >
        X
      </button>
    </div>
  );
};

export default Row;