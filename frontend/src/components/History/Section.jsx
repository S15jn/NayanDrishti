import Row from "./Row";

const Section = ({ title, options, showEye = true, data = {}, setData }) => {
  const rows = data.rows || [];
  const selected = rows.map((row) => row.name);

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
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => addRow(opt)}
            className={`px-3 py-1 text-sm rounded border ${
              selected.includes(opt)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-6 text-xs text-gray-500 mb-2">
        <div>Name</div>
        {showEye ? <div>Eye</div> : <div />}
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

      <textarea
        value={data.comment || ""}
        onChange={(e) =>
          safeSetData((prev = {}) => ({
            ...prev,
            comment: e.target.value,
          }))
        }
        placeholder="Section Comments..."
        className="w-full border p-2 mt-3 rounded"
      />
    </div>
  );
};

export default Section;
