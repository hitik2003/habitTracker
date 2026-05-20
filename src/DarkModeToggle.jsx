import { useState, useEffect } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="
    flex items-center gap-2
    px-3 py-1.5
    rounded-lg
    text-sm font-medium
    border
    transition-all duration-200

    bg-white
    text-gray-700
    border-gray-200
    hover:bg-gray-100

    dark:bg-sidebar-dark
    dark:text-dark
    dark:border-lines-dark
    dark:hover:bg-primary-dark
  "
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
