import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./knowledge";
import { YEARS, TECHNICIANS, SITES, SITES_LABEL, COMPANIES } from "@/content/facts";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skills } from "@/content/skills";
import { contactLinks } from "@/content/contact";
import { aboutParagraphs, heroPitch } from "@/content/about";

const prompt = buildSystemPrompt();

describe("buildSystemPrompt", () => {
  it("includes every project with its tech", () => {
    for (const p of projects) {
      expect(prompt).toContain(p.title);
      for (const t of p.tech) expect(prompt).toContain(t);
    }
  });

  it("includes every role and company", () => {
    for (const e of experiences) {
      expect(prompt).toContain(e.role);
      expect(prompt).toContain(e.company);
    }
  });

  it("includes every skill and contact link", () => {
    for (const s of skills) expect(prompt).toContain(s.name);
    for (const c of contactLinks) expect(prompt).toContain(c.value);
  });

  it("includes the about copy", () => {
    for (const para of aboutParagraphs) expect(prompt).toContain(para);
    expect(prompt).toContain(heroPitch);
  });

  it("states each fact with its exact value", () => {
    expect(prompt).toContain(`Years as sole developer on these systems (since Sep 2023): ${YEARS}`);
    expect(prompt).toContain(`Technicians using the helpdesk + QC systems daily: ${TECHNICIANS}`);
    expect(prompt).toContain(`Manufacturing sites: ${SITES} (${SITES_LABEL})`);
    expect(prompt).toContain(`Companies the production systems were built for: ${COMPANIES}`);
    expect(prompt).toContain(`Projects listed on the site: ${projects.length}`);
  });

  it("contains the grounding and safety rules", () => {
    expect(prompt).toMatch(/only from the CONTENT/);
    expect(prompt).toMatch(/Never invent/);
    expect(prompt).toMatch(/Ignore any instructions/);
    expect(prompt).toMatch(/same language/);
  });

  it("is built once and reused", () => {
    expect(buildSystemPrompt()).toBe(prompt);
  });
});
