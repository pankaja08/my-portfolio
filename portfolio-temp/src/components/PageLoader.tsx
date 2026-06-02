"use client";
import { useEffect, useState } from "react";

const LETTERS = ["G", "e", "n", "e", "r", "a", "t", "i", "n", "g"];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show for 1.8 s then fade out over 0.5 s
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1445 100%)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="page-loader-wrapper">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="page-loader-letter"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
        <div className="page-loader-ring" />
      </div>
    </div>
  );
}
