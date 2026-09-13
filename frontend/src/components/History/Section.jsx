import Row from "./Row";

const accentStyles = {
  blue: {
    text: "text-blue-600",
    chip: "bg-blue-600 text-white border-blue-600 shadow-blue-100",
    ring: "focus:border-blue-500 focus:ring-blue-100",
  },
  indigo: {
    text: "text-indigo-600",
    chip: "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100",
    ring: "focus:border-indigo-500 focus:ring-indigo-100",
  },
  emerald: {
    text: "text-emerald-600",
    chip: "bg-emerald-600 text-white border-emerald-600 shadow-emerald-100",
    ring: "focus:border-emerald-500 focus:ring-emerald-100",
  },
};

const Section = ({
  title,
  subtitle,
  options,
  showEye = true,
  data = {},
  setData,
  accent = "blue",
}) => {
  const rows = data.rows || [];
  const selected = rows.map((row) => row.name);
  const styles = accentStyles[accent] || accentStyles.blue;

  const safeSetData = (value) => {
    if (typeof setData === "function") {
      setData(value);
    }
  };

  const addRow = (name) => {
    if (selected.includes(name)) return;

    safeSetData((prev = {}) => ({
      ...prev,
      rows: [
        ...(prev.rows || []),
        { name, eye: "", duration: "", unit: "", comment: "" },
      ],
    }));
  };

  const updateRow = (index, field, value) => {
    safeSetData((prev = {}) => {
      const updated = [...(prev.rows || [])];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        rows: updated,
      };
    });
  };

  const removeRow = (index) => {
    safeSetData((prev = {}) => ({
      ...prev,
      rows: (prev.rows || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${styles.text}`}>
              History
            </p>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>

          <span className="mt-2 w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 sm:mt-0">
            {rows.length} selected
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt);

            return (
              <button
                type="button"
                key={opt}
                onClick={() => addRow(opt)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  isSelected
                    ? styles.chip
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {isSelected ? "Added: " : "+ "}
                {opt}
              </button>
            );
          })}
        </div>

        {rows.length > 0 ? (
          <div className="space-y-3">
            <div
              className={`hidden rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid ${
                showEye ? "md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.4fr_44px]" : "md:grid-cols-[1.4fr_0.8fr_0.8fr_1.6fr_44px]"
              } gap-3`}
            >
              <div>Name</div>
              {showEye && <div>Eye</div>}
              <div>Duration</div>
              <div>Unit</div>
              <div>Comment</div>
              <div />
            </div>

            {rows.map((row, i) => (
              <Row
                key={`${row.name}-${i}`}
                row={row}
                index={i}
                updateRow={updateRow}
                removeRow={removeRow}
                showEye={showEye}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No items selected
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Choose from the options above to add history details.
            </p>
          </div>
        )}

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Section Comments
          </label>
          <textarea
            value={data.comment || ""}
            onChange={(e) =>
              safeSetData((prev = {}) => ({
                ...prev,
                comment: e.target.value,
              }))
            }
            placeholder="Add notes for this section..."
            className={`min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${styles.ring}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Section;