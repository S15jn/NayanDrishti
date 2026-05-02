import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ options = [], selected = [], setSelected, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const safeSelected = Array.isArray(selected) ? selected : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    let updated = safeSelected.includes(option)
      ? safeSelected.filter((i) => i !== option)
      : [...safeSelected, option];

    setSelected(updated);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="border px-2 py-1 bg-white cursor-pointer text-xs"
      >
        {safeSelected.length ? safeSelected.join(", ") : label}
      </div>

      {open && (
        <div className="absolute bg-white border w-full z-10 max-h-40 overflow-auto">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => toggleOption(o)}
              className="px-2 py-1 hover:bg-blue-100 cursor-pointer text-xs"
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;