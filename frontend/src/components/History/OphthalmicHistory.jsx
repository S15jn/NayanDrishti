import Section from "./Section";

export default function OphthalmicHistory({ data = {}, setData }) {
  return (
    <Section
      title="Ophthalmic History"
      subtitle="Previous eye conditions, treatment history, or optical usage."
      accent="indigo"
      data={data}
      setData={setData}
      options={[
        "Glaucoma",
        "Retinal Detachment",
        "Glass",
        "Eye Surgery",
        "Uveitis",
        "Retinal Laser",
        "Contact Lens",
      ]}
    />
  );
}