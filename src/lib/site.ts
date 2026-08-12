export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
        ? "https://rishon.systems"
        : "http://127.0.0.1:3000");

export const SPOTIFY_REDIRECT_URI = `${SITE_URL}/auth/spotify-callback`;
