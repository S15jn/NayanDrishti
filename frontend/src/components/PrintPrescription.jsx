const formatDate = (value) => {
  if (!value) return "--";
  return new Date(value).toLocaleDateString("en-IN");
};

const today = () => new Date().toLocaleDateString("en-IN");

const hasValue = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.values(value).some(hasValue);
  return value !== "" && value !== null && value !== undefined;
};

const text = (value) => {
  if (!hasValue(value)) return "--";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const labelMap = {
  chief: "Chief Complaints",
  ophthalmic: "Ophthalmic History",
  systemic: "Systemic History",
  family: "Family History",
  allergies: "Allergies",
  ucva: "UCVA",
  pinhole: "Pinhole",
  glasses: "Glasses",
  contactLens: "Contact Lens",
};

const sectionTitle = (key) => {
  return labelMap[key] || key.replace(/([A-Z])/g, " $1");
};

const formatVision = (value) => {
  if (!value) return "--";

  if (typeof value === "string") {
    return value || "--";
  }

  const distant = value.distant || value.distance || "";
  const near = value.near || "";
  const partial = value.partial ? "(P)" : "";
  const comment = value.comment || "";

  return [
    distant ? `Distant: ${distant}${partial}` : "",
    near ? `Near: ${near}` : "",
    comment,
  ]
    .filter(Boolean)
    .join(" | ") || "--";
};

const getHistoryLines = (history = {}) => {
  const groups = [];

  Object.entries(history).forEach(([key, section]) => {
    const lines = [];

    if (section?.rows?.length) {
      section.rows.forEach((row) => {
        const line = [
          row.name,
          row.eye,
          row.duration && row.unit ? `since ${row.duration} ${row.unit}` : "",
          row.comment,
        ]
          .filter(Boolean)
          .join(" - ");

        if (line) lines.push(line);
      });
    }

    if (section?.comment) lines.push(section.comment);

    if (key === "family" && hasValue(section)) {
      if (section.family) lines.push(`Family: ${section.family}`);
      if (section.medical) lines.push(`Medical: ${section.medical}`);
    }

    if (key === "allergies" && hasValue(section)) {
      if (section.drugSelected?.length) {
        lines.push(`Drug: ${section.drugSelected.join(", ")}`);
      }
      if (section.contactSelected?.length) {
        lines.push(`Contact: ${section.contactSelected.join(", ")}`);
      }
      if (section.comment) lines.push(section.comment);
    }

    if (lines.length) {
      groups.push({
        title: sectionTitle(key),
        lines,
      });
    }
  });

  return groups;
};

const rxRowFilled = (row = {}) => {
  return row.sph || row.cyl || row.axis || row.vision;
};

const autoRowFilled = (row = {}) => {
  return row.sph || row.cyl || row.axis;
};

const getAutoRows = (auto = {}) => {
  return [
    { name: "Dry", row: auto.dry || {} },
    { name: "Dilated", row: auto.dilated || {} },
  ].filter((item) => autoRowFilled(item.row));
};

const getRxRows = (rx = {}) => {
  return [
    { name: "Distant", row: rx.distant || {} },
    { name: "Add", row: rx.add || {} },
    { name: "Near", row: rx.near || {} },
  ].filter((item) => rxRowFilled(item.row));
};

const getExamLines = (exam = {}, eye) => {
  const eyeData = exam?.[eye] || {};
  const lines = [];

  Object.entries(eyeData).forEach(([field, value]) => {
    if (!hasValue(value)) return;

    if (field === "fundus") {
      Object.entries(value).forEach(([fundusField, fundusValue]) => {
        if (hasValue(fundusValue)) {
          lines.push(`${sectionTitle(fundusField)}: ${text(fundusValue)}`);
        }
      });
      return;
    }

    if (value?.values?.length) {
      lines.push(`${sectionTitle(field)}: ${value.values.join(", ")}`);
    }

    if (value?.comment) {
      lines.push(`${sectionTitle(field)} Comment: ${value.comment}`);
    }
  });

  return lines;
};

const getMedicines = (medical = {}) => {
  return (medical.rows || []).filter((row) => Object.values(row).some(hasValue));
};

const VisionBlock = ({ title, visual }) => {
  const rows = [
    ["UCVA", visual?.ucva],
    ["Pinhole", visual?.pinhole],
    ["Glasses", visual?.glasses],
    ["Contact Lens", visual?.contactLens],
  ].filter(([, value]) => hasValue(value));

  if (!rows.length) return null;

  return (
    <div className="rx-lines">
      {rows.map(([label, value]) => (
        <div key={label}>
          <b>{label}:</b> {formatVision(value)}
        </div>
      ))}
    </div>
  );
};

const AutoTable = ({ auto }) => {
  const rows = getAutoRows(auto);

  if (!rows.length) return null;

  return (
    <div className="mini-table-wrap">
      <div className="sub-heading">Auto Refraction</div>
      <table className="mini-table">
        <thead>
          <tr>
            <th></th>
            <th>Sph</th>
            <th>Cyl</th>
            <th>Axis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, row }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{row.sph || "--"}</td>
              <td>{row.cyl || "--"}</td>
              <td>{row.axis || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RxTable = ({ title, rx }) => {
  const rows = getRxRows(rx);

  if (!rows.length) return null;

  return (
    <div className="mini-table-wrap">
      <div className="sub-heading">{title}</div>
      <table className="mini-table">
        <thead>
          <tr>
            <th></th>
            <th>Sph</th>
            <th>Cyl</th>
            <th>Axis</th>
            <th>Vision</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, row }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{row.sph || "--"}</td>
              <td>{row.cyl || "--"}</td>
              <td>{row.axis || "--"}</td>
              <td>{row.vision || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EyeRefraction = ({ title, eye }) => {
  return (
    <div className="eye-box">
      <div className="eye-title">{title}</div>

      <VisionBlock visual={eye?.visual || {}} />

      <AutoTable auto={eye?.auto || {}} />

      <RxTable title="Dry Refraction" rx={eye?.dry || {}} />

      <RxTable title="Dilated Refraction" rx={eye?.dilated || {}} />

      <RxTable title="Glasses Prescription" rx={eye?.glassesRx || eye?.glasses || {}} />
    </div>
  );
};

const MedicineTable = ({ rows }) => {
  if (!rows.length) return <div className="muted">No medicines added.</div>;

  return (
    <table className="medicine-table">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Frequency</th>
          <th>Duration</th>
          <th>Eye</th>
          <th>Instruction</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td><b>{row.name || "--"}</b>{row.type ? ` - ${row.type}` : ""}</td>
            <td>{row.quantity || "--"}</td>
            <td>{row.frequency || "--"}</td>
            <td>{row.duration || "--"}</td>
            <td>{row.eye || "--"}</td>
            <td>{row.instruction || "--"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PrintPrescription = ({ selected, formData, doctor }) => {
  const patient = selected?.patientId || {};
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const doctorName = doctor?.name || user?.name || "Doctor";

  const historyGroups = getHistoryLines(formData.history || {});
  const rightExam = getExamLines(formData.examination || {}, "right");
  const leftExam = getExamLines(formData.examination || {}, "left");
  const medicines = getMedicines(formData.medical || {});

  return (
    <div className="print-prescription">
      <header className="opd-header">
        <div className="brand-mark">ND</div>
        <div className="brand-text">
          <h1>Nayan Drishti</h1>
          <p>Eye Care & Opticals</p>
        </div>
      </header>

      <section className="top-info">
        <div className="info-grid">
          <div><b>Patient:</b> {patient.name || "--"}</div>
          <div><b>Age/Sex:</b> {patient.age || "--"}</div>
          <div><b>Contact:</b> {patient.mobile || "--"}</div>
          <div><b>Email:</b> {patient.email || "--"}</div>
          <div><b>Patient ID:</b> {patient._id || formData.patientId || "--"}</div>
          <div><b>Note Dt:</b> {today()}</div>
        </div>

        <div className="info-grid">
          <div><b>Doctor:</b> {doctorName}</div>
          <div><b>Facility:</b> Nayan Drishti Eye Care</div>
          <div><b>Appt. Dt:</b> {selected?.date ? formatDate(selected.date) : today()}</div>
          <div><b>Address:</b> Nayan Drishti Clinic</div>
          <div><b>Mobile:</b> {patient.mobile || "--"}</div>
          <div><b>Token:</b> {selected?.token || "--"}</div>
        </div>
      </section>

      <div className="summary-title">OPD SUMMARY</div>

      <section className="print-section">
        <h2>History</h2>

        {historyGroups.length ? (
          historyGroups.map((group) => (
            <div key={group.title} className="history-group">
              <b>{group.title}:</b>
              <ul>
                {group.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="muted">No significant history recorded.</div>
        )}
      </section>

      <section className="print-section">
        <h2>Refraction</h2>

        <div className="two-col">
          <EyeRefraction title="R/OD" eye={formData.refraction?.right || {}} />
          <EyeRefraction title="L/OS" eye={formData.refraction?.left || {}} />
        </div>
      </section>

      <section className="print-section">
        <h2>Examination</h2>

        <div className="two-col">
          <div className="eye-box">
            <div className="eye-title">R/OD</div>
            {rightExam.length ? (
              rightExam.map((line, index) => <div key={index}>{line}</div>)
            ) : (
              <div className="muted">No findings.</div>
            )}
          </div>

          <div className="eye-box">
            <div className="eye-title">L/OS</div>
            {leftExam.length ? (
              leftExam.map((line, index) => <div key={index}>{line}</div>)
            ) : (
              <div className="muted">No findings.</div>
            )}
          </div>
        </div>
      </section>

      <section className="print-section">
        <h2>Diagnosis</h2>
        <div>{formData.diagnosis || "--"}</div>
      </section>

      <section className="print-section">
        <h2>Advice / Prescription</h2>
        <div>{formData.prescription || "--"}</div>
      </section>

      <section className="print-section">
        <h2>Medication (Rx)</h2>
        <MedicineTable rows={medicines} />
      </section>

      <section className="print-section">
        <h2>Follow Up</h2>
        <div>{formData.followUpDate ? formatDate(formData.followUpDate) : "--"}</div>
      </section>

      <footer className="opd-footer">
        <div>
          <b>Address:</b> Nayan Drishti Eye Care & Opticals
          <br />
          For Appointment / Optical Enquiry
        </div>

        <div className="signature">
          <div>Doctor Signature</div>
          <b>{doctorName}</b>
        </div>
      </footer>
    </div>
  );
};

export default PrintPrescription;
