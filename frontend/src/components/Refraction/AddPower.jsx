import React from "react";

const AddPower = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3">
        <h3 className="text-white font-bold text-lg">
          Add Power
        </h3>
      </div>

      <div className="p-5">
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Near Addition Power
          </label>

          <input
            type="text"
            placeholder="e.g. +1.00"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="
              w-full
              px-4
              py-3
              border
              border-slate-300
              rounded-xl
              text-center
              text-lg
              font-semibold
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
              focus:border-amber-500
              transition-all
            "
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00", "+2.25", "+2.50"].map(
            (power) => (
              <button
                key={power}
                type="button"
                onClick={() => onChange(power)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    value === power
                      ? "bg-amber-500 text-white shadow"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }
                `}
              >
                {power}
              </button>
            )
          )}
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Select a common Add Power value or enter a custom value manually.
        </p>
      </div>
    </div>
  );
};

export default AddPower;