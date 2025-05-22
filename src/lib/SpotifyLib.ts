import fs from "fs";
import path from "path";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

let refresh_token = "";
let access_token = "";

export async function refreshAccessToken(token?: string | null) {
  if (token) refresh_token = token;

  handleTokenFromFile();

  if (!client_id || !client_secret) {
    throw new Error("Client ID or Client Secret is not set.");
  }

  if (!refresh_token) {
    throw new Error("Refresh token is not set.");
  }

  if (!access_token) {
    throw new Error("Access token is not set.");
  }

  console.log("Refreshing access token...");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${data.error}`);
  }

  access_token = data.access_token;
  return access_token;
}

export function getAccessToken() {
  return access_token;
}

function handleTokenFromFile(newRefreshToken: string = "") {
  const filePath = path.join(process.cwd(), "spotify-data.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ access_token, refresh_token }, null, 2),
      "utf8"
    );
    console.log("File created:", filePath);
    return;
  }

  let data: { access_token?: string; refresh_token?: string } = {};
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileContents);
  } catch (err) {
    console.warn("Failed to parse spotify-data.json. Rewriting it.");
  }

  let updated = false;

  if (data.access_token) {
    access_token = data.access_token;
  } else {
    updated = true;
  }

  if (data.refresh_token) {
    refresh_token = data.refresh_token;
  } else {
    updated = true;
  }

  if (newRefreshToken) {
    refresh_token = newRefreshToken;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ access_token, refresh_token }, null, 2),
      "utf8"
    );
  }
}
