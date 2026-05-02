import { input, btn } from "./config";
import React from "react";
const RefractionTable = ({ title, data, setData, copyData }) => {

  const update = (row, field, value)=>{
    setData({
      ...data,
      [row]: { ...data[row], [field]: value }
    });
  };

  const fill = ()=>{
    setData({
      distant:{ sph:"0.00", cyl:"", axis:"", vision:"6/6" },
      add:{ sph:"+2.25", cyl:"", axis:"", vision:"" },
      near:{ sph:"+2.25", cyl:"", axis:"", vision:"N6" }
    });
  };

  return (
    <div className="border p-3 rounded space-y-2">

      <div className="flex justify-between">
        <h4 className="text-xs font-semibold">{title}</h4>

        <div className="flex gap-1">
          <button className={btn} onClick={fill}>Fill</button>

          {copyData && (
            <button className={btn} onClick={()=>setData(copyData)}>
              Copy
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 text-xs">

        <span></span><span>Sph</span><span>Cyl</span><span>Axis</span><span>Vision</span>

        {["distant","add","near"].map(row=>(
          <React.Fragment key={row}>
            <span>{row}</span>

            <input className={input} value={data[row].sph}
              onChange={(e)=>update(row,"sph",e.target.value)}/>

            <input className={input} value={data[row].cyl}
              onChange={(e)=>update(row,"cyl",e.target.value)}/>

            <input className={input} value={data[row].axis}
              onChange={(e)=>update(row,"axis",e.target.value)}/>

            <input className={input} value={data[row].vision}
              onChange={(e)=>update(row,"vision",e.target.value)}/>
          </React.Fragment>
        ))}
      </div>

      <textarea className={input} placeholder="Comments"/>
    </div>
  );
};

export default RefractionTable;