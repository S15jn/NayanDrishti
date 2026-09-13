import React from "react";

const AdviceNotes = ({ data = {}, setData }) => {
  const update = (field, value) => {
    setData((prev = {}) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Follow Up
        </p>
        <h3 className="text-lg font-bold text-slate-900">
          Follow Up Appointment
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Select the next visit date and time.
        </p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Follow Up Date
          </label>
          <input
            type="date"
            value={data.date || ""}
            onChange={(event) => update("date", event.target.value)}
            className="min-h-[46px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Follow Up Time
          </label>
          <input
            type="time"
            value={data.time || ""}
            onChange={(event) => update("time", event.target.value)}
            className="min-h-[46px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AdviceNotes;