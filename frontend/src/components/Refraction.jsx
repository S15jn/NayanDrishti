import React, { useState } from "react";

/* =========================
   CONSTANTS
========================= */
const visionOptions = [
  "PL-", "PL+", "FL", "HM", "CFCF", "FC",
  "1/60", "2/60", "3/60", "4/60",
  "6/60", "6/36", "6/24", "6/18",
  "6/12", "6/9", "6/6", "6/5"
];

const nearVision = ["N4","N5","N6","N8","N10","N12","N14","N18","N24","N36"];

const emptyPrescription = {
  sph: "",
  cyl: "",
  axis: "",
  vision: ""
};

/* =========================
   COMMON BUTTON STYLE
========================= */
const btnStyle = "text-xs h-8 flex items-center justify-center border rounded";

/* =========================
   VISUAL GRID
========================= */
const VisionGrid = ({ value, setValue }) => {
  return (
    <div className="grid grid-cols-6 gap-2 mb-3">
      {visionOptions.map((v) => (
        <button
          key={v}
          onClick={() => setValue(v)}
          className={`${btnStyle} ${
            value === v
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

/* =========================
   PRESCRIPTION TABLE
========================= */
const Prescription = ({ data, setData }) => {
  const update = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <input
        placeholder="Sph"
        value={data.sph}
        onChange={(e)=>update("sph", e.target.value)}
        className="border p-2 text-sm rounded"
      />
      <input
        placeholder="Cyl"
        value={data.cyl}
        onChange={(e)=>update("cyl", e.target.value)}
        className="border p-2 text-sm rounded"
      />
      <input
        placeholder="Axis"
        value={data.axis}
        onChange={(e)=>update("axis", e.target.value)}
        className="border p-2 text-sm rounded"
      />
      <input
        placeholder="Vision"
        value={data.vision}
        onChange={(e)=>update("vision", e.target.value)}
        className="border p-2 text-sm rounded"
      />
    </div>
  );
};

/* =========================
   EYE PANEL
========================= */
const EyePanel = ({ title }) => {
  const [ucva, setUcva] = useState("");
  const [pinhole, setPinhole] = useState("");
  const [glass, setGlass] = useState("");

  const [distant, setDistant] = useState(emptyPrescription);
  const [near, setNear] = useState(emptyPrescription);

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full space-y-4">

      <h2 className="text-center font-semibold text-lg">{title}</h2>

      {/* UCVA */}
      <div>
        <label className="text-sm font-medium">UCVA</label>
        <VisionGrid value={ucva} setValue={setUcva} />
      </div>

      {/* Near Vision */}
      <div>
        <label className="text-sm font-medium">Near</label>
        <div className="grid grid-cols-6 gap-2 mt-1">
          {nearVision.map((n) => (
            <button
              key={n}
              className={`${btnStyle} bg-gray-100 hover:bg-gray-200`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Pinhole */}
      <div>
        <label className="text-sm font-medium">Pinhole</label>
        <VisionGrid value={pinhole} setValue={setPinhole} />
      </div>

      {/* Glass */}
      <div>
        <label className="text-sm font-medium">Glass</label>
        <VisionGrid value={glass} setValue={setGlass} />
      </div>

      {/* Prescription */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Prescription</h3>

        <div className="mb-3">
          <p className="text-xs mb-1">Distant</p>
          <Prescription data={distant} setData={setDistant} />
        </div>

        <div>
          <p className="text-xs mb-1">Near</p>
          <Prescription data={near} setData={setNear} />
        </div>
      </div>

      {/* Lens Details */}
      <div className="grid grid-cols-2 gap-2">
        <select className="border p-2 text-sm rounded">
          <option>Type of Lens</option>
        </select>

        <input placeholder="IPD (mm)" className="border p-2 text-sm rounded"/>

        <select className="border p-2 text-sm rounded">
          <option>Lens Material</option>
        </select>

        <select className="border p-2 text-sm rounded">
          <option>Lens Tint</option>
        </select>

        <select className="border p-2 text-sm rounded">
          <option>Frame Material</option>
        </select>

        <input placeholder="Size" className="border p-2 text-sm rounded"/>
      </div>

      {/* Comments */}
      <textarea
        placeholder="Comments..."
        className="w-full border p-2 rounded text-sm"
      />
    </div>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const Refraction = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        <EyePanel title="Right (OD)" />
        <EyePanel title="Left (OS)" />
      </div>
    </div>
  );
};

export default Refraction;