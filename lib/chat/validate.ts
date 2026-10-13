import type { UIMessage } from "ai";
import { CHAT_LIMITS } from "./config";

export type ValidationResult =
  | { ok: true; messages: UIMessage[] }
  | { ok: false; error: string };

const fail = (error: string): ValidationResult => ({ ok: false, error });

/* Concatenated text of a message's text parts; other part types are
   ignored. Returns null if `parts` is malformed. */
function textOf(parts: unknown): string | null {
  if (!Array.isArray(parts)) return null;
  let text = "";
  for (const part of parts) {
    if (!part || typeof part !== "object") return null;
    const { type, text: t } = part as { type?: unknown; text?: unknown };
    if (type !== "text") continue;
    if (typeof t !== "string") return null;
    text += t;
  }
  return text;
}

/* Rebuilds the conversation from text only, so nothing but plain
   user/assistant text ever reaches the model. */
export function validateChatBody(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") return fail("Invalid request body.");
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return fail("No messages.");
  if (raw.length > CHAT_LIMITS.maxMessages) return fail("Conversation limit reached.");

  const messages: UIMessage[] = [];
  let total = 0;

  for (const m of raw) {
    if (!m || typeof m !== "object") return fail("Invalid message.");
    const { id, role, parts } = m as { id?: unknown; role?: unknown; parts?: unknown };
    if (role !== "user" && role !== "assistant") return fail("Invalid message role.");
    const text = textOf(parts);
    if (text === null) return fail("Invalid message.");
    total += text.length;
    messages.push({
      id: typeof id === "string" && id ? id : crypto.randomUUID(),
      role,
      parts: [{ type: "text", text }],
    });
  }

  const last = messages[messages.length - 1];
  const lastText = textOf(last.parts) ?? "";
  if (last.role !== "user") return fail("Last message must be from the user.");
  if (!lastText.trim()) return fail("Message is empty.");
  if (lastText.length > CHAT_LIMITS.maxMessageChars) return fail("Message is too long.");
  if (total > CHAT_LIMITS.maxTotalChars) return fail("Conversation is too long.");

  return { ok: true, messages };
}
