import type { Metadata } from "next";
import { Syne, Space_Mono, Share_Tech_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  weight: "400",
});

/* Set NEXT_PUBLIC_SITE_URL in your Vercel/host env to your real domain so
   OpenGraph/Twitter preview images resolve to absolute URLs. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marco-ruslie.vercel.app";

const title = "Marco Ruslie — Website & Mobile Developer";
const description =
  "Portfolio of Marco Ruslie — Full-Stack Web & Mobile Developer specializing in Next.js, Flutter, and Motion animations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Next.js", "Flutter", "React Native", "Laravel", "Nuxt", "Developer", "Portfolio"],
  authors: [{ name: "Marco Ruslie" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Marco Ruslie",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${spaceMono.variable} ${shareTechMono.variable} bg-bg text-slate-200 font-syne overflow-x-hidden`}
      >
        {/* Without JS, scroll-reveal sections (opacity:0 until in view) would
            stay invisible — force them visible as a fallback. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
