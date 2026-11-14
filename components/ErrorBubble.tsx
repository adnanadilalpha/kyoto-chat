type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorBubble({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm leading-relaxed text-ink whitespace-pre-wrap">{message}</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
