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

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
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

      <div className="sticky bottom-0 bg-white p-4 rounded shadow flex justify-between items-center">
        <button
          type="button"
          onClick={saveNow}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save History
        </button>

        <span className="text-sm text-gray-600">
          {status === "saving" && "Saving..."}
          {status === "saved" && "Saved"}
          {status === "error" && "Error"}
        </span>
      </div>
    </div>
  );
};

export default History;
