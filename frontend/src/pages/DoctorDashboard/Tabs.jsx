const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 mb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-1 rounded ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;