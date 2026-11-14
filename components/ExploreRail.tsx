import Image from "next/image";
import { EXPERIENCES, FOODS, STAYS } from "@/lib/content-pack";

function Section({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1.5">
      <h3 className="text-[10px] font-semibold tracking-wide text-muted uppercase">
        {eyebrow}
      </h3>
      {children}
    </section>
  );
}

function PhotoTile({
  src,
  title,
  meta,
}: {
  src: string;
  title: string;
  meta: string;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-1">
      <div className="relative h-14 w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={title}
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>
      <figcaption className="min-w-0">
        <p className="truncate text-[11px] font-medium text-ink">{title}</p>
        <p className="line-clamp-2 text-[10px] leading-3 text-muted">{meta}</p>
      </figcaption>
    </figure>
  );
}

function ListRow({
  src,
  title,
  meta,
}: {
  src: string;
  title: string;
  meta: string;
}) {
  return (
    <li className="flex gap-2">
      <div className="relative size-9 shrink-0 overflow-hidden rounded-md">
        <Image src={src} alt={title} fill sizes="36px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-ink">{title}</p>
        <p className="truncate text-[10px] text-muted">{meta}</p>
      </div>
    </li>
  );
}

export function ExploreRail() {
  const areas = STAYS.filter((s) => s.id !== "S1");
  const moreDo = EXPERIENCES.filter((e) => e.id !== "E1");
  const moreEat = FOODS.filter((f) => f.id !== "F1");

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-xl border border-line-soft bg-white/70 p-3 lg:sticky lg:top-4">
      <p className="text-[11px] text-muted">
        More from the pack · other sheet rows
      </p>

      <Section eyebrow="Areas & walks">
        <div className="grid grid-cols-3 gap-2">
          {areas.map((s) => (
            <PhotoTile
              key={s.id}
              src={s.photo}
              title={s.neighbourhood}
              meta={s.highlight}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="Things to do">
        <ul className="flex flex-col gap-2">
          {moreDo.map((e) => (
            <ListRow
              key={e.id}
              src={e.photo}
              title={e.title}
              meta={`${e.category} · ${e.durationHours}h · ${e.availability}`}
            />
          ))}
        </ul>
      </Section>

      <Section eyebrow="Foods to try">
        <div className="grid grid-cols-3 gap-2">
          {moreEat.map((f) => (
            <PhotoTile
              key={f.id}
              src={f.photo}
              title={f.placeName}
              meta={`${f.cuisine} · ${f.meal}`}
            />
          ))}
        </div>
      </Section>
    </aside>
  );
}
