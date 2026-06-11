"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Brain,
  Smartphone,
  Leaf,
  Database,
  Zap,
  BarChart3,
  Users,
  Stethoscope,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

/* ─── Types ─────────────────────────────────────────────────── */
type Metric = { label: string; value: string; color: "emerald" | "indigo" | "sky" | "amber" };
type Feature = { text: string; bold: string };
type Tech = { name: string; color?: string };

interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  track: string;
  trackIcon: React.ReactNode;
  trackBadge: string;
  accentColor: string;
  accentGlow: string;
  borderAccent: string;
  metrics: Metric[];
  description: string;
  features: Feature[];
  techs: Tech[];
  github: string;
  image: string;
  imageAlt: string;
  mockupType: "browser" | "phone" | "promo";
  reversed: boolean;
}

/* ─── Metric color map ───────────────────────────────────────── */
const metricColors: Record<string, { pill: string; text: string }> = {
  emerald: { pill: "rgba(16,185,129,0.12)", text: "#34d399" },
  indigo: { pill: "rgba(99,102,241,0.12)", text: "#a5b4fc" },
  sky: { pill: "rgba(14,165,233,0.12)", text: "#38bdf8" },
  amber: { pill: "rgba(245,158,11,0.12)", text: "#fbbf24" },
};

