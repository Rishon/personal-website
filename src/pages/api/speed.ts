import type { NextApiRequest, NextApiResponse } from "next";
import { clearSpeed, readPresence, writeCity, writeSpeed } from "@/lib/speed";

const SECRET = process.env.SPEED_API_SECRET;

const CITY_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'-]{0,63}$/u;

// Accepts a plausible place name and rejects anything else outright
function cleanCity(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const city = value.trim();
  return CITY_PATTERN.test(city) ? city : null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(readPresence());
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!SECRET) {
    return res.status(503).json({ error: "Speed endpoint is not configured" });
  }

  if (req.headers.authorization !== `Bearer ${SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.body?.stopped === true) {
    clearSpeed();
    return res.status(200).json({ ok: true });
  }

  const city = cleanCity(req.body?.city);

  // A payload with only a city is the periodic location ping
  if (req.body?.kmh === undefined) {
    if (!city) return res.status(400).json({ error: "Nothing to update" });
    writeCity(city);
    return res.status(200).json({ ok: true });
  }

  const kmh = Number(req.body.kmh);
  if (!Number.isFinite(kmh) || kmh < 0 || kmh > 400) {
    return res.status(400).json({ error: "Invalid speed" });
  }

  writeSpeed(Math.round(kmh), city);
  return res.status(200).json({ ok: true });
}
