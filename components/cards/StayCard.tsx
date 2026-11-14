import { formatStayDates } from "@/lib/mock-reply";
import type { StayDetails } from "@/lib/types";

export function StayCard({ details }: { details: StayDetails }) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="h-1 w-full bg-coral" aria-hidden />
      {/* Wide banner image placeholder */}
      <div
        className="h-28 w-full bg-stone-200"
        aria-hidden
        role="img"
        aria-label="Stay photo placeholder"
      />
      <div className="flex flex-col gap-2 p-4">
        <p className="font-display text-xl leading-tight tracking-tight text-ink">
          {formatStayDates(details.checkIn, details.checkOut)}
        </p>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-medium text-ink">{details.listingTitle}</h3>
          <p className="text-sm text-slate">{details.destination}</p>
        </div>
        <p className="text-sm font-semibold text-ink">
          ${details.nightlyPriceUsd} USD{" "}
          <span className="font-normal text-slate">/ night</span>
        </p>
        <p className="text-sm leading-relaxed text-slate">{details.description}</p>
      </div>
    </article>
  );
}
