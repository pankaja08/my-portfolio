"use client";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import {
  Briefcase, GraduationCap, Users, Code2,
  Network, Target, Clock, Sprout, Shield, UserCheck,
  Server, MessageSquare, BriefcaseBusiness, CloudCog,
  Database, LineChart, Presentation,
  Layout,
  Cpu
} from "lucide-react";

const experiences = [
  {
    id: "exp-1",
    role: "Junior Developer",
    company: "Snowy Tech - Startup Company",
    period: "2025 – Present",
    type: "Work",
    icon: <CloudCog size={36} className="text-sky-400" />,
    color: "sky",
    description:
      "Collaborated closely with senior engineers in an agile startup environment to build and optimize production-grade applications, specifically contributing to a commercial Point of Sale (POS) ecosystem. Gained foundational, end-to-end software development lifecycle (SDLC) experience by assisting with database administration, core development tasks, and production deployment pipelines.",
    highlights: [
      { text: "Database Management: Handled schema seeding and data entry using MySQL Workbench.", icon: <Network size={16} /> },
      { text: "POS Feature Development: Implemented micro-tasks and core updates under senior mentorship.", icon: <Target size={16} /> },
      { text: "Deployment & SDLC: Gained hands-on exposure to production release cycles and client requirements.", icon: <Clock size={16} /> },
    ],
  },
  {
    id: "exp-2",
    role: "Academic Project Lead",
    company: "University Collaborative Projects",
    period: "2024 – Present",
    type: "Academic",
    icon: <GraduationCap size={36} className="text-indigo-400" />,
    color: "indigo",
    description:
      "Served as the designated Group Leader across all academic teams from Year 1 through Year 2. Managed team dynamics under strict deadline pressures, keeping peers engaged, valuing diverse opinions, and driving successful project deliveries.",
    highlights: [
      {
        text: "Smart Agriculture Platform: Directed a 6-member team to balance and deliver core ML modules under tight deadlines.",
        icon: <Sprout size={16} />
      },
      {
        text: "Dental Clinic System: Coordinated full-stack task delegation while keeping developers actively aligned and motivated.",
        icon: <Shield size={16} />
      },
      {
        text: "Team Dynamics & Engagement: Formed cohesive workflows across diverse student groups, ensuring everyone's input was heard.",
        icon: <UserCheck size={16} />
      },
    ],
  },
  {
    id: "exp-3",
    role: "Full-Stack Developer",
    company: "Software Architecture Portfolio",
    period: "2024 – Present",
    type: "Technical",
    icon: <Code2 size={36} className="text-emerald-400" />,
    color: "emerald",
    description:
      "Engineered comprehensive full-stack web applications utilizing modern frameworks to deliver scalable, secure software solutions. Focused on robust backend architectures, optimized data modeling, and seamless client-server integrations.",
    highlights: [
      {
        text: "Multi-Tier Backends: Built secure, scalable server-side systems using Java Spring Boot and Node.js/Express.js REST APIs.",
        icon: <Server size={16} />
      },
      {
        text: "Database Architecture: Designed robust data models and schemas across both relational (MySQL) and NoSQL (MongoDB) platforms.",
        icon: <Database size={16} />
      },
      {
        text: "Modern Frontend Integration: Developed responsive, high-performance user interfaces using React, Next.js, and Tailwind CSS.",
        icon: <Layout size={16} />
      },
    ],
  },  
  {
    id: "exp-4",
    role: "Data Science Analyst",
    company: "Machine Learning & Analytics Portfolio",
    period: "2024 – Present",
    type: "Data Science",
    icon: <LineChart size={36} className="text-purple-400" />,
    color: "purple",
    description:
      "Engineered end-to-end Machine Learning and Deep Learning pipelines, from initial data processing to production deployment. Focused on data cleaning, feature normalization, and exposing trained models via high-performance APIs.",
    highlights: [
      {
        text: "Supervised Modeling: Developed a binary classification pipeline for loan prediction, maximizing accuracy through targeted preprocessing and evaluation metrics.",
        icon: <LineChart size={16} />
      },
      {
        text: "Computer Vision (CNN): Analyzed, cleaned, and normalized crop image datasets to build deep learning models for automated disease classification.",
        icon: <Database size={16} />
      },
      {
        text: "Full Pipeline Deployment: Successfully integrated complex machine learning models directly into server-side backends using FastAPI.",
        icon: <Cpu size={16} />
      },
    ],
  },
];

