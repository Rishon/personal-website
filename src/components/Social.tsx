// Next.js
import Link from "next/link";

export default function SocialButton({
  link,
  children,
}: Readonly<{ link: string; children: React.ReactNode }>) {
  return (
    <Link
      href={link}
      className="hover:text-gray-300 text-gray-400"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
