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
    return null; // Avoid hydration mismatch by not rendering until mounted
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Museum Theme"
      title="Toggle Museum Theme"
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
        width: "44px",
        height: "44px",
        color: "var(--color-text-secondary)",
        transition: "color 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-text-secondary)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={isDark ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* Abstract museum mark: an archival geometric stamp */}
        <rect x="3" y="3" width="18" height="18" />
        <path d="M8 8h8v8H8z" fill={isDark ? "var(--color-bg)" : "currentColor"} stroke="none" />
        <circle cx="12" cy="12" r="2" fill={isDark ? "currentColor" : "var(--color-bg)"} stroke="none" />
      </svg>
    </button>
  );
}
