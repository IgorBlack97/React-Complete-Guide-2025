export default function Player({ ref, onSave, playerData }) {
  return (
    <section id="player">
      <h2>Welcome {playerData.name ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={ref} />
        <button onClick={onSave}>Set Name</button>
      </p>
    </section>
  );
}
