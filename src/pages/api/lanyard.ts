import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = "185711883460935680";

  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Lanyard data:", error);
    res.status(500).json({ error: "Failed to fetch Lanyard data" });
  }
}

export async function fetchLanyardData() {
  const response = await fetch("/api/lanyard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Lanyard data");
  }

  const data = await response.json();
  return data;
}
