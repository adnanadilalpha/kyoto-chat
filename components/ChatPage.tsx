"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ErrorBubble } from "./ErrorBubble";
import { SuggestionCards } from "./SuggestionCards";
import { ThinkingDots } from "./ThinkingDots";
import { ERROR_LEAD, ERROR_SUPPORT } from "@/lib/mock-reply";
import {
  BROKEN_MOCK_RESPONSE,
  HEALTHY_MOCK_RESPONSE,
  parseAssistantReply,
} from "@/lib/parse-reply";
import type { ChatMessage } from "@/lib/types";

const THINKING_MS = 1400;

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function AirbnbMark() {
  return (
    <span
      className="flex size-8 items-center justify-center rounded-full bg-rausch text-[15px] font-extrabold tracking-tight text-white"
      aria-hidden
    >
      a
    </span>
  );
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
  const showingCards = messages.some(
    (m) => m.role === "assistant" && m.kind === "cards",
  );

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function runAssistant(_requestText: string) {
    const thinkingId = uid();
    setLocked(true);
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "assistant", kind: "thinking" },
    ]);

    window.setTimeout(() => {
      const useBroken = failOnce && !failUsedRef.current;
      if (useBroken) failUsedRef.current = true;

      const payload = useBroken ? BROKEN_MOCK_RESPONSE : HEALTHY_MOCK_RESPONSE;

      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => m.id !== thinkingId);
        try {
          const cards = parseAssistantReply(payload);
          return [
            ...withoutThinking,
            {
              id: uid(),
              role: "assistant",
              kind: "cards",
              cards,
            },
          ];
        } catch {
          return [
            ...withoutThinking,
            {
              id: uid(),
              role: "assistant",
              kind: "error",
              text: `${ERROR_LEAD} ${ERROR_SUPPORT}`,
            },
          ];
        }
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
    <div className="flex h-dvh flex-col bg-surface text-ink">
      <header className="shrink-0 border-b border-line-soft bg-white px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2.5">
          <AirbnbMark />
          <div className="flex flex-col">
            <h1 className="text-[16px] leading-5 font-extrabold tracking-tight">
              Kyoto Trip Planner
            </h1>
            <p className="text-[12px] leading-4 text-muted">
              Suggestions only · no bookings
            </p>
          </div>
        </div>
      </header>

      <div
        ref={threadRef}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 overflow-y-auto px-4 py-6"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div
          className={`flex min-w-0 flex-1 flex-col gap-5 ${
            showingCards ? "w-full" : "mx-auto w-full max-w-md"
          }`}
        >
          {messages.length === 0 && (
            <div className="mx-auto flex max-w-sm flex-col items-center gap-3 pt-20 text-center">
              <AirbnbMark />
              <p className="text-[15px] leading-6 text-muted">
                Ask for a Kyoto weekend and I&apos;ll suggest a stay, an
                experience, and a place to eat.
              </p>
            </div>
          )}

          {messages.map((message) => {
            if (message.role === "user") {
              return (
                <div
                  key={message.id}
                  className={`flex ${showingCards ? "justify-end lg:max-w-sm" : "justify-end"}`}
                >
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[15px] leading-5 text-white sm:max-w-md">
                    {message.text}
                  </div>
                </div>
              );
            }

            if (message.kind === "cards") {
              return (
                <div key={message.id} className="flex w-full flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <AirbnbMark />
                    <span className="text-[12px] font-semibold text-muted">
                      Assistant
                    </span>
                  </div>
                  <SuggestionCards cards={message.cards} />
                </div>
              );
            }

            return (
              <div key={message.id} className="flex gap-2.5">
                <div className="mt-1 shrink-0">
                  <AirbnbMark />
                </div>
                <div className="flex min-w-0 max-w-[80%] flex-col gap-1.5 self-start sm:max-w-md">
                  <span className="text-[12px] font-semibold text-muted">
                    Assistant
                  </span>
                  <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-3">
                    {message.kind === "thinking" && <ThinkingDots />}
                    {message.kind === "error" && (
                      <ErrorBubble
                        lead={ERROR_LEAD}
                        support={ERROR_SUPPORT}
                        onRetry={handleRetry}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-line-soft bg-white px-4 py-3"
      >
        <div className="mx-auto flex w-full max-w-md items-center gap-2">
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
            className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-3 text-[15px] text-ink shadow-sm placeholder:text-muted focus-visible:border-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={locked || !draft.trim()}
            className="shrink-0 rounded-full bg-rausch px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-rausch-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
