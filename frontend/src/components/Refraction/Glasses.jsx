import React from "react";

const inputClass =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500";

const selectClass =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const Glasses = ({ data = {}, setData }) => {
  const update = (row, field, value) => {
    setData({
      ...data,
      [row]: {
        ...(data[row] || {}),
        [field]: value,
      },
    });
  };

  const updateField = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-5 py-3">
        <h3 className="text-white font-bold text-lg">
          Glasses Prescription (Rx)
        </h3>
      </div>

      <div className="p-5 space-y-6">
        {/* Prescription Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-3 text-left">Type</th>
                <th className="border p-3">Sphere</th>
                <th className="border p-3">Cylinder</th>
                <th className="border p-3">Axis</th>
                <th className="border p-3">Vision</th>
              </tr>
            </thead>

            <tbody>
              {["distant", "add", "near"].map((row) => (
                <tr key={row}>
                  <td className="border p-3 capitalize font-medium bg-slate-50">
                    {row}
                  </td>

                  <td className="border p-2">
                    <input
                      value={data?.[row]?.sph || ""}
                      onChange={(e) =>
                        update(row, "sph", e.target.value)
                      }
                      className={inputClass}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      value={data?.[row]?.cyl || ""}
                      onChange={(e) =>
                        update(row, "cyl", e.target.value)
                      }
                      className={inputClass}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      value={data?.[row]?.axis || ""}
                      onChange={(e) =>
                        update(row, "axis", e.target.value)
                      }
                      className={inputClass}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      value={data?.[row]?.vision || ""}
                      onChange={(e) =>
                        update(row, "vision", e.target.value)
                      }
                      className={inputClass}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lens Information */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">
            Lens Details
          </h4>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">
                Type of Lens
              </label>

              <select
                className={selectClass}
                value={data.typeOfLens || ""}
                onChange={(e) =>
                  updateField("typeOfLens", e.target.value)
                }
              >
                <option value="">Select</option>
                <option>Single Vision</option>
                <option>Bifocal</option>
                <option>Progressive</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Lens Material
              </label>

              <select
                className={selectClass}
                value={data.lensMaterial || ""}
                onChange={(e) =>
                  updateField("lensMaterial", e.target.value)
                }
              >
                <option value="">Select</option>
                <option>CR-39</option>
                <option>Polycarbonate</option>
                <option>High Index</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Lens Tint
              </label>

              <select
                className={selectClass}
                value={data.lensTint || ""}
                onChange={(e) =>
                  updateField("lensTint", e.target.value)
                }
              >
                <option value="">Select</option>
                <option>Clear</option>
                <option>Blue Cut</option>
                <option>Photochromic</option>
                <option>Transitions</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Frame Material
              </label>

              <select
                className={selectClass}
                value={data.frameMaterial || ""}
                onChange={(e) =>
                  updateField("frameMaterial", e.target.value)
                }
              >
                <option value="">Select</option>
                <option>Metal</option>
                <option>Plastic</option>
                <option>Titanium</option>
                <option>Rimless</option>
              </select>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">
            Measurements
          </h4>

          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium">IPD</label>
              <input
                value={data.ipd || ""}
                onChange={(e) =>
                  updateField("ipd", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Size</label>
              <input
                value={data.size || ""}
                onChange={(e) =>
                  updateField("size", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Dia</label>
              <input
                value={data.dia || ""}
                onChange={(e) =>
                  updateField("dia", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Prism Base
              </label>
              <input
                value={data.prismBase || ""}
                onChange={(e) =>
                  updateField("prismBase", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Fitting Height
              </label>
              <input
                value={data.fittingHeight || ""}
                onChange={(e) =>
                  updateField("fittingHeight", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Advice */}
        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Advice / Notes
          </label>

          <textarea
            rows={4}
            value={data.advice || ""}
            onChange={(e) =>
              updateField("advice", e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient advice, lens recommendation, precautions..."
          />
        </div>
      </div>
    </div>
  );
};

export default Glasses;