import { visionOptions } from "./config";

const Grid = ({ value, setValue }) => {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-5 md:grid-cols-5 border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm">
        {visionOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setValue(item)}
            className={`
              h-11
              border-r
              border-b
              border-slate-300
              text-xs
              md:text-sm
              font-medium
              transition-all
              duration-200

              ${
                value === item
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white text-slate-700 hover:bg-blue-50"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Grid;