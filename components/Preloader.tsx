"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "initializing portfolio_os",
  "loading components & assets",
  "establishing secure connection",
  "calibrating interface",
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  /* Drive the boot sequence: stagger the lines, fill the progress bar. */
  useEffect(() => {
    const lineTimers = bootLines.map((_, i) =>
      setTimeout(() => setStep(i + 1), 300 + i * 340)
    );

    let p = 0;
    const prog = setInterval(() => {
      p = Math.min(100, p + Math.random() * 13 + 7);
      setProgress(Math.floor(p));
      if (p >= 100) clearInterval(prog);
    }, 140);

    const done = setTimeout(() => setLoading(false), 2200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(prog);
      clearTimeout(done);
    };
  }, []);

  /* Lock scrolling while the boot screen is up. */
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setLoading(false)}
          className="fixed inset-0 z-[9700] flex flex-col items-center justify-center cursor-none"
          style={{ background: "var(--bg)" }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,229,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,229,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Ambient glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,255,229,0.08), transparent 60%)",
            }}
          />

          <div className="relative w-[min(90vw,420px)] flex flex-col gap-7">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-2xl tracking-[0.3em] text-center"
            >
              <span className="text-accent">MR</span>
              <span className="text-muted">Porto</span>
            </motion.div>

            {/* Boot lines */}
            <div className="font-tech text-[0.72rem] leading-[1.95]">
              {bootLines.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step > i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-accent2">$</span>
                  <span className="text-muted">{line}</span>
                  <span
                    className="flex-1 border-b border-dotted"
                    style={{ borderColor: "rgba(100,116,139,0.3)" }}
                  />
                  <span className="text-accent">OK</span>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2">
              <div
                className="h-[3px] w-full overflow-hidden"
                style={{ background: "rgba(0,255,229,0.1)" }}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${progress}%`,
                    background: "var(--accent)",
                    boxShadow: "var(--glow)",
                    transition: "width 0.18s linear",
                  }}
                />
              </div>
              <div className="flex justify-between font-tech text-[0.65rem] uppercase tracking-widest text-muted">
                <span className="flex items-center">
                  {progress < 100 ? "loading" : "system ready"}
                  <span className="term-cursor ml-1.5" />
                </span>
                <span className="text-accent">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Skip hint */}
          <div className="absolute bottom-8 font-tech text-[0.6rem] uppercase tracking-[0.2em] text-muted">
            click anywhere to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
