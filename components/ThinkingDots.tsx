export function ThinkingDots() {
  return (
    <div
      className="flex items-center gap-1.5 px-1 py-2"
      role="status"
      aria-label="Thinking"
    >
      <span className="abnb-dot size-2 rounded-full bg-muted [animation-delay:0ms]" />
      <span className="abnb-dot size-2 rounded-full bg-muted [animation-delay:160ms]" />
      <span className="abnb-dot size-2 rounded-full bg-muted [animation-delay:320ms]" />
    </div>
  );
}
