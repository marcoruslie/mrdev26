import type { Metadata } from "next";
import { Syne, Space_Mono, Share_Tech_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Marco Ruslie — Website & Mobile Developer",
  description:
    "Portfolio of Marco Ruslie — Full-Stack Web & Mobile Developer specializing in Next.js, Flutter, and Motion animations.",
  keywords: ["Next.js", "Flutter", "React Native", "Laravel", "Nuxt", "Developer", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${spaceMono.variable} ${shareTechMono.variable} bg-bg text-slate-200 font-syne overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
