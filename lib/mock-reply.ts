import {
  PRIMARY_EXPERIENCE,
  PRIMARY_FOOD,
  PRIMARY_STAY,
} from "./content-pack";
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
      destination: fill(`${PRIMARY_STAY.neighbourhood}, Kyoto`),
      listingTitle: fill(PRIMARY_STAY.listingTitle),
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
      nightlyPriceUsd: PRIMARY_STAY.pricePerNightUsd,
      description: fill(PRIMARY_STAY.highlight),
    },
  },
  {
    cardType: "experience",
    details: {
      activityName: fill(PRIMARY_EXPERIENCE.title),
      duration: fill(`${PRIMARY_EXPERIENCE.durationHours} hours`),
      dayPlan: [
        {
          day: "Sat 12 Apr",
          plan: fill(
            `${PRIMARY_EXPERIENCE.meetingPoint} · ${PRIMARY_EXPERIENCE.category} with ${PRIMARY_EXPERIENCE.hostFirstName}`,
          ),
        },
        {
          day: "Sun 13 Apr",
          plan: FILLER,
        },
      ],
    },
  },
  {
    cardType: "food",
    details: {
      restaurantName: fill(PRIMARY_FOOD.placeName),
      mealType: fill(PRIMARY_FOOD.meal),
      priceRange: fill(PRIMARY_FOOD.priceLevel),
      description: fill(PRIMARY_FOOD.bookingNote),
    },
  },
];

export const ERROR_MESSAGE =
  "Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go.";

function parseStayDate(iso: string) {
  return new Date(`${iso}T12:00:00`);
}

export function stayNightCount(checkIn: string, checkOut: string): number {
  const inDate = parseStayDate(checkIn);
  const outDate = parseStayDate(checkOut);
  return Math.round(
    (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function formatStayHeadline(checkIn: string, checkOut: string): string {
  const nights = stayNightCount(checkIn, checkOut);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  return `${fmt(parseStayDate(checkIn))} – ${fmt(parseStayDate(checkOut))} · ${nights} night${nights === 1 ? "" : "s"}`;
}

export function formatStayDay(iso: string): { weekday: string; date: string } {
  const d = parseStayDate(iso);
  return {
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    date: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}
