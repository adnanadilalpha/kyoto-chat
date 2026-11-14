# Moderated Session Prototype Requirements: Trip-Planner Chat

This note sets out what a prototype link must meet before UX Research opens it in a moderated guest session.

## Session setups

| Setup | Device | Browser | Window width | Window type | Logged in |
|---|---|---|---|---|---|
| Phone | iPhone 14 | Safari | about 390px | Private window | Nothing (no Airbnb, no Vercel) |
| Laptop | 13-inch MacBook Air | Chrome | about 1440px | Incognito window | Nothing (no Airbnb, no Vercel) |

A private (or incognito) window is a browser window that keeps no saved logins or cookies. Hannah Brooks opens the link herself on each setup by tapping it from Slack. Guests never type a URL.

## What a prototype must do before it goes in front of a guest

On both setups, one typed trip request must show a thinking state first. It must then show three of three cards: a stay card, an Experience card and a food card. The three cards must look clearly different from each other, not one layout with the text swapped. At phone width, nothing may be cut off and nothing may need sideways scrolling.

The forced failure must show a friendly message and a 'Try again' button inside the assistant bubble. The chat must never be empty. That includes the moment of failure, the moment 'Try again' is pressed, and the moment after it. Pressing 'Try again' must bring the three cards back. Zero blank-chat moments is the standard.

Opening the link must need no install, no login and no configuration. The page must show visible wording that the trips are sample data and that nothing is booked. Research ethics requires this, because a guest must not believe a real booking is being made.

## Vercel links (from Kevin Marsh, Web Platform)

The GitHub repository is connected under the Search team's Vercel scope. A prototype deployed from a personal Vercel Hobby account follows the same rules. Every push to the main branch redeploys production automatically. Wait until the newest deployment shows as finished in the project's Deployments tab before testing. If you test too early, you may be testing the old version.

Vercel makes two kinds of link. Preview links are the long URLs with a hash and the team or user name in them. These links are protected by Vercel Deployment Protection, which asks visitors for a Vercel login, so never share them. Share only the project's production *.vercel.app domain. This is the link listed under Domains for the project in the Vercel dashboard. Before sharing it, open it in a private window to confirm it loads without a login.

## Who needs the link and when

| Item | Detail |
|---|---|
| Where to post | #search-trip-planner on Slack |
| Who it is for | Hannah Brooks, Tomás Herrera, Priya Raman, Daniel Okafor |
| Dry run | Thursday 13 March 2025 |
| First moderated guest sessions | 1 April 2025 |

The message that shares the link must say which request to type and how to trigger the failure without editing code. This lets anyone try both paths without having to ask.