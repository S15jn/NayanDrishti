import Grid from "./Grid";

const sectionTitle =
  "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow";

const rowTitle =
  "font-semibold text-slate-700 text-sm min-w-[110px]";

const commentInput =
  "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

const toggleButton = (active) =>
  `w-10 h-10 rounded-lg border font-bold transition-all ${
    active
      ? "bg-yellow-400 border-yellow-500 text-black"
      : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
  }`;

function VisionRow({
  title,
  value,
  setValue,
  partial,
  setPartial,
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
      <div className="flex gap-4 items-start">
        <div className={rowTitle}>{title}</div>

        <div className="flex-1">
          <Grid
            value={value}
            setValue={setValue}
          />
        </div>

        <button
          type="button"
          title="Partial"
          onClick={() => setPartial(!partial)}
          className={toggleButton(partial)}
        >
          P
        </button>
      </div>
    </div>
  );
}

const VisualAcuity = ({ data = {}, setData }) => {
  const update = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-3">
        <h3 className="text-white font-bold text-lg">
          Visual Acuity (VA)
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* UCVA */}
        <VisionRow
          title="UCVA"
          value={data.ucva || ""}
          setValue={(v) => update("ucva", v)}
          partial={data.ucvaPartial}
          setPartial={(v) => update("ucvaPartial", v)}
        />

        {/* PINHOLE */}
        <VisionRow
          title="Pinhole"
          value={data.pinhole || ""}
          setValue={(v) => update("pinhole", v)}
          partial={data.pinholePartial}
          setPartial={(v) => update("pinholePartial", v)}
        />

        {/* GLASSES */}
        <VisionRow
          title="Glasses"
          value={data.glass || ""}
          setValue={(v) => update("glass", v)}
          partial={data.glassPartial}
          setPartial={(v) => update("glassPartial", v)}
        />

        {/* CONTACT LENS */}
        <VisionRow
          title="Contact Lens"
          value={data.contact || ""}
          setValue={(v) => update("contact", v)}
          partial={data.contactPartial}
          setPartial={(v) => update("contactPartial", v)}
        />

        {/* COMMENTS */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Comments
          </label>

          <textarea
            rows={3}
            className={commentInput}
            placeholder="Add visual acuity remarks..."
            value={data.comments || ""}
            onChange={(e) =>
              update("comments", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VisualAcuity;