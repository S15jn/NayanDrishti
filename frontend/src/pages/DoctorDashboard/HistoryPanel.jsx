const HistoryPanel = ({ showHistory, setShowHistory, records }) => {
  if (!showHistory) {
    return (
      <button
        type="button"
        onClick={() => setShowHistory(true)}
        title="Open patient history"
        className="w-full min-h-[700px] bg-gradient-to-b from-blue-600 to-indigo-600 text-white flex flex-col items-center justify-start gap-3 py-5 font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
      >
        <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
          H
        </span>
        <span className="text-xs tracking-wide [writing-mode:vertical-rl] rotate-180">
          History
        </span>
      </button>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
        <h3 className="font-semibold text-sm">Patient History</h3>

        <button
          type="button"
          onClick={() => setShowHistory(false)}
          title="Close history"
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold hover:bg-white/30 transition"
        >
          X
        </button>
      </div>

      <div className="p-4 max-h-[700px] overflow-y-auto">
        {records.length === 0 && (
          <p className="text-gray-500 text-sm">No previous records</p>
        )}

        {records.map((rec) => (
          <div key={rec._id} className="mb-4 border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-sm">
              {rec.diagnosis || "Diagnosis"}
            </p>

            <p className="text-sm text-gray-600">
              {rec.prescription || "No prescription added"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryPanel;