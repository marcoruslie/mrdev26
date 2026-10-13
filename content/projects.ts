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
  | "Custom Workflow";

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

export const projects: Project[] = [
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
