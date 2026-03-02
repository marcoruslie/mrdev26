"use client";

import { RevealSection, SectionLabel, SectionTitle } from "./ui";

const experiences = [
  {
    period: "November 2024 — Present",
    role: "Website & Mobile Developer",
    company: "PT WINGS SURYA",
    companyExtra: "PT ADYABUANA PERSADA (MILAN TILES)",
    badges: [
      { label: "Current Role", type: "primary" },
      { label: "Web Dev", type: "secondary" },
      { label: "Mobile Dev", type: "secondary" },
      { label: "Production Dashboard", type: "default" },
    ],
    desc: "Developing production monitoring dashboards for PT Wings Surya's operations, delivering real-time visibility into factory processes. Simultaneously building mobile applications for a subsidiary, PT Adyabuana Persada (Milan Tiles), enabling field teams to operate efficiently through purpose-built cross-platform apps.",
  },
  {
    period: "September 2023 — January 2024",
    role: "Human Resource Project",
    company: "PT WINGS SURYA",
    companyExtra: null,
    badges: [
      { label: "Staff", type: "default" },
      { label: "Web Dev", type: "secondary" },
      { label: "Process Digitalization", type: "default" },
    ],
    desc: "Developed an internal web platform to digitalize the production packaging flow, replacing manual HR processes with a streamlined digital system. The platform improved tracking accuracy and reduced paperwork overhead across production lines.",
  },
];

const badgeStyles: Record<string, React.CSSProperties> = {
  primary: {
    border: "1px solid rgba(0,255,229,0.4)",
    color: "var(--accent)",
    background: "rgba(0,255,229,0.05)",
  },
  secondary: {
    border: "1px solid rgba(124,58,237,0.4)",
    color: "#a78bfa",
    background: "rgba(124,58,237,0.05)",
  },
  default: {
    border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--muted)",
    background: "rgba(0,0,0,0.3)",
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 px-6 md:px-16 py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionLabel>Career</SectionLabel>
          <SectionTitle>
            Work{" "}
            <em
              className="not-italic"
              style={{
                WebkitTextStroke: "1px var(--accent2)",
                color: "transparent",
              }}
            >
              Experience
            </em>
          </SectionTitle>
        </RevealSection>

        {/* Timeline */}
        <div className="relative pl-10">
          {/* Line */}
          <div
            className="absolute left-0 top-3 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--accent), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <RevealSection key={i} delay={i * 0.2} className="relative mb-14 last:mb-0">
              {/* Dot */}
              <div
                className="ping-dot absolute -left-[44px] top-2 w-[10px] h-[10px] rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 16px rgba(0,255,229,0.8)",
                }}
              />

              {/* Card */}
              <div
                className="clip-corner-lg group relative overflow-hidden transition-all duration-300 cursor-none"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "36px",
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
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-5 h-5"
                  style={{
                    borderTop: "1px solid var(--accent)",
                    borderRight: "1px solid var(--accent)",
                  }}
                />

                <div
                  className="font-tech text-[0.7rem] uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                  style={{ color: "var(--accent)" }}
                >
                  <span style={{ color: "var(--accent2)" }}>//</span>
                  {exp.period}
                </div>

                <div className="text-[1.4rem] font-extrabold text-slate-200 mb-1">
                  {exp.role}
                </div>

                <div className="font-mono text-[0.85rem] mb-5" style={{ color: "var(--accent2)" }}>
                  {exp.company}
                  {exp.companyExtra && (
                    <>
                      {" "}
                      &nbsp;·&nbsp;{" "}
                      <span className="text-accent3 text-[0.8rem]">{exp.companyExtra}</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {exp.badges.map((b, j) => (
                    <span
                      key={j}
                      className="font-tech text-[0.65rem] px-3 py-1 uppercase tracking-widest"
                      style={badgeStyles[b.type]}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>

                <p className="text-muted text-[0.95rem] leading-[1.75]">{exp.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
