import { describe, expect, it } from "vitest";
import { wouldExceedLimits } from "./conversation";
import { validateChatBody } from "./validate";
import { CHAT_LIMITS } from "./config";

const msg = (role: "user" | "assistant", text: string) => ({
  id: crypto.randomUUID(),
  role,
  parts: [{ type: "text" as const, text }],
});

describe("wouldExceedLimits", () => {
  it("allows a short follow-up in a short conversation", () => {
    expect(wouldExceedLimits([msg("user", "hi"), msg("assistant", "hello")], "more?")).toBe(false);
  });

  it("blocks when the next message would pass the total character cap", () => {
    const long = "a".repeat(2000);
    const history = [msg("user", "q"), msg("assistant", long), msg("user", "q"), msg("assistant", long), msg("user", "q"), msg("assistant", long), msg("user", "q"), msg("assistant", long)];
    expect(wouldExceedLimits(history, "tell me more")).toBe(true);
  });

  it("blocks when the next message would pass the message-count cap", () => {
    const history = Array.from({ length: CHAT_LIMITS.maxMessages }, (_, i) => msg(i % 2 ? "assistant" : "user", "a"));
    expect(wouldExceedLimits(history, "x")).toBe(true);
  });

  it("agrees with the server: anything it allows, the server accepts", () => {
    const history = [msg("user", "q"), msg("assistant", "a".repeat(CHAT_LIMITS.maxTotalChars - 10))];
    const next = "123456789";
    expect(wouldExceedLimits(history, next)).toBe(false);
    expect(validateChatBody({ messages: [...history, msg("user", next)] }).ok).toBe(true);
    expect(wouldExceedLimits(history, next + "ab")).toBe(true);
    expect(validateChatBody({ messages: [...history, msg("user", next + "ab")] }).ok).toBe(false);
  });
});
