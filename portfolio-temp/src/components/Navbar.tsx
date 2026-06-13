"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  User, Zap, Briefcase, FolderOpen, GraduationCap, Award, Mail,
  ExternalLink, Menu, X,
} from "lucide-react";

const navLinks = [
  { label: "Home",           href: "#about",          icon: User },
  { label: "About Me",       href: "#aboutme",        icon: GraduationCap },
  { label: "Skills",         href: "#skills",         icon: Zap },
  { label: "Experience",     href: "#experience",     icon: Briefcase },
  { label: "Projects",       href: "#projects",       icon: FolderOpen },
  { label: "Certifications", href: "#certifications", icon: Award },
  { label: "Contact",        href: "#contact",        icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("#about");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hovered,  setHovered]    = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 185) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) {
      setMenuOpen(false);
    }
  }, [scrolled]);

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isMobile && scrolled ? -100 : 0,
          opacity: isMobile && scrolled ? 0 : 1
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: scrolled ? "10px" : "16px", transition: "padding 0.4s ease" }}
      >
        {/* Pill container */}
        <div
          className="nav-pill"
          style={{
            background: scrolled
              ? "rgba(10, 15, 40, 0.82)"
              : "rgba(10, 15, 40, 0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "all 0.4s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 8px",
            width: "92%",
            maxWidth: "1440px",
          }}
        >
          {/* ── Left: Logo ── */}
          <div style={{ display: "flex", flex: 1 }}>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px 6px 12px",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              {/* Avatar dot */}
              <span style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff",
                boxShadow: "0 0 12px rgba(56,189,248,0.4)",
                flexShrink: 0,
              }}>PY</span>
              <span style={{
                fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", whiteSpace: "nowrap",
              }}>
                Pankaja Yunidu
              </span>
            </motion.a>
          </div>

          {/* ── Center: Nav links (desktop) ── */}
          <div className="hidden md:flex items-center justify-center" style={{ gap: 2, flex: 2 }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive  = active  === link.href;
              const isHovered = hovered === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.href.slice(1));
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 120;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 13px",
                    borderRadius: "9999px",
                    fontSize: 13, fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#f1f5f9" : isHovered ? "#e2e8f0" : "#94a3b8",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* Animated pill background */}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId={isActive ? "nav-active-pill" : undefined}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{
                        position: "absolute", inset: 0, borderRadius: "9999px",
                        background: isActive
                          ? "rgba(56,189,248,0.15)"
                          : "rgba(255,255,255,0.07)",
                        border: isActive
                          ? "1px solid rgba(56,189,248,0.3)"
                          : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isActive
                          ? "0 0 12px rgba(56,189,248,0.15)"
                          : "none",
                      }}
                    />
                  )}
                  <Icon
                    size={13}
                    style={{
                      position: "relative", zIndex: 1, flexShrink: 0,
                      color: isActive ? "#38bdf8" : "inherit",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* ── Right: CTA / Mobile menu ── */}
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
            <a
              href="/E.D. Pankaja yunidu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="!hidden md:!flex cv-shimmer-btn"
            >
              <ExternalLink size={14} style={{ flexShrink: 0 }} />
              <span>View CV</span>
            </a>

            <button
              className="md:!hidden nav-mobile-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Floating circular menu button when scrolled down ── */}
      <AnimatePresence>
        {isMobile && scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="fixed z-50 flex items-center justify-center"
            style={{
              top: "14px",
              right: "4%",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(10, 15, 40, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              color: "#f1f5f9",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Background click-away overlay for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="md:hidden fixed inset-0 z-30"
            style={{ background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)" }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden fixed z-40"
            style={{
              top: scrolled ? 68 : 72, left: "1rem", right: "1rem",
              background: "rgba(8, 12, 35, 0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20,
              padding: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Section label */}
            <p style={{ fontSize: 10, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 12px 8px" }}>
              Navigate
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = active === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      const el = document.getElementById(link.href.slice(1));
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px",
                      borderRadius: 12,
                      textDecoration: "none",
                      background: isActive ? "rgba(56,189,248,0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(56,189,248,0.25)" : "1px solid transparent",
                      color: isActive ? "#e0f2fe" : "#94a3b8",
                      fontSize: 14, fontWeight: isActive ? 600 : 500,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <Icon size={16} style={{ color: isActive ? "#38bdf8" : "#64748b", flexShrink: 0 }} />
                    {link.label}
                    {isActive && (
                      <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Download CV inside mobile menu */}
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <a
                href="/E.D. Pankaja yunidu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="cv-shimmer-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <ExternalLink size={14} />
                View CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
