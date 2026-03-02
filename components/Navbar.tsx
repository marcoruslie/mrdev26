"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
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
      <Link
        href="/"
        className="font-mono text-[1.1rem] text-accent tracking-widest cursor-none"
      >
        MR<span className="text-muted">.dev</span>
      </Link>

      <ul className="hidden md:flex gap-9 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-tech text-xs text-muted uppercase tracking-widest cursor-none relative group transition-colors hover:text-accent"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
