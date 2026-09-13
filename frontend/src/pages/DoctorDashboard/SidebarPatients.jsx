import { useMemo, useState } from "react";

const SidebarPatients = ({
  patients,
  selected,
  handleSelect,
  completedIds,
}) => {
  const [search, setSearch] = useState("");

  const isCompleted = (item) =>
    item.status === "Completed" ||
    item.visited ||
    completedIds.includes(item._id);

  const filtered = useMemo(() => {
    return patients.filter((p) =>
      p.patientId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [patients, search]);

  return (
    <div className="h-[85vh] overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">
          Today's Patients
        </h2>

        <input
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 w-full border rounded-xl px-3 py-2"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filtered.map((item) => {
          const done = isCompleted(item);

          return (
            <div
              key={item._id}
              onClick={() => handleSelect(item)}
              className={`
                cursor-pointer rounded-2xl p-4 transition-all duration-300
                border
                ${
                  selected?._id === item._id
                    ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                    : done
                    ? "bg-green-50 border-green-200"
                    : "bg-white hover:shadow-lg"
                }
              `}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {item.patientId?.name}
                </h3>

                <span
                  className={`
                    text-xs px-2 py-1 rounded-full
                    ${
                      done
                        ? "bg-green-600 text-white"
                        : "bg-orange-500 text-white"
                    }
                  `}
                >
                  {done ? "Done" : "Pending"}
                </span>
              </div>

              <p className="text-sm opacity-80">
                {item.patientId?.mobile}
              </p>

              <p className="text-xs mt-2">
                Token #{item.token}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarPatients;