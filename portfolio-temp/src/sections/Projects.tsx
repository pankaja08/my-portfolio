"use client";
import { motion } from "framer-motion";
import { Users, Brain, Car, Leaf, Stethoscope } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import Image from "next/image";

/* ─── Project data ─────────────────────────────────────────── */
const projects = [
  {
    id: "project-goviconnect-platform",
    title: "GoviConnect: Smart Agriculture Platform",
    subtitle: "AI-Based Disease Diagnostic System · Group Project",
    period: "Jan 2026 – May 2026",
    description:
      "A centralized smart agri-platform with a CNN-based paddy disease diagnostic engine, dual Java + Python backend, AI advisory engine, D2C marketplace (Govi Mart), Gemini LLM-powered community forum, and real-time crop & yield tracking.",
    tags: ["Java", "Spring Boot", "Python", "FastAPI", "CNN", "MySQL", "Gemini API"],
    badge: "AI · Full-Stack",
    badgeIcon: <Leaf size={11} />,
    github: "https://github.com/pankaja08/Govi_Connect_Web",
    image:
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop",
    featured: true,
    group: true,
  },
  {
    id: "project-goviconnect-mobile",
    title: "GoviConnect: Agri-Tech Mobile App",
    subtitle: "React Native · Group Project",
    period: "Jan 2026 – May 2026",
    description:
      "Full-stack mobile app with discussion forums, expert blogs, smart crop advisory, activity trackers and GoviMart. Secured RESTful API with JWT + RBAC; Cloudinary image management; deployed on Railway with Expo EAS build pipelines.",
    tags: ["React Native", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Expo EAS"],
    badge: "Mobile · Full-Stack",
    badgeIcon: <Users size={11} />,
    github: "https://github.com/pankaja08/Govi_Connect_Mobile",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    group: true,
  },
  {
    id: "project-smilecare",
    title: "SmileCare: Dental Management System",
    subtitle: "Web-Based · Group Project",
    period: "Jul 2025 – Dec 2025",
    description:
      "Clinic management system digitising manual workflows with multi-role authentication (6 roles, RBAC), automated appointment scheduling, patient profile management, X-ray diagnostics hub, and an inventory & supplier tracking module.",
    tags: ["Java", "Spring Boot", "RESTful APIs", "MS SQL Server", "HTML", "CSS", "JavaScript"],
    badge: "Healthcare · Java",
    badgeIcon: <Stethoscope size={11} />,
    github: "https://github.com/pankaja08/Smilecare_SE_Dental_Management",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    group: true,
  },
  {
    id: "project-loan-prediction",
    title: "AIML: Loan Prediction System",
    subtitle: "Machine Learning · Group Project",
    period: "Jul 2025 – Dec 2026",
    description:
      "ML pipeline predicting loan approval/rejection from applicant data. Covers data preprocessing (missing values, encoding, normalisation), and evaluates Logistic Regression, Decision Tree, Random Forest, MLP, KNN and SVM models by Accuracy, Precision, Recall, F1 & Confusion Matrix.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    badge: "AI/ML · Data Science",
    badgeIcon: <Brain size={11} />,
    github: "https://github.com/pankaja08/Loan-Prediction-Model-AIML-",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    group: true,
  },
  {
    id: "project-car-marketplace",
    title: "Second-Hand Car Marketplace",
    subtitle: "Java Servlet Development · Group Project",
    period: "Jan 2025 – Jul 2025",
    description:
      "Complete buy/sell platform with detailed vehicle listings, advertisement posting and secure authentication. Features Merge Sort on a LinkedList for price-based sorting and OOP principles (Inheritance, Encapsulation, Polymorphism) for modular scalability.",
    tags: ["Java Servlet", "GlassFish", "File-based DB", "OOP", "HTML", "CSS"],
    badge: "Java · Marketplace",
    badgeIcon: <Car size={11} />,
    github: "#", // TODO: add repo link
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    featured: false,
    group: true,
  },
];

/* ─── Card component ───────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isPlaceholder = project.github === "#";

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`proj-card${project.featured ? " featured" : ""}`}
    >
      {/* Image */}
      <div className="proj-card__img-wrap">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="proj-card__img-overlay" />

        {/* Floating badge */}
        <div className="proj-card__badges">
          <span className="proj-card__badge">
            {project.badgeIcon}
            {project.badge}
          </span>
          {project.group && (
            <span className="proj-card__badge">
              <Users size={11} />
              Group
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="proj-card__body">
        {/* Period */}
        <span
          style={{
            fontSize: "11px",
            color: "#38bdf8",
            fontWeight: 600,
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "6px",
          }}
        >
          {project.period}
        </span>

        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__subtitle">{project.subtitle}</p>
        <p className="proj-card__desc">{project.description}</p>

        {/* Tech tags */}
        <div className="proj-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proj-card__tag">
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub button */}
        <div className="proj-card__btn-wrap">
          <a
            id={`${project.id}-github`}
            href={project.github}
            target={isPlaceholder ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`proj-github-btn${isPlaceholder ? " placeholder" : ""}`}
            aria-label={`View ${project.title} on GitHub`}
            title={isPlaceholder ? "Repo link coming soon" : "View on GitHub"}
          >
            <GithubIcon size={15} />
            {isPlaceholder ? "Repo Coming Soon" : "View on GitHub"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="section-padding scroll-mt-24">
      <div style={{ maxWidth: "80rem", margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              color: "#34d399",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            What I&apos;ve built
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              maxWidth: "560px",
              margin: "0 auto",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              textAlign: "center",
            }}
          >
            Real-world applications blending full-stack engineering with data science and AI.
          </p>
        </motion.div>

        {/* Cards grid — featured takes full width, rest in 2-col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Featured card spans two columns on lg+ */}
          {projects.map((project, idx) => (
            <div
              key={project.id}
              style={
                project.featured
                  ? { gridColumn: "1 / -1" }
                  : {}
              }
            >
              <div
                style={
                  project.featured
                    ? {
                      maxWidth: "680px",
                      margin: "0 auto",
                    }
                    : {}
                }
              >
                <ProjectCard project={project} index={idx} />
              </div>
            </div>
          ))}
        </div>

        {/* ── "See More on GitHub" tooltip button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#475569", letterSpacing: "0.05em" }}>
            Want to see more work?
          </p>

          {/* Tooltip container */}
          <div className="gh-tooltip-container">
            {/* Tooltip pop-up */}
            <span className="gh-tooltip">
              👤 @pankaja08
            </span>

            {/* The button itself */}
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
