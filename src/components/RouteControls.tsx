export default function RouteControls({ setStart, setEnd, calculateRoute }: {
  setStart: () => void;
  setEnd: () => void;
  calculateRoute: () => void;
}) {
  return (
    <div className="sidebar">
      <button onClick={setStart}>Set Start</button>
      <button onClick={setEnd}>Set End</button>
      <button onClick={calculateRoute}>Calculate Route</button>
    </div>
  );
}
