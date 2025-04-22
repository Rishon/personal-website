import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, refreshAccessToken } from "@/lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let token = getAccessToken();

    let response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      token = await refreshAccessToken();
      response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: "Spotify API error" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err });
  }
}

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
