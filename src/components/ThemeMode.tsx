import { useState, useEffect } from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";

export default function ThemeMode() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <button
      className="fixed bottom-4 right-4 w-12 h-12 text-white bg-[#1e2124] rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ease-in-out"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <MdLightMode size={24} />
      ) : (
        <MdNightlight size={24} />
      )}
    </button>
  );
}
