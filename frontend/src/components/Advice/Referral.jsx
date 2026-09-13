import React from "react";

const Referral = ({ data = {}, setData }) => {
  const updateNested = (section, field, value) => {
    setData((prev = {}) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Referral</h3>

      {/* ================= INTRA FACILITY ================= */}
      <div className="border p-4 rounded space-y-4">
        <h4 className="font-medium text-gray-700">
          Intra Facility (Within The Same Location)
        </h4>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="date"
            className="border p-2"
            value={data.intra?.date || ""}
            onChange={(e) =>
              updateNested("intra", "date", e.target.value)
            }
          />

          <input
            type="time"
            className="border p-2"
            value={data.intra?.time || ""}
            onChange={(e) =>
              updateNested("intra", "time", e.target.value)
            }
          />

          <select
            className="border p-2"
            value={data.intra?.fromDoctor || ""}
            onChange={(e) =>
              updateNested("intra", "fromDoctor", e.target.value)
            }
          >
            <option value="">Referred From (Doctor)</option>
            <option>Anika</option>
            <option>Dr Sharma</option>
          </select>

          <select
            className="border p-2"
            value={data.intra?.toDoctor || ""}
            onChange={(e) =>
              updateNested("intra", "toDoctor", e.target.value)
            }
          >
            <option value="">Referred To (Doctor)</option>
            <option>Anika</option>
            <option>Dr Sharma</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="border p-2"
            value={data.intra?.type || ""}
            onChange={(e) =>
              updateNested("intra", "type", e.target.value)
            }
          >
            <option value="">Appointment Type</option>
            <option>New</option>
            <option>Follow-up</option>
          </select>

          <select
            className="border p-2"
            value={data.intra?.category || ""}
            onChange={(e) =>
              updateNested("intra", "category", e.target.value)
            }
          >
            <option value="">Appointment Category</option>
            <option>General</option>
            <option>Emergency</option>
          </select>
        </div>

        <textarea
          className="w-full border p-2 rounded"
          rows={2}
          placeholder="Referral Note"
          value={data.intra?.note || ""}
          onChange={(e) =>
            updateNested("intra", "note", e.target.value)
          }
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.intra?.makeAppointment || false}
            onChange={(e) =>
              updateNested("intra", "makeAppointment", e.target.checked)
            }
          />
          <span>Make Appointment</span>
        </div>

        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          + Add
        </button>
      </div>

      {/* ================= INTER FACILITY ================= */}
      <div className="border p-4 rounded space-y-4">
        <h4 className="font-medium text-gray-700">
          Inter Facility (For Other Locations)
        </h4>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="date"
            className="border p-2"
            value={data.inter?.date || ""}
            onChange={(e) =>
              updateNested("inter", "date", e.target.value)
            }
          />

          <select
            className="border p-2"
            value={data.inter?.fromLocation || ""}
            onChange={(e) =>
              updateNested("inter", "fromLocation", e.target.value)
            }
          >
            <option value="">Referred From Location</option>
            <option>Eye Institute Mall</option>
          </select>

          <select
            className="border p-2"
            value={data.inter?.fromSpeciality || ""}
            onChange={(e) =>
              updateNested("inter", "fromSpeciality", e.target.value)
            }
          >
            <option value="">From Speciality</option>
            <option>Ophthalmology</option>
          </select>

          <select
            className="border p-2"
            value={data.inter?.fromDoctor || ""}
            onChange={(e) =>
              updateNested("inter", "fromDoctor", e.target.value)
            }
          >
            <option value="">From Doctor</option>
            <option>Anika</option>
          </select>

          <select
            className="border p-2"
            value={data.inter?.toLocation || ""}
            onChange={(e) =>
              updateNested("inter", "toLocation", e.target.value)
            }
          >
            <option value="">Referred To Location</option>
            <option>Eye Institute Path</option>
          </select>

          <select
            className="border p-2"
            value={data.inter?.toSpeciality || ""}
            onChange={(e) =>
              updateNested("inter", "toSpeciality", e.target.value)
            }
          >
            <option value="">To Speciality</option>
            <option>Ophthalmology</option>
          </select>

          <select
            className="border p-2"
            value={data.inter?.toDoctor || ""}
            onChange={(e) =>
              updateNested("inter", "toDoctor", e.target.value)
            }
          >
            <option value="">To Doctor</option>
            <option>Tushya Om Parkash</option>
          </select>

          <input
            type="time"
            className="border p-2"
            value={data.inter?.time || ""}
            onChange={(e) =>
              updateNested("inter", "time", e.target.value)
            }
          />
        </div>

        <textarea
          className="w-full border p-2 rounded"
          rows={2}
          placeholder="Referral Note"
          value={data.inter?.note || ""}
          onChange={(e) =>
            updateNested("inter", "note", e.target.value)
          }
        />

        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          + Add
        </button>
      </div>

      {/* ================= OUTSIDE ORGANISATION ================= */}
      <div className="border p-4 rounded space-y-4">
        <h4 className="font-medium text-gray-700">
          Outside Organisation
        </h4>

        <button className="text-blue-600 text-sm">
          + Add Doctor
        </button>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="date"
            className="border p-2"
            value={data.outside?.date || ""}
            onChange={(e) =>
              updateNested("outside", "date", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-2"
            value={data.outside?.location || ""}
            onChange={(e) =>
              updateNested("outside", "location", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Consultant"
            className="border p-2"
            value={data.outside?.consultant || ""}
            onChange={(e) =>
              updateNested("outside", "consultant", e.target.value)
            }
          />
        </div>

        <textarea
          className="w-full border p-2 rounded"
          rows={2}
          placeholder="Referral Note"
          value={data.outside?.note || ""}
          onChange={(e) =>
            updateNested("outside", "note", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Referral;