import VisualAcuity from "./VisualAcuity";
import RefractionTable from "./RefractionTable";
import Glasses from "./Glasses";

const sectionClass =
  "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden";

const EyePanel = ({
  title,
  data,
  setData,
  copyFrom,
}) => {
  const update = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-lg
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          sticky
          top-0
          z-10
          bg-gradient-to-r
          from-emerald-700
          to-emerald-600
          text-white
          px-6
          py-4
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {title}
            </h2>

            <p className="text-emerald-100 text-sm">
              Refraction & Vision Assessment
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            {title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-6 bg-slate-50">
        {/* Visual Acuity */}
        <div className={sectionClass}>
          <VisualAcuity
            data={data.visual}
            setData={(value) =>
              update("visual", value)
            }
          />
        </div>

        {/* Auto Refraction */}
        <div className={sectionClass}>
          <RefractionTable
            title="AUTO REFRACTION"
            data={data.auto}
            setData={(value) =>
              update("auto", value)
            }
          />
        </div>

        {/* Dry Refraction */}
        <div className={sectionClass}>
          <RefractionTable
            title="DRY REFRACTION"
            data={data.dry}
            setData={(value) =>
              update("dry", value)
            }
            copyData={copyFrom?.dry}
          />
        </div>

        {/* Dilated */}
        <div className={sectionClass}>
          <RefractionTable
            title="REFRACTION (DILATED)"
            data={data.dilated}
            setData={(value) =>
              update("dilated", value)
            }
          />
        </div>

        {/* PGP */}
        <div className={sectionClass}>
          <RefractionTable
            title="PGP"
            data={data.pgp}
            setData={(value) =>
              update("pgp", value)
            }
          />
        </div>

        {/* Glasses */}
        <div className={sectionClass}>
          <Glasses
            data={data.glasses}
            setData={(value) =>
              update("glasses", value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EyePanel;