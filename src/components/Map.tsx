import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { nodes, edges } from '../utils/data/campusGraph';

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

interface MapProps {
  start: LatLngExpression | null;
  end: LatLngExpression | null;
  pathNodes: LatLngExpression[];
}

export default function Map({ start, end, pathNodes }: MapProps) {
  return (
    <MapContainer
      center={[43.472, -80.544]}
      zoom={16}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

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

      {start && <Marker position={start} icon={startIcon}><Popup>Start</Popup></Marker>}
      {end && <Marker position={end} icon={endIcon}><Popup>End</Popup></Marker>}

      {pathNodes.length > 0 && <Polyline positions={pathNodes} color="red" />}
    </MapContainer>
  );
}
