import MultiSelect from "./MultiSelect";
import { sections } from "./config";

const titleCase = (value) =>
  value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

const MultiSelectExam = ({
  data = {},
  handleChange,
  handleCommentChange,
}) => {
  const right = data.right || {};
  const left = data.left || {};
  const comments = data.comment || {};

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Anterior Segment
        </p>
        <h2 className="text-lg font-bold text-slate-900">
          Eye Examination Findings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Select findings for each eye and add section notes.
        </p>
      </div>

      <div className="p-5">
        <div className="hidden grid-cols-[1fr_1.2fr_1.2fr_1.4fr] gap-4 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
          <div>Section</div>
          <div>Right Eye OD</div>
          <div>Left Eye OS</div>
          <div>Comment</div>
        </div>

        <div className="mt-3 space-y-3">
          {Object.entries(sections).map(([section, options]) => (
            <div
              key={section}
              className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_1.2fr_1.2fr_1.4fr] lg:items-start"
            >
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {titleCase(section)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {options.length} options
                </p>
              </div>

              <MultiSelect
                options={options}
                selected={right[section]?.values || []}
                setSelected={(value) => handleChange("right", section, value)}
                label="Select right eye"
              />

              <MultiSelect
                options={options}
                selected={left[section]?.values || []}
                setSelected={(value) => handleChange("left", section, value)}
                label="Select left eye"
              />

              <input
                type="text"
                value={comments[section] || ""}
                onChange={(event) =>
                  handleCommentChange(section, event.target.value)
                }
                placeholder="Comment"
                className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectExam;