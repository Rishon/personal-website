import { useRouter } from "next/router";
import { refreshAccessToken } from "@/lib/SpotifyLib";

export default function SpotifyCallback() {
  const router = useRouter();
  const { code } = router.query;

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Spotify Authentication</h1>
        <p className="text-lg">
          {code == undefined || code.length === 0
            ? "Code is Empty"
            : `Code: ${code}`}
        </p>
      </div>
    </main>
  );
}
