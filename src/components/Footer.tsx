// Icons
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  const socials = [
    { icon: FaGithub, href: "https://github.rishon.systems", label: "GitHub" },
    { icon: FaXTwitter, href: "https://x.rishon.systems", label: "Twitter" },
    {
      icon: FaLinkedin,
      href: "https://linkedin.rishon.systems",
      label: "LinkedIn",
    },
    {
      icon: FaDiscord,
      href: "https://discord.rishon.systems",
      label: "Discord",
    },
    { icon: SiGmail, href: "mailto:mail@rishon.systems", label: "Email" },
  ];

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] mt-auto relative z-10">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-[var(--text-secondary)] text-center sm:text-left">
            <p>© {new Date().getFullYear()} Rishon Jaffe</p>
            <Link
              href="https://github.com/Rishon/personal-website"
              target="_blank"
              className="link-underline text-xs mt-1 inline-block"
            >
              View Source
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon"
              >
                <social.icon className="text-base" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
