import React from "react";
import MedicationSection from "./MedicationSection";
import Diagnosis from "./Diagnosis";
import AdviceNotes from "./AdviceNotes";

const createEmptyAdvice = () => ({
  medical: {
    rows: [],
    store: "Ground Floor Pharmacy",
  },
  diagnosis: {
    diagnosis: "",
    prescription: "",
  },
  followUp: {
    date: "",
    time: "",
  },
});

const mergeAdviceData = (data = {}) => {
  const empty = createEmptyAdvice();

  return {
    ...empty,
    ...data,
    medical: {
      ...empty.medical,
      ...(data.medical || {}),
    },
    diagnosis: {
      ...empty.diagnosis,
      ...(data.diagnosis || {}),
    },
    followUp: {
      ...empty.followUp,
      ...(data.followUp || {}),
      date: data.followUp?.date || data.notes?.date || "",
      time: data.followUp?.time || data.notes?.time || "",
    },
  };
};

const Advice = ({ data = {}, setData, saveNow, status }) => {
  const adviceData = mergeAdviceData(data);

  const updateField = (field, value) => {
    if (!setData) return;

    setData((prev = {}) => ({
      ...prev,
      [field]: typeof value === "function" ? value(prev[field]) : value,
    }));
  };

  const updateDiagnosisField = (field, value) => {
    updateField("diagnosis", {
      ...adviceData.diagnosis,
      [field]: value,
    });
  };

  const statusText = {
    saving: "Saving...",
    saved: "Saved",
    error: "Error Saving",
  };

  const statusClass = {
    saving: "border-amber-200 bg-amber-50 text-amber-700",
    saved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Advice
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              Treatment Advice
            </h1>
          </div>

          <span
            className={`w-fit rounded-full border px-3 py-1 text-sm font-semibold ${
              statusClass[status] ||
              "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {statusText[status] || "Ready"}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        <MedicationSection
          data={adviceData.medical}
          setData={(value) => updateField("medical", value)}
        />

        <Diagnosis
          data={adviceData.diagnosis}
          setField={updateDiagnosisField}
        />

        <AdviceNotes
          data={adviceData.followUp}
          setData={(value) => updateField("followUp", value)}
        />
      </div>

      <div className="sticky bottom-0 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-slate-600">
            {statusText[status] || "Ready to save"}
          </span>

          <button
            type="button"
            onClick={saveNow}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Save Advice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advice;