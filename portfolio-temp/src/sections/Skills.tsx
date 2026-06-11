"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Brain, Server, Layout, Settings2 } from "lucide-react";
import { ElementType } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ────────────────────────────────────────────────
   INLINE SVG TECH ICONS
──────────────────────────────────────────────── */
const TechIcons: Record<string, (props: { size: number; opacity: number }) => React.ReactElement> = {
  html5: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M4 2l2.4 27L16 31l9.6-2L28 2H4z" fill="#E44D26" fillOpacity={0.9} />
      <path d="M16 28.4l7.8-2.1 2.05-23H16v25.1z" fill="#F16529" fillOpacity={0.9} />
      <path d="M16 13.5h-4.25l-.3-3.4H16V6.7H7.9l.8 9h7.3v-2.2zM16 22.4l-.015.004-3.56-.96-.228-2.55H8.78l.45 5.02L16 26.2V22.4z" fill="#EBEBEB" />
      <path d="M16 13.5v3.4h3.96l-.37 4.13-3.59.97v3.8l6.58-1.82L22.1 6.7H16V10.1h5.7l.38 4.4H16z" fill="#fff" />
    </svg>
  ),
  css3: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M4 2l2.4 27L16 31l9.6-2L28 2H4z" fill="#1572B6" fillOpacity={0.9} />
      <path d="M16 28.4l7.8-2.1 2.05-23H16v25.1z" fill="#33A9DC" fillOpacity={0.9} />
      <path d="M16 13.5H9.65l.22 2.5H16V13.5zM16 6.7H7.9l.22 2.5H16V6.7z" fill="#EBEBEB" />
      <path d="M16 22.4v3.8l6.58-1.82.9-10H16v2.5h4.92l-.32 3.56L16 21.4V22.4z" fill="#fff" />
      <path d="M16 13.5v2.5h4.47l-.42 4.7-4.05 1.09V22.4l6.58-1.82.9-10H16z" fill="#fff" />
    </svg>
  ),
  javascript: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <rect width={32} height={32} rx={4} fill="#F7DF1E" fillOpacity={0.85} />
      <path d="M9 25.2l2.3-1.4c.44.78.84 1.44 1.8 1.44.92 0 1.5-.36 1.5-1.76V14.1h2.84v9.44c0 2.9-1.7 4.22-4.18 4.22-2.24 0-3.54-1.16-4.26-2.56zM19.5 24.9l2.3-1.33c.6 1 1.38 1.73 2.76 1.73 1.16 0 1.9-.58 1.9-1.38 0-.96-.76-1.3-2.04-1.86l-.7-.3c-2.02-.86-3.36-1.94-3.36-4.22 0-2.1 1.6-3.7 4.1-3.7 1.78 0 3.06.62 3.98 2.24l-2.18 1.4c-.48-.86-1-1.2-1.8-1.2-.82 0-1.34.52-1.34 1.2 0 .84.52 1.18 1.72 1.7l.7.3c2.38 1.02 3.72 2.06 3.72 4.4 0 2.52-1.98 3.9-4.64 3.9-2.6 0-4.28-1.24-5.12-2.88z" fill="#000" fillOpacity={0.85} />
    </svg>
  ),
  react: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <circle cx={16} cy={16} r={3.2} fill="#61DAFB" fillOpacity={0.9} />
      <ellipse cx={16} cy={16} rx={12} ry={4.6} stroke="#61DAFB" strokeWidth={1.4} strokeOpacity={0.8} />
      <ellipse cx={16} cy={16} rx={12} ry={4.6} stroke="#61DAFB" strokeWidth={1.4} strokeOpacity={0.8} transform="rotate(60 16 16)" />
      <ellipse cx={16} cy={16} rx={12} ry={4.6} stroke="#61DAFB" strokeWidth={1.4} strokeOpacity={0.8} transform="rotate(120 16 16)" />
    </svg>
  ),
  nodejs: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M16 2.5L3 9.75v12.5L16 29.5l13-7.25V9.75L16 2.5z" fill="#339933" fillOpacity={0.9} />
      <path d="M16 2.5L3 9.75v12.5L16 29.5V2.5z" fill="#339933" fillOpacity={0.7} />
      <text x={8} y={20} fontSize={10} fontWeight={700} fill="#fff" fillOpacity={0.9}>JS</text>
    </svg>
  ),
  mongodb: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M16 2C16 2 10 8 10 17c0 3.3 1.3 6.3 3.4 8.5L16 30l2.6-4.5C20.7 23.3 22 20.3 22 17c0-9-6-15-6-15z" fill="#47A248" fillOpacity={0.9} />
      <path d="M16 2v28l2.6-4.5C20.7 23.3 22 20.3 22 17c0-9-6-15-6-15z" fill="#47A248" fillOpacity={0.7} />
      <path d="M16 4v24" stroke="#fff" strokeWidth={1.2} strokeOpacity={0.4} />
    </svg>
  ),
  java: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M11 21.8s-1.3.75.92 1c2.5.3 3.8.26 6.57-.29 0 0 .73.46 1.74.86-6.19 2.65-14-.15-9.23-1.57z" fill="#EA2D2E" fillOpacity={0.85} />
      <path d="M10.3 18.7s-1.45 1.07 1.53 1.3c2.86.22 5.1.24 9-.33 0 0 .5.51 1.3.79-7.98 2.33-16.87.13-11.83-1.76z" fill="#EA2D2E" fillOpacity={0.85} />
      <path d="M17.6 13.1c1.63 1.87-.43 3.55-.43 3.55s4.12-2.13 2.23-4.78c-1.77-2.47-3.13-3.7 4.22-7.94 0 0-11.53 2.88-6.02 9.17z" fill="#EA2D2E" fillOpacity={0.85} />
      <path d="M24.7 24.6s.97.8-1.06 1.42c-3.86 1.17-16.07 1.52-19.47.05-1.22-.53.07-1.35 1.06-1.51.44-.08.7-.07.7-.07-2.1-.6-13.58 2.9-5.83 4.16C19.5 31.34 31 27.7 24.7 24.6z" fill="#5382A1" fillOpacity={0.9} />
      <path d="M11.6 15.5s-9.6 2.28-3.4 3.1c2.6.35 7.78.27 12.6-.14 3.95-.33 7.9-1.04 7.9-1.04s-1.39.6-2.4.88c-9.67 2.55-28.36 1.43-22.97-.85 4.57-1.96 8.27-1.95 8.27-1.95z" fill="#5382A1" fillOpacity={0.9} />
      <path d="M21.6 20.8c9.83-5.1 5.28-10.01 2.1-9.35-.77.16-1.12.3-1.12.3s.29-.45 1.12-.64c4.34-1.07 9.67 4.5-2.02 10.1 0 0 .15-.14.3-.41z" fill="#5382A1" fillOpacity={0.9} />
      <path d="M19 2s2.75 2.75-2.6 6.97c-4.29 3.39-1.78 5.32-.01 7.52C14.02 13.58 8.3 10.9 16.2 7.5 18.7 5.5 19 2 19 2z" fill="#EA2D2E" fillOpacity={0.85} />
    </svg>
  ),
  python: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M15.9 2C12 2 9.2 3.7 9.2 5.8V9h6.8v1H6.5C4.3 10 2 12.2 2 16.1c0 3.9 2.3 6 4.5 6H9v-4.1c0-2.5 2.2-4.3 4.5-4.3h7c2.2 0 4-1.7 4-3.8V5.9C24.5 3.7 21.8 2 15.9 2zm-2.2 2.5c.8 0 1.5.6 1.5 1.4S14.5 7.3 13.7 7.3c-.8 0-1.5-.6-1.5-1.4s.7-1.4 1.5-1.4z" fill="#3776AB" fillOpacity={0.9} />
      <path d="M16.1 30c3.9 0 6.7-1.7 6.7-3.8V23H16v-1h9.5C27.7 22 30 19.8 30 15.9c0-3.9-2.3-6-4.5-6H23v4.1c0 2.5-2.2 4.3-4.5 4.3h-7c-2.2 0-4 1.7-4 3.8v5.8C7.5 30.2 10.2 30 16.1 30zm2.2-2.5c-.8 0-1.5-.6-1.5-1.4s.7-1.4 1.5-1.4c.8 0 1.5.6 1.5 1.4s-.7 1.4-1.5 1.4z" fill="#FFD43B" fillOpacity={0.9} />
    </svg>
  ),
  springboot: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <circle cx={16} cy={16} r={13} fill="#6DB33F" fillOpacity={0.9} />
      <path d="M10 22c2-8 8-12 14-10-4 0-8 2-10 8l-4 2z" fill="#fff" fillOpacity={0.85} />
      <circle cx={22} cy={9} r={2.5} fill="#fff" fillOpacity={0.85} />
    </svg>
  ),
  figma: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <rect x={8} y={2} width={8} height={8} rx={4} fill="#F24E1E" fillOpacity={0.9} />
      <rect x={16} y={2} width={8} height={8} rx={4} fill="#FF7262" fillOpacity={0.9} />
      <rect x={8} y={10} width={8} height={8} rx={0} fill="#A259FF" fillOpacity={0.9} />
      <rect x={8} y={18} width={8} height={8} rx={4} fill="#0ACF83" fillOpacity={0.9} />
      <circle cx={20} cy={14} r={4} fill="#1ABCFE" fillOpacity={0.9} />
    </svg>
  ),
  git: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <path d="M30.2 14.56L17.44 1.8a2.74 2.74 0 00-3.88 0l-2.73 2.73 3.47 3.47a3.26 3.26 0 014.12 4.15l3.34 3.34a3.26 3.26 0 11-1.95 1.95l-3.1-3.1v8.16a3.26 3.26 0 11-2.67-.08V13.9a3.26 3.26 0 01-1.77-4.28L9.06 6.18 1.8 13.44a2.74 2.74 0 000 3.88l12.76 12.76a2.74 2.74 0 003.88 0l11.76-11.76a2.74 2.74 0 000-3.76z" fill="#F05032" fillOpacity={0.9} />
    </svg>
  ),
  nextjs: ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
      <circle cx={16} cy={16} r={14} fill="#000" fillOpacity={0.85} />
      <path d="M10.5 21V11h8.5l-8.5 10zM19 11l5 9.5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeOpacity={0.9} />
    </svg>
  ),
};

