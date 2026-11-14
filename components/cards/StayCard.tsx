import { CardPhoto } from "@/components/PhotoPlaceholder";
import { PRIMARY_STAY } from "@/lib/content-pack";
import { formatStayHeadline } from "@/lib/mock-reply";
import type { StayDetails } from "@/lib/types";

export function StayCard({ details }: { details: StayDetails }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-(--shadow-card) ring-1 ring-black/5">
      <div className="h-1 w-full bg-coral" aria-hidden />
      <div className="relative">
        <CardPhoto variant="stay" />
      </div>
      <div className="flex flex-col gap-1 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[15px] leading-5 font-extrabold tracking-tight text-ink">
            {formatStayHeadline(details.checkIn, details.checkOut)}
          </p>
          <p className="shrink-0 text-xs font-semibold text-ink">
            ★ {PRIMARY_STAY.rating}
          </p>
        </div>
        <h3 className="text-sm leading-5 font-semibold text-ink">
          {details.listingTitle}
        </h3>
        <p className="text-xs text-muted">{details.destination}</p>
        <p className="text-xs leading-4 text-muted">{details.description}</p>
        <p className="pt-1 text-sm text-ink">
          <span className="font-extrabold">${details.nightlyPriceUsd}</span>
          <span className="text-muted"> night</span>
          <span className="text-muted">
            {" "}
            · ${details.totalUsd} total incl. fees
          </span>
        </p>
      </div>
    </article>
  );
}
