import Section from "./Section";

export default function SystemicHistory({ data = {}, setData }) {
  return (
    <Section
      title="Systemic History"
      subtitle="General medical conditions relevant to ocular assessment."
      accent="emerald"
      data={data}
      setData={setData}
      showEye={false}
      options={[
        "Diabetes",
        "Hypertension",
        "Alcoholism",
        "Smoking Tobacco",
        "Cardiac Disorder",
        "Steroid Intake",
        "Drug Abuse",
        "HIV/AIDS",
        "Cancer Tumor",
        "Tuberculosis",
        "Asthma",
        "CNS Disorder Stroke",
        "Hypothyroidism",
        "Hyperthyroidism",
        "Renal Disorder",
        "On Insulin",
        "Thyroid Disorder",
        "CVA",
      ]}
    />
  );
}