import { visionOptions, btn } from "./config";

const Grid = ({ value, setValue }) => (
  <div className="grid grid-cols-8 gap-1">
    {visionOptions.map(v => (
      <button
        key={v}
        onClick={()=>setValue(v)}
        className={`${btn} ${value===v ? "bg-blue-600 text-white" : ""}`}
      >
        {v}
      </button>
    ))}
  </div>
);

export default Grid;