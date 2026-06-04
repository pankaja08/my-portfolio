"use client";
import { motion } from "framer-motion";
import {
  PenTool,
  Layers,
  Monitor,
  Network,
  ArrowRight,
  Award,
} from "lucide-react";
import { ElementType } from "react";

/* ── Data ── */
interface Cert {
  id: string;
  name: string;
  issuer: string;
  period: string;
  tag: string;
  credentialUrl: string;
  Icon: ElementType;
  color: {
    icon: string;          // icon fill colour
    iconBg: string;        // icon wrapper bg  (rgba)
    iconBorder: string;    // icon wrapper border
    badge: string;         // tag pill text
    badgeBg: string;       // tag pill bg
    badgeBorder: string;   // tag pill border
    hoverBorder: string;   // card border on hover
    shadow: string;        // coloured drop-shadow on hover
    gradientBlob: string;  // bottom ambient blob
    divider: string;       // divider line
    linkHover: string;     // link text on hover
  };
}

const certifications: Cert[] = [
  {
    id: "cert-uiux",
    name: "UI/UX with Freelancing",
    issuer: "IT Guru Global",
    period: "Nov 2024 – Feb 2025",
    tag: "Design",
    credentialUrl: "#",
    Icon: PenTool,
    color: {
      icon: "#a78bfa",
      iconBg: "rgba(139,92,246,0.12)",
      iconBorder: "rgba(139,92,246,0.25)",
      badge: "#c084fc",
      badgeBg: "rgba(192,132,252,0.1)",
      badgeBorder: "rgba(192,132,252,0.2)",
      hoverBorder: "rgba(168,85,247,0.4)",
      shadow: "0 0 35px rgba(168,85,247,0.18), 0 20px 40px rgba(0,0,0,0.4)",
      gradientBlob: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(192,132,252,0.12) 50%, transparent 70%)",
      divider: "rgba(139,92,246,0.25)",
      linkHover: "#c084fc",
    },
  },
  {
    id: "cert-photoshop",
    name: "Adobe Photoshop — Basic to Advanced",
    issuer: "Master.LK",
    period: "2024",
    tag: "Creative",
    credentialUrl: "#",
    Icon: Layers,
    color: {
      icon: "#fb923c",
      iconBg: "rgba(251,146,60,0.12)",
      iconBorder: "rgba(251,146,60,0.25)",
      badge: "#fb923c",
      badgeBg: "rgba(251,146,60,0.1)",
      badgeBorder: "rgba(251,146,60,0.2)",
      hoverBorder: "rgba(251,146,60,0.4)",
      shadow: "0 0 35px rgba(251,146,60,0.18), 0 20px 40px rgba(0,0,0,0.4)",
      gradientBlob: "radial-gradient(circle, rgba(251,146,60,0.28) 0%, rgba(244,63,94,0.12) 50%, transparent 70%)",
      divider: "rgba(251,146,60,0.25)",
      linkHover: "#fb923c",
    },
  },
  {
    id: "cert-ditec",
    name: "Assured Diploma in IT (DITEC)",
    issuer: "Esoft Metro Campus",
    period: "Nov 2021",
    tag: "IT",
    credentialUrl: "#",
    Icon: Monitor,
    color: {
      icon: "#38bdf8",
      iconBg: "rgba(56,189,248,0.12)",
      iconBorder: "rgba(56,189,248,0.25)",
      badge: "#38bdf8",
      badgeBg: "rgba(56,189,248,0.1)",
      badgeBorder: "rgba(56,189,248,0.2)",
      hoverBorder: "rgba(56,189,248,0.4)",
      shadow: "0 0 35px rgba(56,189,248,0.18), 0 20px 40px rgba(0,0,0,0.4)",
      gradientBlob: "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(34,211,238,0.12) 50%, transparent 70%)",
      divider: "rgba(56,189,248,0.25)",
      linkHover: "#38bdf8",
    },
  },
  {
    id: "cert-cisco-ds",
    name: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    period: "Jun 2026",
    tag: "Data Science",
    credentialUrl: "https://www.credly.com/badges",
    Icon: Network,
    color: {
      icon: "#22d3ee",
      iconBg: "rgba(34,211,238,0.12)",
      iconBorder: "rgba(34,211,238,0.25)",
      badge: "#22d3ee",
      badgeBg: "rgba(34,211,238,0.1)",
      badgeBorder: "rgba(34,211,238,0.2)",
      hoverBorder: "rgba(34,211,238,0.4)",
      shadow: "0 0 35px rgba(34,211,238,0.18), 0 20px 40px rgba(0,0,0,0.4)",
      gradientBlob: "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(6,182,212,0.12) 50%, transparent 70%)",
      divider: "rgba(34,211,238,0.25)",
      linkHover: "#22d3ee",
    },
  },
];

