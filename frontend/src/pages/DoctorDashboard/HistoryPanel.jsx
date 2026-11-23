
const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

const isEmpty = (value) => {
  if (value == null || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") {
    return Object.values(value).every(isEmpty);
  }
  return false;
};

const renderDetails = (data, level = 0) => {
  if (isEmpty(data)) return null;

  if (Array.isArray(data)) {
    return (
      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index}>
            {typeof item === "object"
              ? renderDetails(item, level + 1)
              : String(item)}
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === "object") {
    return (
      <div className={level ? "ml-3 space-y-2" : "space-y-2"}>
        {Object.entries(data).map(([key, value]) => {
          if (isEmpty(value)) return null;

          return (
            <div key={key}>
              <p className="text-xs font-semibold text-gray-500">
                {formatLabel(key)}
              </p>

              <div className="text-sm text-gray-800 break-words">
                {typeof value === "object"
                  ? renderDetails(value, level + 1)
                  : String(value)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <span>{String(data)}</span>;
};

const HistoryPanel = ({
  showHistory,
  setShowHistory,
  records = [],
}) => {
  if (!showHistory) {
    return (
      <button
        type="button"
        onClick={() => setShowHistory(true)}
        title="Open patient history"
        className="w-full min-h-[700px] bg-gradient-to-b from-blue-600 to-indigo-600 text-white flex flex-col items-center gap-3 py-5"
      >
        <span className="text-xl">H</span>
        <span className="text-xs [writing-mode:vertical-rl] rotate-180">
          History
        </span>
      </button>
    );
  }

  const sections = [
    ["Clinical History", "history"],
    ["Refraction", "refraction"],
    ["Eye Examination", "examination"],
    ["Medical Details", "medical"],
    ["Advice", "advice"],
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold text-sm">
          Previous Patient Visits
        </h3>

        <button
          type="button"
          onClick={() => setShowHistory(false)}
          className="w-8 h-8 rounded-full bg-white/20"
        >
          X
        </button>
      </div>

      <div className="p-3 max-h-[700px] overflow-y-auto">
        {!records.length ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No previous records found.
          </p>
        ) : (
          records.map((rec, index) => (
            <div
              key={rec._id || index}
              className="mb-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="border-b pb-3 mb-3">
                <p className="text-xs text-blue-600 font-semibold">
                  Previous Visit {index + 1}
                </p>

                <h4 className="font-bold text-gray-800 mt-1">
                  {rec.diagnosis || "Diagnosis not recorded"}
                </h4>

                {rec.followUpDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Follow-up:{" "}
                    {String(rec.followUpDate).slice(0, 10)}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <section>
                  <h5 className="text-xs font-bold text-blue-700 mb-2">
                    Prescription
                  </h5>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {rec.prescription || "Not recorded"}
                  </p>
                </section>

                {sections.map(([title, key]) => {
                  const value = rec[key];

                  if (isEmpty(value)) return null;

                  return (
                    <section
                      key={key}
                      className="border-t pt-3"
                    >
                      <h5 className="text-xs font-bold text-blue-700 mb-2">
                        {title}
                      </h5>

                      {renderDetails(value)}
                    </section>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HistoryPanel;