const colorMap: Record<string, { badge: string; dot: string; border: string; glow: string }> = {
  sky: {
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    dot: "bg-sky-400",
    border: "border-sky-500/30",
    glow: "from-sky-500/10",
  },
  indigo: {
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    dot: "bg-indigo-400",
    border: "border-indigo-500/30",
    glow: "from-indigo-500/10",
  },
  emerald: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
    border: "border-emerald-500/30",
    glow: "from-emerald-500/10",
  },
  purple: {
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    glow: "from-purple-500/10",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding scroll-mt-24">
      <div style={{ maxWidth: "64rem", margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span style={{
            color: "#818cf8",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "0.75rem",
          }}>
            My journey
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}>
            Experience &amp;{" "}
            <span className="text-gradient">Timeline</span>
          </h2>
          <p style={{
            color: "#94a3b8",
            maxWidth: "480px",
            margin: "0 auto",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            textAlign: "center",
          }}>
            A track record of leadership, real-world development, and cross-functional collaboration.
          </p>
        </motion.div>
        {/* Timeline */}
        <div className="timeline-wrapper">
          {/* Glowing Vertical line */}
          <div className="timeline-line" />

          <div>
            {experiences.map((exp, idx) => {
              const c = colorMap[exp.color];
              const isLeft = idx % 2 === 0;

              // Define a hex color for inline use
              let hexColor = "#38bdf8"; // sky
              if (exp.color === "indigo") hexColor = "#818cf8";
              if (exp.color === "emerald") hexColor = "#34d399";
              if (exp.color === "purple") hexColor = "#c084fc";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`timeline-item ${isLeft ? "left" : "right"}`}
                  style={{ "--connector-color": hexColor } as React.CSSProperties}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot-wrapper">
                    <div className={`w-5 h-5 rounded-full ${c.dot} ring-4 ring-slate-900 flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 0 15px ${hexColor}80` }}>
                      <div className="w-2 h-2 rounded-full bg-white/80" />
                    </div>
                  </div>

                  {/* Card Wrapper */}
                  <div className="timeline-content-wrapper">
                    {/* Horizontal Connector */}
                    <div className="timeline-connector" />

                    <GlassCard
                      className={`bg-linear-to-br ${c.glow} to-transparent border border-white/10`}
                      hover={true}
                      delay={0}
                    >
                      <div style={{
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                      }}>
                        {/* 1. HEADER SECTION */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                            {/* Keep the frameless thematic icon for visual interest, but without the heavy box */}
                            <div style={{ color: hexColor, marginTop: "0.25rem" }}>
                              {exp.icon}
                            </div>
                            <div>
                              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.25rem" }}>
                                {exp.role}
                              </h3>
                              <p style={{ fontSize: "0.95rem", color: "#94a3b8", fontWeight: 500 }}>
                                {exp.company}
                              </p>
                            </div>
                          </div>

                          {/* Elegant Meta Badges */}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                            <span style={{
                              fontSize: "0.75rem", fontWeight: 600, color: hexColor,
                              background: `${hexColor}25`, padding: "4px 10px", borderRadius: "999px",
                              border: `1px solid ${hexColor}40`
                            }}>
                              {exp.type.toUpperCase()}
                            </span>
                            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{exp.period}</span>
                          </div>
                        </div>

                        {/* 2. DESCRIPTION */}
                        <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: "1.6" }}>
                          {exp.description}
                        </p>

                        {/* 3. ACHIEVEMENTS / BULLET LIST */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginTop: "0.5rem" }}>
                          {exp.highlights.map((h, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                              {/* Minimalist modern indicator instead of clunky custom boxed shapes */}
                              <span style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: hexColor,
                                boxShadow: `0 0 8px ${hexColor}`,
                                marginTop: "0.55rem", // Centers the dot perfectly with the first text line
                                flexShrink: 0
                              }} />
                              <p style={{ fontSize: "0.88rem", color: "#e2e8f0", lineHeight: "1.5" }}>
                                {h.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
