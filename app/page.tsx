import { Suspense } from "react";
import { ChatPage } from "@/components/ChatPage";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-paper text-sm text-slate">
          Loading…
        </div>
      }
    >
      <ChatPage />
    </Suspense>
  );
}
