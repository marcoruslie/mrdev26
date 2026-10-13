import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
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

  it("live links use https and never a vercel.app domain", () => {
    for (const p of projects) {
      if (!p.liveUrl) continue;
      expect(p.liveUrl).toMatch(/^https:\/\//);
      expect(p.liveUrl).not.toMatch(/vercel\.app/);
    }
  });

  it("lists the client sites with their custom domains", () => {
    const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
    expect(byId["ourlittlecart"]?.liveUrl).toBe("https://ourlittlecart.site");
    expect(byId["yuzaka-parts-catalog"]?.liveUrl).toBe("https://www.yuzakacatalog.com");
    expect(byId["ruslie-spring"]?.liveUrl).toBe("https://www.rusliespring.com");
    expect(byId["moving-quotation-chatbot"]).toBeDefined();
    expect(byId["moving-quotation-chatbot"]?.liveUrl).toBeUndefined();
    expect(byId["john-corner"]).toBeDefined();
    expect(byId["john-corner"]?.liveUrl).toBeUndefined();
    expect(byId["john-corner"]?.category).toBe("Website");
  });

  it("every project image exists in /public", () => {
    for (const p of projects) {
      for (const img of p.images ?? []) {
        expect(existsSync(join(process.cwd(), "public", img)), img).toBe(true);
      }
    }
  });

  it("facts are positive integers", () => {
    for (const n of [YEARS, TECHNICIANS, SITES, COMPANIES]) {
      expect(Number.isInteger(n) && n > 0).toBe(true);
    }
  });
});
