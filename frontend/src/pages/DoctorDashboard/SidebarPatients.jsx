const SidebarPatients = ({
  patients,
  selected,
  handleSelect,
  completedIds,
}) => {
  return (
    <div className="bg-white p-3 rounded shadow h-[80vh] overflow-y-auto">
      <h3 className="font-bold text-sm mb-2">Appointments</h3>

      <p className="text-xs">Total: {patients.length}</p>
      <p className="text-xs mb-3">Done: {completedIds.length}</p>

      {patients.map((item) => (
        <div
          key={item._id}
          onClick={() => handleSelect(item)}
          className={`p-2 border mb-2 rounded cursor-pointer text-sm ${
            selected?._id === item._id
              ? "bg-blue-200"
              : completedIds.includes(item._id)
              ? "bg-green-200"
              : "bg-red-100"
          }`}
        >
          <p>{item.patientId?.name}</p>
          <p className="text-xs">{item.patientId?.mobile}</p>
        </div>
      ))}
    </div>
  );
};

export default SidebarPatients;