/* ── Single card ── */
function CertCard({ cert, idx }: { cert: Cert; idx: number }) {
  const { Icon, color } = cert;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: idx * 0.11, ease: [0.22, 1, 0.36, 1] }}
      className="cert-card group"
      style={{
        /* glass base */
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        /* layout */
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 340,
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        /* base shadow */
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        /* smooth transitions */
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        cursor: "default",
      }}
      /* Framer hover: lift + glow border + coloured shadow */
      whileHover={{
        y: -8,
        borderColor: color.hoverBorder,
        boxShadow: color.shadow,
      }}
    >
      {/* ── Ambient colour blob (bottom-right) — pure CSS to avoid SSR state error ── */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: color.gradientBlob,
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 0,
          animation: `pulse-blob ${4 + idx * 0.6}s ease-in-out infinite`,
        }}
      />

      {/* ── Top inner shine ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Top-edge accent line (appears on hover via CSS) ── */}
      <div
        className="cert-top-line"
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color.icon}, transparent)`,
          borderRadius: "0 0 4px 4px",
          opacity: 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Row 1: icon + tag badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>

          {/* Vector icon in soft circle */}
          <div
            className="cert-icon"
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: color.iconBg,
              border: `1px solid ${color.iconBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <Icon size={22} color={color.icon} strokeWidth={1.75} />
          </div>

          {/* Tag pill */}
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 999,
              background: color.badgeBg,
              border: `1px solid ${color.badgeBorder}`,
              color: color.badge,
            }}
          >
            {cert.tag}
          </span>
        </div>

        {/* Cert name */}
        <h3
          className="cert-title"
          style={{
            fontSize: "0.88rem",
            fontWeight: 800,
            lineHeight: 1.4,
            color: "#f1f5f9",
            marginBottom: "0.5rem",
            transition: "color 0.3s ease",
          }}
        >
          {cert.name}
        </h3>

        {/* Issuer */}
        <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#94a3b8", marginBottom: "0.3rem" }}>
          {cert.issuer}
        </p>

        {/* Period */}
        <p style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "monospace", letterSpacing: "0.04em" }}>
          {cert.period}
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "1rem",
          borderTop: `1px solid ${color.divider}`,
        }}
      >
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`view-${cert.id}`}
          className="cert-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#94a3b8",
            textDecoration: "none",
            transition: "color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = color.linkHover;
            (e.currentTarget.querySelector(".cert-arrow") as HTMLElement | null)
              ?.style.setProperty("transform", "translateX(4px)");
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            (e.currentTarget.querySelector(".cert-arrow") as HTMLElement | null)
              ?.style.setProperty("transform", "translateX(0)");
          }}
        >
          <Award size={13} />
          View Credential
          <ArrowRight
            size={14}
            className="cert-arrow"
            style={{ transition: "transform 0.3s ease" }}
          />
        </a>
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export default function Certifications() {
  return (
    <section id="certifications" className="section-padding scroll-mt-24 relative overflow-hidden">

      {/* Section ambient blobs */}
      <div style={{
        position: "absolute", top: "5%", left: "-8%",
        width: 560, height: 560, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "-8%",
        width: 560, height: 560, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "90rem", margin: "0 auto", padding: "0 1rem", position: "relative", zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
            color: "#fbbf24",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "0.75rem",
          }}>
            Credentials
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.2,
          }}>
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        {/* ── Responsive portrait grid: 1 col → 2 col → 4 col ── */}
        <div
          style={{ display: "grid", gap: "1.25rem" }}
          className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        >
          {certifications.map((cert, idx) => (
            <CertCard key={cert.id} cert={cert} idx={idx} />
          ))}
        </div>

        {/* Decorative bottom rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-16 mx-auto"
          style={{
            height: 1,
            maxWidth: 380,
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(56,189,248,0.5), transparent)",
          }}
        />
      </div>

      {/* ── Global hover helpers + blob keyframe ── */}
      <style>{`
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.18); opacity: 0.9; }
        }
        .cert-card:hover .cert-top-line { opacity: 1 !important; }
        .cert-card:hover .cert-icon { transform: scale(1.12) !important; }
        .cert-card:hover .cert-title { color: #e2e8f0 !important; }
      `}</style>
    </section>
  );
}
