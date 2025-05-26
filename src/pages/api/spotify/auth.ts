import type { NextApiRequest, NextApiResponse } from "next";
import { exchange } from "@/lib/SpotifyLib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isBlocked = process.env.NEXT_PUBLIC_SPOTIFY_OAUTH === "false";

  if (isBlocked) {
    return res.redirect(307, "/");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body;
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Missing or invalid code" });
    }

    const tokens = await exchange(code);
    return res.status(200).json(tokens);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res
      .status(500)
      .json({ error: "Failed to exchange code", details: errorMessage });
  }
}
