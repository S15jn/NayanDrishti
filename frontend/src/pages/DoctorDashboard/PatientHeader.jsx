const PatientHeader = ({ selected, isComplete, handleFinalSave, status }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center">

      {/* LEFT: PATIENT INFO */}
      <div>
        <h2 className="text-lg font-bold">
          {selected?.patientId?.name || "Patient"}
        </h2>
        <p className="text-sm text-gray-600">
          {selected?.patientId?.mobile || "--"}
        </p>
      </div>

      {/* RIGHT: STATUS + BUTTON */}
      <div className="flex items-center gap-4">

        {/* 🔥 SAVE STATUS */}
        {status === "saving" && (
          <span className="text-blue-500 animate-pulse">
            Saving...
          </span>
        )}

        {status === "saved" && (
          <span className="text-green-600">
            ✔ Saved
          </span>
        )}

        {status === "error" && (
          <span className="text-red-500">
            ❌ Error
          </span>
        )}

        {/* 🔥 BUTTON */}
        {isComplete ? (
          <button
            onClick={handleFinalSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save & Print
          </button>
        ) : (
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            disabled
          >
            Fill Required Fields
          </button>
        )}

      </div>
    </div>
  );
};

export default PatientHeader;