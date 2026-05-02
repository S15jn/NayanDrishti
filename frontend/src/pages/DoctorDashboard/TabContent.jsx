import History from "../../components/History/History";
import Refraction from "../../components/Refraction/Refraction";
import Examination from "../../components/Examination/Examination";
import Diagnosis from "../../components/Diagnosis";
import Medication from "../../components/MedicationSection";

const TabContent = ({
  activeTab,
  formData,
  updateFormData,
  saveNow,
  status,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      {activeTab === "history" && (
        <History
          data={formData.history}
          setData={(v) => updateFormData("history", v)}
          saveNow={saveNow}
          status={status}
        />
      )}

      {activeTab === "refraction" && (
        <Refraction
          data={formData.refraction}
          setData={(v) => updateFormData("refraction", v)}
          saveNow={saveNow}
          status={status}
        />
      )}

      {activeTab === "examination" && (
        <Examination
          data={formData.examination}
          setData={(v) => updateFormData("examination", v)}
          saveNow={saveNow}
          status={status}
        />
      )}

      {activeTab === "diagnosis" && (
        <Diagnosis
          data={formData}
          setData={(v) => {
            if (typeof v === "function") {
              const next = v(formData);
              Object.keys(next).forEach((key) => updateFormData(key, next[key]));
            }
          }}
          saveNow={saveNow}
          status={status}
        />
      )}

      {activeTab === "medical" && (
        <Medication
          data={formData.medical}
          setData={(v) => updateFormData("medical", v)}
          saveNow={saveNow}
          status={status}
        />
      )}
    </div>
  );
};

export default TabContent;
