import { useState, useEffect } from "react";
import API from "../../services/api";
import useAutoSave from "../../hooks/useAutoSave";
import Header from "./Header";
import SidebarPatients from "./SidebarPatients";
import PatientHeader from "./PatientHeader";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import HistoryPanel from "./HistoryPanel";

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
    const stored = localStorage.getItem("doctor");
    if (stored) setDoctor(JSON.parse(stored));
  }, []);

  const handleSelect = async (item) => {
    setSelected(item);

    const res = await API.get(`/records/${item.patientId?._id}`);
    const patientRecords = res.data || [];
    setRecords(patientRecords);

    const currentRecord = patientRecords.find(
      (record) => record.appointmentId === item._id,
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

  const handleFinalSave = async () => {
    await saveNow();
    setCompletedIds((prev) =>
      prev.includes(selected._id) ? prev : [...prev, selected._id],
    );
    window.print();
  };

  const tabs = ["history", "refraction", "examination", "diagnosis", "medical"];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Header doctor={doctor} />

      <div className="grid grid-cols-[220px_1fr_60px] gap-4">
        <SidebarPatients
          patients={patients}
          selected={selected}
          handleSelect={handleSelect}
          completedIds={completedIds}
        />

        <div>
          {selected && (
            <>
              <PatientHeader
                selected={selected}
                isComplete={isComplete}
                handleFinalSave={handleFinalSave}
                status={status}
              />

              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <TabContent
                activeTab={activeTab}
                formData={formData}
                updateFormData={updateFormData}
                saveNow={saveNow}
                status={status}
              />
            </>
          )}
        </div>

        <HistoryPanel
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          records={records}
        />
      </div>
    </div>
  );
}

export default DoctorDashboard;
