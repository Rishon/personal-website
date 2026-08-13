import { readStore, writeStore } from "@/lib/store";

interface Store {
  city: string | null;
  at: number;
}

export interface LocationState {
  city: string | null;
}

export const LOCATION_STALE_MS = 6 * 60 * 60 * 1000;

const FILE = "location-data.json";
const EMPTY: Store = { city: null, at: 0 };

// Records the city from the periodic ping which runs whether or not I am driving
export function writeCity(city: string): void {
  writeStore(FILE, { city, at: Date.now() } satisfies Store);
}

// Reports the city until the phone has been silent long enough that it may be wrong
export function readLocation(): LocationState {
  const store = readStore(FILE, EMPTY);
  const fresh = store.city !== null && Date.now() - store.at <= LOCATION_STALE_MS;

  return { city: fresh ? store.city : null };
}
