import React, { useEffect } from "react";
import EyePanel from "./EyePanel";
import { emptyRow } from "./config";

export default function Refraction({ data = {}, setData, saveNow, status }) {

  const init = {
    visual:{ ucva:"", pinhole:"", glass:"", contact:"", comments:"" },
    auto:{ distant:emptyRow, add:emptyRow, near:emptyRow },
    dry:{ distant:emptyRow, add:emptyRow, near:emptyRow },
    dilated:{ distant:emptyRow, add:emptyRow, near:emptyRow },
    pgp:{ distant:emptyRow, add:emptyRow, near:emptyRow },
    glasses:{ distant:emptyRow, add:emptyRow, near:emptyRow }
  };

  // ✅ use parent data instead of local state
  const right = data.right || init;
  const left = data.left || init;

  // ✅ safe update
  const updateEye = (eye, value) => {
    setData((prev) => ({
      ...prev,
      [eye]: value,
    }));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4">

      <div className="grid md:grid-cols-2 gap-4">

        <EyePanel
          title="R / OD"
          data={right}
          setData={(v) => updateEye("right", v)}
        />

        <EyePanel
          title="L / OS"
          data={left}
          setData={(v) => updateEye("left", v)}
          copyFrom={right}
        />

      </div>

      {/* 🔥 SAVE BAR */}
      <div className="sticky bottom-0 bg-white p-4 rounded shadow flex justify-between items-center">

        <button
          onClick={saveNow}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Refraction
        </button>

        <span className="text-sm text-gray-600">
          {status === "saving" && "Saving..."}
          {status === "saved" && "Saved ✅"}
          {status === "error" && "Error ❌"}
        </span>

      </div>

    </div>
  );
}