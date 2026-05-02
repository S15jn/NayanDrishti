import { durationUnits, eyeOptions } from "./config";

const Row = ({ row, index, updateRow, removeRow, showEye = true }) => {
  return (
    <div className="grid grid-cols-6 gap-2 mb-2 items-center">
      <input
        value={row.name || ""}
        readOnly
        className="border px-2 py-1 rounded bg-gray-100"
      />

      {showEye ? (
        <select
          value={row.eye || ""}
          onChange={(e) => updateRow(index, "eye", e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Eye</option>
          {eyeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div />
      )}

      <input
        type="number"
        value={row.duration || ""}
        onChange={(e) => updateRow(index, "duration", e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="Duration"
      />

      <select
        value={row.unit || ""}
        onChange={(e) => updateRow(index, "unit", e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Unit</option>
        {durationUnits.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      <input
        value={row.comment || ""}
        onChange={(e) => updateRow(index, "comment", e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="Comment..."
      />

      <button
        type="button"
        onClick={() => removeRow(index)}
        className="text-red-500"
      >
        X
      </button>
    </div>
  );
};

export default Row;
