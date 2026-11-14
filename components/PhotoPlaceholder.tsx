import Image from "next/image";

type Variant = "stay" | "experience" | "food";

const photos: Record<
  Variant,
  { src: string; alt: string; sizes: string; className: string }
> = {
  stay: {
    src: "/photos/stay.jpg",
    alt: "Traditional Kyoto machiya rooftops along a hillside path",
    sizes: "(max-width: 420px) 100vw, 420px",
    className: "relative h-28 w-full sm:h-32",
  },
  experience: {
    src: "/photos/experience.jpg",
    alt: "Freshly whisked matcha for a tea ceremony",
    sizes: "80px",
    className: "relative w-18 shrink-0 self-stretch min-h-36",
  },
  food: {
    src: "/photos/food.jpg",
    alt: "Bowl of ramen with chashu and soft-boiled egg",
    sizes: "56px",
    className:
      "relative size-14 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white",
  },
};

export function CardPhoto({ variant }: { variant: Variant }) {
  const photo = photos[variant];
  return (
    <div className={photo.className}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={photo.sizes}
        className="object-cover"
        priority={variant === "stay"}
      />
    </div>
  );
}
