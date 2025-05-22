import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, refreshAccessToken } from "@/lib/SpotifyLib";

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
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "Spotify API error", details: JSON.parse(errorText) });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching Spotify data:", err);
    return res.status(500).json({ error: "Server error", details: err });
  }
}
