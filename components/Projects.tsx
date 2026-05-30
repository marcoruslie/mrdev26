"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { SectionLabel, SectionTitle, RevealSection } from "./ui";

/* ------------------------------------------------------------------ *
 *  PROJECT DATA — edit this array to showcase your real work.         *
 *                                                                    *
 *  • category  → must match one of the FILTERS below.                 *
 *  • images    → optional list of screenshots. Drop the files in      *
 *                /public/projects and list every path here, e.g.     *
 *                                                                    *
 *                  images: [                                         *
 *                    "/projects/dashboard-1.png",                    *
 *                    "/projects/dashboard-2.png",                    *
 *                    "/projects/dashboard-3.png",                    *
 *                  ],                                                *
 *                                                                    *
 *                The first image is the card cover. Clicking the      *
 *                card opens a gallery where ALL listed photos can     *
 *                be viewed. Omit `images` to use the placeholder.     *
 *  • liveUrl   → optional. Omit for internal / private systems.       *
 *                                                                    *
 *  The sample entries below are realistic placeholders — swap in      *
 *  your own titles, descriptions, features and impact statements.     *
 * ------------------------------------------------------------------ */

type Category =
  | "Business System"
  | "Inventory"
  | "POS"
  | "Dashboard"
  | "Manufacturing"
  | "Custom Workflow";

type Project = {
  id: string;
  title: string;
  category: Category;
  year: string;
  description: string;
  tech: string[];
  features: string[];
  impact: string;
  glyph: string;
  images?: string[];
  liveUrl?: string;
};
const PROJECT_PRODUCTION_SUPPORT_DIR = "/projects/production-support-dashboard";
const PROJECT_DIGITAL_SIGNAGE_DIR = "/projects/digital-signage-system";
const PROJECT_HELPDESK_TECH_DIR = "/projects/helpdesk-technician-dashboard";

