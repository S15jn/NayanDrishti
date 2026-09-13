import History from "../../components/History/History";
import Refraction from "../../components/Refraction/Refraction";
import Examination from "../../components/Examination/Examination";
import Advice from "../../components/Advice/Advice";

const TabContent = ({
  activeTab,
  formData,
  updateFormData,
  saveNow,
  status,
}) => {
  return (
    <div className="animate-fadeIn">
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

      {activeTab === "advice" && (
        <Advice
          data={formData.advice}
          setData={(v) => updateFormData("advice", v)}
          saveNow={saveNow}
          status={status}
        />
      )}
    </div>
  );
};

export default TabContent;