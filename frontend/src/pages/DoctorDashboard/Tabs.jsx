const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            px-5 py-2 rounded-2xl font-medium capitalize transition-all duration-300
            ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;