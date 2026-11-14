"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ErrorBubble } from "./ErrorBubble";
import { SuggestionCards } from "./SuggestionCards";
import { ThinkingDots } from "./ThinkingDots";
import { ERROR_MESSAGE, MOCK_CARDS } from "@/lib/mock-reply";
import type { ChatMessage } from "@/lib/types";

const THINKING_MS = 1400;

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatPage() {
  const searchParams = useSearchParams();
  const failOnce = searchParams.get("fail") === "once";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [locked, setLocked] = useState(false);
  const [lastRequest, setLastRequest] = useState("");
  const failUsedRef = useRef(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function runAssistant(requestText: string) {
    const thinkingId = uid();
    setLocked(true);
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "assistant", kind: "thinking" },
    ]);

    window.setTimeout(() => {
      const shouldFail = failOnce && !failUsedRef.current;
      if (shouldFail) failUsedRef.current = true;

      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => m.id !== thinkingId);
        if (shouldFail) {
          return [
            ...withoutThinking,
            {
              id: uid(),
              role: "assistant",
              kind: "error",
              text: ERROR_MESSAGE,
            },
          ];
        }
        return [
          ...withoutThinking,
          {
            id: uid(),
            role: "assistant",
            kind: "cards",
            cards: MOCK_CARDS,
          },
        ];
      });
      setLocked(false);
    }, THINKING_MS);
  }

  function sendTrip(text: string) {
    const trimmed = text.trim();
    if (!trimmed || locked) return;

    setLastRequest(trimmed);
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text: trimmed },
    ]);
    runAssistant(trimmed);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendTrip(draft);
  }

  function handleRetry() {
    if (locked || !lastRequest) return;
    runAssistant(lastRequest);
  }

  return (
    <div className="flex h-dvh flex-col bg-paper text-ink">
      <header className="shrink-0 border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-2xl items-baseline justify-between gap-3">
          <h1 className="font-display text-lg tracking-tight">Kyoto Trip Planner</h1>
          <p className="text-xs text-slate">Suggestions only · no bookings</p>
        </div>
      </header>

      <div
        ref={threadRef}
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.length === 0 && (
          <p className="mx-auto max-w-sm pt-16 text-center text-sm leading-relaxed text-slate">
            Ask for a Kyoto weekend and I&apos;ll suggest a stay, an experience,
            and a place to eat.
          </p>
        )}

        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm leading-relaxed text-white">
                  {message.text}
                </div>
              </div>
            );
          }

          return (
            <div key={message.id} className="flex justify-start">
              <div className="flex max-w-[92%] flex-col gap-1">
                <span className="text-xs font-medium tracking-wide text-slate uppercase">
                  Assistant
                </span>
                <div className="rounded-2xl rounded-bl-md border border-stone-200 bg-white px-4 py-3 shadow-sm">
                  {message.kind === "thinking" && <ThinkingDots />}
                  {message.kind === "cards" && (
                    <SuggestionCards cards={message.cards} />
                  )}
                  {message.kind === "error" && (
                    <ErrorBubble message={message.text} onRetry={handleRetry} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-stone-200 bg-white px-4 py-3"
      >
        <div className="mx-auto flex w-full max-w-2xl gap-2">
          <label className="sr-only" htmlFor="trip-request">
            Trip request
          </label>
          <input
            id="trip-request"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={locked}
            placeholder="Plan a weekend in Kyoto for two"
            className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={locked || !draft.trim()}
            className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
