import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#030712",
        surface: "#0a0f1e",
        accent: "#00ffe5",
        accent2: "#7c3aed",
        accent3: "#f59e0b",
        muted: "#64748b",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        tech: ["var(--font-share-tech-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
