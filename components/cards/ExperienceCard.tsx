import type { ExperienceDetails } from "@/lib/types";

export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex min-h-40">
        {/* Tall strip image placeholder on the left */}
        <div
          className="w-16 shrink-0 self-stretch bg-stone-200 sm:w-20"
          aria-hidden
          role="img"
          aria-label="Experience photo placeholder"
        />
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl leading-tight tracking-tight text-ink">
              {details.activityName}
            </h3>
            <p className="text-sm text-slate">{details.duration}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {details.dayPlan.map((item) => {
              const label = item.day.split(" ")[0]?.toUpperCase() ?? "DAY";
              return (
                <li key={item.day} className="flex gap-3 text-sm">
                  <span className="w-9 shrink-0 font-semibold tracking-wide text-violet">
                    {label}
                  </span>
                  <span className="leading-relaxed text-slate">
                    <span className="sr-only">{item.day}: </span>
                    {item.plan}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
