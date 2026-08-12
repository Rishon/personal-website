"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { SPOTIFY_REDIRECT_URI } from "@/lib/site";

export default function SpotifyNavigate() {
  const router = useRouter();

  useEffect(() => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirect_uri = SPOTIFY_REDIRECT_URI;
    const scope = "user-read-playback-state user-read-currently-playing";

    const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id,
      response_type: "code",
      redirect_uri,
      scope,
      show_dialog: "true",
    })}`;

    setTimeout(() => {
      router.push(url);
    }, 1000);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center font-bold">
      <p>Redirecting to Spotify...</p>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isBlocked = process.env.NEXT_PUBLIC_SPOTIFY_OAUTH === "false";

  if (isBlocked) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
