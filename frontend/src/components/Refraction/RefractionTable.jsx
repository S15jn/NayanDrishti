import React from "react";
import { input, btn } from "./config";

const tableInput =
  "w-full px-3 py-2 text-center border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const headerClass =
  "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white";

const rowLabelClass =
  "font-semibold text-slate-700 bg-slate-50";

const actionBtn =
  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all";

const RefractionTable = ({
  title,
  data,
  setData,
  copyData,
}) => {
  const update = (row, field, value) => {
    setData({
      ...data,
      [row]: {
        ...data[row],
        [field]: value,
      },
    });
  };

  const fill = () => {
    setData({
      distant: {
        sph: "0.00",
        cyl: "",
        axis: "",
        vision: "6/6",
      },
      add: {
        sph: "+2.25",
        cyl: "",
        axis: "",
        vision: "",
      },
      near: {
        sph: "+2.25",
        cyl: "",
        axis: "",
        vision: "N6",
      },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">
        <h3 className="font-bold text-slate-800 text-sm md:text-base">
          {title}
        </h3>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fill}
            className={`${actionBtn} bg-green-100 text-green-700 hover:bg-green-200`}
          >
            Auto Fill
          </button>

          {copyData && (
            <button
              type="button"
              onClick={() => setData(copyData)}
              className={`${actionBtn} bg-blue-100 text-blue-700 hover:bg-blue-200`}
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className={headerClass}>
              <th className="px-3 py-3 text-left text-sm">
                Type
              </th>

              <th className="px-3 py-3 text-center text-sm">
                Sphere
              </th>

              <th className="px-3 py-3 text-center text-sm">
                Cylinder
              </th>

              <th className="px-3 py-3 text-center text-sm">
                Axis
              </th>

              <th className="px-3 py-3 text-center text-sm">
                Vision
              </th>
            </tr>
          </thead>

          <tbody>
            {["distant", "add", "near"].map((row) => (
              <tr
                key={row}
                className="border-b border-slate-200"
              >
                <td
                  className={`px-3 py-3 capitalize ${rowLabelClass}`}
                >
                  {row}
                </td>

                <td className="p-2">
                  <input
                    value={data?.[row]?.sph || ""}
                    onChange={(e) =>
                      update(
                        row,
                        "sph",
                        e.target.value
                      )
                    }
                    className={tableInput}
                  />
                </td>

                <td className="p-2">
                  <input
                    value={data?.[row]?.cyl || ""}
                    onChange={(e) =>
                      update(
                        row,
                        "cyl",
                        e.target.value
                      )
                    }
                    className={tableInput}
                  />
                </td>

                <td className="p-2">
                  <input
                    value={data?.[row]?.axis || ""}
                    onChange={(e) =>
                      update(
                        row,
                        "axis",
                        e.target.value
                      )
                    }
                    className={tableInput}
                  />
                </td>

                <td className="p-2">
                  <input
                    value={data?.[row]?.vision || ""}
                    onChange={(e) =>
                      update(
                        row,
                        "vision",
                        e.target.value
                      )
                    }
                    className={tableInput}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comments */}
      <div className="p-4 border-t bg-slate-50">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Comments
        </label>

        <textarea
          rows={3}
          placeholder="Enter remarks..."
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default RefractionTable;