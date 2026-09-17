import React from "react";

const distantOptions = [
  "PL-", "PL+", "FL", "HM", "CFCF", "FC",
  "1/60", "2/60", "3/60", "4/60", "5/60",
  "6/60", "6/36", "6/24", "6/18", "6/12",
  "6/9", "6/7.5", "6/6", "6/5",
];

const nearOptions = [
  "N4", "N5", "N6", "N8", "N10", "N12",
  "N14", "N18", "N24", "N26", "N36", "<N36",
];

const emptyVision = {
  distant: "",
  near: "",
  partial: false,
  comment: "",
};

const emptyRxRow = {
  sph: "",
  cyl: "",
  axis: "",
  vision: "",
};

const emptyRx = {
  distant: { ...emptyRxRow },
  add: { ...emptyRxRow },
  near: { ...emptyRxRow },
  comments: "",
  typeOfLens: "",
  lensMaterial: "",
  lensTint: "",
  frameMaterial: "",
  ipd: "",
  size: "",
  dia: "",
  prismBase: "",
  fittingHeight: "",
  advice: "",
};

const emptyEye = {
  visual: {
    ucva: { ...emptyVision },
    pinhole: { ...emptyVision },
    glasses: { ...emptyVision },
    contactLens: { ...emptyVision },
  },
  auto: {
    dry: { sph: "", cyl: "", axis: "" },
    dilated: { sph: "", cyl: "", axis: "" },
    comments: "",
  },
  dry: { ...emptyRx },
  dilated: { ...emptyRx },
  pgp: { ...emptyRx },
  glassesRx: { ...emptyRx },
};

const normalizeVision = (value) => {
  if (typeof value === "string") {
    return {
      ...emptyVision,
      distant: distantOptions.includes(value) ? value : "",
      near: nearOptions.includes(value) ? value : "",
    };
  }

  return {
    ...emptyVision,
    ...(value || {}),
    distant: value?.distant || value?.distance || "",
    near: value?.near || "",
  };
};

const safeRx = (rx = {}) => ({
  ...emptyRx,
  ...rx,
  distant: { ...emptyRxRow, ...(rx.distant || {}) },
  add: { ...emptyRxRow, ...(rx.add || {}) },
  near: { ...emptyRxRow, ...(rx.near || {}) },
});

const safeEye = (eye = {}) => ({
  visual: {
    ucva: normalizeVision(eye.visual?.ucva),
    pinhole: normalizeVision(eye.visual?.pinhole),
    glasses: normalizeVision(eye.visual?.glasses),
    contactLens: normalizeVision(eye.visual?.contactLens),
  },
  auto: {
    dry: { ...emptyEye.auto.dry, ...(eye.auto?.dry || {}) },
    dilated: { ...emptyEye.auto.dilated, ...(eye.auto?.dilated || {}) },
    comments: eye.auto?.comments || "",
  },
  dry: safeRx(eye.dry),
  dilated: safeRx(eye.dilated),
  pgp: safeRx(eye.pgp),
  glassesRx: safeRx(eye.glassesRx || eye.glasses),
});

const parsePower = (value) => {
  if (!value) return null;
  const num = Number(String(value).replace("+", ""));
  return Number.isNaN(num) ? null : num;
};

const formatPower = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
};

const calculateNear = (rx) => {
  const distantSph = parsePower(rx.distant?.sph);
  const addSph = parsePower(rx.add?.sph);

  if (distantSph === null || addSph === null) {
    return {
      ...rx,
      near: {
        ...rx.near,
        sph: "",
        cyl: rx.distant?.cyl || "",
        axis: rx.distant?.axis || "",
      },
    };
  }

  return {
    ...rx,
    near: {
      ...rx.near,
      sph: formatPower(distantSph + addSph),
      cyl: rx.distant?.cyl || "",
      axis: rx.distant?.axis || "",
    },
  };
};

