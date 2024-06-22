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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-4 text-1xl border border-gray-300 resize-none rounded-md text-black bg-opacity-90 bg-gray-100"
            />
          </div>
          <div>
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
              className="mt-1 block w-full p-4 text-1xl border border-gray-300 resize-none rounded-md text-black bg-opacity-90 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-4 text-1xl border border-gray-300 resize-none rounded-md text-black bg-opacity-90 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-4 text-1xl border border-gray-300 resize-none rounded-md text-black bg-opacity-90 bg-gray-100"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="w-1/4 bg-gray-700 text-white p-4 text-lg rounded-md"
              onClick={() => turnstile.reset()}
              disabled={!verified}
            >
              Send
            </button>
            {showSnackbar && (
              <Snackbar
                message={notification || ""}
                type={snackbarType}
                onClose={closeSnackbar}
              />
            )}
            <TurnstileWidget setVerified={setVerified} />
          </div>
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
