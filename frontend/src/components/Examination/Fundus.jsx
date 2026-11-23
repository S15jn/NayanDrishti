
import React from "react";

const maculaOptions = [
  "Foveal Reflex",
  "Hard Exudates",
  "Microaneurysm",
  "Hemorrhages",
  "Subretinal Hemorrhages",
  "Scar",
  "Atrophic Area",
  "Pigment Alteration",
  "Drusen",
  "Subretinal Fluid",
  "Cystoid",
  "Thickening",
  "Whitening",
  "Cotton Wool Spots",
  "Pigment Epithelial Detachment",
  "Altered Foveal Reflex",
  "Vascular Abnormalities",
  "Pigmentary Changes",
  "Epiretinal Membrane",
  "FTMH",
  "Lamellar Hole",
  "ILM Striae",
  "White Dots",
  "Yellow Flecks",
  "Cherry Red Spot",
];

const statusOptions = ["Normal", "Abnormal"];

const fieldClass =
  "min-h-[42px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const Field = React.memo(function Field({ label, keyName, data, update }) {
  return (
    <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[0.8fr_1fr_1.4fr] md:items-center">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={data[keyName] || ""}
        onChange={(event) => update(keyName, event.target.value)}
        className={fieldClass}
      >
        <option value="">Select</option>
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        value={data[`${keyName}_comment`] || ""}
        onChange={(event) =>
          update(`${keyName}_comment`, event.target.value)
        }
        placeholder="Comment"
        className={fieldClass}
      />
    </div>
  );
});

const Fundus = ({ data = {}, setData, title }) => {
  const update = (key, value) => {
    setData((prev = {}) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleMacula = (item) => {
    const list = Array.isArray(data.macula) ? data.macula : [];
    const updated = list.includes(item)
      ? list.filter((value) => value !== item)
      : [...list, item];

    update("macula", updated);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Posterior Segment
          </p>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>

        <select
          value={data.overall || ""}
          onChange={(event) => update("overall", event.target.value)}
          className={fieldClass}
        >
          <option value="">Overall</option>
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
        </select>
      </div>

      <div className="space-y-3 p-5">
        <Field label="Media" keyName="media" data={data} update={update} />
        <Field label="PVD" keyName="pvd" data={data} update={update} />
        <Field label="Disc Size" keyName="discSize" data={data} update={update} />
        <Field label="C/D Ratio" keyName="cdr" data={data} update={update} />
        <Field label="Optic Disc" keyName="opticDisc" data={data} update={update} />
        <Field label="Blood Vessels" keyName="vessels" data={data} update={update} />

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Macula</p>
              <p className="text-xs text-slate-500">
                {Array.isArray(data.macula) ? data.macula.length : 0} selected
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {maculaOptions.map((item) => {
              const selected = Array.isArray(data.macula) &&
                data.macula.includes(item);

              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleMacula(item)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    selected
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  {selected ? "Added: " : "+ "}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Fundus Comments
          </label>

          <textarea
            value={data.comments || ""}
            onChange={(event) => update("comments", event.target.value)}
            placeholder="Add fundus notes..."
            rows={4}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Fundus;