const printVisionOnly = () => {
  document.body.classList.add("print-refraction-only");

  setTimeout(() => {
    window.print();
  }, 100);

  const cleanup = () => {
    document.body.classList.remove("print-refraction-only");
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
};


const titleClass =
  "bg-slate-900 text-white px-4 py-1 rounded-r-full text-xs font-bold inline-block";

const inputClass =
  "w-full border border-slate-300 px-2 py-1 text-center text-sm outline-none focus:border-blue-500 bg-white";

const disabledInputClass =
  "w-full border border-slate-200 bg-gray-100 px-2 py-1 text-center text-sm text-gray-400 cursor-not-allowed";

const selectClass =
  "w-full border border-slate-300 px-2 py-1 text-sm outline-none focus:border-blue-500 bg-white";

function OptionButton({ item, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 min-w-[48px] border border-slate-300 px-2 text-xs font-medium ${
        active ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-100"
      }`}
    >
      {item}
    </button>
  );
}

function OptionStrip({ label, options, value, onChange }) {
  return (
    <div className="grid grid-cols-[70px_1fr] items-start gap-2">
      <div className="text-xs font-semibold text-slate-600 pt-2">{label}</div>

      <div className="flex flex-wrap">
        {options.map((item) => (
          <OptionButton
            key={item}
            item={item}
            active={value === item}
            onClick={() => onChange(value === item ? "" : item)}
          />
        ))}
      </div>
    </div>
  );
}

function VisionRow({ label, value, onChange, showNear = false }) {
  const update = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="grid grid-cols-[110px_1fr_40px] gap-3 items-start border-b pb-3">
      <div className="text-sm font-bold pt-2">{label}</div>

      <div className="space-y-2">
        <OptionStrip
          label="Distant"
          options={distantOptions}
          value={value.distant}
          onChange={(v) => update("distant", v)}
        />

        {showNear && (
          <OptionStrip
            label="Near"
            options={nearOptions}
            value={value.near}
            onChange={(v) => update("near", v)}
          />
        )}

        <input
          className="w-full border border-slate-300 px-2 py-1 text-xs"
          placeholder={`${label} comment`}
          value={value.comment || ""}
          onChange={(e) => update("comment", e.target.value)}
        />
      </div>

      <button
        type="button"
        title="Partial"
        onClick={() => update("partial", !value.partial)}
        className={`h-8 border px-2 text-xs font-bold ${
          value.partial ? "bg-yellow-300 border-yellow-500" : "bg-white"
        }`}
      >
        P
      </button>
    </div>
  );
}

function VisualAcuityPanel({ eye, data, updateVisual }) {
  const updateField = (field, value) => {
    updateVisual({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
     
<div className={titleClass}>
  VISUAL ACUITY Va {eye === "right" ? "->" : "<-"}
</div>

        <button
          type="button"
          onClick={printVisionOnly}
          className="bg-blue-700 text-white px-3 py-1 rounded text-xs"
        >
          Print Vision
        </button>
      </div>

      <VisionRow
        label="UCVA"
        value={data.ucva}
        showNear
        onChange={(value) => updateField("ucva", value)}
      />

      <VisionRow
        label="Pinhole"
        value={data.pinhole}
        onChange={(value) => updateField("pinhole", value)}
      />

      <VisionRow
        label="Glasses"
        value={data.glasses}
        showNear
        onChange={(value) => updateField("glasses", value)}
      />

      <VisionRow
        label="Contact Lens"
        value={data.contactLens}
        onChange={(value) => updateField("contactLens", value)}
      />
    </div>
  );
}

function AutoRefraction({ data, updateAuto }) {
  const updateRow = (row, field, value) => {
    updateAuto({
      ...data,
      [row]: {
        ...data[row],
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-2">
      <div className={titleClass}>AUTO REFRACTION</div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-1"></th>
            <th className="border p-1">Sph</th>
            <th className="border p-1">Cyl</th>
            <th className="border p-1">Axis</th>
          </tr>
        </thead>

        <tbody>
          {["dry", "dilated"].map((row) => (
            <tr key={row}>
              <td className="border p-1 capitalize">{row}</td>
              {["sph", "cyl", "axis"].map((field) => (
                <td className="border p-1" key={field}>
                  <input
                    className={inputClass}
                    value={data[row]?.[field] || ""}
                    onChange={(e) => updateRow(row, field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <textarea
        placeholder="Comments"
        value={data.comments || ""}
        onChange={(e) => updateAuto({ ...data, comments: e.target.value })}
        className="border border-slate-300 p-2 text-sm h-14 w-full"
      />
    </div>
  );
}

function RxTable({ title, data, updateRx, onCopyToGlasses, showCopy = true }) {
  const updateCell = (row, field, value) => {
    if (row === "add" && field !== "sph") return;

    const next = {
      ...data,
      [row]: {
        ...data[row],
        [field]: value,
      },
    };

    if (row === "distant" || row === "add") {
      updateRx(calculateNear(next));
    } else {
      updateRx(next);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className={titleClass}>{title}</div>

        {showCopy && (
          <button
            type="button"
            onClick={onCopyToGlasses}
            className="bg-blue-700 text-white px-3 py-1 rounded text-xs"
          >
            Copy to Glasses
          </button>
        )}
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-1"></th>
            <th className="border p-1">Sph</th>
            <th className="border p-1">Cyl</th>
            <th className="border p-1">Axis</th>
            <th className="border p-1">Vision</th>
          </tr>
        </thead>

        <tbody>
          {["distant", "add", "near"].map((row) => (
            <tr key={row}>
              <td className="border p-1 capitalize">
                {row === "add" ? "Add*" : row}
              </td>

              {["sph", "cyl", "axis", "vision"].map((field) => {
                const disabled =
                  (row === "add" && field !== "sph") ||
                  (row === "near" && field === "sph");

                return (
                  <td className="border p-1" key={field}>
                    <input
                      className={disabled ? disabledInputClass : inputClass}
                      value={data[row]?.[field] || ""}
                      disabled={disabled}
                      onChange={(e) => updateCell(row, field, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <textarea
        placeholder="Comments"
        value={data.comments || ""}
        onChange={(e) => updateRx({ ...data, comments: e.target.value })}
        className="border border-slate-300 p-2 text-sm h-14 w-full"
      />
    </div>
  );
}

function GlassesPrescription({ data, updateRx }) {
  return (
    <div className="space-y-3">
      <RxTable
        title="GLASSES PRESCRIPTION Rx"
        data={data}
        updateRx={(value) => updateRx(calculateNear(value))}
        showCopy={false}
      />

      <div className="grid grid-cols-4 gap-3 text-sm">
        <div>
          <label>Type of Lens</label>
          <select
            className={selectClass}
            value={data.typeOfLens || ""}
            onChange={(e) => updateRx({ ...data, typeOfLens: e.target.value })}
          >
            <option value="">Select</option>
            <option>Single Vision</option>
            <option>Bifocal</option>
            <option>Progressive</option>
          </select>
        </div>

        <div>
          <label>IPD</label>
          <input
            className={inputClass}
            value={data.ipd || ""}
            onChange={(e) => updateRx({ ...data, ipd: e.target.value })}
          />
        </div>

        <div>
          <label>Size</label>
          <input
            className={inputClass}
            value={data.size || ""}
            onChange={(e) => updateRx({ ...data, size: e.target.value })}
          />
        </div>

        <div>
          <label>Lens Tint</label>
          <select
            className={selectClass}
            value={data.lensTint || ""}
            onChange={(e) => updateRx({ ...data, lensTint: e.target.value })}
          >
            <option value="">Select</option>
            <option>Clear</option>
            <option>Blue Cut</option>
            <option>Photochromic</option>
          </select>
        </div>

        <div>
          <label>Lens Material</label>
          <select
            className={selectClass}
            value={data.lensMaterial || ""}
            onChange={(e) => updateRx({ ...data, lensMaterial: e.target.value })}
          >
            <option value="">Select</option>
            <option>CR-39</option>
            <option>Polycarbonate</option>
            <option>High Index</option>
          </select>
        </div>

        <div>
          <label>Frame Material</label>
          <select
            className={selectClass}
            value={data.frameMaterial || ""}
            onChange={(e) => updateRx({ ...data, frameMaterial: e.target.value })}
          >
            <option value="">Select</option>
            <option>Metal</option>
            <option>Plastic</option>
            <option>Rimless</option>
          </select>
        </div>

        <div>
          <label>Dia</label>
          <input
            className={inputClass}
            value={data.dia || ""}
            onChange={(e) => updateRx({ ...data, dia: e.target.value })}
          />
        </div>

        <div>
          <label>Fitting Height</label>
          <input
            className={inputClass}
            value={data.fittingHeight || ""}
            onChange={(e) => updateRx({ ...data, fittingHeight: e.target.value })}
          />
        </div>
      </div>

      <textarea
        placeholder="Advice"
        value={data.advice || ""}
        onChange={(e) => updateRx({ ...data, advice: e.target.value })}
        className="border border-slate-300 p-2 text-sm h-16 w-full"
      />
    </div>
  );
}
function EyePanel({ eye, title, data, updateEye, copyBothEyesToGlasses }) {
  const updateSection = (section, value) => {
    updateEye({
      ...data,
      [section]: value,
    });
  };

  return (
    <div className="bg-white border border-slate-300">
      <div className="bg-green-800 text-white text-center font-bold py-2">
        {title}
      </div>

      <div className="p-3 space-y-5">
        <div className="refraction-vision-print">
          <VisualAcuityPanel
            eye={eye}
            data={data.visual}
            updateVisual={(value) => updateSection("visual", value)}
          />
        </div>

        <div className="refraction-rx-print">
          <AutoRefraction
            data={data.auto}
            updateAuto={(value) => updateSection("auto", value)}
          />

          <RxTable
            title={`DRY REFRACTION ${eye === "right" ? "->" : "<-"}`}
            data={data.dry}
            updateRx={(value) => updateSection("dry", value)}
            onCopyToGlasses={() => copyBothEyesToGlasses("dry")}
          />

          <RxTable
            title={`REFRACTION DILATED ${eye === "right" ? "->" : "<-"}`}
            data={data.dilated}
            updateRx={(value) => updateSection("dilated", value)}
            onCopyToGlasses={() => copyBothEyesToGlasses("dilated")}
          />

          <RxTable
            title={`PGP ${eye === "right" ? "->" : "<-"}`}
            data={data.pgp}
            updateRx={(value) => updateSection("pgp", value)}
            onCopyToGlasses={() => copyBothEyesToGlasses("pgp")}
          />

          <GlassesPrescription
            data={data.glassesRx}
            updateRx={(value) => updateSection("glassesRx", value)}
          />
        </div>
      </div>
    </div>
  );
}

export default function Refraction({ data = {}, setData, saveNow, status }) {
  const right = safeEye(data.right);
  const left = safeEye(data.left);

  const updateEye = (eye, value) => {
    setData((prev = {}) => ({
      ...prev,
      [eye]: value,
    }));
  };

  const copyRightToLeft = () => {
    setData((prev = {}) => ({
      ...prev,
      left: safeEye(prev.right),
    }));
  };

  const copyLeftToRight = () => {
    setData((prev = {}) => ({
      ...prev,
      right: safeEye(prev.left),
    }));
  };
  const copyBothEyesToGlasses = (sourceKey) => {
    setData((prev = {}) => {
      const currentRight = safeEye(prev.right);
      const currentLeft = safeEye(prev.left);

      return {
        ...prev,
        right: {
          ...currentRight,
          glassesRx: calculateNear({
            ...currentRight.glassesRx,
            distant: { ...currentRight[sourceKey].distant },
            add: {
              ...currentRight[sourceKey].add,
              cyl: "",
              axis: "",
              vision: "",
            },
            near: { ...currentRight[sourceKey].near },
            comments:
              currentRight[sourceKey].comments ||
              currentRight.glassesRx.comments ||
              "",
          }),
        },
        left: {
          ...currentLeft,
          glassesRx: calculateNear({
            ...currentLeft.glassesRx,
            distant: { ...currentLeft[sourceKey].distant },
            add: {
              ...currentLeft[sourceKey].add,
              cyl: "",
              axis: "",
              vision: "",
            },
            near: { ...currentLeft[sourceKey].near },
            comments:
              currentLeft[sourceKey].comments ||
              currentLeft.glassesRx.comments ||
              "",
          }),
        },
      };
    });
  };


 
 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="max-w-[1900px] mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-5 text-white">
          <div className="flex flex-wrap justify-between items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold">
                Refraction Examination
              </h1>

              <p className="text-blue-100 mt-1">
                Vision Assessment & Prescription Management
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={printVisionOnly}
                className="
                  bg-white
                  text-blue-700
                  px-5
                  py-2.5
                  rounded-xl
                  font-medium
                  hover:scale-105
                  transition
                "
              >
                Print Vision
              </button>

              <button
                type="button"
                onClick={copyRightToLeft}
                className="
                  bg-white/20
                  hover:bg-white/30
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  backdrop-blur
                  transition
                "
              >
                OD → OS
              </button>

              <button
                type="button"
                onClick={copyLeftToRight}
                className="
                  bg-white/20
                  hover:bg-white/30
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  backdrop-blur
                  transition
                "
              >
                OS → OD
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50">

          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <p className="text-slate-500 text-sm">
              Right Eye
            </p>

            <h3 className="text-2xl font-bold text-emerald-600">
              OD
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <p className="text-slate-500 text-sm">
              Left Eye
            </p>

            <h3 className="text-2xl font-bold text-indigo-600">
              OS
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <p className="text-slate-500 text-sm">
              Status
            </p>

            <h3 className="text-lg font-bold text-slate-700">
              {status === "saved"
                ? "Saved"
                : status === "saving"
                ? "Saving..."
                : "Draft"}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <p className="text-slate-500 text-sm">
              Examination
            </p>

            <h3 className="text-lg font-bold text-blue-600">
              Active
            </h3>
          </div>
        </div>
      </div>

      {/* Eye Panels */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          refraction-print-area
        "
      >
        <EyePanel
          eye="right"
          title="RIGHT EYE (OD)"
          data={right}
          updateEye={(value) => updateEye("right", value)}
          copyBothEyesToGlasses={copyBothEyesToGlasses}
        />

        <EyePanel
          eye="left"
          title="LEFT EYE (OS)"
          data={left}
          updateEye={(value) => updateEye("left", value)}
          copyBothEyesToGlasses={copyBothEyesToGlasses}
        />
      </div>

      {/* Save Footer */}
      <div
        className="
          sticky
          bottom-4
          z-50
        "
      >
        <div
          className="
            bg-white/95
            backdrop-blur
            rounded-3xl
            shadow-2xl
            border
            border-slate-200
            p-5
            flex
            flex-wrap
            justify-between
            items-center
            gap-4
          "
        >
          <div>
            <h3 className="font-semibold text-slate-800">
              Refraction Record
            </h3>

            <p className="text-sm text-slate-500">
              Changes are automatically saved
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div
              className={`
                px-4 py-2 rounded-xl text-sm font-medium

                ${
                  status === "saved"
                    ? "bg-green-100 text-green-700"
                    : status === "saving"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-600"
                }
              `}
            >
              {status === "saved" && "✓ Saved"}
              {status === "saving" && "Saving..."}
              {status !== "saved" &&
                status !== "saving" &&
                "Draft"}
            </div>

            <button
              type="button"
              onClick={saveNow}
              className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                hover:scale-105
                transition
              "
            >
              Save Refraction
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
