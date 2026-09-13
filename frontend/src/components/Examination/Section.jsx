const Section = ({ title, subtitle, children, accent = "blue" }) => {
  const accentClass = {
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    violet: "text-violet-600",
    indigo: "text-indigo-600",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${
            accentClass[accent] || accentClass.blue
          }`}
        >
          Examination
        </p>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
};

export default Section;