import { useState } from "react";
import Link from "next/link";
import Turnstile, { useTurnstile } from "react-turnstile";
import Snackbar from "@/components/Snackbar";
import WordSettle from "@/components/WordSettle";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const socials = [
  { icon: FaGithub, href: "https://github.rishon.systems", label: "GitHub" },
  { icon: FaXTwitter, href: "https://x.rishon.systems", label: "Twitter" },
  {
    icon: FaLinkedin,
    href: "https://linkedin.rishon.systems",
    label: "LinkedIn",
  },
  { icon: FaDiscord, href: "https://discord.rishon.systems", label: "Discord" },
  { icon: SiGmail, href: "mailto:mail@rishon.systems", label: "Email" },
];

const inputClasses =
  "w-full rounded-[10px] bg-subtle px-3 py-2 text-sm text-ink placeholder-ink-faint shadow-hairline outline-none transition-shadow duration-200 focus:shadow-focus";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [verified, setVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success",
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const turnstile = useTurnstile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Shows an error and unlocks submit
  const fail = (message: string) => {
    setNotification(message);
    setSnackbarType("error");
    setShowSnackbar(true);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!verified || !captchaToken)
      return fail("Please verify that you're human.");
    if (formData.message.length > 1000) return fail("Message is too long.");
    if (formData.message.length < 10) return fail("Message is too short.");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.ok) {
        setNotification("Message sent - I'll get back to you.");
        setSnackbarType("success");
        setShowSnackbar(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setNotification("Failed to send message.");
        setSnackbarType("error");
        setShowSnackbar(true);
      }

      setVerified(false);
      setLoading(false);
      turnstile.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      fail("Error sending email.");
    }
  };

  const canSubmit =
    !loading &&
    formData.name &&
    formData.email &&
    formData.subject &&
    formData.message;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-v-sm">
      <div className="flex-shrink-0">
        <h1 className="mb-1 text-title">
          <WordSettle delay={0.05}>Contact</WordSettle>
        </h1>
        <p className="max-w-prose text-lede">
          <WordSettle delay={0.14}>
            Got a question or an idea? Send a note, or find me elsewhere.
          </WordSettle>
        </p>
      </div>

      <div
        className="flex flex-shrink-0 flex-wrap gap-1.5 animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "0.28s" }}
      >
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-xs text-ink-muted shadow-hairline transition-colors duration-200 hover:bg-ink-hover hover:text-ink"
          >
            <social.icon className="h-3.5 w-3.5" />
            {social.label}
          </Link>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 max-w-prose flex-1 flex-col gap-v-xs animate-rise opacity-0 max-md:flex-none motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "0.36s" }}
      >
        <div className="grid grid-cols-1 gap-v-xs sm:grid-cols-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            required
            placeholder="Your name"
            aria-label="Name"
            className={inputClasses}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            aria-label="Email"
            className={inputClasses}
          />
        </div>

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          maxLength={100}
          required
          placeholder="Subject"
          aria-label="Subject"
          className={inputClasses}
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          maxLength={1000}
          required
          placeholder="Your message..."
          aria-label="Message"
          className={`${inputClasses} min-h-0 flex-1 resize-none max-md:h-32 max-md:flex-none`}
        />

        <Turnstile
          sitekey={TURNSTILE_SITE_KEY}
          appearance="interaction-only"
          refreshExpired="auto"
          retry="auto"
          className="flex-shrink-0"
          onVerify={(token) => {
            setCaptchaToken(token);
            setVerified(true);
          }}
          onExpire={() => setVerified(false)}
          onError={() => setVerified(false)}
          onTimeout={() => setVerified(false)}
        />

        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`rounded-[10px] bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-200 ${
              canSubmit
                ? "hover:-translate-y-0.5 hover:bg-accent-hover"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>

      {showSnackbar && (
        <Snackbar
          message={notification || ""}
          type={snackbarType}
          onClose={() => {
            setShowSnackbar(false);
            setNotification(null);
          }}
        />
      )}
    </div>
  );
}
