import { describe, expect, it } from "vitest";
import { APICallError } from "ai";
import { chatErrorMessage } from "./client-errors";

const apiError = (statusCode: number, responseBody?: string) =>
  new APICallError({ message: "x", url: "/api/chat", requestBodyValues: {}, statusCode, responseBody });

describe("chatErrorMessage", () => {
  it("is null without an error", () => {
    expect(chatErrorMessage(undefined)).toBeNull();
  });

  it("explains rate limiting", () => {
    expect(chatErrorMessage(apiError(429))).toMatch(/too fast/);
  });

  it("explains a rejected message", () => {
    expect(chatErrorMessage(apiError(400))).toMatch(/couldn't be sent/);
  });

  it("tells the visitor to start over when the conversation is too long", () => {
    const msg = chatErrorMessage(apiError(400, JSON.stringify({ error: "Conversation is too long." })));
    expect(msg).toMatch(/start a new chat/);
    expect(msg).not.toMatch(/500 characters/);
  });

  it("falls back to the contact section for anything else", () => {
    expect(chatErrorMessage(apiError(503))).toMatch(/contact section/);
    expect(chatErrorMessage(new Error("boom"))).toMatch(/contact section/);
  });
});
