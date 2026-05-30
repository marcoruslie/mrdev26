"use client";

import { MotionConfig } from "framer-motion";

/* reducedMotion="user" makes every Framer Motion animation honor the
   user's prefers-reduced-motion setting automatically — transforms are
   skipped while opacity still resolves, so content never stays hidden. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
