export default function CalculatorInput({ label, value, onChange }) {
  return (
    <div className="user-group">
      <label>{label}</label>
      <input type="number" value={value} onChange={onChange} />
    </div>
  );
}
