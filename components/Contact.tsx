"use client";

import { SectionLabel, SectionTitle, RevealSection } from "./ui";

const contactLinks = [
  {
    icon: "✉",
    label: "Email",
    value: "albertus0191@gmail.com",
    href: "mailto:albertus0191@gmail.com",
  },
  {
    icon: "⬡",
    label: "GitHub",
    value: "github.com/marcoruslie",
    href: "https://github.com/marcoruslie",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/marcoruslie",
    href: "https://linkedin.com/in/marcoruslie",
  },
];

const termLines = [
  { prompt: true, cmd: "cat profile.json" },
  { out: "{" },
  { out: '  "name": ', val: '"Marco Ruslie",' },
  { out: '  "role": ', val: '"Full-Stack & Mobile Dev",' },
  { out: '  "location": ', val: '"Indonesia 🇮🇩",' },
  { out: '  "status": ', status: true },
  { out: '  "stack": [' },
  { out: '    ', val: '"Next.js", "Flutter",' },
  { out: '    ', val: '"Laravel", "Nuxt"' },
  { out: "  ]," },
  { out: '  "passion": ', val: '"building cool stuff"' },
  { out: "}" },
  { prompt: true, cursor: true },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 px-6 md:px-16 py-24"
      style={{
        borderTop: "1px solid var(--border)",
        background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.05))",
      }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <RevealSection>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>
            Let&apos;s{" "}
            <em
              className="not-italic"
              style={{
                WebkitTextStroke: "1px var(--accent2)",
                color: "transparent",
              }}
            >
              Build
            </em>
            <br />
            Together
          </SectionTitle>
          <p className="text-muted leading-[1.7] mb-10">
            Have a project in mind or want to talk about a new opportunity?
            I&apos;m always open to interesting collaborations.
          </p>

          <div className="flex flex-col gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 clip-corner-sm cursor-none transition-all duration-300 no-underline text-slate-200 group"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.boxShadow = "var(--glow)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                  el.style.color = "";
                }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: "rgba(0,255,229,0.08)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {link.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-tech text-[0.65rem] text-muted uppercase tracking-[0.15em]">
                    {link.label}
                  </span>
                  <span className="text-[0.9rem] font-semibold">{link.value}</span>
                </div>
              </a>
            ))}
          </div>
        </RevealSection>

        {/* Terminal */}
        <RevealSection delay={0.2}>
          <div
            className="overflow-hidden"
            style={{
              background: "#050a14",
              border: "1px solid var(--border)",
              boxShadow: "var(--glow2)",
            }}
          >
            {/* Bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="font-tech text-[0.7rem] text-muted ml-2 tracking-widest">
                marco@portfolio ~/about
              </span>
            </div>

            {/* Body */}
            <div className="p-7 font-tech text-[0.8rem] leading-[1.8]">
              {termLines.map((line, i) => (
                <div key={i} className="text-green-400">
                  {line.prompt && (
                    <>
                      <span style={{ color: "var(--accent)" }}>$ </span>
                      {line.cmd && (
                        <span className="text-slate-200">{line.cmd}</span>
                      )}
                      {line.cursor && <span className="term-cursor" />}
                    </>
                  )}
                  {line.out && !line.prompt && (
                    <>
                      <span className="text-muted">{line.out}</span>
                      {line.val && (
                        <span style={{ color: "#a78bfa" }}>{line.val}</span>
                      )}
                      {line.status && (
                        <span className="text-green-400">&quot;available&quot;</span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
