import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { CHAT_LIMITS, upstashCredentials } from "./config";

export type RateLimitResult = { ok: boolean; retryAfterSeconds: number };

const ALLOW: RateLimitResult = { ok: true, retryAfterSeconds: 0 };

let limiter: Ratelimit | null = null;
let warned = false;

function getLimiter(): Ratelimit | null {
  const creds = upstashCredentials();
  if (!creds) return null;
  limiter ??= new Ratelimit({
    redis: new Redis(creds),
    limiter: Ratelimit.slidingWindow(CHAT_LIMITS.rateLimitPerHour, "1 h"),
    prefix: "chat",
  });
  return limiter;
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "anonymous";
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const l = getLimiter();
  if (!l) {
    if (!warned) {
      console.warn("[chat] Upstash not configured — rate limiting disabled");
      warned = true;
    }
    return ALLOW;
  }
  try {
    const { success, reset } = await l.limit(ip);
    if (success) return ALLOW;
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)) };
  } catch (err) {
    // Fail open: a Redis hiccup shouldn't take the chat down. The OpenAI
    // monthly spend limit is the backstop.
    console.error("[chat] rate limiter unavailable, allowing request", err);
    return ALLOW;
  }
}
