"use client";

import dynamic from "next/dynamic";

/* Lazy-loaded so the chat code isn't in the initial page bundle. */
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
