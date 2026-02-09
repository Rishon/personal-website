"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

export default function SpotifyCallback() {
  const router = useRouter();
  const { code } = router.query;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code || typeof code !== "string") {
      setError("No valid code provided in URL");
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await fetch("/api/spotify/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "API response error:",
            errorText,
            "Status:",
            response.status,
          );
          setError(`Failed to exchange code: ${errorText || "Unknown error"}`);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          setError("Invalid response format from server");
          return;
        }

        const data = await response.json();
        console.log("Token exchange response:", data);

        router.push("/");
      } catch (error) {
        console.error("Error during Spotify authentication:", error);
        setError(
          `Authentication failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      }
    };

    exchangeCode();
  }, [code, router]);

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Spotify Authentication</h1>
        <p className="text-lg">
          {error
            ? error
            : code
              ? "Processing authentication..."
              : "No code provided"}
        </p>
      </div>
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
