import type { FoodDetails } from "@/lib/types";

export function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-stone-200 bg-white p-4 pr-18 shadow-sm">
      {/* Small round thumbnail, top right */}
      <div
        className="absolute top-4 right-4 size-12 rounded-full bg-stone-200"
        aria-hidden
        role="img"
        aria-label="Restaurant photo placeholder"
      />
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl leading-tight tracking-tight text-ink">
          {details.restaurantName}
        </h3>
        <p className="text-sm font-semibold text-amber">
          {details.mealType} · {details.priceRange}
        </p>
        <p className="text-sm leading-relaxed text-slate">{details.description}</p>
      </div>
    </article>
  );
}
