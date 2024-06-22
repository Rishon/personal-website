"use client";

// Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

/// React
import React, { useEffect, useState } from "react";

// Utils
import { fetchLanyardData } from "@/utils/Lanyard";

// Icons
import { FaSpotify } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  // Navigation
  const currentPage = usePathname();

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Lanyard
  const [spotifyData, setSpotifyData] = useState<{
    song: string;
    artist: string;
    cover: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const lanyard = await fetchLanyardData();
      const spotifyInfo = lanyard?.data?.spotify;

      if (spotifyInfo) {
        setSpotifyData({
          song: spotifyInfo.song,
          artist: spotifyInfo.artist,
          cover: spotifyInfo.album_art_url,
        });
      } else {
        setSpotifyData(null);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="w-full max-w-4xl sm:px-0 mx-auto mt-8 flex flex-col sm:flex-row items-center">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <p
              className={`text-2xl ${
                currentPage === link.path
                  ? "text-white-500 cursor-pointer"
                  : "hover:text-white text-gray-700 cursor-pointer"
              }`}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Spotify */}
      <div className="text-[#1DB954] mt-5 bg-gray-700 bg-opacity-20 p-2 rounded-lg sm:ml-auto px-4 text-center sm:text-left">
        {spotifyData ? (
          <div className="flex items-center justify-center sm:justify-between">
            <div className="flex items-center">
              <div className="text-right sm:text-right">
                <div className="font-bold">
                  {spotifyData.artist.length > 25
                    ? `${spotifyData.artist.substring(0, 25)}...`
                    : spotifyData.artist}
                </div>
                {spotifyData.song.length > 25
                  ? `${spotifyData.song.substring(0, 25)}...`
                  : spotifyData.song}
              </div>
              {spotifyData.cover && (
                <Image
                  width={100}
                  height={100}
                  src={spotifyData.cover}
                  alt="Album cover"
                  className="w-10 h-10 ml-4 rounded-md"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-2">Not listening to anything</span>
            <FaSpotify className="text-xl mt-1" />
          </div>
        )}
      </div>
    </header>
  );
}
