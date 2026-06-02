"use client";
import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>


        {/* Social Links */}
        <ul className="footer-social-wrapper mt-4 mb-4">
          <li className="icon-content">
            <a
              href="https://github.com/pankaja08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-social="github"
            >
              <div className="filled"></div>
              <GithubIcon size={20} />
            </a>
            <div className="tooltip">GitHub</div>
          </li>
          <li className="icon-content">
            <a
              href="https://www.linkedin.com/in/pankaja-yunidu-737676326/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-social="linkedin"
            >
              <div className="filled"></div>
              <LinkedinIcon size={20} />
            </a>
            <div className="tooltip">LinkedIn</div>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-xs text-slate-600 flex items-center gap-1.5">
          © {year} Pankaja Yunidu. Built with{" "}
          <Heart size={12} className="text-rose-500 fill-rose-500" /> and Next.js
        </p>
      </div>
    </footer>
  );
}
