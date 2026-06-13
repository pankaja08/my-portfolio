"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Skills from "@/sections/Skills";

// Lazy-load below-the-fold sections — they are NOT needed for initial paint.
// Adding "use client" here is required since ssr:false is only allowed in Client Components.
// Hero and Skills are still eagerly loaded for above-the-fold content.
const Experience = dynamic(() => import("@/sections/Experience"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} aria-hidden />,
});
const Projects = dynamic(() => import("@/sections/Projects"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "600px" }} aria-hidden />,
});
const Certifications = dynamic(() => import("@/sections/Certifications"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} aria-hidden />,
});
const AboutMe = dynamic(() => import("@/sections/AboutMe"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "500px" }} aria-hidden />,
});
const Contact = dynamic(() => import("@/sections/Contact"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} aria-hidden />,
});
const Footer = dynamic(() => import("@/sections/Footer"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "200px" }} aria-hidden />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Background decorative orbs — hidden on mobile via CSS (.hero-bg-orb) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hero-bg-orb">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-sky-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[120px]" />
      </div>

      <Hero />
      <AboutMe />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
