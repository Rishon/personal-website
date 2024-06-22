export async function fetchLanyardData(userId: string) {
  try {
    const userId = "185711883460935680";
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Lanyard data:", error);
    return null;
  }
}
