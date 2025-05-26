import fs from "fs";
import path from "path";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = "/auth/spotify-callback";

interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  timestamp: number;
}

let tokenData: TokenData | null = null;

export async function exchange(code: string): Promise<TokenData> {
  if (!client_id || !client_secret) {
    throw new Error("Client ID or Client Secret is not set");
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error(
        "Spotify API error response:",
        text,
        "Status:",
        response.status
      );
      throw new Error(`Failed to exchange code: ${text || "Unknown error"}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse Spotify API response:", text);
      throw new Error("Invalid response format from Spotify API");
    }

    if (!data.access_token || !data.refresh_token || !data.expires_in) {
      console.error("Incomplete token data:", data);
      throw new Error("Incomplete token data received from Spotify");
    }

    tokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      timestamp: Date.now(),
    };

    console.log("Tokens received and saved!");
    saveTokensToFile();
    return tokenData;
  } catch (err) {
    console.error("Error in exchangeCodeForToken:", err);
    throw err;
  }
}

export async function refreshAccessToken(): Promise<string> {
  if (!tokenData?.refresh_token) {
    throw new Error("No refresh token available");
  }

  try {
    console.log("Refreshing access token");
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
        refresh_token: tokenData.refresh_token,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error(
        "Spotify refresh token error:",
        text,
        "Status:",
        response.status
      );

      throw new Error(`Failed to refresh token: ${text || "Unknown error"}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse refresh token response:", text);
      throw new Error("Invalid response format from Spotify API");
    }

    if (!data.access_token) {
      console.error("No access token in refresh response:", data);
      throw new Error("No access token received from Spotify");
    }

    tokenData = {
      ...tokenData,
      access_token: data.access_token,
      expires_in: data.expires_in || tokenData.expires_in,
      timestamp: Date.now(),
    };

    console.log("Refreshed tokens:", tokenData);
    saveTokensToFile();
    return tokenData.access_token;
  } catch (err) {
    console.error("Error in refreshAccessToken:", err);
    throw err;
  }
}

export async function getAccessToken(): Promise<string> {
  loadTokensFromFile();

  if (!tokenData) {
    console.error("No tokens available in getAccessToken");
    throw new Error("No tokens available");
  }

  const isExpired =
    Date.now() > tokenData.timestamp + (tokenData.expires_in - 60) * 1000;

  if (isExpired) {
    return await refreshAccessToken();
  }

  return tokenData.access_token;
}

function saveTokensToFile() {
  if (!tokenData) return;

  const filePath = path.join(process.cwd(), "spotify-data.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(tokenData, null, 2), "utf8");
    console.log("Tokens saved to file:", filePath);
  } catch (err) {
    console.error("Failed to save tokens to file:", err);
  }
}

function loadTokensFromFile() {
  const filePath = path.join(process.cwd(), "spotify-data.json");
  if (!fs.existsSync(filePath)) {
    console.log("No token file found:", filePath);
    return;
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    tokenData = JSON.parse(fileContents);
  } catch (err) {
    console.warn("Failed to parse spotify-data.json:", err);
    tokenData = null;
  }
}
