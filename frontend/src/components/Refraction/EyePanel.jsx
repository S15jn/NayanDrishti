import VisualAcuity from "./VisualAcuity";
import RefractionTable from "./RefractionTable";
import Glasses from "./Glasses";

const EyePanel = ({ title, data, setData, copyFrom }) => {

  const update = (k,v)=>setData({...data,[k]:v});

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">

      <h2 className="text-center font-bold text-sm">{title}</h2>

      <VisualAcuity
        data={data.visual}
        setData={(v)=>update("visual",v)}
      />

      <RefractionTable
        title="AUTO REFRACTION"
        data={data.auto}
        setData={(v)=>update("auto",v)}
      />

      <RefractionTable
        title="DRY REFRACTION"
        data={data.dry}
        setData={(v)=>update("dry",v)}
        copyData={copyFrom?.dry}
      />

      <RefractionTable
        title="REFRACTION (DILATED)"
        data={data.dilated}
        setData={(v)=>update("dilated",v)}
      />

      <RefractionTable
        title="PGP1"
        data={data.pgp}
        setData={(v)=>update("pgp",v)}
      />

      <Glasses
        data={data.glasses}
        setData={(v)=>update("glasses",v)}
      />

    </div>
  );
};

export default EyePanel;