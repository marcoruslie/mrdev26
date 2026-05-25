"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* Elements the cursor reacts to. Event delegation (below) means this also
   covers nodes mounted later — the project modal, mobile menu, cards, etc. */
const INTERACTIVE = "a, button, [data-cursor], [role='button']";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot — hides when hovering so the ring becomes the focus */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: "var(--accent)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Ring — grows and fills over interactive elements */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          borderColor: hovering
            ? "rgba(0,255,229,1)"
            : "rgba(0,255,229,0.5)",
          backgroundColor: hovering
            ? "rgba(0,255,229,0.12)"
            : "rgba(0,255,229,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