/* ────────────────────────────────────────────────
   PARTICLE CONFIG  (seeded — deterministic on server & client)
──────────────────────────────────────────────── */
interface Particle {
  id: number;
  iconKey: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  swayPeriod: number;
  baseOpacity: number;
}

const ICON_KEYS = [
  "html5", "css3", "javascript", "react", "nodejs", "mongodb",
  "java", "python", "springboot", "figma", "git", "nextjs",
];

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}
// Round to 4dp so server-rendered HTML matches client exactly
const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

const PARTICLES: Particle[] = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  iconKey: ICON_KEYS[i % ICON_KEYS.length],
  x: r4(sr(i * 7) * 94 + 3),
  size: r4(22 + sr(i * 3) * 20),
  duration: r4(14 + sr(i * 5) * 12),
  delay: -r4(sr(i * 11) * 20),
  swayPeriod: r4(4 + sr(i * 17) * 5),
  baseOpacity: r4(0.48 + sr(i * 19) * 0.35),
}));

/* ────────────────────────────────────────────────
   ANTI-GRAVITY BACKGROUND
   Mouse is tracked on the parent <section> and
   forwarded via refs so it works through z-index layers.
──────────────────────────────────────────────── */
function AntiGravityBackground({
  mouseRef,
  activeRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeRef: React.MutableRefObject<boolean>;
}) {
  const maskRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only render on client — prevents SSR hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // RAF loop: lerp the mask toward the cursor, set opacity
  useEffect(() => {
    if (!mounted) return;
    const el = maskRef.current;
    if (!el) return;

    let cx = -9999, cy = -9999;

    function tick() {
      cx += (mouseRef.current.x - cx) * 0.12;
      cy += (mouseRef.current.y - cy) * 0.12;

      el!.style.opacity = activeRef.current ? "1" : "0";
      const mask = `radial-gradient(circle 350px at ${cx}px ${cy}px, black 0%, black 50%, transparent 100%)`;
      el!.style.maskImage = mask;
      (el!.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted, mouseRef, activeRef]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none", // never blocks card clicks
      }}
    >
      {mounted && (
        <>
          {/* Masked icon field */}
          <div
            ref={maskRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              transition: "opacity 0.35s ease",
              maskImage: "radial-gradient(circle 250px at -9999px -9999px, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle 250px at -9999px -9999px, black 0%, transparent 100%)",
            }}
          >
            {/* Floating particles */}
            {PARTICLES.map((p) => {
              const IconComp = TechIcons[p.iconKey];
              return (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    bottom: "-60px",
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animation: `ag-float ${p.duration}s linear ${p.delay}s infinite`,
                    filter: "drop-shadow(0 0 14px rgba(56,189,248,0.95))",
                  }}
                >
                  <div style={{
                    animation: `ag-sway ${p.swayPeriod}s ease-in-out ${p.delay * 0.5}s infinite`,
                    width: "100%",
                    height: "100%",
                  }}>
                    <IconComp size={p.size} opacity={p.baseOpacity} />
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            @keyframes ag-float {
              0%   { transform: translateY(0);                       opacity: 1; }
              85%  { opacity: 1; }
              100% { transform: translateY(calc(-100vh - 120px));   opacity: 0; }
            }
            @keyframes ag-sway {
              0%, 100% { transform: translateX(0); }
              25%       { transform: translateX(22px); }
              75%       { transform: translateX(-22px); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────── */
interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  Icon: ElementType;
  accent: string;
  iconBg: string;
  iconBorder: string;
  hoverBorder: string;
  hoverShadow: string;
  gradientBlob: string;
  dividerColor: string;
  sections: { label?: string; pills: string[] }[];
}

const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI, Data Science & Analytics",
    subtitle: "Intelligent systems & data pipelines",
    Icon: Brain,
    accent: "#818cf8",
    iconBg: "rgba(129,140,248,0.12)",
    iconBorder: "rgba(129,140,248,0.25)",
    hoverBorder: "rgba(129,140,248,0.45)",
    hoverShadow: "0 0 40px rgba(129,140,248,0.2), 0 20px 48px rgba(0,0,0,0.45)",
    gradientBlob: "radial-gradient(circle, rgba(129,140,248,0.25) 0%, rgba(192,132,252,0.1) 60%, transparent 80%)",
    dividerColor: "rgba(129,140,248,0.2)",
    sections: [
      { label: "Core", pills: ["Machine Learning", "CNN", "Generative AI", "Feature Engineering", "Data Preprocessing", "Data Visualization", "Data Analysis"] },
      { label: "Languages", pills: ["Python", "R"] },
      { label: "Libraries & Tools", pills: ["TensorFlow", "NumPy", "Pandas", "SciPy", "Matplotlib", "Plotly", "Seaborn", "Power BI"] },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems Engineering",
    subtitle: "Server-side logic, APIs & databases",
    Icon: Server,
    accent: "#38bdf8",
    iconBg: "rgba(56,189,248,0.12)",
    iconBorder: "rgba(56,189,248,0.25)",
    hoverBorder: "rgba(56,189,248,0.45)",
    hoverShadow: "0 0 40px rgba(56,189,248,0.2), 0 20px 48px rgba(0,0,0,0.45)",
    gradientBlob: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(34,211,238,0.1) 60%, transparent 80%)",
    dividerColor: "rgba(56,189,248,0.2)",
    sections: [
      { label: "Frameworks", pills: ["Java Spring Boot", "Node.js", "Express.js", "REST APIs", "OOP"] },
      { label: "Databases", pills: ["MySQL", "MS SQL Server", "MongoDB", "PostgreSQL (Neon)"] },
      { label: "Languages", pills: ["Java", "C", "JavaScript"] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI/UX Design",
    subtitle: "Interfaces, interactions & mobile",
    Icon: Layout,
    accent: "#34d399",
    iconBg: "rgba(52,211,153,0.12)",
    iconBorder: "rgba(52,211,153,0.25)",
    hoverBorder: "rgba(52,211,153,0.45)",
    hoverShadow: "0 0 40px rgba(52,211,153,0.2), 0 20px 48px rgba(0,0,0,0.45)",
    gradientBlob: "radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(16,185,129,0.1) 60%, transparent 80%)",
    dividerColor: "rgba(52,211,153,0.2)",
    sections: [
      { label: "Web", pills: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"] },
      { label: "Mobile & Design", pills: ["React Native", "Figma", "UI/UX Design"] },
    ],
  },
  {
    id: "tools",
    title: "Architecture, Tools & Soft Skills",
    subtitle: "How I think, build & collaborate",
    Icon: Settings2,
    accent: "#fb923c",
    iconBg: "rgba(251,146,60,0.12)",
    iconBorder: "rgba(251,146,60,0.25)",
    hoverBorder: "rgba(251,146,60,0.45)",
    hoverShadow: "0 0 40px rgba(251,146,60,0.2), 0 20px 48px rgba(0,0,0,0.45)",
    gradientBlob: "radial-gradient(circle, rgba(251,146,60,0.25) 0%, rgba(244,63,94,0.1) 60%, transparent 80%)",
    dividerColor: "rgba(251,146,60,0.2)",
    sections: [
      { label: "Engineering", pills: ["Data Structures & Algorithms", "Design Patterns", "Git / GitHub", "OOP Concepts", "Agile"] },
      { label: "Professional", pills: ["Leadership", "Project Management", "Collaboration", "Problem Solving"] },
    ],
  },
];

/* ────────────────────────────────────────────────
   PILL BADGE
──────────────────────────────────────────────── */
function Pill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="skill-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#cbd5e1",
        cursor: "default",
        transition: "border-color 0.25s ease, color 0.25s ease, background 0.25s ease",
      }}
      data-accent={accent}
    >
      {label}
    </span>
  );
}

/* ────────────────────────────────────────────────
   CAPABILITY CARD
──────────────────────────────────────────────── */
function CapabilityCard({ group, idx }: { group: SkillGroup; idx: number }) {
  const { Icon, accent } = group;
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 40 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: isMobile ? 0 : idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="skill-card"
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(15,23,42,0.62)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Ambient blob */}
      <div style={{
        position: "absolute", bottom: -50, right: -50,
        width: 220, height: 220, borderRadius: "50%",
        background: group.gradientBlob, filter: "blur(40px)",
        pointerEvents: "none", zIndex: 0,
        animation: `pulse-blob ${5 + idx * 0.8}s ease-in-out infinite`,
      }} />

      {/* Top-left shine */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, transparent 55%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Accent top line on hover */}
      <div className="skill-top-line" style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        borderRadius: "0 0 4px 4px", opacity: 0,
        transition: "opacity 0.35s ease", pointerEvents: "none", zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div className="skill-icon" style={{
            width: 44, height: 44, borderRadius: 13,
            background: group.iconBg, border: `1px solid ${group.iconBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", flexShrink: 0,
          }}>
            <Icon size={20} color={accent} strokeWidth={1.75} />
          </div>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3 }}>
              {group.title}
            </h3>
            <p style={{ fontSize: "0.7rem", color: "#64748b", marginTop: 2 }}>
              {group.subtitle}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: group.dividerColor, marginBottom: "1rem" }} />

        {/* Skill sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {group.sections.map((sec) => (
            <div key={sec.label ?? "default"}>
              {sec.label && (
                <p style={{
                  fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: accent, marginBottom: "0.4rem", opacity: 0.85,
                }}>
                  {sec.label}
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {sec.pills.map((pill) => <Pill key={pill} label={pill} accent={accent} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   SECTION
──────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  // Shared refs — written by section's onMouseMove, read by AntiGravityBackground's RAF
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    activeRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    activeRef.current = false;
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="section-padding scroll-mt-24"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Anti-gravity background — pointerEvents:none so cards still receive clicks */}
      {!isMobile && <AntiGravityBackground mouseRef={mouseRef} activeRef={activeRef} />}

      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 1,
      }} />

      {/* Foreground */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1rem", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
            color: "#38bdf8", fontSize: "0.75rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.1em",
            display: "block", marginBottom: "0.75rem",
          }}>
            What I work with
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
            color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Skills &amp;{" "}
            <span className="text-gradient">Technologies</span>
          </h2>
          <p style={{
            color: "#94a3b8", maxWidth: "560px", margin: "0 auto",
            fontSize: "0.875rem", lineHeight: 1.7, textAlign: "center",
          }}>
            A curated toolkit spanning AI, backend systems, frontend interfaces, and
            engineering fundamentals — built through academic learning and real-world projects.
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid-cols-1 sm:grid-cols-2" style={{ display: "grid", gap: "1.5rem" }}>
          {skillGroups.map((group, idx) => (
            <CapabilityCard key={group.id} group={group} idx={idx} />
          ))}
        </div>
      </div>

      {/* Global CSS */}
      <style>{`
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.2); opacity: 1;   }
        }
        .skill-card:hover { transform: translateY(-6px); }
        .skill-card:hover .skill-top-line { opacity: 1 !important; }
        .skill-card:hover .skill-icon     { transform: scale(1.1) !important; }
        .skill-pill:hover {
          background: rgba(255,255,255,0.09) !important;
          color: #f1f5f9 !important;
          border-color: rgba(255,255,255,0.28) !important;
        }
      `}</style>
    </section>
  );
}
