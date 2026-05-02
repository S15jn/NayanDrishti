import { input } from "./config";
import React from "react";
const Glasses = ({ data, setData }) => {

  const update = (row, field, value)=>{
    setData({
      ...data,
      [row]: { ...data[row], [field]: value }
    });
  };

  return (
    <div className="border p-3 rounded space-y-2">

      <h4 className="text-xs font-semibold">GLASSES PRESCRIPTION (Rx)</h4>

      <div className="grid grid-cols-5 gap-1 text-xs">

        <span></span><span>Sph</span><span>Cyl</span><span>Axis</span><span>Vision</span>

        {["distant","add","near"].map(row=>(
          <React.Fragment key={row}>
            <span>{row}</span>
            <input className={input} onChange={(e)=>update(row,"sph",e.target.value)}/>
            <input className={input} onChange={(e)=>update(row,"cyl",e.target.value)}/>
            <input className={input} onChange={(e)=>update(row,"axis",e.target.value)}/>
            <input className={input} onChange={(e)=>update(row,"vision",e.target.value)}/>
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <select className={input}><option>Type of Lens</option></select>
        <input className={input} placeholder="IPD"/>
        <input className={input} placeholder="Dia"/>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <select className={input}><option>Lens Material</option></select>
        <select className={input}><option>Lens Tint</option></select>
        <input className={input} placeholder="Size"/>
      </div>

      <textarea className={input} placeholder="Advice"/>
    </div>
  );
};

export default Glasses;