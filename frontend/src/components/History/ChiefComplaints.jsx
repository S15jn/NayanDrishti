import Section from "./Section";

export default function ChiefComplaints({ data = {}, setData }) {
  return (
    <Section
      title="Chief Complaints"
      subtitle="Select the current symptoms and add duration, eye, and notes."
      accent="blue"
      data={data}
      setData={setData}
      options={[
        "Blurring Vision",
        "Redness",
        "Pain",
        "Watering",
        "Discharge",
        "Dryness",
        "Itching",
        "Headache",
        "Foreign Body Sensation",
      ]}
    />
  );
}