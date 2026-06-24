"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the current theme from the document root on mount
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("museum-theme", newTheme);
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  if (!mounted) {
    return <div style={{ width: "44px", height: "44px", position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 50 }} />; // Hydration placeholder
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Museum Theme"
      title="Toggle Museum Theme"
      className="font-mono-system"
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        color: "var(--color-text-primary)",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        transition: "transform 0.2s ease",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span style={{ opacity: isDark ? 1 : 0.4, transition: "opacity 0.5s ease" }}>NIGHT</span>
      <span style={{ margin: "0 0.6rem", opacity: 0.3 }}>|</span>
      <span style={{ opacity: isDark ? 0.4 : 1, transition: "opacity 0.5s ease" }}>DAY</span>
    </button>
  );
}
