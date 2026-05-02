const HistoryPanel = ({ showHistory, setShowHistory, records }) => {
  return (
    <>
      <div
        onClick={() => setShowHistory(!showHistory)}
        className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
      >
        🕒
      </div>

      {showHistory && (
        <div className="fixed inset-0 z-40" onClick={() => setShowHistory(false)} />
      )}

      <div
        className={`fixed top-0 right-0 w-72 bg-white p-4 shadow h-full z-50 transform ${
          showHistory ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h3 className="font-bold mb-3">Patient History</h3>

        {records.map((rec) => (
          <div key={rec._id} className="border p-2 mb-2 rounded">
            <p>{rec.diagnosis}</p>
            <p className="text-xs">{rec.prescription}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryPanel;