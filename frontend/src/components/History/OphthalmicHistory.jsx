import Section from "./Section";

export default function OphthalmicHistory({ data = {}, setData }) {
  return (
    <Section
      title="Ophthalmic History"
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
