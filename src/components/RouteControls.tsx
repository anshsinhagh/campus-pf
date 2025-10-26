// src/components/RouteControls.tsx

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
  // Filter to only show nodes that have names (significant locations)
  const significantNodes = nodes.filter(node => node.name);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">CampusPF</h1>
        <p className="sidebar-subtitle">Find your optimal route</p>
      </div>

      <div className="control-group">
        <label htmlFor="start-select">Start Location</label>
        <select 
          id="start-select"
          value={start || ''} 
          onChange={(e) => setStart(e.target.value)}
        >
          <option value="">Choose starting point</option>
          {significantNodes.map(node => (
            <option key={`start-${node.id}`} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="end-select">Destination</label>
        <select 
          id="end-select"
          value={end || ''} 
          onChange={(e) => setEnd(e.target.value)}
        >
          <option value="">Choose destination</option>
          {significantNodes.map(node => (
            <option key={`end-${node.id}`} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="calculate-btn"
        onClick={calculateRoute}
        disabled={!start || !end}
      >
        <span>🗺️ Calculate Route</span>
      </button>
    </div>
  );
}