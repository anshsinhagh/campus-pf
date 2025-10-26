// src/components/RouteControls.tsx
import React, { useState } from 'react';
import { nodes as baseNodes } from '../utils/data/campusGraph';
import { getAllNodesWithCustom, saveCustomLocation } from '../utils/customLocations';

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
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customLat, setCustomLat] = useState('');
  const [customLng, setCustomLng] = useState('');

  // Get all nodes including custom ones
  const allNodes = getAllNodesWithCustom(baseNodes);
  
  // Filter to only show nodes that have names (significant locations + custom)
  const significantNodes = allNodes.filter(node => node.name);

  const handleAddCustomLocation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customName || !customLat || !customLng) return;

    const newLocation = {
      id: `CUSTOM_${Date.now()}`,
      name: customName,
      lat: parseFloat(customLat),
      lng: parseFloat(customLng),
      custom: true
    };

    saveCustomLocation(newLocation);
    setCustomName('');
    setCustomLat('');
    setCustomLng('');
    setShowCustomForm(false);
    
    // Refresh the page to show new location in dropdowns
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Campus Navigator</h1>
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
              {node.name} {node.custom && '📍'}
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
              {node.name} {node.custom && '📍'}
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

      {/* Add Custom Location Section */}
      <div className="custom-location-section">
        <button 
          type="button"
          className="add-location-btn"
          onClick={() => setShowCustomForm(!showCustomForm)}
        >
          {showCustomForm ? '✕ Cancel' : '➕ Add Custom Location'}
        </button>

        {showCustomForm && (
          <form onSubmit={handleAddCustomLocation} className="custom-form">
            <div className="form-group">
              <label>Location Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g., My Dorm, Favorite Spot"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                placeholder="43.4720"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                value={customLng}
                onChange={(e) => setCustomLng(e.target.value)}
                placeholder="-80.5440"
                required
              />
            </div>

            <button type="submit" className="save-location-btn">
              💾 Save Location
            </button>

            <div className="coordinates-help">
              <small>
                💡 Tip: Click anywhere on the map to get coordinates, or use Google Maps
              </small>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}