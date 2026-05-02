import Section from "./Section";

export default function ChiefComplaints({ data = {}, setData }) {
  return (
    <Section
      title="Chief Complaints"
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
