// src/utils/data/campusGraph.ts

export interface Node {
  id: string;
  lat: number;
  lng: number;
}

export interface Edge {
  from: string;
  to: string;
  weight: number; // actual distance in meters
}

// Haversine distance calculation
function calculateDistance(node1: Node, node2: Node): number {
  const R = 6371000; // Earth radius in meters
  const lat1 = node1.lat * Math.PI / 180;
  const lat2 = node2.lat * Math.PI / 180;
  const deltaLat = (node2.lat - node1.lat) * Math.PI / 180;
  const deltaLng = (node2.lng - node1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return Math.round(R * c); // Distance in meters, rounded
}

// Define nodes first
export const nodes: Node[] = [
  // Original nodes (N1-N30)
  { id: 'N1', lat: 43.4720, lng: -80.5440 },
  { id: 'N2', lat: 43.4721, lng: -80.5445 },
  { id: 'N3', lat: 43.4722, lng: -80.5450 },
  { id: 'N4', lat: 43.4723, lng: -80.5455 },
  { id: 'N5', lat: 43.4725, lng: -80.5460 },
  { id: 'N6', lat: 43.4726, lng: -80.5465 },
  { id: 'N7', lat: 43.4728, lng: -80.5470 },
  { id: 'N8', lat: 43.4730, lng: -80.5475 },
  { id: 'N9', lat: 43.4732, lng: -80.5480 },
  { id: 'N10', lat: 43.4734, lng: -80.5485 },
  { id: 'N11', lat: 43.4736, lng: -80.5440 },
  { id: 'N12', lat: 43.4738, lng: -80.5445 },
  { id: 'N13', lat: 43.4740, lng: -80.5450 },
  { id: 'N14', lat: 43.4742, lng: -80.5455 },
  { id: 'N15', lat: 43.4744, lng: -80.5460 },
  { id: 'N16', lat: 43.4746, lng: -80.5465 },
  { id: 'N17', lat: 43.4748, lng: -80.5470 },
  { id: 'N18', lat: 43.4750, lng: -80.5475 },
  { id: 'N19', lat: 43.4752, lng: -80.5480 },
  { id: 'N20', lat: 43.4754, lng: -80.5485 },
  { id: 'N21', lat: 43.4725, lng: -80.5470 },
  { id: 'N22', lat: 43.4730, lng: -80.5460 },
  { id: 'N23', lat: 43.4735, lng: -80.5450 },
  { id: 'N24', lat: 43.4740, lng: -80.5440 },
  { id: 'N25', lat: 43.4745, lng: -80.5470 },
  { id: 'N26', lat: 43.4750, lng: -80.5460 },
  { id: 'N27', lat: 43.4755, lng: -80.5450 },
  { id: 'N28', lat: 43.4760, lng: -80.5440 },
  { id: 'N29', lat: 43.4765, lng: -80.5470 },
  { id: 'N30', lat: 43.4770, lng: -80.5460 },
  
  // New Southeast Nodes - Main Southeast Path (N31-N40)
  { id: 'N31', lat: 43.4715, lng: -80.5435 },
  { id: 'N32', lat: 43.4710, lng: -80.5430 },
  { id: 'N33', lat: 43.4705, lng: -80.5425 },
  { id: 'N34', lat: 43.4700, lng: -80.5420 },
  { id: 'N35', lat: 43.4695, lng: -80.5415 },
  { id: 'N36', lat: 43.4690, lng: -80.5410 },
  { id: 'N37', lat: 43.4685, lng: -80.5405 },
  { id: 'N38', lat: 43.4680, lng: -80.5400 },
  { id: 'N39', lat: 43.4675, lng: -80.5395 },
  { id: 'N40', lat: 43.4670, lng: -80.5390 },
  
  // New Southeast Nodes - Eastern Branch (N41-N50)
  { id: 'N41', lat: 43.4718, lng: -80.5420 },
  { id: 'N42', lat: 43.4716, lng: -80.5405 },
  { id: 'N43', lat: 43.4714, lng: -80.5390 },
  { id: 'N44', lat: 43.4712, lng: -80.5375 },
  { id: 'N45', lat: 43.4710, lng: -80.5360 },
  { id: 'N46', lat: 43.4708, lng: -80.5345 },
  { id: 'N47', lat: 43.4706, lng: -80.5330 },
  { id: 'N48', lat: 43.4704, lng: -80.5315 },
  { id: 'N49', lat: 43.4702, lng: -80.5300 },
  { id: 'N50', lat: 43.4700, lng: -80.5285 },
  
  // New Southeast Nodes - Southern Branch (N51-N55)
  { id: 'N51', lat: 43.4690, lng: -80.5430 },
  { id: 'N52', lat: 43.4680, lng: -80.5435 },
  { id: 'N53', lat: 43.4670, lng: -80.5440 },
  { id: 'N54', lat: 43.4660, lng: -80.5445 },
  { id: 'N55', lat: 43.4650, lng: -80.5450 },
];

// Then define edges using a function to avoid circular dependency
export function getEdges(): Edge[] {
  const findNode = (id: string): Node => {
    const node = nodes.find(n => n.id === id);
    if (!node) throw new Error(`Node ${id} not found`);
    return node;
  };

  return [
    // Original edges
    { from: 'N1', to: 'N2', weight: calculateDistance(findNode('N1'), findNode('N2')) },
    { from: 'N2', to: 'N3', weight: calculateDistance(findNode('N2'), findNode('N3')) },
    { from: 'N3', to: 'N4', weight: calculateDistance(findNode('N3'), findNode('N4')) },
    { from: 'N4', to: 'N5', weight: calculateDistance(findNode('N4'), findNode('N5')) },
    { from: 'N5', to: 'N6', weight: calculateDistance(findNode('N5'), findNode('N6')) },
    { from: 'N6', to: 'N7', weight: calculateDistance(findNode('N6'), findNode('N7')) },
    { from: 'N7', to: 'N8', weight: calculateDistance(findNode('N7'), findNode('N8')) },
    { from: 'N8', to: 'N9', weight: calculateDistance(findNode('N8'), findNode('N9')) },
    { from: 'N9', to: 'N10', weight: calculateDistance(findNode('N9'), findNode('N10')) },
    { from: 'N11', to: 'N12', weight: calculateDistance(findNode('N11'), findNode('N12')) },
    { from: 'N12', to: 'N13', weight: calculateDistance(findNode('N12'), findNode('N13')) },
    { from: 'N13', to: 'N14', weight: calculateDistance(findNode('N13'), findNode('N14')) },
    { from: 'N14', to: 'N15', weight: calculateDistance(findNode('N14'), findNode('N15')) },
    { from: 'N15', to: 'N16', weight: calculateDistance(findNode('N15'), findNode('N16')) },
    { from: 'N16', to: 'N17', weight: calculateDistance(findNode('N16'), findNode('N17')) },
    { from: 'N17', to: 'N18', weight: calculateDistance(findNode('N17'), findNode('N18')) },
    { from: 'N18', to: 'N19', weight: calculateDistance(findNode('N18'), findNode('N19')) },
    { from: 'N19', to: 'N20', weight: calculateDistance(findNode('N19'), findNode('N20')) },
    { from: 'N1', to: 'N11', weight: calculateDistance(findNode('N1'), findNode('N11')) },
    { from: 'N2', to: 'N12', weight: calculateDistance(findNode('N2'), findNode('N12')) },
    { from: 'N3', to: 'N13', weight: calculateDistance(findNode('N3'), findNode('N13')) },
    { from: 'N4', to: 'N14', weight: calculateDistance(findNode('N4'), findNode('N14')) },
    { from: 'N5', to: 'N15', weight: calculateDistance(findNode('N5'), findNode('N15')) },
    { from: 'N6', to: 'N16', weight: calculateDistance(findNode('N6'), findNode('N16')) },
    { from: 'N7', to: 'N17', weight: calculateDistance(findNode('N7'), findNode('N17')) },
    { from: 'N8', to: 'N18', weight: calculateDistance(findNode('N8'), findNode('N18')) },
    { from: 'N9', to: 'N19', weight: calculateDistance(findNode('N9'), findNode('N19')) },
    { from: 'N10', to: 'N20', weight: calculateDistance(findNode('N10'), findNode('N20')) },
    { from: 'N21', to: 'N22', weight: calculateDistance(findNode('N21'), findNode('N22')) },
    { from: 'N22', to: 'N23', weight: calculateDistance(findNode('N22'), findNode('N23')) },
    { from: 'N23', to: 'N24', weight: calculateDistance(findNode('N23'), findNode('N24')) },
    { from: 'N25', to: 'N26', weight: calculateDistance(findNode('N25'), findNode('N26')) },
    { from: 'N26', to: 'N27', weight: calculateDistance(findNode('N26'), findNode('N27')) },
    { from: 'N27', to: 'N28', weight: calculateDistance(findNode('N27'), findNode('N28')) },
    { from: 'N29', to: 'N30', weight: calculateDistance(findNode('N29'), findNode('N30')) },
    
    // Original intersecting paths
    { from: 'N3', to: 'N22', weight: calculateDistance(findNode('N3'), findNode('N22')) },
    { from: 'N5', to: 'N23', weight: calculateDistance(findNode('N5'), findNode('N23')) },
    { from: 'N7', to: 'N24', weight: calculateDistance(findNode('N7'), findNode('N24')) },
    { from: 'N10', to: 'N25', weight: calculateDistance(findNode('N10'), findNode('N25')) },
    { from: 'N12', to: 'N26', weight: calculateDistance(findNode('N12'), findNode('N26')) },
    { from: 'N15', to: 'N27', weight: calculateDistance(findNode('N15'), findNode('N27')) },
    { from: 'N18', to: 'N28', weight: calculateDistance(findNode('N18'), findNode('N28')) },
    { from: 'N20', to: 'N29', weight: calculateDistance(findNode('N20'), findNode('N29')) },

    // New Southeast Connections
    
    // Main Southeast Path (N31-N40 chain)
    { from: 'N1', to: 'N31', weight: calculateDistance(findNode('N1'), findNode('N31')) },
    { from: 'N31', to: 'N32', weight: calculateDistance(findNode('N31'), findNode('N32')) },
    { from: 'N32', to: 'N33', weight: calculateDistance(findNode('N32'), findNode('N33')) },
    { from: 'N33', to: 'N34', weight: calculateDistance(findNode('N33'), findNode('N34')) },
    { from: 'N34', to: 'N35', weight: calculateDistance(findNode('N34'), findNode('N35')) },
    { from: 'N35', to: 'N36', weight: calculateDistance(findNode('N35'), findNode('N36')) },
    { from: 'N36', to: 'N37', weight: calculateDistance(findNode('N36'), findNode('N37')) },
    { from: 'N37', to: 'N38', weight: calculateDistance(findNode('N37'), findNode('N38')) },
    { from: 'N38', to: 'N39', weight: calculateDistance(findNode('N38'), findNode('N39')) },
    { from: 'N39', to: 'N40', weight: calculateDistance(findNode('N39'), findNode('N40')) },
    
    // Eastern Branch (N41-N50 chain)
    { from: 'N31', to: 'N41', weight: calculateDistance(findNode('N31'), findNode('N41')) },
    { from: 'N41', to: 'N42', weight: calculateDistance(findNode('N41'), findNode('N42')) },
    { from: 'N42', to: 'N43', weight: calculateDistance(findNode('N42'), findNode('N43')) },
    { from: 'N43', to: 'N44', weight: calculateDistance(findNode('N43'), findNode('N44')) },
    { from: 'N44', to: 'N45', weight: calculateDistance(findNode('N44'), findNode('N45')) },
    { from: 'N45', to: 'N46', weight: calculateDistance(findNode('N45'), findNode('N46')) },
    { from: 'N46', to: 'N47', weight: calculateDistance(findNode('N46'), findNode('N47')) },
    { from: 'N47', to: 'N48', weight: calculateDistance(findNode('N47'), findNode('N48')) },
    { from: 'N48', to: 'N49', weight: calculateDistance(findNode('N48'), findNode('N49')) },
    { from: 'N49', to: 'N50', weight: calculateDistance(findNode('N49'), findNode('N50')) },
    
    // Southern Branch (N51-N55 chain)
    { from: 'N32', to: 'N51', weight: calculateDistance(findNode('N32'), findNode('N51')) },
    { from: 'N51', to: 'N52', weight: calculateDistance(findNode('N51'), findNode('N52')) },
    { from: 'N52', to: 'N53', weight: calculateDistance(findNode('N52'), findNode('N53')) },
    { from: 'N53', to: 'N54', weight: calculateDistance(findNode('N53'), findNode('N54')) },
    { from: 'N54', to: 'N55', weight: calculateDistance(findNode('N54'), findNode('N55')) },
    
    // Cross connections between branches
    { from: 'N33', to: 'N41', weight: calculateDistance(findNode('N33'), findNode('N41')) },
    { from: 'N35', to: 'N43', weight: calculateDistance(findNode('N35'), findNode('N43')) },
    { from: 'N37', to: 'N45', weight: calculateDistance(findNode('N37'), findNode('N45')) },
    { from: 'N39', to: 'N47', weight: calculateDistance(findNode('N39'), findNode('N47')) },
    { from: 'N34', to: 'N51', weight: calculateDistance(findNode('N34'), findNode('N51')) },
    { from: 'N36', to: 'N52', weight: calculateDistance(findNode('N36'), findNode('N52')) },
    { from: 'N38', to: 'N53', weight: calculateDistance(findNode('N38'), findNode('N53')) },
    { from: 'N40', to: 'N54', weight: calculateDistance(findNode('N40'), findNode('N54')) },
    
    // Connections back to original network
    { from: 'N11', to: 'N31', weight: calculateDistance(findNode('N11'), findNode('N31')) },
    { from: 'N21', to: 'N32', weight: calculateDistance(findNode('N21'), findNode('N32')) },
    { from: 'N24', to: 'N41', weight: calculateDistance(findNode('N24'), findNode('N41')) },
    { from: 'N28', to: 'N42', weight: calculateDistance(findNode('N28'), findNode('N42')) },
    { from: 'N30', to: 'N43', weight: calculateDistance(findNode('N30'), findNode('N43')) },
  ];
}

// Export the edges
export const edges = getEdges();