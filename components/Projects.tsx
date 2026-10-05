"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { SectionLabel, SectionTitle, RevealSection } from "./ui";
import { COMPANIES } from "./facts";

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
const PROJECT_HELPDESK_TECH_DIR = "/projects/helpdesk-technician-dashboard";
const PROJECT_DIGITAL_SIGNAGE_DIR = "/projects/digital-signage-system";
const PROJECT_POS_SYSTEM_DIR = "/projects/pos-system";
const PROJECT_ISLAMIC_FASHION_DIR = "/projects/islamic-fashion-ecommerce";
const PROJECT_WAREHOUSE_INVENTORY_DIR = "/projects/warehouse-inventory-api";
const PROJECT_HELPDESK_OPS_DIR = "/projects/helpdesk-operations-app";
const PROJECT_PRODUCTION_OPS_DIR = "/projects/production-operation-app";
const PROJECT_EXEC_ANALYTICS_DIR = "/projects/executive-analytics";

const projects: Project[] = [
  {
    id: "islamic-fashion-ecommerce",
    title: "Islamic Clothing E-Commerce & Production Management System",
    category: "Manufacturing",
    year: "2026",
    description:
      "Full-stack platform for a small Muslim-clothing manufacturer that joins a customer-facing storefront to an internal production floor — replacing guesswork-based production planning with a Fuzzy Mamdani inference engine that recommends how many units to make each cycle.",
    tech: [
      "Laravel 11",
      "PHP 8.2",
      "MySQL",
      "Blade + jQuery DataTables",
      "Tailwind CSS (CDN)",
    ],
    features: [
      "Fuzzy Mamdani engine recommending production quantity",
      "Storefront with cart, checkout & order tracking",
      "Production batches with bill-of-materials & HPP costing",
      "Role-based access for admin, staff & buyers",
      "Sales, production & inventory reports with export",
    ],
    impact:
      "Replaced intuition-based production planning with a defensible number — the Fuzzy Mamdani engine turns 12 months of sales history into a recommended unit count and shows every step, so the owner sees why, not just what. Paired with a per-product bill of materials, material needs and HPP fall out of that recommendation automatically.",
    glyph: "🧵",
    images: [`${PROJECT_ISLAMIC_FASHION_DIR}/01-storefront-landing.webp`,
              `${PROJECT_ISLAMIC_FASHION_DIR}/02-shop-catalog.webp`,
              `${PROJECT_ISLAMIC_FASHION_DIR}/03-admin-dashboard.webp`,
              `${PROJECT_ISLAMIC_FASHION_DIR}/04-fuzzy-mamdani-recommendation.webp`,
              `${PROJECT_ISLAMIC_FASHION_DIR}/05-admin-products.webp`,
              `${PROJECT_ISLAMIC_FASHION_DIR}/06-product-detail.webp`],
  },
  {
    // TODO: swap in the real project name and details. The images are
    // illustrative mockups — replace them with real screenshots.
    id: "warehouse-inventory-api",
    title: "Warehouse Inventory & Stock Movement System",
    category: "Inventory",
    year: "2026",
    description:
      "Backend-first inventory platform built on Java and Spring Boot that tracks every item across multiple warehouses — receiving, transfers, picking, and stock opname all run through one REST API, so the stock figure on screen is always derived from recorded movements rather than typed in by hand.",
    tech: [
      "Java 21",
      "Spring Boot 3",
      "Spring Security + JWT",
      "Spring Data JPA",
      "PostgreSQL",
      "Flyway",
      "Docker",
    ],
    features: [
      "Multi-warehouse stock with bin / rack locations",
      "Goods receipt, transfer & issue as ledger movements",
      "Stock opname with variance adjustment & approval",
      "Low-stock alerts based on per-item reorder points",
      "Role-based access for admin, warehouse staff & auditor",
    ],
    impact:
      "Replaced spreadsheet stock counts with a movement ledger — every quantity change is a transaction with who, when, and why, so a stock discrepancy can be traced back to the exact receipt or transfer that caused it. Transactional service methods keep transfers atomic, so stock can't disappear between two warehouses mid-update.",
    glyph: "☕",
    images: [`${PROJECT_WAREHOUSE_INVENTORY_DIR}/01-dashboard.webp`,
              `${PROJECT_WAREHOUSE_INVENTORY_DIR}/02-stock-ledger.webp`,
              `${PROJECT_WAREHOUSE_INVENTORY_DIR}/03-stock-opname.webp`,
              `${PROJECT_WAREHOUSE_INVENTORY_DIR}/04-api-docs.webp`],
  },
  {
    id: "digital-signage-system",
    title: "Smart Signage CMS & CCTV Platform",
    category: "Custom Workflow",
    year: "2026",
    description:
      "Digital signage platform that turns any mini-PC into a managed screen — a dark-glass dashboard drives playlists, schedules, and live Hikvision CCTV walls across every display, with an installable kiosk player that pairs itself to the CMS in one code.",
    tech: [
      "NestJS",
      "Prisma + PostgreSQL",
      "Redis",
      "Next.js 15",
      "Electron",
      "MediaMTX (WebRTC/HLS)",
    ],
    features: [
      "Kiosk player app with 6-digit pairing & auto-registration",
      "Live RTSP cameras re-streamed to WebRTC with HLS fallback",
      "Passive/Active display modes with idle fallback to content",
      "Heartbeat monitoring showing online/offline per screen",
      "JWT auth with RBAC for admin, operator & viewer roles",
    ],
    impact:
      "Removed the manual trip to every screen — a technician installs the player once, types a pairing code, and the display is managed from the dashboard forever after, surviving reboots on its own. Heartbeats surface a dead screen in about 90 seconds instead of whenever someone walks past it, and RTSP cameras reach the wall as low-latency WebRTC without exposing the camera network.",
    glyph: "📺",
    images: [`${PROJECT_DIGITAL_SIGNAGE_DIR}/01-login.webp`,
              `${PROJECT_DIGITAL_SIGNAGE_DIR}/02-dashboard.webp`,
              `${PROJECT_DIGITAL_SIGNAGE_DIR}/03-displays.webp`,
              `${PROJECT_DIGITAL_SIGNAGE_DIR}/04-playlists.webp`,
              `${PROJECT_DIGITAL_SIGNAGE_DIR}/05-cctv-cameras.webp`],
  },
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
    images: [`${PROJECT_HELPDESK_TECH_DIR}/helpdesk1.webp`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk2.webp`, 
              `${PROJECT_HELPDESK_TECH_DIR}/helpdesk3.webp`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk4.webp`,
              `${PROJECT_HELPDESK_TECH_DIR}/helpdesk5.webp`, `${PROJECT_HELPDESK_TECH_DIR}/helpdesk6.webp`],
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
    // Illustrative mockups — replace with real screenshots when available.
    images: [`${PROJECT_HELPDESK_OPS_DIR}/hd-01-tasks.webp`,
              `${PROJECT_HELPDESK_OPS_DIR}/hd-02-report.webp`],
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
    images: [`${PROJECT_PRODUCTION_SUPPORT_DIR}/prod1.webp`, `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod2.webp`,
              `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod3.webp`, `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod4.webp`,
              `${PROJECT_PRODUCTION_SUPPORT_DIR}/prod5.webp`],
    
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
    // Illustrative mockups — replace with real screenshots when available.
    images: [`${PROJECT_PRODUCTION_OPS_DIR}/po-01-input.webp`,
              `${PROJECT_PRODUCTION_OPS_DIR}/po-02-stock.webp`],
  },
  {
    id: "restaurant-pos",
    title: "Restaurant POS & Management System",
    category: "POS",
    year: "2026",
    description:
      "Full-stack restaurant operations platform that unifies point-of-sale, QR self-ordering, inventory, and financial reporting — replacing manual order slips and spreadsheet stock tracking with a single real-time system.",
    tech: ["Laravel 11", "PHP 8.2", "MySQL", "Blade + Vanilla JS"],
    features: [
      "Point-of-sale with real-time cart, table selection & auto tax",
      "QR-code self-ordering for customers (no waiter needed)",
      "Recipe-based inventory auto-deduction on every order",
      "Multi-floor drag-and-drop table layout & reservations",
      "Financial reports with HPP (COGS) and profit margin analytics",
    ],
    impact:
      "Eliminated handwritten order slips and manual stock counts — every sale auto-deducts ingredients through the recipe table, so stock and cost of goods stay accurate with no extra data entry, giving owners true profit margin per item. QR self-ordering removes the waiter step entirely, cutting order errors and staffing needs.",
    glyph: "🧾",
    images: [`${PROJECT_POS_SYSTEM_DIR}/1-dashboard.webp`, `${PROJECT_POS_SYSTEM_DIR}/2-pos-order.webp`,
              `${PROJECT_POS_SYSTEM_DIR}/3-tables-floor.webp`, `${PROJECT_POS_SYSTEM_DIR}/4-reports.webp`,
              `${PROJECT_POS_SYSTEM_DIR}/5-qr-customer.webp`],
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
    // Illustrative mockups — replace with real screenshots when available.
    images: [`${PROJECT_EXEC_ANALYTICS_DIR}/ea-01-overview.webp`,
              `${PROJECT_EXEC_ANALYTICS_DIR}/ea-02-production.webp`,
              `${PROJECT_EXEC_ANALYTICS_DIR}/ea-03-reports.webp`],
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

/* Derived from the array above so the numbers can never drift from the
   work actually listed on the page. */
const techCount = new Set(projects.flatMap((p) => p.tech)).size;

const stats = [
  { num: projects.length, suffix: "", label: "Systems Built" },
  { num: techCount, suffix: "", label: "Technologies Shipped" },
  { num: COMPANIES, suffix: "", label: "Companies Served" },
  { num: 100, suffix: "%", label: "Built & Owned Solo" },
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

/* Scroll-linked 3D tilt. Cards swing in from a tilted, pushed-back pose
   as they enter the viewport, lie flat while in focus, then tip away as
   they leave. Columns tilt in opposite directions for a fanned feel. */
function Scroll3D({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const dir = index % 2 === 0 ? 1 : -1;

  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start end", "start 0.45"],
  });
  const { scrollYProgress: leave } = useScroll({
    target: ref,
    offset: ["end 0.35", "end start"],
  });
  const e = useSpring(enter, { stiffness: 120, damping: 24, mass: 0.4 });
  const l = useSpring(leave, { stiffness: 120, damping: 24, mass: 0.4 });

  const rotateX = useTransform([e, l], ([a, b]: number[]) => (1 - a) * 32 - b * 16);
  const rotateY = useTransform([e, l], ([a, b]: number[]) => dir * ((1 - a) * -14 + b * 8));
  const z = useTransform([e, l], ([a, b]: number[]) => (1 - a) * -260 - b * 140);
  const opacity = useTransform([e, l], ([a, b]: number[]) => (0.15 + a * 0.85) * (1 - b * 0.6));
  /* Light sweep across the card while it is still tilted. */
  const glare = useTransform(e, [0, 0.6, 1], [0.35, 0.12, 0]);
  const glareX = useTransform(e, [0, 1], ["-40%", "140%"]);

  if (reduce) return <div className="h-full">{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="relative h-full"
      style={{
        rotateX,
        rotateY,
        z,
        opacity,
        transformPerspective: 1200,
        transformOrigin: dir === 1 ? "30% 100%" : "70% 100%",
        willChange: "transform",
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 clip-corner-lg overflow-hidden"
        style={{ opacity: glare }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            left: glareX,
            background:
              "linear-gradient(105deg, transparent, rgba(0,255,229,0.35), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  onOpen,
  onZoom,
}: {
  project: Project;
  index: number;
  inView: boolean;
  onOpen: (p: Project) => void;
  onZoom: (p: Project, index: number) => void;
}) {
  const color = categoryColor[project.category];
  const photoCount = project.images?.length ?? 0;
  const cover = project.images?.[0];

  return (
    <motion.div
      layout
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      className="h-full"
    >
      <Scroll3D index={index}>
        <motion.article
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
          className="clip-corner-lg group relative flex flex-col h-full cursor-none"
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

          {/* THUMBNAIL — clicking a real screenshot opens it full size */}
          <div
            className="group/thumb relative aspect-[16/10] overflow-hidden"
            style={{ borderBottom: "1px solid var(--border)" }}
            {...(cover && {
              role: "button",
              tabIndex: 0,
              "aria-label": `View ${project.title} screenshots full size`,
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                onZoom(project, 0);
              },
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onZoom(project, 0);
                }
              },
            })}
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

            {/* Hover overlay — the image zooms, the rest of the card opens details */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-[rgba(3,7,18,0.6)]">
              <span
                className="font-tech text-[0.7rem] uppercase tracking-[0.2em] px-5 py-2.5 clip-corner-sm"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                {cover ? "⤢ View Full Image" : "View Project ↗"}
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
      </Scroll3D>
    </motion.div>
  );
}

/* Full-size image viewer. Opens with a 3D flip-in, slides between photos,
   and clicking the image toggles between fit-to-screen and the photo's
   real pixel size (scroll to pan). Controlled so the detail modal and the
   card thumbnail can both drive it. */
function Lightbox({
  images,
  title,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  title: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const count = images.length;
  const [zoomed, setZoomed] = useState(false);
  const [dir, setDir] = useState(1);

  const go = (step: number) => {
    setDir(step);
    setZoomed(false);
    onIndex((index + step + count) % count);
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        if (zoomed) setZoomed(false);
        else onClose();
      }
      if (count > 1 && e.key === "ArrowLeft") go(-1);
      if (count > 1 && e.key === "ArrowRight") go(1);
    };
    /* Capture phase so the detail modal underneath never sees these keys. */
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  const navBtn =
    "cursor-none absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-xl text-slate-200 transition-all hover:text-accent";
  const chrome = {
    background: "rgba(3,7,18,0.85)",
    border: "1px solid var(--border)",
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9500]"
      style={{
        background: "rgba(2,5,12,0.96)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        perspective: 1600,
      }}
    >
      <motion.div
        initial={{ rotateX: 40, scale: 0.7, y: 80, opacity: 0, filter: "blur(12px)" }}
        animate={{ rotateX: 0, scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ rotateX: -30, scale: 0.8, y: -60, opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 ${
          zoomed ? "overflow-auto" : "flex items-center justify-center p-4 md:p-10"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 120, rotateY: d * -35, opacity: 0 }),
              center: { x: 0, rotateY: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -120, rotateY: d * 35, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className={zoomed ? "w-max mx-auto" : "flex items-center justify-center"}
            style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
          >
            <Image
              src={images[index]}
              alt={`${title} — screenshot ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              priority
              draggable={false}
              className="select-none"
              style={
                zoomed
                  ? { width: "auto", height: "auto", maxWidth: "none" }
                  : {
                      width: "auto",
                      height: "auto",
                      maxWidth: "min(1600px, 94vw)",
                      maxHeight: "86vh",
                      boxShadow: "0 0 60px rgba(0,255,229,0.15)",
                      border: "1px solid var(--border)",
                    }
              }
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Top bar */}
      <div
        className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-4 pointer-events-none"
      >
        <span
          className="font-tech text-[0.62rem] uppercase tracking-[0.15em] px-3 py-1.5 text-slate-300 truncate"
          style={chrome}
        >
          {title}
          {count > 1 && (
            <span className="text-accent">
              {"  "}
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          )}
        </span>
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className="cursor-none h-10 px-3 font-tech text-[0.6rem] uppercase tracking-[0.15em] text-slate-200 transition-all hover:text-accent"
            style={chrome}
          >
            {zoomed ? "⤡ Fit" : "⤢ Actual Size"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close image"
            className="cursor-none w-10 h-10 flex items-center justify-center text-slate-200 transition-all hover:text-accent"
            style={chrome}
          >
            ✕
          </button>
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
            className={`${navBtn} left-5`}
            style={chrome}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
            className={`${navBtn} right-5`}
            style={chrome}
          >
            ›
          </button>
        </>
      )}

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 font-tech text-[0.58rem] uppercase tracking-[0.2em] text-muted pointer-events-none whitespace-nowrap">
        // click image to {zoomed ? "fit screen" : "view actual size"} · esc to close
      </span>
    </motion.div>,
    document.body
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

  /* Keyboard: Esc closes the modal, arrows move between photos.
     While the lightbox is open it owns the keyboard. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (fullscreen) return;
      if (e.key === "Escape") onClose();
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
          <Lightbox
            images={images}
            title={project.title}
            index={active}
            onIndex={setActive}
            onClose={() => setFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [zoom, setZoom] = useState<{ project: Project; index: number } | null>(
    null
  );
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  /* Header rises out of the floor in 3D as the section scrolls in. */
  const headerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: headerIn } = useScroll({
    target: headerRef,
    offset: ["start end", "start 0.3"],
  });
  const headerRotate = useTransform(headerIn, [0, 1], [55, 0]);
  const headerZ = useTransform(headerIn, [0, 1], [-300, 0]);
  const headerOpacity = useTransform(headerIn, [0, 0.6], [0, 1]);

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
        <motion.div
          ref={headerRef}
          style={
            reduce
              ? undefined
              : {
                  rotateX: headerRotate,
                  z: headerZ,
                  opacity: headerOpacity,
                  transformPerspective: 1000,
                  transformOrigin: "50% 100%",
                }
          }
        >
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
        </motion.div>

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
                onZoom={(project, index) => setZoom({ project, index })}
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

      {/* FULL-SIZE IMAGE (opened straight from a card) */}
      <AnimatePresence>
        {zoom && (
          <Lightbox
            key={zoom.project.id}
            images={zoom.project.images ?? []}
            title={zoom.project.title}
            index={zoom.index}
            onIndex={(index) => setZoom((z) => z && { ...z, index })}
            onClose={() => setZoom(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
