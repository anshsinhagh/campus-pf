// src/components/Map.tsx
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { nodes, edges, type Node } from '../utils/data/campusGraph';
import { useState } from 'react';

const startIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const endIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Invisible icon - completely transparent
const invisibleIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Only show when clicked
const clickedNodeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0ZGN0IwMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapProps {
  start: LatLngExpression | null;
  end: LatLngExpression | null;
  pathNodes: LatLngExpression[];
}

export default function Map({ start, end, pathNodes }: MapProps) {
  const [clickedNode, setClickedNode] = useState<Node | null>(null);
  const [showCoordsPanel, setShowCoordsPanel] = useState(false);

  const handleNodeClick = (node: Node) => {
    setClickedNode(node);
    setShowCoordsPanel(true);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setShowCoordsPanel(false);
    }, 8000);
  };

  const copyToClipboard = () => {
    if (clickedNode) {
      const text = `${clickedNode.lat.toFixed(6)}, ${clickedNode.lng.toFixed(6)}`;
      navigator.clipboard.writeText(text).then(() => {
        // Show copied feedback
        const button = document.querySelector('.copy-coords-btn');
        if (button) {
          const originalText = button.textContent;
          button.textContent = '✓ Copied!';
          setTimeout(() => {
            if (button) button.textContent = originalText;
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  const closeCoordsPanel = () => {
    setShowCoordsPanel(false);
    setClickedNode(null);
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={[43.472, -80.544]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* All possible paths - yellow with 50% opacity */}
        {edges.map(e => {
          const from = nodes.find(n => n.id === e.from);
          const to = nodes.find(n => n.id === e.to);
          if (!from || !to) return null;
          return (
            <Polyline
              key={`${e.from}-${e.to}`}
              positions={[[from.lat, from.lng], [to.lat, to.lng]]}
              color="blue"
            />
          );
        })}

        {/* Invisible clickable node markers - no popups */}
        {nodes.map(node => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={clickedNode?.id === node.id ? clickedNodeIcon : invisibleIcon}
            eventHandlers={{
              click: () => {
                handleNodeClick(node);
              },
            }}
          />
        ))}

        {/* Start and end markers */}
        {start && (
          <Marker position={start} icon={startIcon}>
            <Popup>Start</Popup>
          </Marker>
        )}
        {end && (
          <Marker position={end} icon={endIcon}>
            <Popup>End</Popup>
          </Marker>
        )}

        {/* Calculated route path - red and prominent */}
        {pathNodes.length > 0 && (
          <Polyline 
            positions={pathNodes} 
            color="red" 
            weight={6}
            opacity={0.8}
          />
        )}
      </MapContainer>

      {/* Coordinates Display Panel - simplified */}
      {showCoordsPanel && clickedNode && (
        <div className="coordinates-panel">
          <div className="coordinates-header">
            <h3>📍 Location Selected</h3>
            <button className="close-panel-btn" onClick={closeCoordsPanel}>×</button>
          </div>
          <div className="coordinates-display">
            <div className="coord-row">
              <span className="coord-label">Latitude:</span>
              <span className="coord-value">{clickedNode.lat.toFixed(6)}</span>
            </div>
            <div className="coord-row">
              <span className="coord-label">Longitude:</span>
              <span className="coord-value">{clickedNode.lng.toFixed(6)}</span>
            </div>
          </div>
          <div className="coordinates-actions">
            <button className="copy-coords-btn" onClick={copyToClipboard}>
              📋 Copy Coordinates
            </button>
            <small className="coordinates-help">
              Use these for custom locations
            </small>
          </div>
        </div>
      )}
    </div>
  );
}