import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuHouse, LuLayers, LuMail } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useClickSound } from "@/lib/useClickSound";

interface DockItem {
  href: string;
  label: string;
  icon: IconType;
  external?: boolean;
}

const items: DockItem[] = [
  { href: "/", label: "home", icon: LuHouse },
  { href: "/projects", label: "work", icon: LuLayers },
  { href: "/contact", label: "contact", icon: LuMail },
  {
    href: "https://github.rishon.systems",
    label: "github",
    icon: FaGithub,
    external: true,
  },
];

export default function Dock() {
  const router = useRouter();
  const { play } = useClickSound();
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = items.findIndex(
    (item) => !item.external && item.href === router.pathname,
  );

  // Measures the active link to position the pill
  const movePill = useCallback(() => {
    const el = activeIndex >= 0 ? linkRefs.current[activeIndex] : null;
    if (!el) {
      setPill(null);
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIndex]);

  useEffect(() => {
    movePill();
    document.fonts?.ready.then(movePill).catch(() => {});
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [movePill]);

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 z-[60] hidden h-dock -translate-x-1/2 items-center md:flex">
        <div
          className="pointer-events-none absolute bottom-1 top-1 rounded-[10px] bg-white/[0.08] transition-[left,width,opacity] duration-[420ms] ease-settle"
          style={{
            left: pill?.left ?? 0,
            width: pill?.width ?? 0,
            opacity: pill ? 1 : 0,
          }}
        />
        {items.map((item, i) => {
          const isActive = !item.external && item.href === router.pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              onClick={play}
              className={`relative z-10 block px-[1.15rem] py-[0.45rem] text-[0.9375rem] transition-colors duration-150 hover:text-white/60 ${
                isActive ? "text-white/[0.72]" : "text-white/30"
              }`}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-[60] flex h-dock items-start justify-around px-2 pt-1.5 md:hidden">
        {items.map((item) => {
          const isActive = !item.external && item.href === router.pathname;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={play}
              className="flex flex-1 justify-center py-1.5"
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span
                className={`flex flex-col items-center gap-1 transition-colors duration-150 ${
                  isActive ? "text-white/80" : "text-white/30"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] leading-none">{item.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
