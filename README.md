# Live link

**https://kyoto-chat.vercel.app**

# Kyoto Trip Planner

Chat prototype that suggests a **stay**, **experience**, and **meal** for a two-night weekend in Kyoto. Suggestions only — sample data, nothing is booked.

## Moderated session checklist

Rules from *Moderated Session Prototype Requirements: Trip-Planner Chat*, verified in a private/incognito window on phone (~390px) and laptop (~1440px).

| Rule | Phone | Laptop |
|---|---|---|
| Opens with no install, login, or configuration | ✓ | ✓ |
| Visible wording that trips are sample data and nothing is booked | ✓ | ✓ |
| One trip request shows thinking, then 3 of 3 cards (stay, Experience, food) with clearly different layouts | ✓ | ✓ |
| At phone width, nothing cut off and no sideways scroll | ✓ | — |
| Forced failure shows a friendly message and Try again in the assistant bubble | ✓ | ✓ |
| Zero blank-chat moments (failure, Try again press, and after) | ✓ | ✓ |
| Try again brings the three cards back | ✓ | ✓ |

### Evidence screenshots

| Setup | Cards | Error bubble | Cards after retry |
|---|---|---|---|
| Phone | ![phone cards](docs/screenshot-phone-cards.png) | ![phone error](docs/screenshot-phone-error.png) | ![phone retry](docs/screenshot-phone-retry.png) |
| Laptop | ![laptop cards](docs/screenshot-laptop-cards.png) | ![laptop error](docs/screenshot-laptop-error.png) | ![laptop retry](docs/screenshot-laptop-retry.png) |

## Team message (#search-trip-planner)

Kyoto Trip Planner is ready for the dry run (Thu 13 Mar) and guest sessions (1 Apr). Live: https://kyoto-chat.vercel.app — no login. Happy path: type “Plan a weekend in Kyoto for two”. Forced failure: open https://kyoto-chat.vercel.app/?fail=once, send the same request, tap Try again (no code edits). Each new trip request on that link re-arms the failure — no reload needed between guests. Suggestions only — sample data, nothing booked. cc Hannah Brooks, Tomás Herrera, Priya Raman, Daniel Okafor.

## Forced failure

Open [`/?fail=once`](https://kyoto-chat.vercel.app/?fail=once), send a trip request, then tap **Try again** to see the three cards. Send another trip request anytime to re-arm the failure without reloading.

## What’s included

- Header, scrolling thread, and locked send box while the assistant “thinks”
- Pulsing dots in the reply bubble before cards appear
- Mock reply from one row per sheet of the *Kyoto Weekend Prototype Content Pack* (Stays S1, Experiences E1, Food F1), with filler text for empty fields
- Broken mock payload wired to `?fail=once`; the parser cannot turn it into cards, so the friendly error bubble appears
- Three separate card layouts (stay, experience, food) plus a quiet workbook explore rail
- **Try again** resends the same request and skips the broken answer

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and send: `Plan a weekend in Kyoto for two`.
