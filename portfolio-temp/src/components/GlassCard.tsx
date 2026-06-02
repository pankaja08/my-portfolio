"use client";
import { motion } from "framer-motion";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "indigo" | "cyan" | "none";
  hover?: boolean;
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  glow = "none",
  hover = true,
  onClick,
  delay = 0,
}: GlassCardProps) {
  const glowStyles: Record<string, { boxShadow?: string; borderColor?: string }> = {
    blue: { boxShadow: "0 0 0 1px rgba(56,189,248,0.3), 0 0 20px rgba(56,189,248,0.15)", borderColor: "rgba(56,189,248,0.3)" },
    indigo: { boxShadow: "0 0 0 1px rgba(129,140,248,0.3), 0 0 20px rgba(129,140,248,0.15)", borderColor: "rgba(129,140,248,0.3)" },
    cyan: { boxShadow: "0 0 0 1px rgba(34,211,238,0.3), 0 0 20px rgba(34,211,238,0.15)", borderColor: "rgba(34,211,238,0.3)" },
    none: { borderColor: "rgba(255,255,255,0.1)" },
  };

  const gs = glowStyles[glow] ?? glowStyles.none;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -4,
              boxShadow: gs.boxShadow
                ? gs.boxShadow + ", 0 20px 60px rgba(0,0,0,0.4)"
                : "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            }
          : undefined
      }
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${gs.borderColor}`,
        boxShadow: gs.boxShadow ?? "0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      className={`
        relative rounded-2xl
        transition-all duration-300
        ${hover ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Inner shine */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
