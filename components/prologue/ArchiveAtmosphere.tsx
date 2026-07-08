"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ArchiveAtmosphere() {
  const [isPaused, setIsPaused] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  // "The archive has settled around the visitor" — after 8 minutes, grain
  // breathes slightly more densely. Never announced. Never visible as UI.
  const [hasSettledIn, setHasSettledIn] = useState(false);
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();

  useEffect(() => {
    // Initial check
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(currentTheme);

    // Observer for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(document.documentElement.getAttribute("data-theme") || "dark");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Time-spent ambient: after 8 minutes, the archive has settled around the visitor
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSettledIn(true);
    }, 8 * 60 * 1000); // 8 minutes
    return () => clearTimeout(timer);
  }, []);

  // Surprise B: The Settling Dust (Room 03 only)
  useEffect(() => {
    if (pathname !== "/room-03") return;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let scrollTimeout: NodeJS.Timeout;
    let wasScrollingFast = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > 0) {
        velocity = Math.abs(deltaY / deltaTime) * 1000;
      }
      
      if (velocity > 2500) {
        wasScrollingFast = true;
      }
      
      lastScrollY = currentScrollY;
      lastTime = currentTime;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (wasScrollingFast) {
          setIsSettling(true);
          setTimeout(() => setIsSettling(false), 2000);
          wasScrollingFast = false;
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  // Determine Atmosphere variables based on the current path
  const isLight = theme === "light";
  
  let noiseOpacityOffset = 0;
  let vignetteSpread = "35%";
  let vignetteAlphaMultiplier = 1;
  let tintColor = "transparent";

  if (pathname === "/room-03") {
    noiseOpacityOffset = isLight ? 0.005 : 0.009;
    vignetteSpread = "25%";
    vignetteAlphaMultiplier = isLight ? 1.5 : 1.04;
    tintColor = isLight ? "rgba(204, 147, 74, 0.03)" : "rgba(8, 14, 18, 0.15)"; 
  } else if (pathname === "/room-04") {
    noiseOpacityOffset = isLight ? 0.010 : 0.012;
    vignetteSpread = "22%";
    vignetteAlphaMultiplier = isLight ? 2.0 : 1.05;
    tintColor = isLight ? "rgba(204, 147, 74, 0.06)" : "rgba(6, 10, 12, 0.18)";
  } else if (pathname === "/room-05") {
    noiseOpacityOffset = isLight ? 0.015 : 0.014;
    vignetteSpread = "20%";
    vignetteAlphaMultiplier = isLight ? 3.0 : 1.06;
    tintColor = isLight ? "rgba(204, 147, 74, 0.1)" : "rgba(0, 0, 0, 0.22)"; // late afternoon warmth
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9998,
        transition: "background-color 2s ease-in-out",
        backgroundColor: tintColor,
      }}
    >
      {/* Dynamic hardware-accelerated film grain overlay */}
      <div 
        className={`noise-overlay ${isSettling ? "dust-settling" : ""}`}
        style={{
          opacity: `calc(var(--grain-opacity) + ${noiseOpacityOffset} + ${hasSettledIn ? 0.005 : 0})`,
          transition: "opacity 2s ease-in-out",
        }}
        aria-hidden="true" 
      />

      {/* Breathing vignette overlay */}
      <div
        className="vignette-overlay"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          background: `radial-gradient(circle, transparent ${vignetteSpread}, color-mix(in srgb, var(--color-bg) calc(var(--vignette-opacity) * ${vignetteAlphaMultiplier} * 100%), transparent) 100%)`,
          transition: "background 2s ease-in-out",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
