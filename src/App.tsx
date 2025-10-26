// src/App.tsx
import { useState } from 'react';
import Map from './components/Map';
import RouteControls from './components/RouteControls';
import type { LatLngExpression } from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { findShortestPath } from './utils/shortestPath';
import { nodes, edges } from './utils/data/campusGraph';

export default function App() {
  const [startNodeId, setStartNodeId] = useState<string | null>(null);
  const [endNodeId, setEndNodeId] = useState<string | null>(null);
  const [pathNodes, setPathNodes] = useState<LatLngExpression[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Convert node IDs to coordinates
  const start = startNodeId ? nodes.find(n => n.id === startNodeId) : null;
  const end = endNodeId ? nodes.find(n => n.id === endNodeId) : null;

  const handleCalculateRoute = () => {
    if (!startNodeId || !endNodeId) {
      setError('Please select both start and end points');
      return;
    }
    
    setError(null);
    try {
      const startNode = nodes.find(n => n.id === startNodeId);
      const endNode = nodes.find(n => n.id === endNodeId);
      
      if (!startNode || !endNode) {
        setError('Invalid start or end point selected');
        return;
      }

      const path = findShortestPath(nodes, edges, [startNode.lat, startNode.lng], [endNode.lat, endNode.lng]);
      setPathNodes(path);
      console.log('Route calculated successfully');
    } catch (error) {
      console.error('Error calculating route:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      setPathNodes([]);
    }
  };

  const handleSetStart = (nodeId: string) => {
    setStartNodeId(nodeId);
    setError(null);
  };

  const handleSetEnd = (nodeId: string) => {
    setEndNodeId(nodeId);
    setError(null);
  };

  return (
    <div className="app-container">
      <RouteControls
        start={startNodeId}
        end={endNodeId}
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
        <Map 
          start={start ? [start.lat, start.lng] : null} 
          end={end ? [end.lat, end.lng] : null} 
          pathNodes={pathNodes} 
        />
      </div>
    </div>
  );
}