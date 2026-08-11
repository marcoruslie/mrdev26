"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { SectionLabel, SectionTitle, RevealSection } from "./ui";
import { skills } from "./Skills";
import { YEARS, TECHNICIANS, SITES } from "./facts";

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

/* Each stat is something an interviewer could ask me to name. */
const stats = [
  { num: YEARS, suffix: "+", desc: "Years Sole Developer" },
  { num: TECHNICIANS, suffix: "", desc: "Daily Users" },
  { num: SITES, suffix: "", desc: "Manufacturing Sites" },
  { num: skills.length, suffix: "", desc: "Core Technologies" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 px-6 md:px-16 py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-center">

        {/* Left */}
        <RevealSection>
          <SectionLabel>About</SectionLabel>
          <SectionTitle>
            Code is my{" "}
            <em
              className="not-italic"
              style={{
                WebkitTextStroke: "1px var(--accent2)",
                color: "transparent",
              }}
            >
              craft
            </em>
          </SectionTitle>
          <div className="text-muted text-[1rem] leading-[1.8] space-y-4">
            <p>
              I&apos;m a developer based in Indonesia who loves building at the
              intersection of engineering and design. With experience spanning
              full-stack web and mobile development, I specialize in creating
              scalable, high-performance applications.
            </p>
            <p>
              From digitizing industrial production flows to building real-time
              dashboards, I thrive in complex, fast-moving environments where
              clean code meets real-world impact.
            </p>
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="clip-corner group transition-all duration-300 cursor-none"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "28px 24px",
                  position: "relative",
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
                {/* Corner decoration */}
                <div
                  className="absolute top-0 right-0 w-4 h-4"
                  style={{
                    borderTop: "1px solid var(--accent)",
                    borderRight: "1px solid var(--accent)",
                  }}
                />
                <div
                  className="text-[2.5rem] font-extrabold leading-none mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-tech text-[0.7rem] text-muted uppercase tracking-widest">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
