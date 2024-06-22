import { useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import Snackbar from "@/components/Snackbar";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const turnstile = useTurnstile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!verified) {
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
        body: JSON.stringify(formData),
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

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-4 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">Contact me 📨</h1>
        <p className="text-lg sm:text-2xl mt-4 text-gray-500">
          If you have any questions, feedback, or just want to say hi, feel free
          to send me a message using the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="block text-sm">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
              required
              className="p-3 text-lg border rounded-md text-black"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 text-lg border rounded-md text-black"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="subject" className="block text-sm">
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
              className="p-3 text-lg border rounded-md text-black"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="message" className="block text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={1000}
              required
              rows={4}
              className="p-3 text-lg border rounded-md text-black resize-none"
            />
          </div>

          <TurnstileWidget setVerified={setVerified} />

          <div className="flex">
            <button
              type="submit"
              className={`w-1/2 bg-gray-700 text-white p-4 text-lg rounded-md hover:bg-gray-600 ${
                verified ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => setLoading(true)}
              disabled={!verified || loading}
            >
              Send
            </button>
          </div>

          {showSnackbar && (
            <Snackbar
              message={notification || ""}
              type={snackbarType}
              onClose={closeSnackbar}
            />
          )}
        </form>
      </div>
    </main>
  );
}

interface TurnstileWidgetProps {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

function TurnstileWidget({ setVerified }: TurnstileWidgetProps) {
  return (
    <Turnstile
      sitekey="0x4AAAAAAAdEvLNtyuluh5J9"
      onVerify={() => {
        setVerified(true);
      }}
      onExpire={() => {
        setVerified(false);
      }}
    />
  );
}
