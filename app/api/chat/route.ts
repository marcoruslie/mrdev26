import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { CHAT_LIMITS, chatModelId, isChatEnabled } from "@/lib/chat/config";
import { validateChatBody } from "@/lib/chat/validate";
import { checkRateLimit, clientIp } from "@/lib/chat/ratelimit";
import { buildSystemPrompt } from "@/lib/chat/knowledge";

// Env vars decide whether the chat is on — never prerender GET at build time.
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export function GET() {
  return Response.json({ enabled: isChatEnabled() });
}

export async function POST(req: Request) {
  if (!isChatEnabled()) {
    return Response.json({ error: "Chat is unavailable." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validateChatBody(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  const limit = await checkRateLimit(clientIp(req));
  if (!limit.ok) {
    return Response.json(
      { error: "Too many messages." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const result = streamText({
    model: openai(chatModelId()),
    instructions: buildSystemPrompt(),
    messages: await convertToModelMessages(parsed.messages),
    maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
