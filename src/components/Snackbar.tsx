import React, { useEffect, useState } from "react";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 rounded-md z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      <div className="text-white">{message}</div>
    </div>
  );
};

export default Snackbar;
