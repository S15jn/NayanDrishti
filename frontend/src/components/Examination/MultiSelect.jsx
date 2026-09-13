import React, { useEffect, useRef, useState } from "react";

const MultiSelect = ({ options = [], selected = [], setSelected, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const safeSelected = Array.isArray(selected) ? selected : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const updated = safeSelected.includes(option)
      ? safeSelected.filter((item) => item !== option)
      : [...safeSelected, option];

    setSelected(updated);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-800 shadow-sm outline-none transition hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        {safeSelected.length ? (
          <span className="line-clamp-2">{safeSelected.join(", ")}</span>
        ) : (
          <span className="text-slate-400">{label}</span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-64 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {options.map((option) => {
            const isSelected = safeSelected.includes(option);

            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleOption(option)}
                className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-blue-600 font-semibold text-white"
                    : "text-slate-700 hover:bg-blue-50"
                }`}
              >
                <span>{option}</span>
                {isSelected && <span>Selected</span>}
              </button>
            );
          })}
        </div>
      )}

      {safeSelected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {safeSelected.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700"
            >
              {item}
            </span>
          ))}
          {safeSelected.length > 3 && (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
              +{safeSelected.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;