const projects: Project[] = [
  {
    id: "helpdesk-technician-dashboard",
    title: "Helpdesk Technician Dashboard",
    category: "Dashboard",
    year: "2025",
    description:
      "Streamlined helpdesk system for managing and tracking technician requests, assignments, and resolutions across multiple support channels.",
    tech: ["Laravel", "MySQL", "REST API", "Tailwind", "Alpine.js"],
    features: [
      "Live line-status & output tracking",
      "Downtime & defect analytics",
      "Role-based supervisor access",
    ],
    impact:
      "Cut reporting lag from end-of-shift to real time, helping supervisors react to slowdowns within minutes instead of hours.",
    glyph: "🏭",
    images: [`${PROJECT_HELPDESK_TECH_DIR}/helpdesk1.png`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk2.png`, 
              `${PROJECT_HELPDESK_TECH_DIR}/helpdesk3.png`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk4.png`,
              `${PROJECT_HELPDESK_TECH_DIR}/helpdesk5.png`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk6.png`],
  },
  {
    id: "helpdesk-operations-app",
    title: "Helpdesk Operations App",
    category: "Business System",
    year: "2025",
    description:
      "Cross-platform mobile app for field teams to manage on-site tasks, capture data, and report activity away from the office.",
    tech: ["React Native", "Laravel API", "MySQL", "REST API"],
    features: [
      "Offline-friendly data capture",
      "Field task & visit logging",
      "Synced reporting to head office",
    ],
    impact:
      "Replaced spreadsheets and phone calls with a single app, giving head office same-day visibility into field technician activity.",
    glyph: "📱",
  },
  {
    id: "production-support-dashboard",
    title: "Production Support Dashboard",
    category: "Dashboard",
    year: "2024",
    description:
      "Internal web platform that digitalized the production packaging flow, replacing paper-based HR tracking with a structured digital process.",
    tech: ["Laravel", "Vue", "MySQL", "Tailwind"],
    features: [
      "Step-by-step packaging workflow",
      "Digital sign-off & audit trail",
      "Automated tracking reports",
    ],
    impact:
      "Eliminated manual paperwork across production lines and improved tracking accuracy for every packaging batch.",
    glyph: "📦",
    images: [`${PROJECT_PRODUCTION_SUPPORT_DIR}/prod1.png`, `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod2.png`,
              `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod3.png`, `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod4.png`,
              `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod5.png`],
    
  },
  {
    id: "production-operation-app",
    title: "Production Operation App",
    category: "Business System",
    year: "2024",
    description:
      "Mobile app for field teams to manage on-site tasks, capture data of each machine input and output. The app is designed to work offline and sync data to the head office when connectivity is available.",
    tech: ["Flutter", "Laravel API", "MySQL", "OneSignal", "REST API"],
    features: [
      "Real-time stock & movement tracking",
      "Offline data capture with auto-sync",
      "Recording machine input and output",
    ],
    impact:
      "Reduced stockouts and manual counting effort by giving the team accurate, always-current inventory data.",
    glyph: "🗃️",
  },
  {
    id: "retail-pos",
    title: "Retail POS System",
    category: "POS",
    year: "2024",
    description:
      "Point-of-sale system handling transactions, receipt printing, and daily sales summaries for retail counter staff.",
    tech: ["Laravel", "Vue", "MySQL", "Tailwind"],
    features: [
      "Fast checkout & receipt printing",
      "Daily sales & cash reports",
      "Product & pricing management",
    ],
    impact:
      "Sped up checkout and gave owners reliable daily sales figures without manual tallying.",
    glyph: "🧾",
  },
  {
    id: "executive-analytics",
    title: "Executive Analytics Dashboard",
    category: "Dashboard",
    year: "2025",
    description:
      "Centralized analytics dashboard consolidating operational data into clear KPIs and charts for management decision-making.",
    tech: ["Next.js", "Laravel", "MySQL", "Chart.js", "Tailwind"],
    features: [
      "Consolidated KPI overview",
      "Interactive charts & filters",
      "Exportable management reports",
    ],
    impact:
      "Turned scattered reports into one live view, cutting the time managers spend gathering numbers each week.",
    glyph: "📊",
  },
];

/* Each category gets a signature accent used for its badge + preview tint. */
const categoryColor: Record<Category, string> = {
  "Business System": "#00ffe5",
  Inventory: "#34d399",
  POS: "#fbbf24",
  Dashboard: "#60a5fa",
  Manufacturing: "#fb7185",
  "Custom Workflow": "#a78bfa",
};

const FILTERS = [
  "All",
  "Business System",
  "Inventory",
  "POS",
  "Dashboard",
  "Manufacturing",
  "Custom Workflow",
] as const;

type Filter = (typeof FILTERS)[number];

const stats = [
  { num: projects.length, suffix: "+", label: "Projects Built" },
  { num: 2, suffix: "+", label: "Years of Experience" },
  { num: 12, suffix: "+", label: "Technologies Used" },
  { num: 4, suffix: "", label: "Industries Served" },
];

/* Animated count-up — mirrors the Counter pattern used in About.tsx. */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* Styled preview shown whenever a project has no screenshots yet. */
function PreviewPlaceholder({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const color = categoryColor[project.category];
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        background: `radial-gradient(circle at 50% 38%, ${color}26, transparent 70%), var(--surface)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${color}14 1px, transparent 1px), linear-gradient(90deg, ${color}14 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <span
        className={`relative transition-transform duration-500 ${
          large ? "text-7xl" : "text-5xl"
        }`}
      >
        {project.glyph}
      </span>
      <span
        className="relative font-tech text-[0.62rem] uppercase tracking-[0.28em]"
        style={{ color }}
      >
        {project.category}
      </span>
      <span className="absolute bottom-3 left-3 font-tech text-[0.55rem] text-muted tracking-[0.15em]">
        // no preview added
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  onOpen,
}: {
  project: Project;
  index: number;
  inView: boolean;
  onOpen: (p: Project) => void;
}) {
  const color = categoryColor[project.category];
  const photoCount = project.images?.length ?? 0;
  const cover = project.images?.[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      className="clip-corner-lg group relative flex flex-col cursor-none"
      style={{
        background: "rgba(10,15,30,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--accent)";
        el.style.boxShadow = "var(--glow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent line — reveals on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"
        style={{ background: "var(--accent)" }}
      />

      {/* THUMBNAIL */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PreviewPlaceholder project={project} />
        )}

        {/* Hover overlay — signals the card is clickable */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[rgba(3,7,18,0.6)]">
          <span
            className="font-tech text-[0.7rem] uppercase tracking-[0.2em] px-5 py-2.5 clip-corner-sm"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            View Project ↗
          </span>
        </div>

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 z-10 font-tech text-[0.58rem] uppercase tracking-[0.15em] px-2.5 py-1 clip-corner-sm"
          style={{
            background: `${color}1f`,
            border: `1px solid ${color}66`,
            color,
            backdropFilter: "blur(4px)",
          }}
        >
          {project.category}
        </span>

        {/* Year */}
        <span
          className="absolute top-3 right-3 z-10 font-tech text-[0.58rem] uppercase tracking-[0.15em] px-2.5 py-1"
          style={{
            background: "rgba(3,7,18,0.7)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.year}
        </span>

        {/* Photo count */}
        {photoCount > 0 && (
          <span
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 font-tech text-[0.58rem] uppercase tracking-[0.12em] px-2.5 py-1"
            style={{
              background: "rgba(3,7,18,0.8)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              backdropFilter: "blur(4px)",
            }}
          >
            ❏ {photoCount} {photoCount === 1 ? "photo" : "photos"}
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <h3 className="text-[1.15rem] font-extrabold text-slate-200 leading-tight mb-2 transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="text-[0.85rem] text-muted leading-[1.7]">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="h-px" style={{ background: "var(--border)" }} />

        {/* Key features */}
        <div>
          <div className="font-tech text-[0.6rem] uppercase tracking-[0.2em] text-muted mb-2">
            Key Features
          </div>
          <ul className="flex flex-col gap-1.5">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex gap-2 text-[0.8rem] text-slate-300 leading-snug"
              >
                <span style={{ color }}>▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business impact */}
        <div
          className="clip-corner-sm p-3"
          style={{ background: `${color}0d`, border: `1px solid ${color}33` }}
        >
          <div
            className="font-tech text-[0.55rem] uppercase tracking-[0.2em] mb-1"
            style={{ color }}
          >
            Business Impact
          </div>
          <p className="text-[0.78rem] text-slate-300 leading-[1.6]">
            {project.impact}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-tech text-[0.65rem] uppercase tracking-[0.15em] text-accent">
            View Details
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cursor-none font-mono text-[0.6rem] font-bold uppercase tracking-widest px-3 py-2 clip-corner-sm transition-all hover:bg-accent/10"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* Full-screen detail view with a multi-image gallery. */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const color = categoryColor[project.category];
  const images = project.images ?? [];
  const imageCount = images.length;
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const prev = () => setActive((i) => (i - 1 + imageCount) % imageCount);
  const next = () => setActive((i) => (i + 1) % imageCount);

  /* Lock background scroll while the modal is open. */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Keyboard: Esc closes the lightbox first (then the modal),
     arrows move between photos. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else onClose();
      }
      if (imageCount > 1) {
        if (e.key === "ArrowLeft") setActive((i) => (i - 1 + imageCount) % imageCount);
        if (e.key === "ArrowRight") setActive((i) => (i + 1) % imageCount);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageCount, onClose, fullscreen]);

  /* Rendered through a portal to document.body so it escapes the
     section's `relative z-10` stacking context — otherwise the fixed
     navbar (z-1000) would paint over the top of the modal. */
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9000] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      style={{
        background: "rgba(2,5,12,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="clip-corner-lg relative w-full max-w-5xl my-auto"
        style={{
          background: "#070c18",
          border: "1px solid var(--border)",
          boxShadow: "var(--glow)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between gap-4 px-6 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="font-tech text-[0.58rem] uppercase tracking-[0.15em] px-2.5 py-1 clip-corner-sm flex-shrink-0"
              style={{
                background: `${color}1f`,
                border: `1px solid ${color}66`,
                color,
              }}
            >
              {project.category}
            </span>
            <span className="font-tech text-[0.62rem] uppercase tracking-[0.15em] text-muted">
              {project.year}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-none flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted transition-all hover:text-accent"
            style={{ border: "1px solid var(--border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            ✕
          </button>
        </div>

        {/* GALLERY */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(300px, 58vh, 600px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {imageCount > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 cursor-none"
                  onClick={() => setFullscreen(true)}
                >
                  <Image
                    src={images[active]}
                    alt={`${project.title} — screenshot ${active + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                    style={{ background: "var(--surface)" }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Expand to fullscreen */}
              <button
                onClick={() => setFullscreen(true)}
                aria-label="View fullscreen"
                className="cursor-none absolute top-3 left-3 flex items-center gap-1.5 font-tech text-[0.6rem] uppercase tracking-[0.15em] px-2.5 py-1.5 text-slate-200 transition-all hover:text-accent"
                style={{
                  background: "rgba(3,7,18,0.8)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                }}
              >
                ⤢ Fullscreen
              </button>

              {imageCount > 1 && (
                <>
                  {/* Prev / Next */}
                  <button
                    onClick={prev}
                    aria-label="Previous photo"
                    className="cursor-none absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-slate-200 transition-all hover:text-accent"
                    style={{
                      background: "rgba(3,7,18,0.8)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next photo"
                    className="cursor-none absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-slate-200 transition-all hover:text-accent"
                    style={{
                      background: "rgba(3,7,18,0.8)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    ›
                  </button>

                  {/* Counter */}
                  <span
                    className="absolute top-3 right-3 font-tech text-[0.6rem] uppercase tracking-[0.15em] px-2.5 py-1"
                    style={{
                      background: "rgba(3,7,18,0.8)",
                      border: "1px solid var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(imageCount).padStart(2, "0")}
                  </span>
                </>
              )}
            </>
          ) : (
            <PreviewPlaceholder project={project} large />
          )}
        </div>

        {/* Thumbnail strip */}
        {imageCount > 1 && (
          <div
            className="flex gap-2 px-6 py-3 overflow-x-auto"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}`}
                className="cursor-none relative flex-shrink-0 w-[72px] h-[48px] overflow-hidden transition-all"
                style={{
                  border:
                    i === active
                      ? "1px solid var(--accent)"
                      : "1px solid var(--border)",
                  boxShadow: i === active ? "var(--glow)" : "none",
                  opacity: i === active ? 1 : 0.55,
                }}
              >
                <Image
                  src={img}
                  alt={`${project.title} thumbnail ${i + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* DETAILS */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h3 className="text-[1.6rem] font-extrabold text-slate-200 leading-tight mb-3">
              {project.title}
            </h3>
            <p className="text-[0.92rem] text-muted leading-[1.8]">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <div className="font-tech text-[0.6rem] uppercase tracking-[0.2em] text-muted mb-2.5">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Key features */}
          <div>
            <div className="font-tech text-[0.6rem] uppercase tracking-[0.2em] text-muted mb-2.5">
              Key Features
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 text-[0.85rem] text-slate-300 leading-snug"
                >
                  <span style={{ color }}>▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business impact */}
          <div
            className="clip-corner-sm p-4"
            style={{ background: `${color}0d`, border: `1px solid ${color}33` }}
          >
            <div
              className="font-tech text-[0.58rem] uppercase tracking-[0.2em] mb-1.5"
              style={{ color }}
            >
              Problem Solved / Business Impact
            </div>
            <p className="text-[0.85rem] text-slate-300 leading-[1.7]">
              {project.impact}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none font-mono text-[0.7rem] font-bold uppercase tracking-widest text-bg px-7 py-3.5 clip-corner-sm transition-all hover:brightness-110"
                style={{ background: "var(--accent)" }}
              >
                Visit Live Demo ↗
              </a>
            ) : (
              <span className="flex items-center gap-2 font-tech text-[0.65rem] uppercase tracking-[0.15em] text-muted">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--muted)" }}
                />
                Internal System — no public demo
              </span>
            )}
            <button
              onClick={onClose}
              className="cursor-none font-mono text-[0.7rem] font-bold uppercase tracking-widest px-7 py-3.5 clip-corner-sm transition-all"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {fullscreen && imageCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(false);
            }}
            className="fixed inset-0 z-[9500] flex items-center justify-center p-4"
            style={{ background: "rgba(2,5,12,0.97)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative"
                style={{ width: "min(1600px, 95vw)", height: "90vh" }}
              >
                <Image
                  src={images[active]}
                  alt={`${project.title} — screenshot ${active + 1}`}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreen(false);
              }}
              aria-label="Exit fullscreen"
              className="cursor-none absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-slate-200 transition-all hover:text-accent"
              style={{
                background: "rgba(3,7,18,0.85)",
                border: "1px solid var(--border)",
              }}
            >
              ✕
            </button>

            {imageCount > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous photo"
                  className="cursor-none absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-xl text-slate-200 transition-all hover:text-accent"
                  style={{
                    background: "rgba(3,7,18,0.85)",
                    border: "1px solid var(--border)",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next photo"
                  className="cursor-none absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-xl text-slate-200 transition-all hover:text-accent"
                  style={{
                    background: "rgba(3,7,18,0.85)",
                    border: "1px solid var(--border)",
                  }}
                >
                  ›
                </button>
                <span
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 font-tech text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5"
                  style={{
                    background: "rgba(3,7,18,0.85)",
                    border: "1px solid var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(imageCount).padStart(2, "0")}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative z-10 px-6 md:px-16 py-24"
      style={{
        borderTop: "1px solid var(--border)",
        background:
          "linear-gradient(to bottom, rgba(10,15,30,0.5), transparent)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <RevealSection>
          <SectionLabel>Portfolio</SectionLabel>
          <SectionTitle>
            Projects That Solve{" "}
            <em
              className="not-italic"
              style={{
                WebkitTextStroke: "1px var(--accent2)",
                color: "transparent",
              }}
            >
              Real Business Problems
            </em>
          </SectionTitle>
          <p className="text-muted text-[1rem] leading-[1.8] max-w-2xl mb-14">
            A collection of systems and websites I&apos;ve built to improve
            workflow, efficiency, and business operations.
          </p>
        </RevealSection>

        {/* STATS */}
        <RevealSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {stats.map((s) => (
              <div
                key={s.label}
                className="clip-corner relative cursor-none transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "24px 20px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.boxShadow = "var(--glow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-0 right-0 w-4 h-4"
                  style={{
                    borderTop: "1px solid var(--accent)",
                    borderRight: "1px solid var(--accent)",
                  }}
                />
                <div
                  className="text-[2.2rem] font-extrabold leading-none mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-tech text-[0.65rem] text-muted uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* FILTER TABS */}
        <RevealSection delay={0.15}>
          <div className="flex flex-wrap gap-2.5 mb-6">
            {FILTERS.map((f) => {
              const active = filter === f;
              const count =
                f === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="cursor-none flex items-center gap-2 font-tech text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2.5 clip-corner-sm transition-all duration-300"
                  style={
                    active
                      ? {
                          background: "var(--accent)",
                          color: "var(--bg)",
                          border: "1px solid var(--accent)",
                          boxShadow: "var(--glow)",
                        }
                      : {
                          background: "var(--surface)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (active) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent)";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    if (active) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--muted)";
                  }}
                >
                  {f}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </RevealSection>

        {/* RESULT COUNT */}
        <div className="font-tech text-[0.65rem] text-muted uppercase tracking-widest mb-6">
          // showing {visible.length}{" "}
          {visible.length === 1 ? "project" : "projects"}
        </div>

        {/* PROJECT GRID */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                inView={inView}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
