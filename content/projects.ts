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

export type Category =
  | "Business System"
  | "Inventory"
  | "POS"
  | "Dashboard"
  | "Manufacturing"
  | "Custom Workflow"
  | "Website";

export type Project = {
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
const PROJECT_RUSLIE_SPRING_DIR = "/projects/ruslie-spring";
const PROJECT_MOVING_CHATBOT_DIR = "/projects/moving-quotation-chatbot";
const PROJECT_OURLITTLECART_DIR = "/projects/ourlittlecart";
const PROJECT_YUZAKA_CATALOG_DIR = "/projects/yuzaka-parts-catalog";
const PROJECT_JOHN_CORNER_DIR = "/projects/john-corner";

export const projects: Project[] = [
  {
    id: "ruslie-spring",
    title: "Ruslie Spring — Company Website & Back Office",
    category: "Business System",
    year: "2026",
    description:
      "Bilingual (Indonesian / English) company website and back office for Ruslie Spring, a custom spring manufacturer in Surabaya. The public side showcases products, a spring catalog, a spring & wire price calculator and an AI chat assistant; behind it, staff run customers, wire stock, transactions and the production queue from one admin panel.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Three Fiber",
      "Supabase",
      "Vercel AI SDK",
    ],
    features: [
      "Bilingual company profile with quote requests",
      "Spring catalog grouped by spring type",
      "Spring & wire calculator estimating weight and material cost (steel & stainless)",
      "AI chat assistant for product and pricing questions",
      "Back office: customers, employees, items, wire stock, warehouses & storage locations",
      "Transactions with a production queue and printable invoices",
    ],
    impact:
      "One codebase serves both sides of the business — the public site that brings in quote requests, and the back office that tracks the wire stock, transactions and production queue behind them.",
    glyph: "🌀",
    images: [`${PROJECT_RUSLIE_SPRING_DIR}/01-home.webp`,
              `${PROJECT_RUSLIE_SPRING_DIR}/02-catalog.webp`,
              `${PROJECT_RUSLIE_SPRING_DIR}/03-calculator.webp`],
    liveUrl: "https://www.rusliespring.com",
  },
  {
    id: "moving-quotation-chatbot",
    title: "AI Moving-Quotation Chatbot",
    category: "Custom Workflow",
    year: "2026",
    description:
      "Chat-first quoting for CV Jaya Harapan Semesta, a moving company in Surabaya. Customers describe their move in plain Indonesian (\"ada 2 lemari dan 1 kasur…\"), an AI assistant collects the shipment details through tool calls, and a deterministic pricing engine produces the quotation — then DEAL → bank transfer → proof upload → admin verification.",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "PostgreSQL",
      "Prisma 7",
      "OpenAI API (tool calling)",
      "Zod",
      "Vitest",
    ],
    features: [
      "Natural-language Indonesian chat — no form, no account",
      "AI tool calls fill a structured shipment summary as the customer talks",
      "Deterministic, unit-tested pricing engine driven by database config",
      "Payment-proof upload with admin verify / reject",
      "Admin panel with Admin / Staff roles",
      "Swappable LLM providers (OpenAI, DeepSeek, Kenari)",
    ],
    impact:
      "The AI never computes a price: quotes come only from the pricing engine, quotation cards render from the database, and a price guard replaces any AI reply that mentions an amount the backend didn't produce.",
    glyph: "🚚",
    images: [`${PROJECT_MOVING_CHATBOT_DIR}/01-landing.webp`,
              `${PROJECT_MOVING_CHATBOT_DIR}/02-chat.webp`],
  },
  {
    id: "ourlittlecart",
    title: "Our Little Cart — Jastip Pre-Order Shop",
    category: "Business System",
    year: "2026",
    description:
      "Personal-shopping (jastip) platform: while a trip's pre-order is open, customers request anything from that country, the owner quotes each item by hand with shipping included, and the customer accepts, pays by bank transfer or e-wallet and follows the order until it arrives.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "PostgreSQL (Supabase)",
      "Prisma 7",
      "Zod",
      "Recharts",
      "ExcelJS / jsPDF",
      "Vitest",
    ],
    features: [
      "Trip poster with live pre-order countdown",
      "Multi-item request form — no account needed",
      "Private order page: quote, accept, pay, track",
      "Paste a customer's DM order message and the form fills itself",
      "Owner dashboard with revenue, cost & profit charts",
      "Daily / weekly / monthly reports exported to Excel and PDF",
    ],
    impact:
      "Moves the whole order flow — quoting, payment, purchasing, shipping — out of Instagram DMs into one tracked system, while customers keep talking to the shop by DM.",
    glyph: "🛍️",
    images: [`${PROJECT_OURLITTLECART_DIR}/01-home.webp`,
              `${PROJECT_OURLITTLECART_DIR}/02-how-it-works.webp`],
    liveUrl: "https://ourlittlecart.site",
  },
  {
    id: "yuzaka-parts-catalog",
    title: "Yuzaka & Luminaire Parts Catalog",
    category: "Business System",
    year: "2026",
    description:
      "Searchable B2B car-parts catalog for Maju Mandiri Motor's Yuzaka & Luminaire lines — 2,210 parts across 85 categories and 14 car brands, searchable by part number (with or without dashes) or car model, with a staff CMS behind it.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Supabase (Postgres, Auth, Storage)",
      "Row-Level Security",
    ],
    features: [
      "Search by part number or car model",
      "Category pages listing parts by car brand, front and rear",
      "Staff CMS for groups, parts, photos and descriptions",
      "Owner-only account management",
      "Photo uploads resized to WebP in the browser",
      "Excel pricelist import with a dry-run review",
    ],
    impact:
      "Turned the supplier's Excel pricelist into a public catalog that staff keep up to date from the CMS — every change goes live immediately, and no prices are ever shown.",
    glyph: "🔩",
    images: [`${PROJECT_YUZAKA_CATALOG_DIR}/01-home.webp`,
              `${PROJECT_YUZAKA_CATALOG_DIR}/02-search.webp`,
              `${PROJECT_YUZAKA_CATALOG_DIR}/03-category.webp`],
    liveUrl: "https://www.yuzakacatalog.com",
  },
  {
    id: "john-corner",
    title: "John Corner — Company Profile & Menu",
    category: "Website",
    year: "2026",
    description:
      "Company profile and menu site for Rumah Roti John Surabaya (RJS) — 96 menu items in 16 categories with search and category filters, prices matched to the GrabFood listing, and a hand-built animation system.",
    tech: ["HTML", "CSS", "JavaScript", "Python"],
    features: [
      "Animated hero and scroll reveals (custom motion system)",
      "96-item menu in 16 categories with search",
      "Menu and prices kept in one JSON file",
      "Python build script regenerates the page from template + data",
      "Order buttons linking to GrabFood",
    ],
    impact:
      "A fast static site with no framework or server — updating the menu is one JSON edit and a rebuild.",
    glyph: "🥖",
    images: [`${PROJECT_JOHN_CORNER_DIR}/01-hero.webp`,
              `${PROJECT_JOHN_CORNER_DIR}/02-menu.webp`],
  },
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
