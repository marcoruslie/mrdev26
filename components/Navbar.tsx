"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/* Drop your CV file in /public (e.g. public/resume.pdf) — update if renamed. */
const RESUME_URL = "/resume.pdf";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();

  /* Scroll-spy — highlights the link of the section at the viewport center. */
  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close the mobile menu if the viewport grows to desktop width. */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-16 py-5"
      style={{
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(3,7,18,0.7)",
      }}
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{ scaleX: scrollYProgress, background: "var(--accent)" }}
      />

      {/* Logo */}
      <Link
        href="/"
        className="font-mono text-[1.1rem] text-accent tracking-widest cursor-none"
      >
        MR<span className="text-muted">.dev</span>
      </Link>

      {/* Right cluster */}
      <div className="flex items-center gap-8">
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-tech text-xs uppercase tracking-widest cursor-none relative group transition-colors"
                  style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = isActive
                      ? "var(--accent)"
                      : "var(--muted)";
                  }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px bg-accent transition-transform origin-left duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CV button */}
        <a
          href={RESUME_URL}
          download
          className="hidden md:inline-block cursor-none font-mono text-[0.65rem] font-bold uppercase tracking-widest text-accent px-4 py-2.5 border border-accent clip-corner-sm transition-all hover:bg-accent/10"
        >
          Download CV ↗
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden cursor-none relative w-9 h-9 flex items-center justify-center"
        >
          <motion.span
            className="absolute w-5 h-[1.5px]"
            style={{ background: "var(--accent)" }}
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px]"
            style={{ background: "var(--accent)" }}
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col px-6 py-6"
            style={{
              background: "rgba(3,7,18,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {links.map((link, i) => {
              const isActive = active === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="cursor-none flex items-center gap-3 py-3 font-tech text-sm uppercase tracking-widest"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  <span
                    className="text-[0.7rem]"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--accent2)",
                    }}
                  >
                    0{i + 1}
                  </span>
                  {link.label}
                  {isActive && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </motion.a>
              );
            })}

            <motion.a
              href={RESUME_URL}
              download
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + links.length * 0.06 }}
              className="cursor-none mt-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-bg px-6 py-3.5 clip-corner-sm"
              style={{ background: "var(--accent)" }}
            >
              Download CV ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
