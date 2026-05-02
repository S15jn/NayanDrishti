import React, { useState } from "react";

export default function Allergies() {
  const drugOptions = ["Antimicrobial Agents","Antifungal Agents","Antiviral Agents","NSAIDs","Eye Drops"];
  const contactOptions = ["Alcohol","Latex","Betadine","Adhesive Tape","Tegaderm","Transpore"];

  const [drugSelected, setDrugSelected] = useState([]);
  const [contactSelected, setContactSelected] = useState([]);

  const toggle = (list, setList, item) => {
    setList(
      list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item]
    );
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">Drug Allergies</h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {drugOptions.map((item) => (
          <button
            key={item}
            onClick={() => toggle(drugSelected, setDrugSelected, item)}
            className={`px-3 py-1 text-sm rounded border ${
              drugSelected.includes(item)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea className="w-full border p-2 rounded mb-4" placeholder="Comment..." />

      <h2 className="font-semibold mb-3">Contact Allergies</h2>

      <div className="flex flex-wrap gap-2">
        {contactOptions.map((item) => (
          <button
            key={item}
            onClick={() => toggle(contactSelected, setContactSelected, item)}
            className={`px-3 py-1 text-sm rounded border ${
              contactSelected.includes(item)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}