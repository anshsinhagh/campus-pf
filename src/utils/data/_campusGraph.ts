// src/utils/data/campusGraph.ts

export interface Node {
  id: string;
  lat: number;
  lng: number;
}

export interface Edge {
  from: string;
  to: string;
  weight: number; // arbitrary distance
}

// 30 example nodes (campus GPS points)
export const nodes: Node[] = [
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
];

// Edges between nodes (intersecting paths)
export const edges: Edge[] = [
  { from: 'N1', to: 'N2', weight: 50 },
  { from: 'N2', to: 'N3', weight: 55 },
  { from: 'N3', to: 'N4', weight: 50 },
  { from: 'N4', to: 'N5', weight: 60 },
  { from: 'N5', to: 'N6', weight: 50 },
  { from: 'N6', to: 'N7', weight: 55 },
  { from: 'N7', to: 'N8', weight: 60 },
  { from: 'N8', to: 'N9', weight: 55 },
  { from: 'N9', to: 'N10', weight: 50 },
  { from: 'N11', to: 'N12', weight: 50 },
  { from: 'N12', to: 'N13', weight: 55 },
  { from: 'N13', to: 'N14', weight: 50 },
  { from: 'N14', to: 'N15', weight: 60 },
  { from: 'N15', to: 'N16', weight: 50 },
  { from: 'N16', to: 'N17', weight: 55 },
  { from: 'N17', to: 'N18', weight: 60 },
  { from: 'N18', to: 'N19', weight: 55 },
  { from: 'N19', to: 'N20', weight: 50 },
  { from: 'N1', to: 'N11', weight: 120 },
  { from: 'N2', to: 'N12', weight: 115 },
  { from: 'N3', to: 'N13', weight: 130 },
  { from: 'N4', to: 'N14', weight: 125 },
  { from: 'N5', to: 'N15', weight: 140 },
  { from: 'N6', to: 'N16', weight: 135 },
  { from: 'N7', to: 'N17', weight: 150 },
  { from: 'N8', to: 'N18', weight: 145 },
  { from: 'N9', to: 'N19', weight: 160 },
  { from: 'N10', to: 'N20', weight: 155 },
  { from: 'N21', to: 'N22', weight: 60 },
  { from: 'N22', to: 'N23', weight: 65 },
  { from: 'N23', to: 'N24', weight: 70 },
  { from: 'N25', to: 'N26', weight: 60 },
  { from: 'N26', to: 'N27', weight: 65 },
  { from: 'N27', to: 'N28', weight: 70 },
  { from: 'N29', to: 'N30', weight: 75 },
  // intersecting paths
  { from: 'N3', to: 'N22', weight: 80 },
  { from: 'N5', to: 'N23', weight: 90 },
  { from: 'N7', to: 'N24', weight: 85 },
  { from: 'N10', to: 'N25', weight: 100 },
  { from: 'N12', to: 'N26', weight: 95 },
  { from: 'N15', to: 'N27', weight: 110 },
  { from: 'N18', to: 'N28', weight: 105 },
  { from: 'N20', to: 'N29', weight: 115 },
];
