import React, { useState, useRef, useEffect } from "react";

/* =========================
   MultiSelect Component
========================= */
const MultiSelect = ({ options = [], selected = [], setSelected, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Always safe array
  const safeSelected = Array.isArray(selected) ? selected : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    let updated = [];

    if (safeSelected.includes(option)) {
      updated = safeSelected.filter((item) => item !== option);
    } else {
      updated = [...safeSelected, option];
    }

    setSelected(updated);
    setOpen(false); // auto close
  };

  const removeTag = (e, option) => {
    e.stopPropagation();
    setSelected(safeSelected.filter((item) => item !== option));
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Input */}
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-lg px-3 py-2 bg-white cursor-pointer min-h-[42px] flex flex-wrap gap-1"
      >
        {safeSelected.length > 0 ? (
          safeSelected.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1"
            >
              {item}
              <button
                onClick={(e) => removeTag(e, item)}
                className="text-xs text-red-500"
              >
                ✕
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">{label}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                safeSelected.includes(option) ? "bg-blue-100" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================
   Sections Data
========================= */
const sections = {
  appearance: [
    "Phthisis Bulbi",
    "Anophthalmos",
    "Microphthalmos",
    "Artificial Eye",
    "Proptosis",
    "Dystopia",
  ],
  injury: [
    "Open Globe - Rupture",
    "Penetration",
    "IOFB",
    "Perforation",
    "Closed Globe - Contusion",
    "Lamellar Laceration",
    "Superficial FB",
    "Mixed",
  ],
  conjunctiva: [
    "Congestion",
    "Tear",
    "Conjunctival Bleb",
    "Subconjunctival Hemorrhage",
    "Foreign Body",
    "Follicles",
    "Papillae",
    "Pinguecula",
    "Pterygium",
    "Phlycten",
  ],
  cornea: [
    "Normal",
    "Epithelial Defect",
    "Thinning",
    "Scarring",
    "Vascularisation",
    "Degeneration",
    "Dystrophy",
    "Foreign Body",
    "Tear",
    "KP",
    "Opacity",
    "Ulcer",
    "Suture",
    "Graft",
    "Edema",
  ],
  pupil: ["Round", "Eccentric", "Irregular", "Oval", "Polycoria"],
  iris: [
    "Normal",
    "Defects",
    "NVI",
    "Anterior Synechiae",
    "Posterior Synechiae",
    "Peripheral Iridotomy",
  ],
  lens: [
    "Clear",
    "Cataract",
    "Pseudophakia",
    "Aphakia",
    "Central",
    "Decentered",
    "Subluxated",
  ],
};

/* =========================
   Main Component
========================= */
const Examination = () => {
  const [data, setData] = useState({
    left: {},
    right: {},
  });

  const handleChange = (eye, section, value) => {
    setData((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [section]: {
          ...prev[eye][section],
          values: Array.isArray(value) ? value : [],
        },
      },
    }));
  };

  const handleComment = (eye, section, comment) => {
    setData((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [section]: {
          ...prev[eye][section],
          comment,
        },
      },
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Eye Examination</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {Object.entries(sections).map(([section, options]) => (
          <div
            key={section}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Section Name */}
            <div className="font-semibold capitalize text-gray-700 pt-2">
              {section}
            </div>

            {/* LEFT */}
            <div className="space-y-2">
              <MultiSelect
                options={options}
                selected={
                  Array.isArray(data.left[section]?.values)
                    ? data.left[section].values
                    : []
                }
                setSelected={(val) => handleChange("left", section, val)}
                label="Left Eye"
              />

              <input
                type="text"
                placeholder="Comment..."
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={data.left[section]?.comment || ""}
                onChange={(e) =>
                  handleComment("left", section, e.target.value)
                }
              />
            </div>

            {/* RIGHT */}
            <div className="space-y-2">
              <MultiSelect
                options={options}
                selected={
                  Array.isArray(data.right[section]?.values)
                    ? data.right[section].values
                    : []
                }
                setSelected={(val) => handleChange("right", section, val)}
                label="Right Eye"
              />

              <input
                type="text"
                placeholder="Comment..."
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={data.right[section]?.comment || ""}
                onChange={(e) =>
                  handleComment("right", section, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

  
    </div>
  );
};

export default Examination;