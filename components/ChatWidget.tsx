"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { CHAT_LIMITS } from "@/lib/chat/config";
import { chatErrorMessage } from "@/lib/chat/client-errors";
import { wouldExceedLimits } from "@/lib/chat/conversation";

const SUGGESTIONS = [
  "What's your tech stack?",
  "Tell me about the POS system",
  "What do you do at PT Wings Surya?",
  "How can I contact you?",
];

export default function ChatWidget() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat();

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";
  // Mirrors the server caps so the visitor is told to start over before a
  // request would be rejected. `full` = not even a one-letter message fits.
  const full = wouldExceedLimits(messages, "x");
  const atLimit = full || wouldExceedLimits(messages, input.trim());
  const errorText = status === "error" ? chatErrorMessage(error) : null;

  // Hide entirely unless the server says the chat is configured.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/chat")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => {
        if (!cancelled) setEnabled(Boolean(d.enabled));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [messages, status]);

  function send(text: string) {
    const t = text.trim();
    if (!t || busy || atLimit || t.length > CHAT_LIMITS.maxMessageChars) return;
    clearError();
    void sendMessage({ text: t });
    setInput("");
  }

  function reset() {
    stop();
    setMessages([]);
    clearError();
    inputRef.current?.focus();
  }

  if (!enabled) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id="ask-marco-panel"
            role="dialog"
            aria-labelledby="ask-marco-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[1100] right-4 bottom-20 md:right-8 md:bottom-24 w-[calc(100vw-2rem)] max-w-[380px] h-[min(560px,calc(100dvh-7rem))] flex flex-col font-tech text-[0.85rem]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--glow)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span id="ask-marco-title" style={{ color: "var(--accent)" }}>
                ~/ask_marco
              </span>
              <div className="flex gap-3 text-muted">
                {messages.length > 0 && (
                  <button type="button" onClick={reset} className="cursor-none hover:text-slate-200">
                    new
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={() => {
                    setOpen(false);
                    launcherRef.current?.focus();
                  }}
                  className="cursor-none hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} aria-live="polite" className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-muted">
                    Ask anything about Marco&apos;s work, projects, or stack. Answers come only from this site.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="cursor-none px-2 py-1 text-left transition-colors hover:text-slate-100"
                        style={{ border: "1px solid var(--border)", color: "var(--accent)" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = m.parts.flatMap((p) => (p.type === "text" ? [p.text] : [])).join("");
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="text-slate-200 whitespace-pre-wrap">
                      <span style={{ color: "var(--accent2)" }}>&gt; </span>
                      {text}
                    </div>
                  );
                }
                return (
                  <div key={m.id} className="text-slate-300 leading-relaxed">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                        strong: ({ children }) => <strong className="text-slate-100">{children}</strong>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="cursor-none underline" style={{ color: "var(--accent)" }}>
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {text}
                    </ReactMarkdown>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="text-muted">
                  thinking <span className="term-cursor" />
                </div>
              )}

              {errorText && (
                <div className="text-[#fb7185]">
                  {errorText}{" "}
                  {!errorText.includes("too fast") && (
                    <a href="#contact" onClick={() => setOpen(false)} className="cursor-none underline">
                      Go to contact
                    </a>
                  )}
                </div>
              )}

              {atLimit && (
                <div className="text-muted">
                  Conversation limit reached —{" "}
                  <button type="button" onClick={reset} className="cursor-none underline" style={{ color: "var(--accent)" }}>
                    start a new chat
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 px-4 py-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <label htmlFor="ask-marco-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="ask-marco-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={CHAT_LIMITS.maxMessageChars}
                disabled={full}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="ask something…"
                className="flex-1 resize-none bg-transparent text-slate-200 placeholder:text-muted outline-none cursor-none max-h-24"
              />
              <span className="text-muted text-[0.7rem] self-center tabular-nums">
                {input.length}/{CHAT_LIMITS.maxMessageChars}
              </span>
              {busy ? (
                <button type="button" onClick={stop} className="cursor-none px-2" style={{ color: "var(--accent3)" }}>
                  stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() || atLimit}
                  className="cursor-none px-2 disabled:opacity-40"
                  style={{ color: "var(--accent)" }}
                >
                  send
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ask-marco-panel"
        aria-label={open ? "Close chat" : "Ask a question about Marco"}
        className="fixed z-[1100] right-4 bottom-4 md:right-8 md:bottom-8 font-tech text-[0.85rem] px-4 py-3 cursor-none transition-shadow hover:shadow-[var(--glow)]"
        style={{ background: "var(--surface)", border: "1px solid var(--accent)", color: "var(--accent)" }}
      >
        {open ? "× close" : (
          <>
            &gt; ask_marco <span className="term-cursor" aria-hidden="true" />
          </>
        )}
      </button>
    </>
  );
}
