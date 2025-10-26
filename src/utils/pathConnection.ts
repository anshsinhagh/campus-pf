// src/utils/pathConnection.ts
import type { Node, Edge } from './data/campusGraph';
import type { LatLngExpression } from 'leaflet';

// Find the closest point on a line segment (edge) to a given point
function closestPointOnSegment(
  point: LatLngExpression,
  lineStart: LatLngExpression,
  lineEnd: LatLngExpression
): { point: LatLngExpression; distance: number } {
  const [pLat, pLng] = point as [number, number];
  const [sLat, sLng] = lineStart as [number, number];
  const [eLat, eLng] = lineEnd as [number, number];

  // Convert to vector math
  const A = pLat - sLat;
  const B = pLng - sLng;
  const C = eLat - sLat;
  const D = eLng - sLng;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  
  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let closestLat, closestLng;

  if (param < 0) {
    closestLat = sLat;
    closestLng = sLng;
  } else if (param > 1) {
    closestLat = eLat;
    closestLng = eLng;
  } else {
    closestLat = sLat + param * C;
    closestLng = sLng + param * D;
  }

  // Calculate distance
  const dx = pLat - closestLat;
  const dy = pLng - closestLng;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return { point: [closestLat, closestLng] as LatLngExpression, distance };
}

// Find the closest connection point on the graph for a custom location
export function findClosestConnection(
  customNode: Node,
  allNodes: Node[],
  edges: Edge[]
): { connectionPoint: LatLngExpression; connectedTo: string; distance: number } {
  let closestConnection = {
    connectionPoint: [customNode.lat, customNode.lng] as LatLngExpression,
    connectedTo: '',
    distance: Infinity
  };

  // Check every edge to find the closest connection point
  edges.forEach(edge => {
    const fromNode = allNodes.find(n => n.id === edge.from);
    const toNode = allNodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return;

    const fromPoint: LatLngExpression = [fromNode.lat, fromNode.lng];
    const toPoint: LatLngExpression = [toNode.lat, toNode.lng];
    const customPoint: LatLngExpression = [customNode.lat, customNode.lng];

    const result = closestPointOnSegment(customPoint, fromPoint, toPoint);
    
    if (result.distance < closestConnection.distance) {
      // Choose which node to connect to based on which is closer
      const distToFrom = Math.hypot(fromNode.lat - customNode.lat, fromNode.lng - customNode.lng);
      const distToTo = Math.hypot(toNode.lat - customNode.lat, toNode.lng - customNode.lng);
      
      closestConnection = {
        connectionPoint: result.point,
        connectedTo: distToFrom < distToTo ? edge.from : edge.to,
        distance: result.distance
      };
    }
  });

  return closestConnection;
}

// Create edges to connect custom locations to the graph
export function connectCustomLocations(
  customNodes: Node[],
  allNodes: Node[],
  edges: Edge[]
): Edge[] {
  const newEdges: Edge[] = [...edges];
  
  customNodes.forEach(customNode => {
    if (customNode.custom) {
      const connection = findClosestConnection(customNode, allNodes, edges);
      
      if (connection.connectedTo) {
        // Add edge from custom location to the closest connection point
        const newEdge: Edge = {
          from: customNode.id,
          to: connection.connectedTo,
          weight: Math.round(connection.distance * 111320) // Convert to meters (approx)
        };
        
        // Only add if it doesn't already exist
        if (!newEdges.some(e => 
          (e.from === newEdge.from && e.to === newEdge.to) ||
          (e.from === newEdge.to && e.to === newEdge.from)
        )) {
          newEdges.push(newEdge);
        }
      }
    }
  });
  
  return newEdges;
}