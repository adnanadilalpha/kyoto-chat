export function ThinkingDots() {
  return (
    <div
      className="flex items-center gap-1.5 px-1 py-1"
      role="status"
      aria-label="Thinking"
    >
      <span className="size-2 animate-pulse rounded-full bg-slate [animation-delay:0ms]" />
      <span className="size-2 animate-pulse rounded-full bg-slate [animation-delay:150ms]" />
      <span className="size-2 animate-pulse rounded-full bg-slate [animation-delay:300ms]" />
    </div>
  );
}
