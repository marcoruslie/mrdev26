import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marco Ruslie — Website & Mobile Developer";

/* Branded social-share card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(0,255,229,0.18), transparent 55%), radial-gradient(circle at 85% 90%, rgba(124,58,237,0.22), transparent 55%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#00ffe5",
          }}
        >
          // Website &amp; Mobile Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            marginTop: 24,
          }}
        >
          Marco Ruslie
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginTop: 28,
          }}
        >
          Next.js · Flutter · Laravel · Motion
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 70,
            right: 80,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 6,
            color: "#00ffe5",
          }}
        >
          MR.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
