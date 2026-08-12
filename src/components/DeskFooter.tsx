import { LuVolume2, LuVolumeX } from "react-icons/lu";
import { useClickSound } from "@/lib/useClickSound";

const BUILD = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";

export default function DeskFooter() {
  const { toggle, enabled } = useClickSound();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[1] hidden h-dock items-center px-8 md:flex">
      <span className="select-none font-mono text-sm tracking-tight text-white/40 transition-colors duration-300 hover:text-white/70">
        rishon<span className="text-xs">.systems</span>
      </span>

      <div className="flex-1" />

      <button
        onClick={toggle}
        aria-label={enabled ? "Mute click sounds" : "Unmute click sounds"}
        aria-pressed={enabled}
        className="mr-6 flex h-8 w-8 items-center justify-center rounded-lg text-white/25 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white/60"
      >
        {enabled ? (
          <LuVolume2 className="h-4 w-4" />
        ) : (
          <LuVolumeX className="h-4 w-4" />
        )}
      </button>

      <div className="flex flex-col items-end leading-tight">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Rishon Jaffe
        </p>
        <p className="font-mono text-[10px] tabular-nums tracking-wider text-white/20">
          {BUILD}
        </p>
      </div>
    </footer>
  );
}
