import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkModeState] = useState(() => {
    // 1. Check localStorage
    const stored = localStorage.getItem("portfolio-theme");
    if (stored !== null) return stored === "dark";
    // 2. Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const setDarkMode = (value) => {
    setDarkModeState(value);
    localStorage.setItem("portfolio-theme", value ? "dark" : "light");
  };

  // Apply dark class to <html> for Tailwind compatibility
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}