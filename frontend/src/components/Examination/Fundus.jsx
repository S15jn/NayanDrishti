import React from "react";

const Fundus = ({ data = {}, setData, title }) => {

  const update = (k, v) => {
    setData(prev => ({ ...prev, [k]: v }));
  };

  const Field = ({ label, keyName }) => (
    <>
      <span>{label}</span>

      <select
        value={data[keyName] || ""}
        onChange={(e)=>update(keyName, e.target.value)}
        className="border p-1 text-xs"
      >
        <option value="">Select</option>
        <option>Normal</option>
        <option>Abnormal</option>
      </select>

      <input
        value={data[`${keyName}_comment`] || ""}
        onChange={(e)=>update(`${keyName}_comment`, e.target.value)}
        placeholder="comment"
        className="border p-1 text-xs col-span-2"
      />
    </>
  );

  const maculaOptions = [
    "Foveal Reflex","Hard Exudates","Microaneurysm","Hemorrhages",
    "Subretinal Hemorrhages","Scar","Atrophic area","Pigment Alteration",
    "Drusen","Subretinal Fluid","Cystoid","Thickening","Whitening",
    "Cotton Wool Spots","Pigment Epithelial Detachment","Altered Foveal Reflex",
    "Vascular Abnormalities","Pigmentary Changes","Epiretinal Membrane",
    "FTMH","Lamellar Hole","ILM Striae","White Dots","Yellow Flecks",
    "Cherry Red Spot"
  ];

  const toggleMacula = (item) => {
    const list = data.macula || [];
    const updated = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    update("macula", updated);
  };

  return (
    <div className="border p-3 text-xs">

      <div className="flex justify-between mb-2">
        <span className="bg-black text-white px-2 py-1 text-xs">{title}</span>
        <input className="border px-2 text-xs w-24" placeholder="Normal" />
      </div>

      <div className="grid grid-cols-4 gap-2 items-center">
        <Field label="Media" keyName="media" />

        <span>PVD</span>
        <select className="border p-1 text-xs" />

        <span>Disc Size</span>
        <select className="border p-1 text-xs" />

        <Field label="C/D Ratio" keyName="cdr" />
        <Field label="Optic Disc" keyName="opticDisc" />
        <Field label="Blood Vessels" keyName="vessels" />
      </div>

      <div className="mt-3">
        <span>Macula</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {maculaOptions.map(m => (
            <button
              key={m}
              onClick={()=>toggleMacula(m)}
              className={`text-[10px] px-2 py-1 border ${
                data.macula?.includes(m)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={data.comments || ""}
        onChange={(e)=>update("comments", e.target.value)}
        className="border w-full mt-2 p-2 text-xs"
        placeholder="Comments"
      />
    </div>
  );
};

export default Fundus;