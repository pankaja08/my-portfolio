"use client";
import { motion } from "framer-motion";
import { ExternalLink, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Animated data-science themed floating orb visual — no external 3D dependency
function HeroVisual() {
  const orbits = [
    { radius: 110, duration: 8, delay: 0, color: "#38bdf8", size: 10, label: "ML" },
    { radius: 150, duration: 12, delay: -3, color: "#818cf8", size: 8, label: "AI" },
    { radius: 185, duration: 16, delay: -7, color: "#22d3ee", size: 6, label: "DS" },
    { radius: 215, duration: 20, delay: -11, color: "#34d399", size: 8, label: "Python" },
  ];

  const floatingCards = [
    { x: -145, y: -80, label: "Python", icon: "🐍", color: "#22d3ee" },
    { x: 130, y: -110, label: "Machine Learning", icon: "🤖", color: "#818cf8" },
    { x: -150, y: 100, label: "Spring Boot", icon: "☕", color: "#4ade80" },
    { x: 120, y: 90, label: "React", icon: "⚛️", color: "#38bdf8" },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">
      <div className="hero-visual-scaler flex items-center justify-center relative w-[280px] h-[280px] min-[375px]:w-[320px] min-[375px]:h-[320px] sm:w-[480px] sm:h-[480px]">
        {/* Outer ambient glow */}
        <div style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Orbit rings */}
        {orbits.map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: o.radius * 2,
              height: o.radius * 2,
              borderRadius: "50%",
              border: `1px solid ${o.color}22`,
            }}
          />
        ))}

        {/* Rotating orbit dots */}
        {orbits.map((o, i) => (
          <motion.div
            key={`dot-${i}`}
            style={{ position: "absolute", width: o.radius * 2, height: o.radius * 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "linear", delay: o.delay }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: o.size,
              height: o.size,
              borderRadius: "50%",
              background: o.color,
              boxShadow: `0 0 10px ${o.color}, 0 0 20px ${o.color}66`,
            }}>
              <span style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 9,
                fontWeight: 700,
                color: o.color,
                whiteSpace: "nowrap",
                letterSpacing: 1,
              }}>{o.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Central glowing orb */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            zIndex: 10,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(56,189,248,0.5) 0%, rgba(99,102,241,0.5) 50%, rgba(14,165,233,0.3) 100%)",
            boxShadow: "0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(99,102,241,0.3), inset 0 0 40px rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Inner shine */}
          <div style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            filter: "blur(8px)",
          }} />
          <span style={{ fontSize: 40, position: "relative", zIndex: 1 }}>💡</span>
        </motion.div>

        {/* Floating tech cards */}
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            style={{
              position: "absolute",
              left: `calc(50% + ${card.x}px)`,
              top: `calc(50% + ${card.y}px)`,
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${card.color}44`,
              borderRadius: 12,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 10px ${card.color}22`,
              zIndex: 20,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 16 }}>{card.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: card.color }}>{card.label}</span>
          </motion.div>
        ))}

        {/* Data stream lines (decorative) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            style={{
              position: "absolute",
              width: 1,
              height: 40 + i * 10,
              background: `linear-gradient(to bottom, transparent, rgba(56,189,248,0.4), transparent)`,
              borderRadius: 1,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ opacity: [0, 0.7, 0], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col overflow-hidden pt-24"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-slow pointer-events-none"
        style={{ background: "rgba(14,165,233,0.08)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse-slow pointer-events-none"
        style={{ background: "rgba(99,102,241,0.08)", filter: "blur(120px)", animationDelay: "2s" }}
      />

      <div className="hero-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content (7 of 12 cols) ── */}
          <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* ─ Available badge ─ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.35)",
                boxShadow: "0 0 18px rgba(56,189,248,0.12)",
                width: "fit-content",
                marginTop: "-1.5rem",
              }}
            >
              {/* Pulsing ring + dot */}
              <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 12, height: 12 }}>
                <span style={{
                  position: "absolute",
                  width: 12, height: 12, borderRadius: "50%",
                  background: "rgba(56,189,248,0.35)",
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }} />
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#38bdf8",
                  boxShadow: "0 0 6px #38bdf8",
                  display: "block",
                  flexShrink: 0,
                }} />
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#7dd3fc", letterSpacing: "0.01em" }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Headline block — greeting + name tightly grouped */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

              {/* Hi there */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ fontSize: "1.125rem", fontWeight: 600, color: "#cbd5e1", letterSpacing: "0.01em" }}
              >
                Hi there, I&apos;m 👋
              </motion.p>

              {/* Name */}
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                  hidden: {}
                }}
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "0.4rem",
                  columnGap: "0.8rem",
                }}
              >
                {/* Typing effect for "Pankaja" */}
                <span style={{ color: "#f1f5f9", display: "flex" }}>
                  {"Pankaja".split("").map((char, i) => (
                    <motion.span key={`p-${i}`} variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}>
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Typing effect for "Yunidu" */}
                <span className="text-gradient" style={{ display: "flex" }}>
                  {"Yunidu".split("").map((char, i) => (
                    <motion.span key={`y-${i}`} variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 600, color: "#cbd5e1", lineHeight: 1.5 }}>
                  Data Science Student &amp;{" "}
                  <span className="text-gradient">Full-Stack Developer</span>
                </p>
              </motion.div>
            </div>
            {/* Description - Beautifully readable, search-engine accessible paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, maxWidth: "42rem", marginTop: "-0.75rem" }}
            >
              A passionate tech enthusiast specializing in{" "}
              <span style={{ color: "#7dd3fc", fontWeight: 600 }}>Data Science</span>,{" "}
              <span style={{ color: "#a5b4fc", fontWeight: 600 }}>AI/ML</span>, and{" "}
              <span style={{ color: "#67e8f9", fontWeight: 600 }}>Full-Stack Development</span>. Building intelligent systems that bridge data science and real-world applications.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="/E.D. Pankaja yunidu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-shimmer-btn"
                style={{ padding: "12px 24px", fontSize: "14px" }}
              >
                <ExternalLink size={18} />
                <span>View CV</span>
              </a>

              {/* Animated Social Wrapper */}
              <ul className="footer-social-wrapper" style={{ margin: 0, columnGap: "0.75rem" }}>
                <li className="icon-content" style={{ margin: 0 }}>
                  <a href="https://github.com/pankaja08" target="_blank" rel="noopener noreferrer" data-social="github">
                    <div className="filled"></div>
                    <GithubIcon size={20} />
                  </a>
                  <div className="tooltip">GitHub</div>
                </li>
                <li className="icon-content" style={{ margin: 0 }}>
                  <a href="https://www.linkedin.com/in/pankaja-yunidu-737676326/" target="_blank" rel="noopener noreferrer" data-social="linkedin">
                    <div className="filled"></div>
                    <LinkedinIcon size={20} />
                  </a>
                  <div className="tooltip">LinkedIn</div>
                </li>
              </ul>
            </motion.div>



            {/* Stats Row — Clear Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4 pt-4 mt-6"
            >
              {[
                { label: "Projects Built", value: "5+", icon: "🚀", color: "#38bdf8" },
                { label: "Certifications", value: "5+", icon: "🏆", color: "#fb923c" },
                { label: "Tech Stack", value: "15+", icon: "⚡", color: "#22d3ee" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "16px",
                    padding: "0.75rem 1.25rem",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="text-2xl" style={{ textShadow: `0 0 15px ${stat.color}66` }}>{stat.icon}</span>
                  <div>
                    <div className="text-lg font-extrabold text-white leading-none">{stat.value}</div>
                    <div className="text-[11px] font-semibold tracking-wide uppercase mt-1.5" style={{ color: "#94a3b8" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Animated Data Science Visual (5 of 12 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-[540px] flex items-center justify-center"
          >
            {!isMobile ? <HeroVisual /> : (
              <div style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, rgba(56,189,248,0.5) 0%, rgba(99,102,241,0.5) 50%, rgba(14,165,233,0.3) 100%)",
                boxShadow: "0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(99,102,241,0.3), inset 0 0 40px rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: 40 }}>💡</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <a
            href="#skills"
            className="flex flex-col items-center gap-2 transition-colors group"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#cbd5e1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
