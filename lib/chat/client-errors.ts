import { APICallError } from "ai";
import { CHAT_LIMITS } from "./config";

export function chatErrorMessage(error: Error | undefined): string | null {
  if (!error) return null;
  if (APICallError.isInstance(error) && error.statusCode === 429) {
    return "You're sending messages too fast — try again in a bit.";
  }
  if (
    APICallError.isInstance(error) &&
    error.statusCode === 400 &&
    /Conversation (is too long|limit reached)/.test(error.responseBody ?? "")
  ) {
    return "This conversation is too long — start a new chat.";
  }
  if (APICallError.isInstance(error) && error.statusCode === 400) {
    return `That message couldn't be sent — keep it under ${CHAT_LIMITS.maxMessageChars} characters.`;
  }
  return "Chat is unavailable right now. You can reach Marco via the contact section.";
}
