import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {/* Full-screen "Generating…" loader on every page load/reload */}
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
