import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, refreshAccessToken } from "@/lib/SpotifyLib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let token = await getAccessToken();

    let response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      console.log("Access token expired, refreshing...");
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

    if (response.status === 204) {
      console.log("No track currently playing");
      return res.status(200).json({ message: "No track currently playing" });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Spotify API error:",
        errorText,
        "Status:",
        response.status
      );
      return res
        .status(response.status)
        .json({ error: "Spotify API error", details: errorText });
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response from Spotify:", text);
      return res
        .status(500)
        .json({ error: "Invalid response format from Spotify", details: text });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching Spotify data:", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
