import { CHAT_LIMITS } from "./config";

type ChatMessage = { parts: ReadonlyArray<{ type: string; text?: string }> };

function textLength(m: ChatMessage): number {
  return m.parts.reduce((n, p) => n + (p.type === "text" ? (p.text?.length ?? 0) : 0), 0);
}

/* Client-side mirror of the server's conversation caps (see validate.ts):
   true if sending `nextText` would be rejected for length or count. */
export function wouldExceedLimits(messages: ReadonlyArray<ChatMessage>, nextText: string): boolean {
  if (messages.length + 1 > CHAT_LIMITS.maxMessages) return true;
  const total = messages.reduce((n, m) => n + textLength(m), 0) + nextText.length;
  return total > CHAT_LIMITS.maxTotalChars;
}
