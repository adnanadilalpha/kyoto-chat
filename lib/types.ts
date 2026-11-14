export type DayPlan = {
  day: string;
  plan: string;
};

export type StayDetails = {
  destination: string;
  listingTitle: string;
  checkIn: string;
  checkOut: string;
  nightlyPriceUsd: number;
  description: string;
};

export type ExperienceDetails = {
  activityName: string;
  duration: string;
  dayPlan: DayPlan[];
};

export type FoodDetails = {
  restaurantName: string;
  mealType: string;
  priceRange: string;
  description: string;
};

export type StayCard = { cardType: "stay"; details: StayDetails };
export type ExperienceCard = {
  cardType: "experience";
  details: ExperienceDetails;
};
export type FoodCard = { cardType: "food"; details: FoodDetails };

export type SuggestionCard = StayCard | ExperienceCard | FoodCard;

export type UserMessage = {
  id: string;
  role: "user";
  text: string;
};

export type AssistantThinking = {
  id: string;
  role: "assistant";
  kind: "thinking";
};

export type AssistantCards = {
  id: string;
  role: "assistant";
  kind: "cards";
  cards: SuggestionCard[];
};

export type AssistantError = {
  id: string;
  role: "assistant";
  kind: "error";
  text: string;
};

export type ChatMessage =
  | UserMessage
  | AssistantThinking
  | AssistantCards
  | AssistantError;
