import fs from "fs";
import path from "path";

interface Store {
  kmh: number | null;
  speedAt: number;
  city: string | null;
  cityAt: number;
}

export interface Presence {
  driving: boolean;
  kmh: number | null;
  city: string | null;
}

export const SPEED_STALE_MS = 120_000;
export const CITY_STALE_MS = 3 * 60 * 60 * 1000;

const FILE = path.join(process.cwd(), "speed-data.json");
const EMPTY: Store = { kmh: null, speedAt: 0, city: null, cityAt: 0 };

function load(): Store {
  try {
    if (!fs.existsSync(FILE)) return { ...EMPTY };
    return { ...EMPTY, ...JSON.parse(fs.readFileSync(FILE, "utf8")) };
  } catch {
    return { ...EMPTY };
  }
}

function save(store: Store): void {
  try {
    fs.writeFileSync(FILE, JSON.stringify(store), "utf8");
  } catch {}
}

// Records a speed reading and refreshes the city when one is supplied
export function writeSpeed(kmh: number, city: string | null): void {
  const store = load();
  store.kmh = kmh;
  store.speedAt = Date.now();
  if (city) {
    store.city = city;
    store.cityAt = Date.now();
  }
  save(store);
}

// Records the city on its own, independent of any driving
export function writeCity(city: string): void {
  const store = load();
  store.city = city;
  store.cityAt = Date.now();
  save(store);
}

// Drops the speed but keeps the city since it outlives a drive
export function clearSpeed(): void {
  const store = load();
  store.kmh = null;
  store.speedAt = 0;
  save(store);
}

export function readPresence(): Presence {
  const store = load();
  const now = Date.now();

  const driving = store.kmh !== null && now - store.speedAt <= SPEED_STALE_MS;
  const cityFresh = store.city !== null && now - store.cityAt <= CITY_STALE_MS;

  return {
    driving,
    kmh: driving ? store.kmh : null,
    city: cityFresh ? store.city : null,
  };
}