/* ─── Project data ─────────────────────────────────────────── */
const featuredProjects: FeaturedProject[] = [
  {
    id: "goviconnect-web",
    number: "01",
    title: "GoviConnect",
    trackBadge: "AI · Full-Stack",
    track: "AI-Based Disease Diagnostic System & Full-Stack Platform",
    trackIcon: <Leaf size={14} />,
    accentColor: "#22c55e",
    accentGlow: "rgba(34,197,94,0.18)",
    borderAccent: "rgba(34,197,94,0.25)",
    metrics: [
      { label: "CNN Accuracy", value: "94%", color: "emerald" },
      { label: "F1-Score", value: "0.91", color: "sky" },
      { label: "Roles", value: "6+", color: "indigo" },
    ],
    description:
      "A centralized smart agri-ecosystem built to empower local farmers by combining high-performance full-stack architecture with localized AI diagnostic tools. The platform bridges the gap between traditional farming and modern digital precision by enabling real-time crop insights and direct-to-consumer digital commerce.",
    features: [
      { bold: "AI Diagnostic Engine:", text: "Custom CNN (ResNet) computer vision model for instant paddy leaf disease detection from field images." },
      { bold: "Robust Dual-Backend:", text: "Java Spring Boot for core business logic + Python FastAPI for high-throughput AI inference, linked via RESTful APIs." },
      { bold: "Govi Mart E-Commerce:", text: "Secure D2C marketplace with smart advisory module for location-specific crop and fertilizer requirements." },
      { bold: "LLM Community Forum:", text: "Gemini API integration providing context-aware AI assistant for instant expert troubleshooting." },
    ],
    techs: [
      { name: "Java Spring Boot" },
      { name: "Python FastAPI" },
      { name: "CNN / ResNet" },
      { name: "Gemini API" },
      { name: "MySQL" },
      { name: "RESTful APIs" },
    ],
    github: "https://github.com/pankaja08/Govi_Connect_Web",
    image: "/proj_goviconnect_promo.webp",
    imageAlt: "GoviConnect Smart Agriculture Platform promotional overview",
    mockupType: "promo",
    reversed: false,
  },
  {
    id: "goviconnect-mobile",
    number: "02",
    title: "GoviConnect Mobile",
    trackBadge: "Mobile · React Native",
    track: "Agri-Tech Mobile Application · React Native",
    trackIcon: <Smartphone size={14} />,
    accentColor: "#f59e0b",
    accentGlow: "rgba(245,158,11,0.18)",
    borderAccent: "rgba(245,158,11,0.25)",
    metrics: [
      { label: "Platforms", value: "iOS & Android", color: "amber" },
      { label: "Auth", value: "JWT + RBAC", color: "indigo" },
      { label: "Storage", value: "Cloudinary", color: "sky" },
    ],
    description:
      "Full-stack mobile application delivering GoviConnect features in a seamless cross-platform experience. Features discussion forums, expert blogs, smart crop advisory, activity trackers and the GoviMart marketplace — all secured with JWT authentication and role-based access control.",
    features: [
      { bold: "Cross-Platform Delivery:", text: "React Native with Expo EAS build pipelines for seamless iOS and Android deployment." },
      { bold: "Secure Authentication:", text: "JWT + RBAC system with Cloudinary image management for farmer profiles and product listings." },
      { bold: "Smart Advisory Module:", text: "Crop recommendations and activity trackers powered by the Spring Boot backend API." },
      { bold: "GoviMart Integration:", text: "Full D2C marketplace with order management and real-time farmer-to-consumer commerce." },
    ],
    techs: [
      { name: "React Native" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "JWT" },
      { name: "Cloudinary" },
      { name: "Expo EAS" },
    ],
    github: "https://github.com/pankaja08/Govi_Connect_Mobile",
    image: "/proj_goviconnect_mobile.webp",
    imageAlt: "GoviConnect Mobile App — iPhone 15 Pro product mockup",
    mockupType: "promo",
    reversed: true,
  },
  {
    id: "loan-prediction",
    number: "03",
    title: "AIML Loan Prediction",
    trackBadge: "AI / ML · Data Science",
    track: "End-to-End Predictive Modeling & Algorithm Assurance",
    trackIcon: <Brain size={14} />,
    accentColor: "#818cf8",
    accentGlow: "rgba(129,140,248,0.18)",
    borderAccent: "rgba(129,140,248,0.25)",
    metrics: [
      { label: "Best Accuracy", value: "91.2%", color: "indigo" },
      { label: "Models Evaluated", value: "6", color: "sky" },
      { label: "F1-Score", value: "0.89", color: "emerald" },
    ],
    description:
      "An automated machine learning pipeline built to assess risk and predict loan approvals based on complex applicant risk profiles. Focuses heavily on rigorous data preprocessing pipelines, exploratory analysis, and strict model auditing to ensure compliance with objective predictive performance standards.",
    features: [
      { bold: "Robust Preprocessing Pipeline:", text: "End-to-end data cleaning, categorical encoding, and distribution normalization for ML-readiness." },
      { bold: "Multi-Model Evaluation:", text: "Trained and tuned Random Forest, SVM, K-Nearest Neighbors, MLP, Logistic Regression, and Decision Tree classifiers." },
      { bold: "Performance Metrics Tracking:", text: "Beyond accuracy — Precision, Recall, F1-Scores, and Confusion Matrices to mitigate false approval risks." },
      { bold: "Visual Analytics Suite:", text: "Comprehensive EDA with Matplotlib and Seaborn to surface feature importance and distribution insights." },
    ],
    techs: [
      { name: "Python" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "Jupyter Notebook" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
    github: "https://github.com/pankaja08/Loan-Prediction-Model-AIML-",
    image: "/proj_loan_prediction.webp",
    imageAlt: "Loan prediction ML dashboard",
    mockupType: "promo",
    reversed: false,
  },
  {
    id: "smilecare",
    number: "04",
    title: "SmileCare",
    trackBadge: "Healthcare · Java",
    track: "Enterprise Web-Based Clinic Management Application",
    trackIcon: <Stethoscope size={14} />,
    accentColor: "#0ea5e9",
    accentGlow: "rgba(14,165,233,0.18)",
    borderAccent: "rgba(14,165,233,0.25)",
    metrics: [
      { label: "User Roles", value: "6 Tiers", color: "sky" },
      { label: "Auth", value: "RBAC + Hashing", color: "indigo" },
      { label: "Type", value: "Enterprise", color: "emerald" },
    ],
    description:
      "A comprehensive enterprise web application designed to digitize manual, paper-based medical workflows. Optimizes healthcare operational efficiency by structuring data flow across scheduling, user privileges, and clinic supply chains — transforming a fully manual clinic into a digitally-managed operation.",
    features: [
      { bold: "Granular RBAC Framework:", text: "Secure multi-role authentication with credential hashing and Role-Based Access Control across 6 distinct user tiers." },
      { bold: "Automated Scheduling Module:", text: "Dynamic patient profiling and appointment system managing clinic hours to drastically reduce waiting times." },
      { bold: "Diagnostics & Supply Hub:", text: "Dedicated digital workspace for clinical X-ray management alongside automated stock-tracking inventory control." },
      { bold: "RESTful API Architecture:", text: "Clean separation of concerns with Java Spring Boot backend exposing structured APIs consumed by the frontend layer." },
    ],
    techs: [
      { name: "Java Spring Boot" },
      { name: "MS SQL Server" },
      { name: "RESTful APIs" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
    ],
    github: "https://github.com/pankaja08/Smilecare_SE_Dental_Management",
    image: "/proj_smilecare_final.webp",
    imageAlt: "SmileCare dental management system homepage",
    mockupType: "promo",
    reversed: true,
  },
];

/* ─── Browser Mockup ─────────────────────────────────────────── */
function BrowserMockup({
  image,
  alt,
  accentColor,
  accentGlow,
}: {
  image: string;
  alt: string;
  accentColor: string;
  accentGlow: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${accentGlow}`,
        background: "#1a1f2e",
      }}
    >
      {/* Window bar */}
      <div
        style={{
          background: "linear-gradient(180deg, #252b3b 0%, #1e2434 100%)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", boxShadow: "0 0 6px rgba(255,95,87,0.6)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", boxShadow: "0 0 6px rgba(254,188,46,0.6)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 6px rgba(40,200,64,0.6)" }} />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: "12px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: accentColor, fontSize: "10px" }}>●</span>
          {alt.includes("SmileCare") ? "smilecare.app" : alt.includes("Govi") ? "goviconnect.lk" : alt.includes("Loan") ? "predict.ai" : "app.local"}
        </div>
      </div>
      {/* Screenshot */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "top" }}
          loading="lazy"
        />
        {/* Subtle scan-line overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 85%, rgba(10,15,30,0.4) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Promo / Marketing Mockup ───────────────────────────────── */
function PromoMockup({
  image,
  alt,
  accentColor,
  accentGlow,
  isPriority = false,
}: {
  image: string;
  alt: string;
  accentColor: string;
  accentGlow: string;
  isPriority?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow behind the image */}
      <div
        style={{
          position: "absolute",
          inset: "-24px",
          borderRadius: "32px",
          background: `radial-gradient(ellipse at center, ${accentGlow} 0%, transparent 70%)`,
          filter: "blur(24px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Image container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06), 0 0 50px ${accentGlow}`,
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={isPriority}
            loading={isPriority ? undefined : "lazy"}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Phone Mockup ───────────────────────────────────────────── */
function PhoneMockup({
  image,
  alt,
  accentColor,
  accentGlow,
}: {
  image: string;
  alt: string;
  accentColor: string;
  accentGlow: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03, rotateY: 3 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "280px",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Glow behind phone */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            background: `radial-gradient(ellipse at center, ${accentGlow} 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        {/* Phone frame */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)`,
            background: "#0f1117",
          }}
        >
          {/* Notch */}
          <div
            style={{
              background: "#0f1117",
              padding: "12px 0 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "6px",
                borderRadius: "3px",
                background: "rgba(255,255,255,0.15)",
              }}
            />
          </div>
          {/* Screen */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "9/17", overflow: "hidden" }}>
            <Image
              src={image}
              alt={alt}
              fill
              sizes="280px"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          {/* Home indicator */}
          <div
            style={{
              background: "#0f1117",
              padding: "8px 0 14px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "4px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Metric Pill ────────────────────────────────────────────── */
function MetricPill({ metric }: { metric: Metric }) {
  const { pill, text } = metricColors[metric.color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        borderRadius: "999px",
        background: pill,
        border: `1px solid ${text}33`,
        fontSize: "11px",
        fontWeight: 600,
        color: text,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "9px" }}>◆</span>
      {metric.label}: {metric.value}
    </span>
  );
}

/* ─── Project Content Card ───────────────────────────────────── */
function ProjectContentCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: project.reversed ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fp-content-card"
      style={{
        background: "linear-gradient(135deg, #161B26 0%, #0f1420 100%)",
        border: `1px solid ${project.borderAccent}`,
        borderRadius: "24px",
        padding: "clamp(1.75rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
        height: "100%",
      }}
    >
      {/* Background accent glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: project.reversed ? "auto" : "-40px",
          right: project.reversed ? "-40px" : "auto",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Project number + track badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: project.accentColor,
              letterSpacing: "0.12em",
              fontFamily: "monospace",
              opacity: 0.8,
            }}
          >
            PROJECT {project.number}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 10px",
              borderRadius: "999px",
              background: `${project.accentColor}18`,
              border: `1px solid ${project.accentColor}35`,
              fontSize: "10px",
              fontWeight: 600,
              color: project.accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {project.trackIcon}
            {project.trackBadge}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.15,
            marginBottom: "0.35rem",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>

        {/* Track subtitle */}
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 500,
            color: project.accentColor,
            opacity: 0.85,
            marginBottom: "1rem",
            letterSpacing: "0.02em",
          }}
        >
          {project.track}
        </p>

        {/* Metric pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "1.25rem",
          }}
        >
          {project.metrics.map((m) => (
            <MetricPill key={m.label} metric={m} />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${project.accentColor}40, transparent)`,
            marginBottom: "1.25rem",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "#94a3b8",
            lineHeight: 1.75,
            marginBottom: "1.5rem",
          }}
        >
          {project.description}
        </p>

        {/* Feature list */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginBottom: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {project.features.map((f, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "0.825rem",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}
            >
              <CheckCircle2
                size={15}
                style={{
                  color: project.accentColor,
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>{f.bold} </strong>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech stack chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "1.75rem",
          }}
        >
          {project.techs.map((tech) => (
            <span
              key={tech.name}
              className="fp-tech-chip"
              style={{
                padding: "4px 11px",
                borderRadius: "6px",
                background: "rgba(31,41,61,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "11px",
                fontWeight: 500,
                color: "#7dd3fc",
                letterSpacing: "0.02em",
                transition: "all 0.2s ease",
              }}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          id={`${project.id}-github-cta`}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="fp-cta-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            borderRadius: "12px",
            border: `1px solid ${project.accentColor}50`,
            background: `${project.accentColor}12`,
            color: project.accentColor,
            fontSize: "0.825rem",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transition: "all 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = project.accentColor;
            el.style.color = "#0b0f19";
            el.style.borderColor = project.accentColor;
            el.style.transform = "translateY(-2px) translateX(2px)";
            el.style.boxShadow = `0 12px 32px ${project.accentGlow}`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = `${project.accentColor}12`;
            el.style.color = project.accentColor;
            el.style.borderColor = `${project.accentColor}50`;
            el.style.transform = "translateY(0) translateX(0)";
            el.style.boxShadow = "none";
          }}
        >
          <GithubIcon size={14} />
          View on GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Single Project Row ─────────────────────────────────────── */
function ProjectRow({ project, index }: { project: FeaturedProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const mediaComponent =
    project.mockupType === "phone" ? (
      <PhoneMockup
        image={project.image}
        alt={project.imageAlt}
        accentColor={project.accentColor}
        accentGlow={project.accentGlow}
      />
    ) : project.mockupType === "promo" ? (
      <PromoMockup
        image={project.image}
        alt={project.imageAlt}
        accentColor={project.accentColor}
        accentGlow={project.accentGlow}
        isPriority={index === 0}
      />
    ) : (
      <BrowserMockup
        image={project.image}
        alt={project.imageAlt}
        accentColor={project.accentColor}
        accentGlow={project.accentGlow}
      />
    );

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: "5rem" }}
    >
      <div className="fp-row-grid" style={project.reversed ? { direction: "rtl" } : {}}>
        {/* Content card */}
        <div style={{ direction: "ltr" }}>
          <ProjectContentCard project={project} index={index} />
        </div>

        {/* Media showcase */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, x: project.reversed ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            direction: "ltr",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mediaComponent}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────── */
export default function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section id="projects" className="section-padding scroll-mt-24">
      {/* Section CSS injected once */}
      <style>{`
        .fp-row-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .fp-row-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3.5rem;
          }
        }
        .fp-tech-chip:hover {
          background: rgba(56,189,248,0.12) !important;
          border-color: rgba(56,189,248,0.3) !important;
          color: #38bdf8 !important;
          transform: translateY(-1px);
        }
        .fp-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          font-size: 11px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .fp-row-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
          margin-bottom: 5rem;
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <span className="fp-section-label">
              <Zap size={11} />
              What I&apos;ve built
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>

          <p
            style={{
              color: "#64748b",
              maxWidth: "560px",
              margin: "0 auto",
              fontSize: "0.9rem",
              lineHeight: 1.8,
            }}
          >
            Real-world applications blending full-stack engineering with data science and AI — built to solve genuine problems.
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <BarChart3 size={14} />, value: "4+", label: "Featured Projects" },
              { icon: <Brain size={14} />, value: "91%", label: "Best Model Accuracy" },
              { icon: <Users size={14} />, value: "4", label: "Group Builds" },
              { icon: <Database size={14} />, value: "2", label: "AI Backends" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ color: "#38bdf8" }}>{s.icon}</span>
                <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{s.value}</span>
                <span style={{ color: "#64748b" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Featured Project Rows ── */}
        <div key={featuredProjects[0].id}>
          <ProjectRow project={featuredProjects[0]} index={0} />
        </div>

        {/* ── Collapsed Projects Container ── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="fp-row-divider" style={{ marginTop: "-2rem" }} />
              {featuredProjects.slice(1).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.4, rotateX: 45, rotateZ: idx % 2 === 0 ? 8 : -8, y: 200 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0, rotateZ: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 100 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 10,
                    mass: 1,
                    delay: idx * 0.15,
                  }}
                  style={{ transformPerspective: 1200 }}
                >
                  <ProjectRow project={project} index={idx + 1} />
                  {idx < featuredProjects.length - 2 && <div className="fp-row-divider" />}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Expand/Collapse Button ── */}
        <motion.div
          layout
          style={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "2rem" }}
        >
          <button
            onClick={() => {
              if (isExpanded) {
                // Track certifications section during the 800ms collapse animation
                const el = document.getElementById('certifications');
                if (el) {
                  const start = performance.now();
                  const step = (time: number) => {
                    if (time - start < 850) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 120;
                      window.scrollTo(0, y);
                      requestAnimationFrame(step);
                    }
                  };
                  requestAnimationFrame(step);
                }
              }
              setIsExpanded(!isExpanded);
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 24px", borderRadius: 999,
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#38bdf8", fontSize: "0.85rem", fontWeight: 700,
              cursor: "pointer", transition: "all 0.3s ease",
              letterSpacing: "0.05em", textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(14,165,233,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(14,165,233,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(14,165,233,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(14,165,233,0.15)";
            }}
          >
            {isExpanded ? (
              <>Hide Other Projects</>
            ) : (
              <>
                Show All Projects
                <span style={{
                  background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                  color: "#fff", padding: "2px 8px", borderRadius: 12,
                  fontSize: "0.7rem", marginLeft: 4, fontWeight: 800,
                  boxShadow: "0 0 10px rgba(56,189,248,0.5)"
                }}>
                  +{featuredProjects.length - 1}
                </span>
              </>
            )}
          </button>
        </motion.div>

        {/* ── See More on GitHub ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#475569", letterSpacing: "0.05em" }}>
            Want to see more work?
          </p>
          <div className="gh-tooltip-container">
            <span className="gh-tooltip">👤 @pankaja08</span>
            <a
              href="https://github.com/pankaja08"
              target="_blank"
              rel="noopener noreferrer"
              id="github-all-projects"
              className="gh-tooltip-text"
              aria-label="View all projects on GitHub @pankaja08"
            >
              <GithubIcon size={18} />
              See all projects on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
