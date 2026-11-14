import { MOCK_CARDS } from "./mock-reply";
import type {
  ExperienceDetails,
  FoodDetails,
  StayDetails,
  SuggestionCard,
} from "./types";

/**
 * Fake broken assistant payload — wrong keys, no cardType / details.
 * The app cannot turn this into Stay / Experience / Food cards.
 */
export const BROKEN_MOCK_RESPONSE: unknown = {
  status: "ok",
  items: [
    { type: "listing", title: "Somewhere in Kyoto", price: null },
    { activity: "walk", when: "Saturday" },
    { place: "a stall", meal: true },
  ],
};

/** Healthy sample reply the parser accepts. */
export const HEALTHY_MOCK_RESPONSE: unknown = { cards: MOCK_CARDS };

function isStayDetails(details: unknown): details is StayDetails {
  if (!details || typeof details !== "object") return false;
  const d = details as Record<string, unknown>;
  return (
    typeof d.destination === "string" &&
    typeof d.listingTitle === "string" &&
    typeof d.checkIn === "string" &&
    typeof d.checkOut === "string" &&
    typeof d.nightlyPriceUsd === "number" &&
    typeof d.totalUsd === "number" &&
    typeof d.description === "string"
  );
}

function isExperienceDetails(details: unknown): details is ExperienceDetails {
  if (!details || typeof details !== "object") return false;
  const d = details as Record<string, unknown>;
  return (
    typeof d.activityName === "string" &&
    typeof d.duration === "string" &&
    Array.isArray(d.dayPlan)
  );
}

function isFoodDetails(details: unknown): details is FoodDetails {
  if (!details || typeof details !== "object") return false;
  const d = details as Record<string, unknown>;
  return (
    typeof d.restaurantName === "string" &&
    typeof d.mealType === "string" &&
    typeof d.priceRange === "string" &&
    typeof d.description === "string"
  );
}

/**
 * Turns a mock assistant payload into suggestion cards.
 * Throws when the shape cannot produce stay → experience → food.
 */
export function parseAssistantReply(payload: unknown): SuggestionCard[] {
  if (!payload || typeof payload !== "object") {
    throw new Error("unusable");
  }

  const record = payload as Record<string, unknown>;
  const rawList = Array.isArray(payload)
    ? payload
    : Array.isArray(record.cards)
      ? record.cards
      : null;

  if (!rawList || rawList.length < 3) {
    throw new Error("unusable");
  }

  const cards: SuggestionCard[] = [];

  for (const item of rawList) {
    if (!item || typeof item !== "object") throw new Error("unusable");
    const { cardType, details } = item as {
      cardType?: unknown;
      details?: unknown;
    };

    if (cardType === "stay" && isStayDetails(details)) {
      cards.push({ cardType: "stay", details });
      continue;
    }
    if (cardType === "experience" && isExperienceDetails(details)) {
      cards.push({ cardType: "experience", details });
      continue;
    }
    if (cardType === "food" && isFoodDetails(details)) {
      cards.push({ cardType: "food", details });
      continue;
    }

    throw new Error("unusable");
  }

  if (cards.map((c) => c.cardType).join(",") !== "stay,experience,food") {
    throw new Error("unusable");
  }

  return cards;
}
