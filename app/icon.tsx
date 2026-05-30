import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/* Favicon: "MR" mark on the brand-dark background. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          color: "#00ffe5",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        MR
      </div>
    ),
    { ...size }
  );
}
