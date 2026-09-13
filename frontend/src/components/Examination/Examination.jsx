import MultiSelectExam from "./MultiSelectExam";
import Fundus from "./Fundus";
import { movementOptions, sections } from "./config";

const createEmptySquint = () => ({
  generalExam: "Normal",
  oneEye: "No",
  squintEval: "No",
  extraOcular: {
    uni: "Full",
    bi: "Full",
    prism: "",
    squint: "",
    type: "Tropia",
    comment: "",
  },
  headPosture: {
    chin: "",
    faceTurn: "",
    headTilt: "",
  },
  hirschberg: "",
  fixation: "",
  worthDistance: "",
  worthNear: "",
  coverDistance: "",
  coverNear: "",
  stereopsis: "",
});

const createEmptyExam = () => {
  const eye = {};

  Object.keys(sections).forEach((section) => {
    eye[section] = {
      values: [],
      comment: "",
    };
  });

  eye.fundus = {};
  eye.squint = createEmptySquint();

  return {
    right: { ...eye },
    left: { ...eye },
    comment: {},
  };
};

const mergeExamData = (data = {}) => {
  const empty = createEmptyExam();

  return {
    right: {
      ...empty.right,
      ...(data.right || {}),
      squint: {
        ...empty.right.squint,
        ...(data.right?.squint || {}),
        extraOcular: {
          ...empty.right.squint.extraOcular,
          ...(data.right?.squint?.extraOcular || {}),
        },
        headPosture: {
          ...empty.right.squint.headPosture,
          ...(data.right?.squint?.headPosture || {}),
        },
      },
    },
    left: {
      ...empty.left,
      ...(data.left || {}),
      squint: {
        ...empty.left.squint,
        ...(data.left?.squint || {}),
        extraOcular: {
          ...empty.left.squint.extraOcular,
          ...(data.left?.squint?.extraOcular || {}),
        },
        headPosture: {
          ...empty.left.squint.headPosture,
          ...(data.left?.squint?.headPosture || {}),
        },
      },
    },
    comment: {
      ...empty.comment,
      ...(data.comment || {}),
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

  const handleCommentChange = (section, value) => {
    setData((prev = {}) => ({
      ...prev,
      comment: {
        ...(prev.comment || {}),
        [section]: value,
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

  const updateSquint = (eye, field, value) => {
    setData((prev = {}) => ({
      ...prev,
      [eye]: {
        ...(prev[eye] || {}),
        squint: {
          ...((prev[eye] || {}).squint || {}),
          [field]: value,
        },
      },
    }));
  };

  const updateSquintNested = (eye, parent, field, value) => {
    setData((prev = {}) => ({
      ...prev,
      [eye]: {
        ...(prev[eye] || {}),
        squint: {
          ...((prev[eye] || {}).squint || {}),
          [parent]: {
            ...((prev[eye] || {}).squint?.[parent] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const statusText = {
    saving: "Saving...",
    saved: "Saved",
    error: "Save failed",
  };

  const Select = ({ value, onChange }) => (
    <select
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      <option value="">Select</option>
      {movementOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const Input = ({ placeholder, value, onChange }) => (
    <input
      placeholder={placeholder}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Examination
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              Eye Examination
            </h1>
          </div>

          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600">
            {statusText[status] || "Ready"}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <MultiSelectExam
          data={examData}
          handleChange={handleChange}
          handleCommentChange={handleCommentChange}
        />

        <div className="grid gap-5 xl:grid-cols-2">
          <Fundus
            title="Fundus Right Eye"
            data={examData.right.fundus || {}}
            setData={(value) => updateFundus("right", value)}
          />

          <Fundus
            title="Fundus Left Eye"
            data={examData.left.fundus || {}}
            setData={(value) => updateFundus("left", value)}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
              Squint
            </p>
            <h2 className="text-lg font-bold text-slate-900">
              Squint Examination
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Extra ocular movement and binocular function assessment.
            </p>
          </div>

          <div className="space-y-5 p-5">
            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 text-base font-bold text-slate-900">
                  Right Eye
                </h3>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Uninocular
                    </label>
                    <Select
                      value={examData.right.squint.extraOcular.uni}
                      onChange={(value) =>
                        updateSquintNested("right", "extraOcular", "uni", value)
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Binocular
                    </label>
                    <Select
                      value={examData.right.squint.extraOcular.bi}
                      onChange={(value) =>
                        updateSquintNested("right", "extraOcular", "bi", value)
                      }
                    />
                  </div>

                  <Input
                    placeholder="Prism"
                    value={examData.right.squint.extraOcular.prism}
                    onChange={(value) =>
                      updateSquintNested("right", "extraOcular", "prism", value)
                    }
                  />

                  <Input
                    placeholder="Squint"
                    value={examData.right.squint.extraOcular.squint}
                    onChange={(value) =>
                      updateSquintNested("right", "extraOcular", "squint", value)
                    }
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 text-base font-bold text-slate-900">
                  Left Eye
                </h3>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Uninocular
                    </label>
                    <Select
                      value={examData.left.squint.extraOcular.uni}
                      onChange={(value) =>
                        updateSquintNested("left", "extraOcular", "uni", value)
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Binocular
                    </label>
                    <Select
                      value={examData.left.squint.extraOcular.bi}
                      onChange={(value) =>
                        updateSquintNested("left", "extraOcular", "bi", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Input
                placeholder="Hirschberg"
                value={examData.right.squint.hirschberg}
                onChange={(value) => updateSquint("right", "hirschberg", value)}
              />

              <Input
                placeholder="Worth Distance"
                value={examData.right.squint.worthDistance}
                onChange={(value) =>
                  updateSquint("right", "worthDistance", value)
                }
              />

              <Input
                placeholder="Stereopsis"
                value={examData.right.squint.stereopsis}
                onChange={(value) => updateSquint("right", "stereopsis", value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-slate-600">
            {statusText[status] || "Ready to save"}
          </span>

          <button
            type="button"
            onClick={saveNow}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Save Examination
          </button>
        </div>
      </div>
    </div>
  );
};

export default Examination;