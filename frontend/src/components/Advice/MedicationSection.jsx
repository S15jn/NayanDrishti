const defaultRow = {
  name: "",
  type: "",
  quantity: 1,
  frequency: "",
  duration: "",
  taper: "",
  eye: "",
  instruction: "",
};

const defaultRows = [{ ...defaultRow }];

const MedicationSection = ({ data = {}, setData }) => {
  const rows = data.rows?.length ? data.rows : defaultRows;
  const store = data.store || "Ground Floor Pharmacy";

  const updateMedical = (value) => {
    setData((prev = {}) =>
      typeof value === "function" ? value(prev) : value,
    );
  };

  const handleChange = (index, field, value) => {
    updateMedical((prev = {}) => {
      const updated = [...(prev.rows?.length ? prev.rows : rows)];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        store: prev.store || store,
        rows: updated,
      };
    });
  };

  const addRow = () => {
    updateMedical((prev = {}) => ({
      ...prev,
      store: prev.store || store,
      rows: [...(prev.rows?.length ? prev.rows : rows), { ...defaultRow }],
    }));
  };

  const deleteRow = (index) => {
    updateMedical((prev = {}) => ({
      ...prev,
      store: prev.store || store,
      rows: (prev.rows?.length ? prev.rows : rows).filter((_, i) => i !== index),
    }));
  };

  const updateStore = (value) => {
    updateMedical((prev = {}) => ({
      ...prev,
      store: value,
      rows: prev.rows?.length ? prev.rows : rows,
    }));
  };

  const inputClass =
    "min-h-[40px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Medication
            </p>
            <h2 className="text-lg font-bold text-slate-900">
              Medication Prescription
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add medicines, dosage, duration, and instructions.
            </p>
          </div>

          <div className="w-full lg:w-72">
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Store
            </label>
            <select
              className={inputClass}
              value={store}
              onChange={(event) => updateStore(event.target.value)}
            >
              <option>Ground Floor Pharmacy</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-[1050px] w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Frequency</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Eye</th>
                <th className="p-3">Instruction</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row, index) => (
                <tr key={index} className="bg-white">
                  <td className="p-2">
                    <input
                      className={inputClass}
                      value={row.name || ""}
                      placeholder="Medicine"
                      onChange={(event) =>
                        handleChange(index, "name", event.target.value)
                      }
                    />
                  </td>

                  <td className="p-2">
                    <input
                      className={inputClass}
                      value={row.type || ""}
                      placeholder="Drop / Tab"
                      onChange={(event) =>
                        handleChange(index, "type", event.target.value)
                      }
                    />
                  </td>

                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={row.quantity || 1}
                      onChange={(event) =>
                        handleChange(index, "quantity", event.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={row.frequency || ""}
                      onChange={(event) =>
                        handleChange(index, "frequency", event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>1-0-1</option>
                      <option>0-1-0</option>
                      <option>1-1-1</option>
                      <option>1-0-0</option>
                      <option>0-0-1</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={row.duration || ""}
                      onChange={(event) =>
                        handleChange(index, "duration", event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>3 Days</option>
                      <option>5 Days</option>
                      <option>7 Days</option>
                      <option>2 Weeks</option>
                      <option>1 Month</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={row.eye || ""}
                      onChange={(event) =>
                        handleChange(index, "eye", event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>Left</option>
                      <option>Right</option>
                      <option>Both</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={row.instruction || ""}
                      onChange={(event) =>
                        handleChange(index, "instruction", event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>After Food</option>
                      <option>Before Food</option>
                      <option>At Bedtime</option>
                      <option>As Directed</option>
                    </select>
                  </td>

                  <td className="p-2 text-center">
                    <button
                      type="button"
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                      onClick={() => deleteRow(index)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
        >
          + Add Medicine
        </button>
      </div>
    </div>
  );
};

export default MedicationSection;