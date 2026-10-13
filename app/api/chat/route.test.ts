import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { streamTextMock, checkRateLimitMock } = vi.hoisted(() => ({
  streamTextMock: vi.fn(),
  checkRateLimitMock: vi.fn(),
}));

vi.mock("ai", async (importOriginal) => ({
  ...(await importOriginal<typeof import("ai")>()),
  streamText: streamTextMock,
  toUIMessageStream: vi.fn(() => "UI_STREAM"),
  createUIMessageStreamResponse: vi.fn(() => new Response("streamed")),
}));
vi.mock("@ai-sdk/openai", () => ({ openai: vi.fn((id: string) => ({ modelId: id })) }));
vi.mock("@/lib/chat/ratelimit", () => ({
  checkRateLimit: checkRateLimitMock,
  clientIp: () => "1.2.3.4",
}));

import { GET, POST } from "./route";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

const ask = (text: string) => ({ messages: [{ id: "1", role: "user", parts: [{ type: "text", text }] }] });

beforeEach(() => {
  streamTextMock.mockReset().mockReturnValue({ stream: "MODEL_STREAM" });
  checkRateLimitMock.mockReset().mockResolvedValue({ ok: true, retryAfterSeconds: 0 });
  vi.stubEnv("OPENAI_API_KEY", "sk-test");
  vi.stubEnv("OPENAI_MODEL", "");
});
afterEach(() => vi.unstubAllEnvs());

describe("GET /api/chat", () => {
  it("is enabled in development with an OpenAI key", async () => {
    expect(await GET().json()).toEqual({ enabled: true });
  });

  it("is disabled without an OpenAI key", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    expect(await GET().json()).toEqual({ enabled: false });
  });

  it("is disabled in production without Upstash", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    expect(await GET().json()).toEqual({ enabled: false });
  });
});

describe("POST /api/chat", () => {
  it("returns 503 when the chat is disabled", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    expect((await post(ask("hi"))).status).toBe(503);
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid JSON", async () => {
    expect((await post("{not json")).status).toBe(400);
  });

  it("returns 400 with the validation error", async () => {
    const res = await post(ask("a".repeat(501)));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Message is too long." });
    expect(checkRateLimitMock).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After when rate-limited", async () => {
    checkRateLimitMock.mockResolvedValue({ ok: false, retryAfterSeconds: 42 });
    const res = await post(ask("hi"));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("42");
    expect(checkRateLimitMock).toHaveBeenCalledWith("1.2.3.4");
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it("streams a grounded reply", async () => {
    const res = await post(ask("What's your stack?"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("streamed");

    const args = streamTextMock.mock.calls[0][0];
    expect(args.model).toEqual({ modelId: "gpt-5.4-mini" });
    expect(args.instructions).toContain("Marco Ruslie");
    expect(args.maxOutputTokens).toBe(400);
    expect(args).not.toHaveProperty("temperature");
    expect(JSON.stringify(args.messages)).toContain("What's your stack?");
  });

  it("uses OPENAI_MODEL when set", async () => {
    vi.stubEnv("OPENAI_MODEL", "gpt-5.4-nano");
    await post(ask("hi"));
    expect(streamTextMock.mock.calls[0][0].model).toEqual({ modelId: "gpt-5.4-nano" });
  });
});
