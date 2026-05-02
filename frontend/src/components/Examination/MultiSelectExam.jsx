import MultiSelect from "./MultiSelect";
import { sections } from "./config";

const MultiSelectExam = ({ data = {}, handleChange }) => {
  const right = data.right || {};
  const left = data.left || {};

  return (
    <>
      {Object.entries(sections).map(([section, options]) => (
        <div key={section} className="grid grid-cols-3 gap-4">
          <div className="capitalize">{section}</div>

          <MultiSelect
            options={options}
            selected={right[section]?.values || []}
            setSelected={(v) => handleChange("right", section, v)}
            label="Right OD"
          />

          <MultiSelect
            options={options}
            selected={left[section]?.values || []}
            setSelected={(v) => handleChange("left", section, v)}
            label="Left OS"
          />
        </div>
      ))}
    </>
  );
};

export default MultiSelectExam;
