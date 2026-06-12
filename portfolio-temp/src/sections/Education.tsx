"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GraduationCap, BookOpen, Users, Award, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Interfaces ────────────────────────────────────────────── */
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
    text: string;
  };
  image: string;
}

export default function Education() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const entries: EduEntry[] = [
    {
      id: "edu-sliit",
      type: "University",
      title: "Sri Lanka Institute of Information Technology (SLIIT)",
      subtitle: "B.Sc. (Hons) in Information Technology — Specialized in Data Science",
      period: "2024 – 2028 (Reading)",
      details: [
        "Undergraduate specializing in Machine Learning algorithms, predictive modeling, statistical modeling, and data pipeline design.",
        "Solid foundations in relational and NoSQL databases alongside microservices architecture coordination.",
        "Leader for major university collaborative projects, coordinating task delegation and timeline management."
      ],
      skills: ["Data Science", "Machine Learning", "Python", "FastAPI", "Spring Boot", "MySQL"],
      icon: <GraduationCap size={20} />,
      color: {
        accent: "#6366f1", // Indigo
        glow: "rgba(99,102,241,0.15)",
        border: "rgba(99,102,241,0.3)",
        iconBg: "rgba(99,102,241,0.12)",
        text: "text-indigo-400"
      },
      image: "/edu_university.png"
    },
    {
      id: "edu-school",
      type: "School Education",
      title: "Nalanda Boys’ Central College, Minuwangoda",
      subtitle: "G.C.E. Advanced Level (Maths Stream) & G.C.E. Ordinary Level",
      period: "2011 – 2023",
      details: [
        "G.C.E. Advanced Level [2023] — Physical Science / Mathematics Stream.",
        "G.C.E. Ordinary Level [2020] — Passed with outstanding honors.",
        "Acquired strong foundational skills in mechanical physics, advanced mathematics, and general chemistry."
      ],
      skills: ["Mathematics", "Physics", "Chemistry", "Analytical Logic"],
      icon: <BookOpen size={20} />,
      color: {
        accent: "#fb923c", // Orange
        glow: "rgba(251,146,60,0.15)",
        border: "rgba(251,146,60,0.3)",
        iconBg: "rgba(251,146,60,0.12)",
        text: "text-amber-400"
      },
      image: "/edu_school.png"
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
        "Deputy Head Prefect at Nalanda Boys’ Central College [2022 - 2023] managing student discipline and major school events.",
        "Rover Sea Scouts Crew Treasurer [2022 - 2023], coordinating expedition logistics and financial budgeting."
      ],
      skills: ["Leadership", "Community Service", "Public Relations", "Teamwork", "Event Coordination"],
      icon: <Users size={20} />,
      color: {
        accent: "#10b981", // Emerald
        glow: "rgba(16,185,129,0.15)",
        border: "rgba(16,185,129,0.3)",
        iconBg: "rgba(16,185,129,0.12)",
        text: "text-emerald-400"
      },
      image: "/edu_volunteering.png"
    },
    {
      id: "edu-diplomas",
      type: "Diplomas & Specializations",
      title: "Academic Diplomas & Accreditations",
      subtitle: "IT & English Language Campus Diplomas",
      period: "2021 – 2025",
      details: [
        "Assured Diploma in IT (DITEC) — Esoft Metro Campus [Nov 2021]: Covered hardware, databases, software development, and web systems.",
        "Diploma in English Language — Completed with advanced grades, strengthening professional writing, technical reporting, and client communications."
      ],
      skills: ["Information Technology", "Web Development", "Databases", "Professional English"],
      icon: <Award size={20} />,
      color: {
        accent: "#0ea5e9", // Sky Blue
        glow: "rgba(14,165,233,0.15)",
        border: "rgba(14,165,233,0.3)",
        iconBg: "rgba(14,165,233,0.12)",
        text: "text-sky-400"
      },
      image: "/edu_diploma.png"
    }
  ];

  const handleManualSelection = (index: number) => {
    setActiveIndex(index);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % entries.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + entries.length) % entries.length);
  };

  // 3D Tilt motion configurations for the right card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Shine position tracker
  const shineX = useTransform(mouseX, [-200, 200], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-200, 200], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentColor = entries[activeIndex].color;

  return (
    <section id="education" className="section-padding scroll-mt-24 relative overflow-hidden">
      {/* Background ambient blobs */}
      <div style={{
        position: "absolute", top: "20%", right: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${currentColor.glow} 0%, transparent 70%)`,
        filter: "blur(100px)", pointerEvents: "none",
        transition: "background 0.8s ease"
      }} />

      <div style={{ maxWidth: "68rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{
            color: currentColor.accent,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "0.75rem",
            transition: "color 0.4s ease"
          }}>
            Academic Background
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.2,
          }}>
            My <span className="text-gradient">Education</span> &amp; Timeline
          </h2>
          <p style={{
            color: "#94a3b8",
            maxWidth: "480px",
            margin: "0.75rem auto 0",
            fontSize: "0.85rem",
            lineHeight: 1.6,
          }}>
            An overview of my academic progression, specialized diplomas, and active leadership roles.
          </p>
        </motion.div>

        {/* Two-Column Responsive Grid */}
        <div className="education-grid">
          
          {/* LEFT COLUMN: Interactive Education Timeline/Cards */}
          <div className="education-left flex flex-col gap-4">
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
               return (
                <motion.div
                  key={entry.id}
                  onClick={() => handleManualSelection(index)}
                  onMouseEnter={() => !isMobile && setActiveIndex(index)}
                  style={{
                    background: isActive ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.4)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid",
                    borderColor: isActive ? entry.color.border : "rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    padding: isActive ? "1.15rem" : "0.6rem 1rem",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isActive 
                      ? `0 8px 24px -8px ${entry.color.glow}, inset 0 1px 0 rgba(255,255,255,0.08)` 
                      : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                  }}
                  whileHover={{
                    scale: 1.01,
                    y: -1,
                    borderColor: entry.color.border,
                    background: "rgba(255,255,255,0.08)"
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Active Indicator Left Glow Strip */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: entry.color.accent,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.35s ease"
                  }} />

                  {/* Header info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "nowrap", marginBottom: isActive ? "0.6rem" : "0" }}>
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                      {/* Icon */}
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: entry.color.iconBg,
                        border: `1px solid ${entry.color.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: entry.color.accent
                      }}>
                        {React.cloneElement(entry.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                      </div>
                      <div>
                        <span style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: entry.color.accent,
                        }}>
                          {entry.type}
                        </span>
                        <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#f8fafc", marginTop: "0.02rem", lineHeight: 1.3 }}>
                          {entry.title}
                        </h3>
                      </div>
                    </div>
                    
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#64748b", background: "rgba(255,255,255,0.04)", padding: "2px 6px", borderRadius: 5, whiteSpace: "nowrap" }}>
                      {entry.period}
                    </span>
                  </div>

                  {/* Expandable/active details */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.4rem 0 0", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "0.4rem" }}>
                          
                          {/* Subtitle */}
                          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.2rem" }}>
                            {entry.subtitle}
                          </p>

                          {entry.details.map((detail, idx) => (
                            <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                              <span style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: entry.color.accent,
                                marginTop: "0.45rem",
                                flexShrink: 0
                              }} />
                              <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.45 }}>
                                {detail}
                              </p>
                            </div>
                          ))}

                          {/* Skills Chips */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
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
                                  borderRadius: 999
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

           {/* RIGHT COLUMN: Premium Animated Slideshow Card */}
          <div className="education-right">
            {/* Interactive container mapping 3D tilt */}
            <motion.div
              className="education-slideshow-wrap"
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="education-slideshow-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  background: "rgba(10, 15, 30, 0.45)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "0.75rem",
                  position: "relative",
                  width: "100%",
                  maxWidth: "420px",
                  margin: "0 auto",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${currentColor.glow}`,
                  overflow: "hidden",
                  cursor: "grab",
                  transition: "box-shadow 0.6s ease"
                }}
                whileTap={{ cursor: "grabbing" }}
              >
                {/* Dynamic Glassy Reflection Overlay */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: useMotionTemplate`radial-gradient(circle 200px at ${shineX} ${shineY}, rgba(255,255,255,0.1) 0%, transparent 80%)`,
                    pointerEvents: "none",
                    zIndex: 20
                  }}
                />

                {/* Slideshow image container */}
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 14, overflow: "hidden" }}>
                  
                  {/* Subtle vignette/gradient overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8, 12, 30, 0.8) 0%, rgba(8, 12, 30, 0.2) 50%, transparent 100%)",
                    zIndex: 10,
                    pointerEvents: "none"
                  }} />

                  {/* Active slide card with crossfade */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    >
                      <Image
                        src={entries[activeIndex].image}
                        alt={entries[activeIndex].title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 30vw"
                        style={{
                          objectFit: "cover",
                          filter: "brightness(0.9)"
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    style={{
                      position: "absolute",
                      left: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 15,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "rgba(15,23,42,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f8fafc",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      backdropFilter: "blur(8px)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(15,23,42,0.8)";
                      e.currentTarget.style.borderColor = currentColor.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(15,23,42,0.6)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 15,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "rgba(15,23,42,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f8fafc",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      backdropFilter: "blur(8px)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(15,23,42,0.8)";
                      e.currentTarget.style.borderColor = currentColor.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(15,23,42,0.6)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Overlaid slide details (bottom of the card) */}
                  <div style={{ position: "absolute", bottom: "12px", left: "16px", right: "16px", zIndex: 12 }}>
                    <motion.div
                      key={activeIndex}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.45 }}
                    >
                      <span style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: currentColor.accent,
                        letterSpacing: "0.15em",
                        transition: "color 0.4s ease"
                      }}>
                        {entries[activeIndex].type}
                      </span>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f8fafc", marginTop: "2px" }}>
                        {entries[activeIndex].title.split(" (")[0]}
                      </h4>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Slide Pagination Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "1rem" }}>
              {entries.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => handleManualSelection(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    style={{
                      width: isActive ? 20 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: isActive ? currentColor.accent : "rgba(255,255,255,0.15)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s ease"
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 mx-auto"
          style={{
            height: 1,
            maxWidth: 380,
            background: `linear-gradient(90deg, transparent, ${currentColor.accent}, transparent)`,
            transition: "background 0.8s ease"
          }}
        />

      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: stretch;
        }
        .education-left {
          width: 100%;
        }
        .education-right {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .education-slideshow-wrap {
          height: auto;
        }
        .education-slideshow-card {
          aspect-ratio: 4/3;
        }
        @media (min-width: 1024px) {
          .education-grid {
            grid-template-columns: 1.35fr 1fr;
            gap: 2.5rem;
            align-items: stretch;
          }
          .education-right {
            justify-content: stretch;
          }
          .education-slideshow-wrap {
            height: 100% !important;
          }
          .education-slideshow-card {
            aspect-ratio: auto !important;
            height: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
