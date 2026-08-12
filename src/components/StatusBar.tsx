import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { LuCar, LuMapPin } from "react-icons/lu";
import { STATUS_META, useLanyard } from "@/lib/useLanyard";
import { TIMEZONE } from "@/lib/theme";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID;

// Formats the current wall clock in Rishon's timezone
function formatLocalTime(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
}

interface Track {
  song: string;
  artist: string;
  cover: string;
}

export default function StatusBar() {
  const presence = useLanyard(DISCORD_ID);
  const [track, setTrack] = useState<Track | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatLocalTime());
    const id = setInterval(() => setTime(formatLocalTime()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify/validate");
        if (!res.ok) {
          if (!cancelled) setTrack(null);
          return;
        }

        const data = await res.json();
        if (cancelled) return;

        if (!data.item) {
          setTrack(null);
          return;
        }

        setTrack({
          song: data.item.name,
          artist: data.item.album.artists[0].name,
          cover: data.item.album.images[0]?.url ?? "",
        });
      } catch {
        if (!cancelled) setTrack(null);
      }
    };

    load().then((r) => {});
    const id = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/speed");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setSpeed(data.driving ? data.kmh : null);
        setCity(data.city ?? null);
      } catch {
        if (cancelled) return;
        setSpeed(null);
        setCity(null);
      }
    };

    load();
    const id = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const status = presence?.discord_status ?? "offline";
  const meta = STATUS_META[status];

  return (
    <div className="flex min-w-0 items-center justify-between gap-4">
      <span className="flex flex-shrink-0 items-center gap-2 text-sm lowercase tracking-tight text-ink-faint">
        <span className="flex items-center gap-1.5">
          <span
            className={`inline-flex h-1.5 w-1.5 rounded-full ${
              status !== "offline"
                ? "animate-pulse-soft motion-reduce:animate-none"
                : ""
            }`}
            style={{ backgroundColor: meta.color }}
          />
          {meta.label}
        </span>

        {time && (
          <>
            <span aria-hidden="true">|</span>
            <time
              dateTime={time}
              title="Local time in Israel"
              className="tabular-nums"
            >
              {time}
            </time>
          </>
        )}

        {city && (
          <>
            <span aria-hidden="true">|</span>
            <span title="Current city" className="flex items-center gap-1">
              <LuMapPin className="h-3 w-3" />
              {city}
            </span>
          </>
        )}

        {speed !== null && (
          <>
            <span aria-hidden="true">|</span>
            <span
              title="Live speed while driving"
              className="flex items-center gap-1 tabular-nums text-accent"
            >
              <LuCar className="h-3 w-3" />
              {speed} km/h
            </span>
          </>
        )}
      </span>

      {track && (
        <span className="flex min-w-0 items-center gap-2">
          <FaSpotify className="h-3.5 w-3.5 flex-shrink-0 text-[#1DB954]" />
          {track.cover && (
            <Image
              src={track.cover}
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] flex-shrink-0 rounded-[3px]"
              unoptimized
            />
          )}
          <span className="truncate text-sm tracking-tight">
            <span className="text-ink">{track.song}</span>
            <span className="text-ink-faint"> | {track.artist}</span>
          </span>
        </span>
      )}
    </div>
  );
}
