import { useState } from 'react';
import Map from './components/Map';
import RouteControls from './components/RouteControls';
import type { LatLngExpression } from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { findShortestPath } from './utils/shortestPath';
import { nodes, edges } from './utils/data/campusGraph';

export default function App() {
  const [start, setStart] = useState<LatLngExpression | null>(null);
  const [end, setEnd] = useState<LatLngExpression | null>(null);
  const [pathNodes, setPathNodes] = useState<LatLngExpression[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateRoute = () => {
    if (!start || !end) {
      setError('Please select both start and end points');
      return;
    }
    
    setError(null);
    try {
      const path = findShortestPath(nodes, edges, start, end);
      setPathNodes(path);
      console.log('Route calculated successfully');
    } catch (error) {
      console.error('Error calculating route:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      setPathNodes([]);
    }
  };

  // Use actual node coordinates that exist in your graph
  const handleSetStart = () => {
    setStart([43.4720, -80.5440]); // N1 coordinates
    setError(null);
  };

  const handleSetEnd = () => {
    setEnd([43.4734, -80.5485]); // N8 coordinates
    setError(null);
  };

  return (
    <div className="app-container">
      <RouteControls
        setStart={handleSetStart}
        setEnd={handleSetEnd}
        calculateRoute={handleCalculateRoute}
      />
      {error && (
        <div className="error-message" style={{color: 'red', padding: '10px'}}>
          {error}
        </div>
      )}
      <div className="map-container">
        <Map start={start} end={end} pathNodes={pathNodes} />
      </div>
    </div>
  );
}