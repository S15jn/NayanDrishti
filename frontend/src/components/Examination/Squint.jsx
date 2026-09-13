import React, { useState } from "react";

const defaultState = {
  comments: "",
  generalExam: "Normal",
  generalExamComment: "",
  oneEye: "No",
  oneEyeComment: "",
  squintEval: "No",
  squintEvalComment: "",
  extraOcular: {
    right: {
      uni: "Full",
      bi: "Full",
      prism: "",
      squint: "",
      type: "Tropia",
      comment: "",
    },
    left: {
      uni: "Full",
      bi: "Full",
      comment: "",
    },
  },
  headPosture: {
    chin: "",
    faceTurn: "",
    headTilt: "",
    comment: "",
  },
  specs: "With Glasses",
  hirschberg: {
    right: "",
    left: "",
    comment: "",
  },
  fixation: {
    right: "",
    left: "",
    comment: "",
  },
  worthTest: {
    distance: "",
    near: "",
    comment: "",
  },
  coverTest: {
    distance: "",
    near: "",
    comment: "",
  },
  stereopsis: "",
  stereopsisComment: "",
  prism: "",
  squintType: "Tropia",
  squintComments: "",
};

function Squint({ data, setData }) {
  const [localForm, setLocalForm] = useState(defaultState);
  const form = data || localForm;
  const controlled = typeof setData === "function";

  const updateForm = (updater) => {
    if (controlled) {
      setData(updater);
    } else {
      setLocalForm(updater);
    }
  };

  const handleChange = (path, value) => {
    updateForm((prev = defaultState) => {
      const updated = { ...prev };
      let obj = updated;

      for (let i = 0; i < path.length - 1; i++) {
        obj[path[i]] = { ...(obj[path[i]] || {}) };
        obj = obj[path[i]];
      }

      obj[path[path.length - 1]] = value;
      return updated;
    });
  };

  const Select = ({ value, onChange }) => (
    <select
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
    >
      <option value="">Select</option>
      <option value="Normal">Normal</option>
      <option value="Abnormal">Abnormal</option>
      <option value="Full">Full</option>
      <option value="Restricted">Restricted</option>
      <option value="Overaction">Overaction</option>
      <option value="Fusion">Fusion</option>
      <option value="Suppression">Suppression</option>
      <option value="Diplopia">Diplopia</option>
      <option value="ARC">ARC</option>
    </select>
  );

  const Input = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder || label}
        className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  );

  const CommentBox = ({ value, onChange }) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Comments
      </label>
      <textarea
        rows={4}
        placeholder="Enter comments..."
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[100px] w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  );

  const ToggleGroup = ({ value, options, onChange }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            value === option
              ? "border-violet-600 bg-violet-600 text-white"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          Examination
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          Squint Examination
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 font-bold text-slate-900">General Examination</h3>
          <ToggleGroup
            value={form.generalExam}
            options={["Normal", "Abnormal"]}
            onChange={(value) => handleChange(["generalExam"], value)}
          />
          <div className="mt-4">
            <CommentBox
              value={form.generalExamComment}
              onChange={(value) => handleChange(["generalExamComment"], value)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 font-bold text-slate-900">One Eye</h3>
          <ToggleGroup
            value={form.oneEye}
            options={["Yes", "No"]}
            onChange={(value) => handleChange(["oneEye"], value)}
          />
          <div className="mt-4">
            <CommentBox
              value={form.oneEyeComment}
              onChange={(value) => handleChange(["oneEyeComment"], value)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 font-bold text-slate-900">Squint Evaluation</h3>
          <ToggleGroup
            value={form.squintEval}
            options={["Yes", "No"]}
            onChange={(value) => handleChange(["squintEval"], value)}
          />
          <div className="mt-4">
            <CommentBox
              value={form.squintEvalComment}
              onChange={(value) => handleChange(["squintEvalComment"], value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="mb-4 font-bold text-slate-900">Right Eye</h3>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Uninocular
              </label>
              <Select
                value={form.extraOcular?.right?.uni}
                onChange={(value) =>
                  handleChange(["extraOcular", "right", "uni"], value)
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Binocular
              </label>
              <Select
                value={form.extraOcular?.right?.bi}
                onChange={(value) =>
                  handleChange(["extraOcular", "right", "bi"], value)
                }
              />
            </div>

            <Input
              label="Prism"
              value={form.extraOcular?.right?.prism}
              onChange={(value) =>
                handleChange(["extraOcular", "right", "prism"], value)
              }
            />

            <Input
              label="Squint"
              value={form.extraOcular?.right?.squint}
              onChange={(value) =>
                handleChange(["extraOcular", "right", "squint"], value)
              }
            />
          </div>

          <div className="mt-4">
            <ToggleGroup
              value={form.extraOcular?.right?.type}
              options={["Tropia", "Phoria"]}
              onChange={(value) =>
                handleChange(["extraOcular", "right", "type"], value)
              }
            />
          </div>

          <div className="mt-4">
            <CommentBox
              value={form.extraOcular?.right?.comment}
              onChange={(value) =>
                handleChange(["extraOcular", "right", "comment"], value)
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="mb-4 font-bold text-slate-900">Left Eye</h3>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Uninocular
              </label>
              <Select
                value={form.extraOcular?.left?.uni}
                onChange={(value) =>
                  handleChange(["extraOcular", "left", "uni"], value)
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Binocular
              </label>
              <Select
                value={form.extraOcular?.left?.bi}
                onChange={(value) =>
                  handleChange(["extraOcular", "left", "bi"], value)
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <CommentBox
              value={form.extraOcular?.left?.comment}
              onChange={(value) =>
                handleChange(["extraOcular", "left", "comment"], value)
              }
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="mb-4 font-bold text-slate-900">Head Posture</h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Chin
              </label>
              <ToggleGroup
                value={form.headPosture?.chin}
                options={["Elevation", "Depression"]}
                onChange={(value) => handleChange(["headPosture", "chin"], value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Face Turn
              </label>
              <ToggleGroup
                value={form.headPosture?.faceTurn}
                options={["Right", "Left"]}
                onChange={(value) =>
                  handleChange(["headPosture", "faceTurn"], value)
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Head Tilt
              </label>
              <ToggleGroup
                value={form.headPosture?.headTilt}
                options={["Right", "Left"]}
                onChange={(value) =>
                  handleChange(["headPosture", "headTilt"], value)
                }
              />
            </div>

            <CommentBox
              value={form.headPosture?.comment}
              onChange={(value) => handleChange(["headPosture", "comment"], value)}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 p-4">
            <h3 className="mb-4 font-bold text-slate-900">Hirschberg Test</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Select
                value={form.hirschberg?.right}
                onChange={(value) => handleChange(["hirschberg", "right"], value)}
              />
              <Select
                value={form.hirschberg?.left}
                onChange={(value) => handleChange(["hirschberg", "left"], value)}
              />
            </div>
            <div className="mt-4">
              <CommentBox
                value={form.hirschberg?.comment}
                onChange={(value) =>
                  handleChange(["hirschberg", "comment"], value)
                }
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <h3 className="mb-4 font-bold text-slate-900">Stereopsis</h3>
            <Input
              label="Arc Seconds"
              value={form.stereopsis}
              onChange={(value) => handleChange(["stereopsis"], value)}
            />
            <div className="mt-4">
              <CommentBox
                value={form.stereopsisComment}
                onChange={(value) => handleChange(["stereopsisComment"], value)}
              />
            </div>
          </div>
        </div>
      </div>

      {!controlled && (
        <button
          type="button"
          onClick={() => console.log(form)}
          className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700"
        >
          Save Squint
        </button>
      )}
    </div>
  );
}

export default Squint;