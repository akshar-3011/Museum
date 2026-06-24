"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface DrawerThresholdProps {
  roomTag: string;
  drawerLabel: string;
  onOpen: () => void;
}

export default function DrawerThreshold({ roomTag, drawerLabel, onOpen }: DrawerThresholdProps) {
  const [isPulled, setIsPulled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handlePull = () => {
    setIsPulled(true);
    setTimeout(onOpen, shouldReduceMotion ? 100 : 900);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--color-bg)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: isPulled ? "default" : "pointer",
      }}
      onClick={!isPulled ? handlePull : undefined}
      role="button"
      tabIndex={0}
      aria-label={`Open ${drawerLabel}`}
      onKeyDown={(e) => {
        if (!isPulled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handlePull();
        }
      }}
    >
      <AnimatePresence mode="wait">
        {!isPulled ? (
          <motion.div
            key="pull"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.5rem",
              // The archival drawer front face
              backgroundColor: "#f5f0e6", // warm aged paper/wood
              padding: "4rem 8rem",
              borderRadius: "4px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)",
              border: "1px solid rgba(28, 26, 23, 0.15)",
              borderBottom: "3px solid rgba(28, 26, 23, 0.4)", // thick bottom edge simulating depth
            }}
          >
            {/* Index card label holder */}
            <div
              style={{
                backgroundColor: "#e3d8be", // library tab cardstock
                padding: "1rem 2rem",
                border: "2px solid #8e8a82", // brass/metal frame
                borderRadius: "2px",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                className="font-mono-system"
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(28, 26, 23, 0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                {roomTag}
              </span>
              <span
                className="font-serif-human"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color: "#1c1a17", // ink black
                  letterSpacing: "0.02em",
                }}
              >
                {drawerLabel}
              </span>
            </div>

            {/* Heavy tactile drawer pull */}
            <div
              style={{
                width: "120px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: "#b48b59", // brass metal
                borderTop: "2px solid #d4b58c", // brass highlight
                borderBottom: "4px solid #755530", // deep brass shadow
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(1px)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Drawer slides inward/darkens */}
            <div
              style={{
                width: "600px",
                height: "300px",
                backgroundColor: "#080706", // deep shadow interior
                boxShadow: "inset 0 20px 40px rgba(0,0,0,0.8)",
                borderRadius: "4px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
