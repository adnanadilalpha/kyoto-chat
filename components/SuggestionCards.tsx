import { ExploreRail } from "./ExploreRail";
import { ExperienceCard } from "./cards/ExperienceCard";
import { FoodCard } from "./cards/FoodCard";
import { StayCard } from "./cards/StayCard";
import type { SuggestionCard } from "@/lib/types";

export function SuggestionCards({ cards }: { cards: SuggestionCard[] }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,24rem)_minmax(0,16rem)] lg:gap-5 lg:justify-center">
      <div className="flex w-full max-w-sm flex-col gap-3 justify-self-center lg:justify-self-end">
        {cards.map((card) => {
          switch (card.cardType) {
            case "stay":
              return <StayCard key="stay" details={card.details} />;
            case "experience":
              return (
                <ExperienceCard key="experience" details={card.details} />
              );
            case "food":
              return <FoodCard key="food" details={card.details} />;
          }
        })}
      </div>
      <ExploreRail />
    </div>
  );
}
