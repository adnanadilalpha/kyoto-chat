import { ExperienceCard } from "./cards/ExperienceCard";
import { FoodCard } from "./cards/FoodCard";
import { StayCard } from "./cards/StayCard";
import type { SuggestionCard } from "@/lib/types";

export function SuggestionCards({ cards }: { cards: SuggestionCard[] }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {cards.map((card) => {
        switch (card.cardType) {
          case "stay":
            return <StayCard key="stay" details={card.details} />;
          case "experience":
            return <ExperienceCard key="experience" details={card.details} />;
          case "food":
            return <FoodCard key="food" details={card.details} />;
        }
      })}
    </div>
  );
}
