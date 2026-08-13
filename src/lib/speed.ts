import { readStore, writeStore } from "@/lib/store";

interface Store {
  kmh: number | null;
  at: number;
}

export interface SpeedState {
  driving: boolean;
  kmh: number | null;
}

export const SPEED_STALE_MS = 120_000;

const FILE = "speed-data.json";
const EMPTY: Store = { kmh: null, at: 0 };

// Records a reading pushed while driving
export function writeSpeed(kmh: number): void {
  writeStore(FILE, { kmh, at: Date.now() } satisfies Store);
}

// Drops the reading so the chip disappears the moment the drive ends
export function clearSpeed(): void {
  writeStore(FILE, { ...EMPTY } satisfies Store);
}

// Reports the speed only while the last push is recent enough to trust
export function readSpeed(): SpeedState {
  const store = readStore(FILE, EMPTY);
  const driving =
    store.kmh !== null && Date.now() - store.at <= SPEED_STALE_MS;

  return { driving, kmh: driving ? store.kmh : null };
}
