"use client";

import { useEffect } from "react";

export default function SpotifyNavigate() {
  useEffect(() => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirect_uri = "http://localhost:3000/auth/spotify-callback";
    const scope = "user-read-playback-state user-read-currently-playing";

    const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id,
      response_type: "code",
      redirect_uri,
      scope,
      show_dialog: "true",
    })}`;

    window.location.href = url;
  }, []);

  return (
    <main>
      <p>Redirecting to Spotify...</p>
    </main>
  );
}
