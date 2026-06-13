"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

/* ─── Interfaces ─────────────────────────────────────────────── */
interface EduEntry {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  period: string;
  details: string[];
  skills: string[];
  icon: React.ReactNode;
  color: {
    accent: string;
    glow: string;
    border: string;
    iconBg: string;
  };
  image: string;
}

/* ─── Glassmorphism Portrait (right column) ────────────────────── */
function GlassPortrait({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const mX = mouseX - rect.left;
    const mY = mouseY - rect.top;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        perspective: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="glass-portrait-root"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 30,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 40px rgba(56,189,248,0.15)",
          padding: 12,
          width: 400,
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle glow behind the image inside the card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 30,
            background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", transform: "translateZ(30px)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", position: "absolute" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            >
              <Image
                src={image}
                alt="Pankaja Yunidu"
                fill
                sizes="400px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Name tag below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.01em",
          }}
        >
          Pankaja Yunidu
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#38bdf8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Data Science · Full-Stack
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function AboutMe() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const entries: EduEntry[] = [
    {
      id: "edu-sliit",
      type: "University",
      title: "Sri Lanka Institute of Information Technology (SLIIT)",
      subtitle:
        "B.Sc. (Hons) in Information Technology — Specialized in Data Science",
      period: "2024 – 2028 (Reading)",
      details: [
        "Undergraduate specializing in Machine Learning algorithms, predictive modeling, statistical modeling, and data pipeline design.",
        "Solid foundations in relational and NoSQL databases alongside microservices architecture coordination.",
        "Leader for major university collaborative projects, coordinating task delegation and timeline management.",
      ],
      skills: ["Data Science", "Machine Learning", "Python", "FastAPI", "Spring Boot", "MySQL"],
      icon: <GraduationCap size={20} />,
      color: {
        accent: "#6366f1",
        glow: "rgba(99,102,241,0.15)",
        border: "rgba(99,102,241,0.3)",
        iconBg: "rgba(99,102,241,0.12)",
      },
      image: "/profile.jpg",
    },
    {
      id: "edu-school",
      type: "School Education",
      title: "Nalanda Boys' Central College, Minuwangoda",
      subtitle: "G.C.E. Advanced Level (Maths Stream) & G.C.E. Ordinary Level",
      period: "2011 – 2023",
      details: [
        "G.C.E. Advanced Level [2023] — Physical Science / Mathematics Stream.",
        "G.C.E. Ordinary Level [2020] — Passed with outstanding honors.",
      ],
      skills: ["Combined Mathematics", "Physics", "ICT"],
      icon: <BookOpen size={20} />,
      color: {
        accent: "#fb923c",
        glow: "rgba(251,146,60,0.15)",
        border: "rgba(251,146,60,0.3)",
        iconBg: "rgba(251,146,60,0.12)",
      },
      image: "/edu_school.png",
    },
    {
      id: "edu-extracurricular",
      type: "Leadership & Volunteering",
      title: "Extra-Curricular Activities",
      subtitle: "Leo Club, Voice Of Nalanda, Rovers Sea Scouts, Prefect Board",
      period: "2022 – Present",
      details: [
        "Volunteering: Active Member of the LEO Club of SLIIT [2025 - Present] contributing to social empowerment initiatives.",
        "Volunteering: Editor & Event Coordinator of Voice Of Nalanda Non-Profit Organization [2024 - Present].",
        "Deputy Head Prefect at Nalanda Boys' Central College [2022 - 2023] managing student discipline and major school events.",
        "Rover Sea Scouts Crew Treasurer [2022 - 2023], coordinating expedition logistics and financial budgeting.",
      ],
      skills: ["Leadership", "Community Service", "Public Relations", "Teamwork", "Event Coordination"],
      icon: <Users size={20} />,
      color: {
        accent: "#10b981",
        glow: "rgba(16,185,129,0.15)",
        border: "rgba(16,185,129,0.3)",
        iconBg: "rgba(16,185,129,0.12)",
      },
      image: "/extra.jpg",
    },
  ];

  const currentColor = entries[activeIndex].color;

  return (
    <section
      id="aboutme"
      className="section-padding scroll-mt-24 relative overflow-hidden"
    >
      {/* Background ambient blob */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${currentColor.glow} 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
          transition: "background 0.8s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-8%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "68rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "left", marginBottom: "3rem" }}
        >
          <span
            style={{
              color: "#38bdf8",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Who I Am
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.2,
            }}
          >
            About <span className="text-gradient">Me</span> &amp; My Journey
          </h2>
          <p
            style={{
              color: "#94a3b8",
              maxWidth: "480px",
              margin: "0.75rem 0 0",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            An overview of my academic progression, specialized diplomas, and
            active leadership roles.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="aboutme-grid">
          {/* LEFT: Education cards */}
          <div 
            className="aboutme-left flex flex-col gap-4"
            onMouseLeave={() => !isMobile && setActiveIndex(0)}
          >
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={entry.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => !isMobile && setActiveIndex(index)}
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(15,23,42,0.4)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid",
                    borderColor: isActive
                      ? entry.color.border
                      : "rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    padding: isActive ? "1.15rem" : "0.6rem 1rem",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isActive
                      ? `0 8px 24px -8px ${entry.color.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
                      : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  whileHover={{
                    scale: 1.01,
                    y: -1,
                    borderColor: entry.color.border,
                    background: "rgba(255,255,255,0.08)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Active left strip */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: entry.color.accent,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease",
                    }}
                  />

                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "nowrap",
                      marginBottom: isActive ? "0.6rem" : "0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: entry.color.iconBg,
                          border: `1px solid ${entry.color.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: entry.color.accent,
                        }}
                      >
                        {React.cloneElement(
                          entry.icon as React.ReactElement<{ size?: number }>,
                          { size: 16 }
                        )}
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: entry.color.accent,
                          }}
                        >
                          {entry.type}
                        </span>
                        <h3
                          style={{
                            fontSize: "0.92rem",
                            fontWeight: 800,
                            color: "#f8fafc",
                            marginTop: "0.02rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {entry.title}
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        color: "#64748b",
                        background: "rgba(255,255,255,0.04)",
                        padding: "2px 6px",
                        borderRadius: 5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.period}
                    </span>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            padding: "0.4rem 0 0",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            marginTop: "0.4rem",
                          }}
                        >
                          {/* Mobile image */}
                          <div
                            className="mobile-card-image"
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "180px",
                              borderRadius: 10,
                              overflow: "hidden",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Image
                              src={entry.image}
                              alt={entry.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 30vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>

                          <p
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#cbd5e1",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {entry.subtitle}
                          </p>

                          {entry.details.map((detail, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "flex-start",
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  background: entry.color.accent,
                                  marginTop: "0.45rem",
                                  flexShrink: 0,
                                }}
                              />
                              <p
                                style={{
                                  fontSize: "0.78rem",
                                  color: "#94a3b8",
                                  lineHeight: 1.45,
                                }}
                              >
                                {detail}
                              </p>
                            </div>
                          ))}

                          {/* Skills */}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.3rem",
                              marginTop: "0.4rem",
                            }}
                          >
                            {entry.skills.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  fontSize: "0.55rem",
                                  fontWeight: 700,
                                  color: entry.color.accent,
                                  border: `1px solid ${entry.color.border}`,
                                  background: `${entry.color.accent}08`,
                                  padding: "1px 5px",
                                  borderRadius: 999,
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Animated glass portrait */}
          <div className="aboutme-right">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minHeight: 480,
                position: "relative",
              }}
            >
              <GlassPortrait image={entries[activeIndex].image} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 mx-auto"
          style={{
            height: 1,
            maxWidth: 380,
            background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
          }}
        />
      </div>

      <style>{`
        /* ── Grid layout ── */
        .aboutme-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        .aboutme-left  { width: 100%; }
        .aboutme-right { display: none; }
        .mobile-card-image { display: block; }

        @media (min-width: 1024px) {
          .aboutme-grid {
            grid-template-columns: 1.35fr 1fr;
            gap: 2.5rem;
            align-items: center;
          }
          .aboutme-right {
            display: flex !important;
            width: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .mobile-card-image { display: none !important; }
        }
      `}</style>
    </section>
  );
}
