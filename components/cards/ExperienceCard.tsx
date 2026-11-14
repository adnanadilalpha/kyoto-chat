import { CardPhoto } from "@/components/PhotoPlaceholder";
import type { ExperienceDetails } from "@/lib/types";

export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-(--shadow-card) ring-1 ring-black/5">
      <div className="flex min-h-36">
        <CardPhoto variant="experience" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3.5">
          <div>
            <h3 className="text-[15px] leading-5 font-extrabold tracking-tight text-ink">
              {details.activityName}
            </h3>
            <p className="mt-0.5 text-xs text-muted">{details.duration}</p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {details.dayPlan.map((item) => {
              const label = item.day.split(" ")[0]?.toUpperCase() ?? "DAY";
              return (
                <li key={item.day} className="flex gap-2 text-xs">
                  <span className="w-8 shrink-0 font-extrabold tracking-wide text-violet">
                    {label}
                  </span>
                  <span className="leading-4 text-muted">
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
