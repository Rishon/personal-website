import { useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import Snackbar from "@/components/Snackbar";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!verified || !captchaToken) {
      setNotification("Please verify that you're human.");
      setSnackbarType("error");
      setShowSnackbar(true);
      setLoading(false);
      return;
    }

    if (formData.message.length > 1000) {
      setNotification("Message is too long.");
      setSnackbarType("error");
      setShowSnackbar(true);
      setLoading(false);
      return;
    } else if (formData.message.length < 10) {
      setNotification("Message is too short.");
      setSnackbarType("error");
      setShowSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.ok) {
        setNotification("Message sent successfully!");
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
      setNotification("Error sending email.");
      setSnackbarType("error");
      setShowSnackbar(true);
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
    setNotification(null);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <div className="space-y-12 py-8">
      <section className="animate-section">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-[var(--paragraph-color)] max-w-xl">
          Have a question, or just want to say hi? Feel free to reach out
          through the form below or connect on social media.
        </p>
      </section>

      {/* Social Links */}
      <section className="animate-section animation-delay-100">
        <h2 className="section-title">Connect</h2>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              <social.icon className="text-base" />
              {social.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="animate-section animation-delay-200">
        <h2 className="section-title">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-[var(--text-secondary)] mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                required
                placeholder="Your name"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-[var(--text-secondary)] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm text-[var(--text-secondary)] mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              maxLength={100}
              required
              placeholder="What's this about?"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm text-[var(--text-secondary)] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={1000}
              required
              rows={5}
              placeholder="Your message..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <TurnstileWidget
            setVerified={setVerified}
            setCaptchaToken={setCaptchaToken}
          />

          <button
            type="submit"
            disabled={
              !verified ||
              !captchaToken ||
              loading ||
              !formData.name ||
              !formData.email ||
              !formData.subject ||
              !formData.message
            }
            className={`w-full sm:w-auto px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-medium transition-all duration-200 ${verified
              ? "hover:translate-y-[-2px]"
              : "opacity-50 cursor-not-allowed"
              }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {showSnackbar && (
        <Snackbar
          message={notification || ""}
          type={snackbarType}
          onClose={closeSnackbar}
        />
      )}
    </div>
  );
}

interface TurnstileWidgetProps {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setCaptchaToken: React.Dispatch<React.SetStateAction<string | null>>;
}

function TurnstileWidget({
  setVerified,
  setCaptchaToken,
}: TurnstileWidgetProps) {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
      onVerify={(token) => {
        setCaptchaToken(token);
        setVerified(true);
      }}
      onExpire={() => {
        setVerified(false);
      }}
    />
  );
}
