"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the current theme from the document root on mount
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    if (current === "light" || current === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(current);
    }
    setMounted(true);

    const handleVisibility = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsVisible(customEvent.detail);
    };

    window.addEventListener("set-theme-toggle-visible", handleVisibility);
    return () => window.removeEventListener("set-theme-toggle-visible", handleVisibility);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("museum-theme", newTheme);
    } catch {
      // Ignore localStorage errors
    }
  };

  if (!mounted) {
    return <div style={{ width: "80px", height: "30px", position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 50 }} />; // Hydration placeholder
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
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 90,
        backgroundColor: "var(--color-cardstock)",
        border: "1px solid rgba(28, 26, 23, 0.2)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.4)",
        borderRadius: "2px",
        padding: "0.4rem 0.8rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        color: "rgba(28, 26, 23, 0.85)",
        fontSize: "0.62rem",
        fontWeight: 500,
        letterSpacing: "0.15em",
        transition: "transform 0.2s ease, opacity 0.8s ease, pointer-events 0.8s ease",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
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
