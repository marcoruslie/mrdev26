/* Chat limits and environment checks. Safe to import from client code:
   env vars are only read inside functions, on the server. */

export const CHAT_LIMITS = {
  maxMessages: 20,
  maxMessageChars: 500,
  maxTotalChars: 8000,
  maxOutputTokens: 400,
  rateLimitPerHour: 20,
} as const;

export function chatModelId(): string {
  return process.env.OPENAI_MODEL || "gpt-5.4-mini";
}

/* The Vercel Marketplace Upstash integration may expose KV_* names. */
export function upstashCredentials(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/* In production the chat only runs with rate limiting configured. */
export function isChatEnabled(): boolean {
  if (!process.env.OPENAI_API_KEY) return false;
  if (process.env.NODE_ENV === "production") return upstashCredentials() !== null;
  return true;
}
