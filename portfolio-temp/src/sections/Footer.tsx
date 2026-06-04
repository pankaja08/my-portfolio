"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail, MapPin, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

/* ─── Nav links (mirror Navbar) ──────────────────────────── */
const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

/* ─── Tech stack used ─────────────────────────────────────── */
const TECH_BADGES = [
  { label: "Next.js 15",      color: "#f1f5f9" },
  { label: "React 19",        color: "#61dafb" },
  { label: "TypeScript",      color: "#3178c6" },
  { label: "Tailwind v4",     color: "#38bdf8" },
  { label: "Framer Motion",   color: "#bb86fc" },
  { label: "Formspree",       color: "#34d399" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>

      {/* ── Animated top gradient border ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, #38bdf8 30%, #818cf8 60%, #22d3ee 80%, transparent 100%)",
        opacity: 0.6,
      }} />

      {/* ── Ambient glow blobs ── */}
      <div style={{
        position: "absolute", bottom: 0, left: "20%",
        width: 400, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: "20%",
        width: 300, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* ── Main content ── */}
      <div style={{
        maxWidth: "80rem", margin: "0 auto",
        padding: "2.5rem 2rem 1.5rem",
        position: "relative", zIndex: 10,
      }}>

        {/* ── Top section: 3 columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          marginBottom: "1.75rem",
        }}>

          {/* Col 1 — Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1.1rem", color: "#0f172a",
                boxShadow: "0 0 20px rgba(56,189,248,0.3)",
                flexShrink: 0,
              }}>
                PY
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: "1rem", color: "#f1f5f9", lineHeight: 1.2 }}>
                  Pankaja Yunidu
                </p>
                <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>
                  Full-Stack &amp; AI Developer
                </p>
              </div>
            </div>

            <p style={{
              fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: 260,
            }}>
              Building intelligent, scalable web &amp; mobile applications with a passion for clean code and beautiful UI.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "#64748b" }}>
                <MapPin size={13} color="#38bdf8" />
                Sri Lanka
              </div>
              <a
                href="mailto:pankajayunidu@gmail.com"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: "0.78rem", color: "#94a3b8",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                  paddingBottom: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#22d3ee";
                  e.currentTarget.style.borderBottomColor = "#22d3ee";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                <Mail size={13} color="#38bdf8" />
                pankajayunidu1234@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: "#38bdf8", marginBottom: "0.25rem",
            }}>
              Quick Links
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.8rem", color: "#94a3b8", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 6,
                  transition: "color 0.2s, gap 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f1f5f9";
                  e.currentTarget.style.gap = "10px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.gap = "6px";
                }}
              >
                <span style={{
                  display: "inline-block", width: 4, height: 4,
                  borderRadius: "50%", background: "#38bdf8", flexShrink: 0,
                }} />
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3 — Connect */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: "#818cf8", marginBottom: "0.25rem",
            }}>
              Connect
            </p>

            {/* Social icons */}
            <ul className="footer-social-wrapper" style={{ justifyContent: "flex-start", gap: "0.5rem" }}>
              <li className="icon-content">
                <a
                  href="https://github.com/pankaja08"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-social="github"
                >
                  <div className="filled" />
                  <GithubIcon size={20} />
                </a>
                <div className="tooltip">GitHub</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://www.linkedin.com/in/pankaja-yunidu-737676326/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-social="linkedin"
                >
                  <div className="filled" />
                  <LinkedinIcon size={20} />
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>
            </ul>

            {/* Open to work badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 999, marginTop: "0.25rem",
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 6px #34d399",
                display: "block",
                animation: "footer-pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 600 }}>
                Open to Opportunities
              </span>
            </div>

            {/* CV download */}
            <a
              href="/E.D. Pankaja yunidu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 16px", borderRadius: 10,
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#38bdf8", fontSize: "0.78rem", fontWeight: 600,
                textDecoration: "none", width: "fit-content",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(56,189,248,0.15)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(56,189,248,0.08)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)";
              }}
            >
              <ExternalLink size={13} />
              View CV
            </a>
          </div>
        </div>

        {/* ── Tech stack strip ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.25rem",
          marginBottom: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8", marginRight: 4, flexShrink: 0, fontWeight: 500 }}>
            Built with:
          </span>
          {TECH_BADGES.map((t) => (
            <span
              key={t.label}
              style={{
                padding: "3px 10px", borderRadius: 999,
                fontSize: "0.68rem", fontWeight: 600,
                /* Default: uniform glassmorphism — no colour leak */
                color: "#64748b",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                cursor: "default",
                transition: "color 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.color;
                e.currentTarget.style.background = `${t.color}18`;
                e.currentTarget.style.borderColor = `${t.color}40`;
                e.currentTarget.style.boxShadow = `0 0 10px ${t.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1rem",
          paddingBottom: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
        }}>
          {/* Copyright */}
          <p style={{
            fontSize: "0.82rem", color: "#94a3b8",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            © {year} Pankaja Yunidu. Crafted with
            <Heart size={12} fill="#f43f5e" color="#f43f5e" style={{ display: "inline" }} />
            in Sri Lanka.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, boxShadow: "0 0 18px rgba(56,189,248,0.4)" }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              color: "#38bdf8", fontSize: "0.75rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.25s ease",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
            Back to top
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </footer>
  );
}
