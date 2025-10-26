import { nodes } from '../utils/data/campusGraph';

interface RouteControlsProps {
  start: string | null;
  end: string | null;
  setStart: (nodeId: string) => void;
  setEnd: (nodeId: string) => void;
  calculateRoute: () => void;
}

export default function RouteControls({ 
  start, 
  end, 
  setStart, 
  setEnd, 
  calculateRoute 
}: RouteControlsProps) {
  return (
    <div className="sidebar">
      <div className="control-group">
        <label htmlFor="start-select">Start Point:</label>
        <select 
          id="start-select"
          value={start || ''} 
          onChange={(e) => setStart(e.target.value)}
        >
          <option value="">Select start point</option>
          {nodes.map(node => (
            <option key={`start-${node.id}`} value={node.id}>
              {node.id} ({node.lat.toFixed(4)}, {node.lng.toFixed(4)})
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="end-select">End Point:</label>
        <select 
          id="end-select"
          value={end || ''} 
          onChange={(e) => setEnd(e.target.value)}
        >
          <option value="">Select end point</option>
          {nodes.map(node => (
            <option key={`end-${node.id}`} value={node.id}>
              {node.id} ({node.lat.toFixed(4)}, {node.lng.toFixed(4)})
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={calculateRoute}
        disabled={!start || !end}
      >
        Calculate Route
      </button>
    </div>
  );
}