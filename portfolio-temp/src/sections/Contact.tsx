"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, Mail, User, MessageSquare } from "lucide-react";

/* ─── Formspree endpoint ───────────────────────────────────── */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjrevwy";

type FormState = "idle" | "loading" | "success" | "error";

/* ─── Interactive SVG Robot ────────────────────────────────── */
function RobotBot({ isTyping }: { isTyping: boolean }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
    >
      <svg
        width="240"
        height="240"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 28px rgba(34,211,238,0.28))" }}
      >
        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="48" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="26" r="5" fill="#22d3ee" />
        <circle cx="100" cy="26" r="3" fill="#0ea5e9">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Neck */}
        <path d="M85 148 L115 148 L108 168 L92 168 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

        {/* Robot head — physically turns left and angles down toward form when typing */}
        <motion.g
          animate={isTyping ? { x: -12, rotate: -6, y: 2 } : { x: 0, rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          {/* Left ear */}
          <rect x="34" y="72" width="11" height="32" rx="5" fill="#0ea5e9" />
          {/* Right ear */}
          <rect x="155" y="72" width="11" height="32" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

          {/* Head chassis */}
          <rect x="45" y="48" width="110" height="88" rx="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Visor glass */}
          <rect x="55" y="60" width="90" height="54" rx="14" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />

          {/* Visor reflection sheen */}
          <path d="M60 64 Q80 60 110 66" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round" />

          {/* EYES — aggressively drag pupils left toward form when typing */}
          <motion.g
            animate={isTyping ? { x: -16, y: 4, scaleY: 0.9 } : { x: 0, y: 0, scaleY: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            {/* Left eye outer glow */}
            <ellipse cx="80" cy="85" rx="13" ry="13" fill="#0c4a6e" />
            {/* Left iris */}
            <ellipse cx="80" cy="85" rx="10" ry="10" fill="#22d3ee" />
            {/* Left pupil */}
            <circle cx="80" cy="85" r="5" fill="#0ea5e9" />
            {/* Left highlight */}
            <circle cx="76" cy="81" r="2.5" fill="#ffffff" fillOpacity={0.9} />

            {/* Right eye outer glow */}
            <ellipse cx="120" cy="85" rx="13" ry="13" fill="#0c4a6e" />
            {/* Right iris */}
            <ellipse cx="120" cy="85" rx="10" ry="10" fill="#22d3ee" />
            {/* Right pupil */}
            <circle cx="120" cy="85" r="5" fill="#0ea5e9" />
            {/* Right highlight */}
            <circle cx="116" cy="81" r="2.5" fill="#ffffff" fillOpacity={0.9} />
          </motion.g>

          {/* Mouth — compresses and shifts left: focused/analytical expression */}
          {/* Wrap in motion.g so scaleX works on SVG (can't animate on path directly) */}
          <motion.g
            animate={isTyping ? { scaleX: 0.6, x: -4, opacity: 0.9 } : { scaleX: 1, x: 0, opacity: 0.4 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ originX: "100px", originY: "102px" }}
          >
            <path
              d="M85 102 H115"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Chin detail dots */}
          <circle cx="90" cy="120" r="2" fill="#334155" />
          <circle cx="100" cy="120" r="2" fill="#334155" />
          <circle cx="110" cy="120" r="2" fill="#334155" />
        </motion.g>

        {/* Chest panel */}
        <rect x="75" y="170" width="50" height="20" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="90" cy="180" r="3" fill="#22d3ee" fillOpacity={0.7}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="180" r="3" fill="#818cf8" fillOpacity={0.7} />
        <circle cx="110" cy="180" r="3" fill="#34d399" fillOpacity={0.7} />
      </svg>
    </motion.div>
  );
}

/* ─── Main Contact Section ─────────────────────────────────── */
export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof values>>({});
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  /* Debounced typing detection — 1.2 s silence resets */
  const handleTyping = useCallback(() => {
    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 1200);
  }, []);

  useEffect(() => () => { if (typingTimer.current) clearTimeout(typingTimer.current); }, []);

  const validate = () => {
    const errs: Partial<typeof values> = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (values.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setFormState("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) { setFormState("success"); setValues({ name: "", email: "", message: "" }); }
      else setFormState("error");
    } catch {
      setFormState("error");
    }
  };

  // Track which field is currently focused (for icon highlight)
  const [focused, setFocused] = useState<string | null>(null);

  /* Styled field wrapper — glowing left-border on focus */
  const fieldWrap = (isFocused: boolean, hasError: boolean): React.CSSProperties => ({
    position: "relative",
    borderRadius: 14,
    background: isFocused ? "rgba(56,189,248,0.04)" : "rgba(255,255,255,0.03)",
    border: hasError
      ? "1px solid rgba(248,113,113,0.5)"
      : isFocused
        ? "1px solid rgba(56,189,248,0.5)"
        : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isFocused
      ? "0 0 0 3px rgba(56,189,248,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
      : "inset 0 1px 0 rgba(255,255,255,0.03)",
    transition: "all 0.25s ease",
    overflow: "hidden",
  });

  /* Left accent bar */
  const accentBar = (isFocused: boolean): React.CSSProperties => ({
    position: "absolute",
    left: 0, top: "15%", bottom: "15%",
    width: 3, borderRadius: "0 3px 3px 0",
    background: isFocused
      ? "linear-gradient(180deg, #38bdf8, #818cf8)"
      : "transparent",
    transition: "background 0.3s ease",
  });

  /* Icon column */
  const iconCol = (isFocused: boolean): React.CSSProperties => ({
    position: "absolute",
    left: 14, top: "50%", transform: "translateY(-50%)",
    color: isFocused ? "#38bdf8" : "#475569",
    transition: "color 0.25s ease",
    pointerEvents: "none",
    display: "flex",
  });

  /* Input element itself */
  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    padding: "13px 14px 13px 42px",
    fontSize: "0.875rem", color: "#e2e8f0",
    outline: "none", fontFamily: "inherit",
  };

  return (
    <section id="contact" className="section-padding scroll-mt-24 relative overflow-hidden">

      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: "15%", left: "-8%",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-8%",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", width: "100%", position: "relative", zIndex: 10 }}>

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
            Get In Touch
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
            color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Let&apos;s{" "}
            <span className="text-gradient">Connect</span>
          </h2>
          <p style={{
            color: "#94a3b8", maxWidth: "480px", margin: "0 auto",
            fontSize: "0.875rem", lineHeight: 1.7, textAlign: "center",
          }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid-cols-1 sm:grid-cols-2" style={{ display: "grid", gap: "3rem", alignItems: "center" }}>

          {/* ── LEFT: Contact Form ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "rgba(11,15,36,0.55)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: "2rem",
              boxShadow: "0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner shine */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "inherit",
              background: "linear-gradient(145deg, rgba(56,189,248,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", padding: "3rem 0", gap: "1rem", textAlign: "center",
                  }}
                >
                  <CheckCircle2 size={52} color="#34d399" />
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f1f5f9" }}>Message Sent!</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setFormState("idle")}
                    style={{
                      marginTop: "0.5rem", padding: "0.6rem 1.4rem", borderRadius: 12,
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                      color: "#cbd5e1", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  id="contact-form"
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative" }}
                >
                  {/* ── NAME ─────────────────────── */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: focused === "name" ? "#38bdf8" : "#64748b",
                        marginBottom: 8, transition: "color 0.25s ease",
                      }}
                    >
                      <User size={11} /> Full Name
                    </label>
                    <div style={fieldWrap(focused === "name", !!errors.name)}>
                      <div style={accentBar(focused === "name")} />
                      <span style={iconCol(focused === "name")}><User size={16} /></span>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Pankaja Yunidu"
                        value={values.name}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => { setValues({ ...values, name: e.target.value }); handleTyping(); }}
                        style={{ ...inputStyle, caretColor: "#38bdf8" }}
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#f87171", fontSize: "0.72rem", marginTop: 5, paddingLeft: 4, display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <span style={{ fontSize: "0.65rem" }}>⚠</span> {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* ── EMAIL ────────────────────── */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: focused === "email" ? "#38bdf8" : "#64748b",
                        marginBottom: 8, transition: "color 0.25s ease",
                      }}
                    >
                      <Mail size={11} /> Email Address
                    </label>
                    <div style={fieldWrap(focused === "email", !!errors.email)}>
                      <div style={accentBar(focused === "email")} />
                      <span style={iconCol(focused === "email")}><Mail size={16} /></span>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="hello@example.com"
                        value={values.email}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => { setValues({ ...values, email: e.target.value }); handleTyping(); }}
                        style={{ ...inputStyle, caretColor: "#38bdf8" }}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#f87171", fontSize: "0.72rem", marginTop: 5, paddingLeft: 4, display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <span style={{ fontSize: "0.65rem" }}>⚠</span> {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* ── MESSAGE ──────────────────── */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <label
                        htmlFor="contact-message"
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: focused === "msg" ? "#38bdf8" : "#64748b",
                          transition: "color 0.25s ease",
                        }}
                      >
                        <MessageSquare size={11} /> Message
                      </label>
                      <span style={{
                        fontSize: "0.65rem", color: values.message.length > 480 ? "#f87171" : "#475569",
                        fontVariantNumeric: "tabular-nums", transition: "color 0.2s",
                      }}>
                        {values.message.length}/500
                      </span>
                    </div>
                    <div style={{ ...fieldWrap(focused === "msg", !!errors.message), paddingTop: 4 }}>
                      <div style={accentBar(focused === "msg")} />
                      <span style={{ ...iconCol(focused === "msg"), top: 18, transform: "none" }}>
                        <MessageSquare size={16} />
                      </span>
                      <textarea
                        id="contact-message"
                        rows={5}
                        maxLength={500}
                        placeholder="Tell me about your project or just say hi..."
                        value={values.message}
                        onFocus={() => setFocused("msg")}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => { setValues({ ...values, message: e.target.value }); handleTyping(); }}
                        style={{
                          ...inputStyle,
                          resize: "none", paddingTop: 13,
                          caretColor: "#38bdf8",
                          lineHeight: 1.6,
                        }}
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#f87171", fontSize: "0.72rem", marginTop: 5, paddingLeft: 4, display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <span style={{ fontSize: "0.65rem" }}>⚠</span> {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {formState === "error" && (
                    <p style={{ color: "#f87171", fontSize: "0.8125rem", textAlign: "center" }}>
                      Oops! Something went wrong. Please try again.
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    id="contact-submit"
                    type="submit"
                    disabled={formState === "loading"}
                    whileHover={formState !== "loading" ? { scale: 1.02, y: -2 } : {}}
                    whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 10, padding: "1rem 1.5rem", borderRadius: 14, marginTop: 4,
                      background: "linear-gradient(135deg, #0ea5e9 0%, #818cf8 100%)",
                      border: "none", color: "#fff", fontSize: "0.9rem", fontWeight: 700,
                      cursor: formState === "loading" ? "not-allowed" : "pointer",
                      opacity: formState === "loading" ? 0.65 : 1,
                      boxShadow: "0 4px 24px rgba(14,165,233,0.35), 0 1px 0 rgba(255,255,255,0.15) inset",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {formState === "loading" ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Robot Bot ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              minHeight: 360, position: "relative",
            }}
          >
            {/* Pulsing ambient ring */}
            <div style={{
              position: "absolute",
              width: 300, height: 300, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, rgba(99,102,241,0.07) 60%, transparent 80%)",
              filter: "blur(30px)",
              animation: "pulse 4s ease-in-out infinite",
              pointerEvents: "none",
            }} />

            {/* Second smaller ring */}
            <div style={{
              position: "absolute",
              width: 200, height: 200, borderRadius: "50%",
              border: "1px solid rgba(34,211,238,0.1)",
              animation: "spin-slow 12s linear infinite",
              pointerEvents: "none",
            }} />

            <RobotBot isTyping={isTyping} />

            {/* Status chip */}
            <motion.div
              animate={isTyping
                ? { borderColor: "rgba(34,211,238,0.4)", boxShadow: "0 0 16px rgba(34,211,238,0.2)" }
                : { borderColor: "rgba(255,255,255,0.06)", boxShadow: "none" }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: "1.5rem",
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 999,
                background: "rgba(11,15,36,0.7)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: isTyping ? "#22d3ee" : "rgba(99,102,241,0.6)",
                display: "block",
                boxShadow: isTyping ? "0 0 6px #22d3ee" : "none",
                transition: "all 0.4s ease",
              }} />
              <span style={{
                fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.1em",
                textTransform: "uppercase", color: isTyping ? "#94a3b8" : "#475569",
                transition: "color 0.3s ease",
              }}>
                {isTyping ? "Bot: Tracking Input…" : "Bot: Idle · Watching"}
              </span>
            </motion.div>

            {/* Callout bubble */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    marginTop: "0.75rem",
                    padding: "8px 16px", borderRadius: 10,
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    fontSize: "0.72rem", color: "#67e8f9", fontStyle: "italic",
                  }}
                >
                  💬 I see you typing something!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
