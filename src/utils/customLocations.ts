// src/utils/customLocations.ts
import type { Node } from './data/campusGraph';

const CUSTOM_LOCATIONS_KEY = 'campus-nav-custom-locations';

export function getCustomLocations(): Node[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CUSTOM_LOCATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCustomLocation(location: Node): void {
  const existing = getCustomLocations();
  const newLocation = { ...location, custom: true };
  const updated = [...existing, newLocation];
  localStorage.setItem(CUSTOM_LOCATIONS_KEY, JSON.stringify(updated));
}

export function deleteCustomLocation(locationId: string): void {
  const existing = getCustomLocations();
  const updated = existing.filter(loc => loc.id !== locationId);
  localStorage.setItem(CUSTOM_LOCATIONS_KEY, JSON.stringify(updated));
}

export function getAllNodesWithCustom(nodes: Node[]): Node[] {
  const custom = getCustomLocations();
  return [...nodes, ...custom];
}