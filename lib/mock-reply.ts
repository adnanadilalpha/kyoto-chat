import type { SuggestionCard } from "./types";

const FILLER = "Details coming soon";

function fill(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return FILLER;
  return String(value);
}

/**
 * One row per sheet from Kyoto Weekend Prototype Content Pack.xlsx
 * Stays S1 · Experiences E1 · Food F1
 * Empty workbook cells use filler text.
 */
export const MOCK_CARDS: SuggestionCard[] = [
  {
    cardType: "stay",
    details: {
      destination: fill("Gion, Kyoto"),
      listingTitle: fill("Restored machiya townhouse near Gion"),
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
      nightlyPriceUsd: 168,
      description: fill("Private garden and cedar soaking tub"),
    },
  },
  {
    cardType: "experience",
    details: {
      activityName: fill("Tea ceremony in a 100-year-old machiya"),
      duration: fill("2 hours"),
      dayPlan: [
        {
          day: "Sat 12 Apr",
          plan: fill("Outside Gion-Shijo Station, exit 6 · Culture with Mei"),
        },
        {
          // Workbook has no Sun row for this experience
          day: "Sun 13 Apr",
          plan: FILLER,
        },
      ],
    },
  },
  {
    cardType: "food",
    details: {
      restaurantName: fill("Menya Inoichi"),
      mealType: fill("Dinner"),
      priceRange: fill("$"),
      description: fill("No reservations - arrive before 18:00"),
    },
  },
];

export const ERROR_MESSAGE =
  "Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go.";

export function formatStayDates(checkIn: string, checkOut: string): string {
  const inDate = new Date(`${checkIn}T12:00:00`);
  const outDate = new Date(`${checkOut}T12:00:00`);
  const nights = Math.round(
    (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return `${fmt(inDate)} – ${fmt(outDate)} · ${nights} night${nights === 1 ? "" : "s"}`;
}
