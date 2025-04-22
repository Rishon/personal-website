import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}

export async function fetchSpotifyData() {
  const response = await fetch("/api/spotify", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify data");
  }

  const data = await response.json();
  return data;
}
