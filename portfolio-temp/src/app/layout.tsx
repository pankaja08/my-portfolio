import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

// Self-hosted via next/font — zero render-blocking, no extra network round trip
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: "Pankaja Yunidu — Data Science & Full-Stack Developer Portfolio",
  description:
    "Personal portfolio of Pankaja Yunidu — Data Science student specializing in Machine Learning, AI, and full-stack development with React, Java Spring Boot, and Python.",
  keywords: [
    "Pankaja Yunidu",
    "Data Science Portfolio",
    "Machine Learning",
    "Full-Stack Developer",
    "React",
    "Java Spring Boot",
    "Python",
    "AI Engineer",
    "Sri Lanka",
  ],
  authors: [{ name: "Pankaja Yunidu", url: "https://github.com/pankaja08" }],
  openGraph: {
    title: "Pankaja Yunidu — Data Science & Full-Stack Developer",
    description: "Building intelligent systems at the intersection of data science and full-stack engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${inter.variable}`}>
      <body className="antialiased">
        {/* Full-screen "Generating…" loader on every page load/reload */}
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
