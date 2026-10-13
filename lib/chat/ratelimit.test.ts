import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { limitMock } = vi.hoisted(() => ({ limitMock: vi.fn() }));

vi.mock("@upstash/ratelimit", () => {
  class Ratelimit {
    static slidingWindow = vi.fn(() => "window");
    limit = limitMock;
    constructor(_opts: unknown) {}
  }
  return { Ratelimit };
});
vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor(_opts: unknown) {}
  },
}));

async function load() {
  vi.resetModules();
  return import("./ratelimit");
}

beforeEach(() => {
  limitMock.mockReset();
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
});
afterEach(() => vi.unstubAllEnvs());

describe("checkRateLimit", () => {
  it("allows requests under the limit", async () => {
    limitMock.mockResolvedValue({ success: true, reset: Date.now() + 60_000 });
    const { checkRateLimit } = await load();
    expect(await checkRateLimit("1.2.3.4")).toEqual({ ok: true, retryAfterSeconds: 0 });
    expect(limitMock).toHaveBeenCalledWith("1.2.3.4");
  });

  it("blocks with a retry-after when over the limit", async () => {
    limitMock.mockResolvedValue({ success: false, reset: Date.now() + 30_000 });
    const { checkRateLimit } = await load();
    const r = await checkRateLimit("1.2.3.4");
    expect(r.ok).toBe(false);
    expect(r.retryAfterSeconds).toBeGreaterThanOrEqual(29);
    expect(r.retryAfterSeconds).toBeLessThanOrEqual(30);
  });

  it("fails open when Upstash errors", async () => {
    limitMock.mockRejectedValue(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { checkRateLimit } = await load();
    expect(await checkRateLimit("1.2.3.4")).toEqual({ ok: true, retryAfterSeconds: 0 });
  });

  it("is a no-op without Upstash credentials", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { checkRateLimit } = await load();
    expect(await checkRateLimit("1.2.3.4")).toEqual({ ok: true, retryAfterSeconds: 0 });
    expect(limitMock).not.toHaveBeenCalled();
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for entry", async () => {
    const { clientIp } = await load();
    const req = new Request("http://x", { headers: { "x-forwarded-for": "9.9.9.9, 10.0.0.1" } });
    expect(clientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to anonymous", async () => {
    const { clientIp } = await load();
    expect(clientIp(new Request("http://x"))).toBe("anonymous");
  });
});
