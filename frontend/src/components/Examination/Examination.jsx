import MultiSelectExam from "./MultiSelectExam";
import Fundus from "./Fundus";
import { sections } from "./config";

const createEmptyExam = () => {
  const eye = {};

  Object.keys(sections).forEach((section) => {
    eye[section] = {
      values: [],
      comment: "",
    };
  });

  eye.fundus = {};

  return {
    right: { ...eye },
    left: { ...eye },
  };
};

const mergeExamData = (data = {}) => {
  const empty = createEmptyExam();

  return {
    right: {
      ...empty.right,
      ...(data.right || {}),
    },
    left: {
      ...empty.left,
      ...(data.left || {}),
    },
  };
};

const Examination = ({ data = {}, setData, saveNow, status }) => {
  const examData = mergeExamData(data);

  const handleChange = (eye, section, value) => {
    setData((prev = {}) => ({
      ...prev,
      [eye]: {
        ...(prev[eye] || {}),
        [section]: {
          ...((prev[eye] || {})[section] || {}),
          values: value,
        },
      },
    }));
  };

  const updateFundus = (eye, value) => {
    setData((prev = {}) => ({
      ...prev,
      [eye]: {
        ...(prev[eye] || {}),
        fundus:
          typeof value === "function"
            ? value((prev[eye] || {}).fundus || {})
            : value,
      },
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-4">
      <h1 className="text-xl font-bold">Eye Examination</h1>

      <div className="bg-white p-6 space-y-6">
        <MultiSelectExam data={examData} handleChange={handleChange} />

        <div className="grid grid-cols-2 gap-4">
          <Fundus
            title="FUNDUS Right"
            data={examData.right.fundus || {}}
            setData={(v) => updateFundus("right", v)}
          />

          <Fundus
            title="FUNDUS Left"
            data={examData.left.fundus || {}}
            setData={(v) => updateFundus("left", v)}
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white p-4 rounded shadow flex justify-between items-center">
        <button
          type="button"
          onClick={saveNow}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Examination
        </button>

        <span className="text-sm text-gray-600">
          {status === "saving" && "Saving..."}
          {status === "saved" && "Saved"}
          {status === "error" && "Error"}
        </span>
      </div>
    </div>
  );
};

export default Examination;
