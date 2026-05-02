export default function FamilyHistory() {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">Family History</h2>

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Family History..."
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Medical History..."
      />
    </div>
  );
}