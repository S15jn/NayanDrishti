const PatientHeader = ({
  selected,
  isComplete,
  handleFinalSave,
  handlePrintPrescription,
  status,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {selected?.patientId?.name}
          </h2>
 <div className="flex gap-4 mt-2">
  <span className="text-slate-500">
            <b>Age:</b>  {selected?.patientId?.age}
          </span>
 <span className="text-slate-500">
            <b>Gender:</b>  {selected?.patientId?.gender}
          </span>
          <span className="text-slate-500">
           <b> Mobile No.:</b> {selected?.patientId?.mobile}
          </span>
 </div>
         

          <div className="flex gap-2 mt-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
              Active Consultation
            </span>

            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
              Token #{selected?.token}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            {status === "saving" && (
              <span className="text-blue-500">
                Saving...
              </span>
            )}

            {status === "saved" && (
              <span className="text-green-600">
                Auto Saved
              </span>
            )}
          </div>

          <button
            onClick={handlePrintPrescription}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            Print
          </button>

          <button
            disabled={!isComplete}
            onClick={handleFinalSave}
            className={`
              px-5 py-2 rounded-xl text-white
              ${
                isComplete
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400"
              }
            `}
          >
            Save & Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;