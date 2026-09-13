import { useState, useEffect } from "react";
import API from "../../services/api";
import useAutoSave from "../../hooks/useAutoSave";
import Header from "./Header";
import SidebarPatients from "./SidebarPatients";
import PatientHeader from "./PatientHeader";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import HistoryPanel from "./HistoryPanel";
import PrintPrescription from "../../components/PrintPrescription";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("history");
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [completedIds, setCompletedIds] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [formData, setFormData] = useState({
    patientId: "",
    appointmentId: "",
    history: {},
    refraction: {},
    examination: {},
    diagnosis: "",
    prescription: "",
    followUpDate: "",
    medical: {},
  });

  const { status, saveNow } = useAutoSave(formData, activeTab);

  useEffect(() => {
    API.get("/appointments/today").then((res) => setPatients(res.data || []));
  }, []);

  useEffect(() => {
    const stored =
      localStorage.getItem("doctor") || localStorage.getItem("user");

    if (stored) {
      setDoctor(JSON.parse(stored));
    }
  }, []);

  const handleSelect = async (item) => {
    setSelected(item);

    const res = await API.get(`/records/${item.patientId?._id}`);
    const patientRecords = res.data || [];
    setRecords(patientRecords);

    const currentRecord = patientRecords.find(
      (record) => String(record.appointmentId) === String(item._id),
    );

    setFormData({
      patientId: item.patientId?._id || "",
      appointmentId: item._id || "",
      history: currentRecord?.history || {},
      refraction: currentRecord?.refraction || {},
      examination: currentRecord?.examination || {},
      diagnosis: currentRecord?.diagnosis || "",
      prescription: currentRecord?.prescription || "",
      followUpDate: currentRecord?.followUpDate
        ? currentRecord.followUpDate.slice(0, 10)
        : "",
      medical: currentRecord?.medical || {},
    });
  };

  const updateFormData = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: typeof value === "function" ? value(prev[section]) : value,
    }));
  };

  const isComplete =
    formData.diagnosis?.trim() && formData.prescription?.trim();

  const markPatientCompleted = () => {
    setPatients((prev) =>
      prev.map((item) =>
        item._id === selected._id
          ? {
              ...item,
              status: "Completed",
              visited: true,
            }
          : item,
      ),
    );

    setSelected((prev) =>
      prev
        ? {
            ...prev,
            status: "Completed",
            visited: true,
          }
        : prev,
    );

    setCompletedIds((prev) =>
      prev.includes(selected._id) ? prev : [...prev, selected._id],
    );
  };

  const handleFinalSave = async () => {
    try {
      if (!selected?._id || !formData.patientId || !formData.appointmentId) {
        return alert("Please select patient first");
      }

      await API.post("/records/save", formData);
      await API.put(`/appointments/complete/${selected._id}`);

      markPatientCompleted();
      window.print();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Record save failed");
    }
  };

  const handlePrintPrescription = async () => {
    try {
      if (!selected?._id || !formData.patientId || !formData.appointmentId) {
        return alert("Please select patient first");
      }

      await API.post("/records/save", formData);
      window.print();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Prescription print failed");
    }
  };

  const totalPatients = patients.length;

  const completedPatients = patients.filter(
    (p) =>
      p.status === "Completed" ||
      p.visited === true ||
      completedIds.includes(p._id),
  ).length;

  const pendingPatients = totalPatients - completedPatients;

  const completionPercentage =
    totalPatients > 0
      ? Math.round((completedPatients / totalPatients) * 100)
      : 0;

  const tabs = ["history", "refraction", "examination", "advice"];

  return (
    <>
      <div className="screen-only min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-[1800px] mx-auto p-6">
          <div className="mb-6">
            <Header doctor={doctor} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">Total Patients</p>
                  <h2 className="text-3xl font-bold text-slate-800">
                    {totalPatients}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                  P
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">Pending</p>
                  <h2 className="text-3xl font-bold text-orange-600">
                    {pendingPatients}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                  W
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">Completed</p>
                  <h2 className="text-3xl font-bold text-green-600">
                    {completedPatients}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                  C
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">Completion</p>
                  <h2 className="text-3xl font-bold text-indigo-600">
                    {completionPercentage}%
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                  %
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 mb-6">
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-slate-700">
                Today's Consultation Progress
              </span>

              <span className="font-bold text-indigo-600">
                {completedPatients}/{totalPatients}
              </span>
            </div>

            <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-700"
                style={{
                  width: `${completionPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:gap-[0.5%] gap-2">
            <div className="w-full xl:basis-[14%] xl:max-w-[14%] xl:shrink-0">
              <div className="sticky top-4 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <SidebarPatients
                  patients={patients}
                  selected={selected}
                  handleSelect={handleSelect}
                  completedIds={completedIds}
                />
              </div>
            </div>

            <div
              className={
                showHistory
                  ? "w-full xl:basis-[71%] xl:max-w-[71%] xl:shrink-0 transition-all duration-300"
                  : "w-full xl:basis-[80%] xl:max-w-[80%] xl:shrink-0 transition-all duration-300"
              }
            >
              {!selected ? (
                <div className="h-[700px] flex items-center justify-center bg-white rounded-3xl shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="text-7xl mb-4">Doctor</div>
                    <h2 className="text-2xl font-bold text-gray-700">
                      Select a Patient
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Choose a patient from the left panel to begin consultation.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <PatientHeader
                      selected={selected}
                      isComplete={isComplete}
                      handleFinalSave={handleFinalSave}
                      handlePrintPrescription={handlePrintPrescription}
                      status={status}
                    />
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <Tabs
                      tabs={tabs}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-2 max-h-[1900px]">
                    <TabContent
                      activeTab={activeTab}
                      formData={formData}
                      updateFormData={updateFormData}
                      saveNow={saveNow}
                      status={status}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className={
                showHistory
                  ? "w-full xl:basis-[14%] xl:max-w-[14%] xl:shrink-0 transition-all duration-300"
                  : "w-full xl:basis-[5%] xl:max-w-[5%] xl:shrink-0 transition-all duration-300"
              }
            >
              <div className="sticky top-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <HistoryPanel
                    showHistory={showHistory}
                    setShowHistory={setShowHistory}
                    records={records}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="print-only">
        <PrintPrescription
          selected={selected}
          formData={formData}
          doctor={doctor}
        />
      </div>
    </>
  );
}

export default DoctorDashboard;