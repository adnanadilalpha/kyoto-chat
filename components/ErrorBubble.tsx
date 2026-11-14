type Props = {
  lead: string;
  support: string;
  onRetry: () => void;
};

/**
 * In-chat failure bubble — Airbnb Design Systems assistant error guidelines.
 * Same shape as a normal assistant reply; neutral colours only; no red; no codes.
 */
export function ErrorBubble({ lead, support, onRetry }: Props) {
  return (
    <div className="flex flex-col">
      <div aria-live="polite">
        <p className="text-[15px] leading-6 text-gray-800">{lead}</p>
        <p className="mt-1 text-[15px] leading-6 text-gray-800">{support}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 min-h-11 self-start rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Try again
      </button>
    </div>
  );
}
