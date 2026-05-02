import Grid from "./Grid";
import { input } from "./config";

const VisualAcuity = ({ data, setData }) => {

  const update = (k,v)=>setData({...data,[k]:v});

  return (
    <div className="border p-3 rounded space-y-3">

      <h4 className="text-xs font-semibold">VISUAL ACUITY (VA)</h4>

      <div>
        <p className="text-xs">UCVA</p>
        <Grid value={data.ucva} setValue={(v)=>update("ucva",v)}/>
      </div>

      <div>
        <p className="text-xs">Pinhole</p>
        <Grid value={data.pinhole} setValue={(v)=>update("pinhole",v)}/>
      </div>

      <div>
        <p className="text-xs">Glasses</p>
        <Grid value={data.glass} setValue={(v)=>update("glass",v)}/>
      </div>

      <div>
        <p className="text-xs">Contact Lens</p>
        <Grid value={data.contact} setValue={(v)=>update("contact",v)}/>
      </div>

      <textarea
        className={input}
        placeholder="Comments"
        value={data.comments}
        onChange={(e)=>update("comments",e.target.value)}
      />
    </div>
  );
};

export default VisualAcuity;