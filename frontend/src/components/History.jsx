import React, { useState } from "react";

/* =========================
   COMMON CONFIG
========================= */
const durationUnits = ["Days", "Months", "Years"];
const eyeOptions = ["Left", "Right", "Both"];

/* =========================
   REUSABLE ROW
========================= */
const Row = ({ row, index, updateRow, removeRow, showEye = true }) => {
  return (
    <div className="grid grid-cols-6 gap-2 mb-2 items-center">
      <input value={row.name} readOnly className="border px-2 py-1 rounded bg-gray-100" />

      {showEye ? (
        <select
          value={row.eye}
          onChange={(e) => updateRow(index, "eye", e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Eye</option>
          {eyeOptions.map((opt) => <option key={opt}>{opt}</option>)}
        </select>
      ) : <div />}

      <input
        type="number"
        value={row.duration}
        onChange={(e) => updateRow(index, "duration", e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="Duration"
      />

      <select
        value={row.unit}
        onChange={(e) => updateRow(index, "unit", e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Unit</option>
        {durationUnits.map((u) => <option key={u}>{u}</option>)}
      </select>

      <input
        value={row.comment}
        onChange={(e) => updateRow(index, "comment", e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="Comment..."
      />

      <button onClick={() => removeRow(index)} className="text-red-500">❌</button>
    </div>
  );
};

/* =========================
   REUSABLE SECTION
========================= */
const Section = ({ title, options, showEye = true }) => {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  const addRow = (name) => {
    if (!selected.includes(name)) {
      setSelected([...selected, name]);
      setRows([...rows, { name, eye: "", duration: "", unit: "", comment: "" }]);
    }
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const removeRow = (index) => {
    const removed = rows[index].name;
    setRows(rows.filter((_, i) => i !== index));
    setSelected(selected.filter((s) => s !== removed));
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">{title}</h2>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => addRow(opt)}
            className={`px-3 py-1 text-sm rounded border ${
              selected.includes(opt)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="grid grid-cols-6 text-xs text-gray-500 mb-2">
        <div>Name</div>
        {showEye && <div>Eye</div>}
        {!showEye && <div />}
        <div>Duration</div>
        <div>Unit</div>
        <div>Comment</div>
        <div />
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <Row key={i} row={row} index={i} updateRow={updateRow} removeRow={removeRow} showEye={showEye} />
      ))}

      <textarea placeholder="Section Comments..." className="w-full border p-2 mt-3 rounded" />
    </div>
  );
};

/* =========================
   ALLERGIES COMPONENT
========================= */
const Allergies = () => {
  const drugOptions = ["Antimicrobial Agents","Antifungal Agents","Antiviral Agents","NSAIDs","Eye Drops"];
  const contactOptions = ["Alcohol","Latex","Betadine","Adhesive Tape","Tegaderm","Transpore"];

  const [drugSelected, setDrugSelected] = useState([]);
  const [contactSelected, setContactSelected] = useState([]);

  const toggle = (list, setList, item) => {
    setList(
      list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item]
    );
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">Drug Allergies</h2>

      {/* Drug Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {drugOptions.map((item) => (
          <button
            key={item}
            onClick={() => toggle(drugSelected, setDrugSelected, item)}
            className={`px-3 py-1 text-sm rounded border ${
              drugSelected.includes(item)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea placeholder="Drug Allergies Comment..." className="w-full border p-2 rounded mb-4" />

      {/* Contact Allergies */}
      <h2 className="font-semibold mb-3">Contact Allergies</h2>

      <div className="flex flex-wrap gap-2">
        {contactOptions.map((item) => (
          <button
            key={item}
            onClick={() => toggle(contactSelected, setContactSelected, item)}
            className={`px-3 py-1 text-sm rounded border ${
              contactSelected.includes(item)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

/* =========================
   MAIN HISTORY PAGE
========================= */
const History = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Chief Complaints */}
      <Section
        title="Chief Complaints"
        options={[
          "Blurring Vision","Redness","Pain","Watering","Discharge",
          "Dryness","Itching","Headache","Foreign Body Sensation"
        ]}
      />

      {/* Ophthalmic History */}
      <Section
        title="Ophthalmic History"
        options={[
          "Glaucoma","Retinal Detachment","Glass","Eye Surgery",
          "Uveitis","Retinal Laser","Contact Lens"
        ]}
      />

      {/* Systemic History */}
      <Section
        title="Systemic History"
        options={[
          "Diabetes","Hypertension","Alcoholism","Smoking Tobacco",
          "Cardiac Disorder","Steroid Intake","Drug Abuse","HIV/AIDS",
          "Cancer Tumor","Tuberculosis","Asthma","CNS Disorder Stroke",
          "Hypothyroidism","Hyperthyroidism","Renal Disorder",
          "On Insulin","Thyroid Disorder","CVA"
        ]}
        showEye={false}
      />

      {/* Family History */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Family History</h2>
        <input className="w-full border p-2 mb-2 rounded" placeholder="Family History..." />
        <input className="w-full border p-2 rounded" placeholder="Medical History..." />
      </div>

      {/* Allergies */}
      <Allergies />

    </div>
  );
};

export default History;