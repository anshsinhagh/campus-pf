import type { Node, Edge } from './data/campusGraph';
import type { LatLngExpression } from 'leaflet';

export function findShortestPath(
  nodes: Node[],
  edges: Edge[],
  startCoord: LatLngExpression,
  endCoord: LatLngExpression
): LatLngExpression[] {
  // Find the closest node to start and end
  const closestNode = (coord: LatLngExpression) =>
    nodes.reduce((prev, curr) => {
      const [lat, lng] = coord as [number, number];
      const dist = Math.hypot(curr.lat - lat, curr.lng - lng);
      const prevDist = Math.hypot(prev.lat - lat, prev.lng - lng);
      return dist < prevDist ? curr : prev;
    });

  const startNode = closestNode(startCoord);
  const endNode = closestNode(endCoord);

  console.log('Finding path from', startNode.id, 'to', endNode.id);

  // Build adjacency list
  const graph: Record<string, { node: string; weight: number }[]> = {};
  nodes.forEach(n => graph[n.id] = []);
  
  edges.forEach(edge => {
    // For undirected graph, add both directions
    graph[edge.from].push({ node: edge.to, weight: edge.weight });
    graph[edge.to].push({ node: edge.from, weight: edge.weight });
  });

  // Dijkstra's algorithm with proper priority queue simulation
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const visited = new Set<string>();
  
  nodes.forEach(n => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
  });
  distances[startNode.id] = 0;

  // Simple priority queue simulation
  const getNextNode = () => {
    let minDistance = Infinity;
    let minNode = null;
    
    for (const nodeId of Object.keys(distances)) {
      if (!visited.has(nodeId) && distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        minNode = nodeId;
      }
    }
    return minNode;
  };

  let currentNode = getNextNode();
  
  while (currentNode) {
    if (currentNode === endNode.id) break;
    
    const currentDistance = distances[currentNode];
    visited.add(currentNode);

    // Update neighbors
    for (const neighbor of graph[currentNode]) {
      if (visited.has(neighbor.node)) continue;
      
      const newDistance = currentDistance + neighbor.weight;
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        previous[neighbor.node] = currentNode;
      }
    }
    
    currentNode = getNextNode();
  }

  // Reconstruct path
  if (distances[endNode.id] === Infinity) {
    throw new Error(`No path exists from ${startNode.id} to ${endNode.id}`);
  }

  const path: Node[] = [];
  let current: string | null = endNode.id;
  
  while (current) {
    const node = nodes.find(n => n.id === current);
    if (node) path.unshift(node);
    current = previous[current];
  }

  console.log('Path found:', path.map(n => n.id));
  console.log('Total distance:', distances[endNode.id]);

  console.log('=== PATH FOUND ===');
  path.forEach((node, index) => {
    console.log(`${index + 1}. ${node.id} (${node.lat}, ${node.lng})`);
  });
  console.log('Total nodes in path:', path.length);
  console.log('==================');

  return path.map(n => [n.lat, n.lng] as LatLngExpression);
}