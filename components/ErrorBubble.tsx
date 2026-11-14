type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorBubble({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] leading-6 whitespace-pre-wrap text-ink">
        {message}
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-rausch px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rausch-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
