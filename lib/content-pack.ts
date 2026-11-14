/**
 * Data from Kyoto Weekend Prototype Content Pack.xlsx only.
 * Empty cells use the same filler as the mock reply.
 */
const FILLER = "Details coming soon";

function fill(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return FILLER;
  return String(value);
}

export const WEEKEND = {
  checkIn: "2025-04-11",
  checkOut: "2025-04-13",
  guests: 2,
  budgetNote:
    "Prices are USD for 2 guests, against a $600 reference budget for the weekend.",
  compiledBy: "Priya Raman (PM, Search), 2025-03-07",
} as const;

export const STAYS = [
  {
    id: "S1",
    listingTitle: "Restored machiya townhouse near Gion",
    propertyType: "Entire townhouse",
    neighbourhood: "Gion",
    nights: 2,
    pricePerNightUsd: 168,
    totalUsd: 366,
    rating: 4.92,
    reviewCount: 214,
    hostFirstName: "Kenji",
    highlight: "Private garden and cedar soaking tub",
    photo: "/photos/stay.jpg",
  },
  {
    id: "S2",
    listingTitle: "Quiet tatami room by the Kamo River",
    propertyType: "Private room in home",
    neighbourhood: "Shimogyo",
    nights: 2,
    pricePerNightUsd: 142,
    totalUsd: 312,
    rating: 4.88,
    reviewCount: 163,
    hostFirstName: "Yumi",
    highlight: "Riverside walk to Pontocho in 10 minutes",
    photo: "/photos/side-pontocho.jpg",
  },
  {
    id: "S3",
    listingTitle: "Bright two-room flat off Sanjo Street",
    propertyType: "Entire apartment",
    neighbourhood: "Nakagyo",
    nights: 2,
    pricePerNightUsd: 112,
    totalUsd: 249,
    rating: 4.71,
    reviewCount: 412,
    hostFirstName: "Haruto",
    highlight: "Two blocks from Nishiki Market",
    photo: "/photos/side-nishiki.jpg",
  },
  {
    id: "S4",
    listingTitle: "Design ryokan suite with garden view",
    propertyType: "Private room in ryokan",
    neighbourhood: "Higashiyama",
    nights: 2,
    pricePerNightUsd: 290,
    totalUsd: 612,
    rating: 4.97,
    reviewCount: 38,
    hostFirstName: "Emi",
    highlight: "Kaiseki breakfast served in your room",
    photo: "/photos/side-higashiyama.jpg",
  },
] as const;

export const EXPERIENCES = [
  {
    id: "E1",
    title: "Tea ceremony in a 100-year-old machiya",
    category: "Culture",
    hostFirstName: fill("Mei"),
    date: "2025-04-12",
    startTime: "10:30",
    durationHours: 2,
    pricePerGuestUsd: 58,
    totalFor2Usd: 116,
    rating: 4.96,
    meetingPoint: "Outside Gion-Shijo Station, exit 6",
    availability: "Spots open",
    photo: "/photos/experience.jpg",
  },
  {
    id: "E2",
    title: "Nishiki Market tasting walk with a local cook",
    category: "Food & drink",
    hostFirstName: fill("Takumi"),
    date: "2025-04-12",
    startTime: "11:00",
    durationHours: 3,
    pricePerGuestUsd: 85,
    totalFor2Usd: 170,
    rating: 4.91,
    meetingPoint: "Teramachi entrance to Nishiki Market",
    availability: "Spots open",
    photo: "/photos/side-nishiki.jpg",
  },
  {
    id: "E3",
    title: "Dawn walk through Fushimi Inari's upper gates",
    category: "Nature",
    hostFirstName: fill("Ren"),
    date: "2025-04-12",
    startTime: "06:00",
    durationHours: 2.5,
    pricePerGuestUsd: 38,
    totalFor2Usd: 76,
    rating: 4.99,
    meetingPoint: "Main torii gate, Fushimi Inari Taisha",
    availability: "Sold out",
    photo: "/photos/side-fushimi.jpg",
  },
  {
    id: "E4",
    title: "Throw a tea bowl in a Kiyomizu pottery studio",
    category: "Craft",
    hostFirstName: fill(null),
    date: "2025-04-12",
    startTime: "14:00",
    durationHours: 1.5,
    pricePerGuestUsd: 72,
    totalFor2Usd: 144,
    rating: 4.84,
    meetingPoint: "Gojozaka bus stop, Higashiyama side",
    availability: "Spots open",
    photo: "/photos/side-pottery.jpg",
  },
] as const;

export const FOODS = [
  {
    id: "F1",
    placeName: "Menya Inoichi",
    cuisine: "Ramen",
    neighbourhood: "Gion",
    meal: "Dinner",
    priceLevel: "$",
    estCostFor2Usd: 34,
    walkFromStayMin: 8,
    bookingNote: fill("No reservations - arrive before 18:00"),
    photo: "/photos/food.jpg",
  },
  {
    id: "F2",
    placeName: "Sagano Yudofu-tei",
    cuisine: "Tofu",
    neighbourhood: "Arashiyama",
    meal: "Lunch",
    priceLevel: "$$",
    estCostFor2Usd: 64,
    walkFromStayMin: 25,
    bookingNote: fill(null),
    photo: "/photos/side-tofu.jpg",
  },
  {
    id: "F3",
    placeName: "Nishiki Tamago & Skewer Stall",
    cuisine: "Market street food",
    neighbourhood: "Nishiki Market",
    meal: "Snack stop",
    priceLevel: "$",
    estCostFor2Usd: 30,
    walkFromStayMin: 14,
    bookingNote: fill("Cash only - most stalls close by 17:00"),
    photo: "/photos/side-nishiki.jpg",
  },
  {
    id: "F4",
    placeName: "Pontocho kaiseki counter",
    cuisine: "Kaiseki",
    neighbourhood: "Pontocho",
    meal: "Dinner",
    priceLevel: "$$$",
    estCostFor2Usd: 180,
    walkFromStayMin: 6,
    bookingNote: fill("Book 3 days ahead"),
    photo: "/photos/side-kaiseki.jpg",
  },
] as const;

export const PRIMARY_STAY = STAYS[0];
export const PRIMARY_EXPERIENCE = EXPERIENCES[0];
export const PRIMARY_FOOD = FOODS[0];
