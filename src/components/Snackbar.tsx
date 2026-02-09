import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border ${type === "success"
          ? "bg-emerald-500/90 border-emerald-400/50"
          : "bg-red-500/90 border-red-400/50"
          }`}
      >
        {type === "success" ? (
          <FaCheckCircle className="text-white text-lg flex-shrink-0" />
        ) : (
          <FaExclamationCircle className="text-white text-lg flex-shrink-0" />
        )}
        <span className="text-white text-sm font-medium">{message}</span>
        <button
          onClick={handleClose}
          className="ml-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
