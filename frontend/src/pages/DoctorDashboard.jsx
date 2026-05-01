import { useState, useEffect } from "react";
import History from "../components/History";
import Refraction from "../components/Refraction";
import Examination from "../components/Examination";
import Diagnosis from "../components/Diagnosis";
import API from "../services/api";
import logo from "../assets/logo.png";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("history");
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [completedIds, setCompletedIds] = useState([]);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  const [formData, setFormData] = useState({
    patientId: "",
    appointmentId: "",
    complaints: [],
    rightEyeVision: "",
    leftEyeVision: "",
    cornea: "",
    lens: "",
    retina: "",
    pupil: "",
    diagnosis: "",
    prescription: "",
  });

  // 🔹 Load appointments
  useEffect(() => {
    API.get("/appointments/today")
      .then((res) => setPatients(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Select patient
  const handleSelect = async (item) => {
    setSelected(item);

    setFormData({
      ...formData,
      patientId: item.patientId?._id,
      appointmentId: item._id,
      complaints: [],
    });

    try {
      const res = await API.get(`/records/${item.patientId?._id}`);
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Auto Save
  useEffect(() => {
    if (!selected) return;

    if (autoSaveTimer) clearTimeout(autoSaveTimer);

    const timer = setTimeout(async () => {
      try {
        await API.post("/records/save", formData);
        console.log("Auto Saved");
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    setAutoSaveTimer(timer);

    return () => clearTimeout(timer);
  }, [formData]);

  // 🔹 Check complete
  const isComplete =
    formData.diagnosis?.trim() && formData.prescription?.trim();

  // 🔹 Save + Print
  const handleFinalSave = async () => {
    try {
      await API.post("/records/save", formData);

      setCompletedIds((prev) => [...prev, selected._id]);

      handlePrint();
    } catch {
      alert("Error saving");
    }
  };

  // 🔹 Print
  const handlePrint = () => {
    if (!selected) return;

    const printWindow = window.open("", "", "width=900,height=700");

    const html = `
      <html>
        <body style="font-family:Arial;padding:30px;">
          <h2>Prescription</h2>
          <p>Name: ${selected.patientId?.name}</p>
          <p>Mobile: ${selected.patientId?.mobile}</p>
          <p>Diagnosis: ${formData.diagnosis}</p>
          <p>Prescription: ${formData.prescription}</p>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const tabs = ["history", "refraction", "examination", "diagnosis"];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-white p-4 rounded shadow mb-4 flex justify-between">
        <div>
          <h2 className="font-bold">Dr. Name</h2>
          <p className="text-sm text-gray-500">ID: DOC001</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-[220px_1fr_60px] gap-4">

        {/* APPOINTMENTS */}
        <div className="bg-white p-3 rounded shadow h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">Appointments</h3>

          {/* COUNTS */}
          <div className="text-xs mb-3">
            <p>Total: {patients.length}</p>
            <p>Done: {completedIds.length}</p>
          </div>

          {patients.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelect(item)}
              className={`p-2 border mb-2 rounded cursor-pointer text-sm ${
                selected?._id === item._id
                  ? "bg-blue-200"
                  : completedIds.includes(item._id)
                  ? "bg-green-200"
                  : "bg-red-100 hover:bg-red-200"
              }`}
            >
              <p className="font-semibold">
                {item.patientId?.name}
              </p>
              <p className="text-xs">
                {item.patientId?.mobile}
              </p>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div>
          {selected ? (
            <>
              <div className="bg-white p-4 rounded shadow mb-4 flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    {selected.patientId?.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selected.patientId?.mobile}
                  </p>
                </div>

                {/* BUTTON */}
                {isComplete ? (
                  <button
                    onClick={handleFinalSave}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save & Print
                  </button>
                ) : (
                  <button className="bg-gray-300 px-4 py-2 rounded" disabled>
                    Fill Required Fields
                  </button>
                )}
              </div>

              {/* TABS */}
              <div className="flex gap-2 mb-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* CONTENT */}
              <div className="bg-white p-4 rounded shadow">
                {activeTab === "history" && (
                  <History formData={formData} setFormData={setFormData} />
                )}
                {activeTab === "refraction" && (
                  <Refraction formData={formData} setFormData={setFormData} />
                )}
                {activeTab === "examination" && (
                  <Examination formData={formData} setFormData={setFormData} />
                )}
                {activeTab === "diagnosis" && (
                  <Diagnosis formData={formData} setFormData={setFormData} />
                )}
              </div>
            </>
          ) : (
            <p>Select patient</p>
          )}
        </div>

        {/* HISTORY */}
        <div className="relative flex justify-center">

          {/* ICON */}
          <div
            onClick={() => setShowHistory(!showHistory)}
            className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-clock-rotate-left"></i>
          </div>

          {/* OVERLAY */}
          {showHistory && (
            <div
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 z-40"
            />
          )}

          {/* PANEL */}
          <div
            className={`fixed top-0 right-0 w-72 bg-white p-4 shadow h-full z-50 transform transition-transform ${
              showHistory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <h3 className="font-bold mb-3">Patient History</h3>

            {records.length === 0 ? (
              <p>No history</p>
            ) : (
              records.map((rec) => (
                <div key={rec._id} className="border p-2 mb-2 rounded">
                  <p className="font-semibold">{rec.diagnosis}</p>
                  <p className="text-xs">{rec.prescription}</p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;