import { describe, expect, it } from "vitest";
import { YEARS, TECHNICIANS, SITES, COMPANIES } from "./facts";
import { projects } from "./projects";
import { experiences } from "./experience";
import { skills } from "./skills";
import { contactLinks } from "./contact";
import { profile, aboutParagraphs, heroPitch } from "./about";

describe("content modules", () => {
  it("load in plain Node (no client-only imports)", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(experiences.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(aboutParagraphs.length).toBeGreaterThan(0);
    expect(heroPitch.length).toBeGreaterThan(0);
    expect(profile.name).toBe("Marco Ruslie");
  });

  it("project ids are unique", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every project lists at least one technology", () => {
    for (const p of projects) expect(p.tech.length).toBeGreaterThan(0);
  });

  it("facts are positive integers", () => {
    for (const n of [YEARS, TECHNICIANS, SITES, COMPANIES]) {
      expect(Number.isInteger(n) && n > 0).toBe(true);
    }
  });
});
