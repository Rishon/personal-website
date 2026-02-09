import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const currentPage = usePathname();

  const links = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const [spotifyData, setSpotifyData] = useState<{
    song: string;
    artist: string;
    cover: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSpotifyData();

      if (!data.item) {
        setSpotifyData(null);
        return;
      }

      setSpotifyData({
        song: data.item.name,
        artist: data.item.album.artists[0].name,
        cover: data.item.album.images[0].url,
      });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function fetchSpotifyData() {
    try {
      const response = await fetch("/api/spotify/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return { item: null };
      }

      const data = await response.json();
      return data;
    } catch {
      return { item: null };
    }
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                className={`nav-link text-sm ${
                  currentPage === link.path
                    ? "active text-[var(--text-primary)]"
                    : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Spotify Now Playing */}
        {spotifyData ? (
          <div className="spotify-card hidden sm:flex">
            <FaSpotify className="text-[#1DB954] text-lg flex-shrink-0" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-[var(--text-primary)] font-medium truncate max-w-[120px]">
                  {spotifyData.song}
                </div>
                <div className="text-xs text-[var(--text-secondary)] truncate max-w-[120px]">
                  {spotifyData.artist}
                </div>
              </div>
              {spotifyData.cover && (
                <Image
                  width={32}
                  height={32}
                  src={spotifyData.cover}
                  alt="Album cover"
                  className="w-8 h-8 rounded-md"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <FaSpotify className="text-[#1DB954]" />
            <span>Not playing</span>
          </div>
        )}
      </div>
    </header>
  );
}
