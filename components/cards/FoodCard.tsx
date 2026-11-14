import { CardPhoto } from "@/components/PhotoPlaceholder";
import type { FoodDetails } from "@/lib/types";

export function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white p-3.5 shadow-(--shadow-card) ring-1 ring-black/5">
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-[15px] leading-5 font-extrabold tracking-tight text-ink">
            {details.restaurantName}
          </h3>
          <p className="text-xs font-extrabold text-amber">
            {details.mealType} · {details.priceRange}
          </p>
          <p className="text-xs leading-4 text-muted">{details.description}</p>
        </div>
        <CardPhoto variant="food" />
      </div>
    </article>
  );
}
