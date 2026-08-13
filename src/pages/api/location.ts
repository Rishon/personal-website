import type { NextApiRequest, NextApiResponse } from "next";
import { authorise } from "@/lib/quantumApi";
import { readLocation, writeCity } from "@/lib/location";

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
    return res.status(200).json(readLocation());
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = authorise(req.headers.authorization);
  if (auth === "unconfigured") {
    return res.status(503).json({ error: "Quantum API is not configured" });
  }
  if (auth === "denied") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const city = cleanCity(req.body?.city);
  if (!city) {
    return res.status(400).json({ error: "Invalid city" });
  }

  writeCity(city);
  return res.status(200).json({ ok: true });
}
