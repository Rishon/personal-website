import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{
        opacity: message ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {message}
    </div>
  );
};

export default Snackbar;
