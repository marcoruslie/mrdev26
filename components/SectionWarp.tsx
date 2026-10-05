"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* Sections that get the cinematic jump instead of a plain smooth scroll.
   Any <a href="#id"> on the page pointing at one of these triggers it. */
const WARP_TARGETS: Record<string, string> = {
  projects: "Portfolio",
};

const SLATS = 8;
const EASE = [0.76, 0, 0.24, 1] as const;
/* Timeline (ms): slats flip shut → hold on the title while we jump →
   slats flip open onto the new section. */
const CLOSE_MS = 420 + (SLATS - 1) * 40;
const HOLD_MS = 380;
const OPEN_MS = 480 + (SLATS - 1) * 40;

type Phase = "idle" | "close" | "open";

export default function SectionWarp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const reduce = useReducedMotion();
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const link = (e.target as Element | null)?.closest?.("a[href^='#']");
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !(id in WARP_TARGETS)) return;
      const target = document.getElementById(id);
      if (!target || reduce) return;

      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      setLabel(WARP_TARGETS[id]);
      setPhase("close");

      const t1 = window.setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
        history.pushState(null, "", `#${id}`);
        setPhase("open");
      }, CLOSE_MS + HOLD_MS);
      const t2 = window.setTimeout(() => {
        setPhase("idle");
        busy.current = false;
      }, CLOSE_MS + HOLD_MS + OPEN_MS);
      timers.current.push(t1, t2);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="warp"
          className="fixed inset-0 z-[9800] flex"
          style={{ perspective: 1400 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          aria-hidden
        >
          {Array.from({ length: SLATS }, (_, i) => {
            const fromLeft = i < SLATS / 2;
            return (
              <motion.div
                key={i}
                className="relative h-full flex-1"
                initial={{ rotateY: fromLeft ? -90 : 90, opacity: 0.4 }}
                animate={
                  phase === "close"
                    ? { rotateY: 0, opacity: 1 }
                    : { rotateY: fromLeft ? 90 : -90, opacity: 0.4 }
                }
                transition={{
                  duration: phase === "close" ? 0.42 : 0.48,
                  ease: EASE,
                  delay:
                    (phase === "close"
                      ? Math.abs(i - (SLATS - 1) / 2)
                      : (SLATS - 1) / 2 - Math.abs(i - (SLATS - 1) / 2)) *
                    0.08,
                }}
                style={{
                  transformOrigin: fromLeft ? "left center" : "right center",
                  background:
                    "linear-gradient(180deg, #050b17 0%, #030712 60%, #071226 100%)",
                  borderRight: "1px solid rgba(0,255,229,0.18)",
                  boxShadow: "inset 0 0 40px rgba(0,255,229,0.06)",
                }}
              >
                {/* Scan line racing down each slat */}
                <motion.span
                  className="absolute left-0 right-0 h-px"
                  style={{ background: "var(--accent)", boxShadow: "var(--glow)" }}
                  initial={{ top: "-2%" }}
                  animate={{ top: "102%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}

          {/* Title card shown while the slats are shut */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.85, rotateX: 40 }}
            animate={
              phase === "close"
                ? { opacity: 1, scale: 1, rotateX: 0 }
                : { opacity: 0, scale: 1.25, rotateX: -20 }
            }
            transition={{
              duration: phase === "close" ? 0.45 : 0.3,
              delay: phase === "close" ? 0.3 : 0,
              ease: EASE,
            }}
          >
            <span className="font-tech text-[0.7rem] uppercase tracking-[0.4em] text-accent">
              // entering
            </span>
            <span
              className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-none tracking-tight"
              style={{
                WebkitTextStroke: "1px var(--accent)",
                color: "transparent",
                textShadow: "0 0 40px rgba(0,255,229,0.35)",
              }}
            >
              {label}
            </span>
            <motion.span
              className="h-px w-48 origin-left"
              style={{ background: "var(--accent)", boxShadow: "var(--glow)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "close" ? 1 : 0 }}
              transition={{ duration: 0.5, delay: phase === "close" ? 0.45 : 0, ease: EASE }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
