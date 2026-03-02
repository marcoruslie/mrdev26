"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <>
      {/* Grid */}
      <div className="grid-bg" />

      {/* Orb 1 */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          width: 500,
          height: 500,
          background: "rgba(124,58,237,0.12)",
          filter: "blur(100px)",
          top: -100,
          right: -100,
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,255,229,0.08)",
          filter: "blur(100px)",
          bottom: "20%",
          left: -100,
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Orb 3 */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          width: 300,
          height: 300,
          background: "rgba(245,158,11,0.07)",
          filter: "blur(100px)",
          bottom: -50,
          right: "20%",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </>
  );
}
