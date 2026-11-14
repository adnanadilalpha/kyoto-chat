# Assistant Bubble Error Message Guidelines

This is the Airbnb Design Systems standard for how an in-chat assistant failure reads, looks and behaves. It was adopted in 2024 and is current as of March 2025. Rachel Nguyen (Content Designer) owns the wording rules. Aiko Tanaka (Design Systems Designer) owns the visual rules.

## What the message says

Describe what happened in the guest's terms, not the system's. Write "We couldn't put your plan together", not "Response failed to render". The message never suggests the guest or their request caused the problem. It keeps the chat's usual warm, plain voice.

| Rule | Limit |
|---|---|
| Lead line | 8 words or fewer |
| Supporting sentence | At most one, and it says what happens next |
| Banned in visible copy | error, failed, invalid, null, undefined, timeout, any status code (404, 500 and so on), "Oops" on its own |
| Punctuation | No exclamation marks |
| Blame | Never blames the guest or their request |

**Worked example: host calendar-sync failure**

| | Before | After |
|---|---|---|
| Lead line | Error 502: Calendar sync failed. | We couldn't update your calendar just now. |
| Supporting sentence | Invalid iCal token. Check your settings and resubmit. | Your bookings are safe, and you can try again. |
| Button | RETRY SYNC REQUEST | Try again |

The "before" version shows a status code and the banned words "error", "failed" and "invalid". It also hints that the host did something wrong, and its button label is in capitals. The "after" lead line is 7 words. It has one supporting sentence that says what comes next.

## The action button

Each error bubble has exactly one primary action. A primary action is the single main button. There are no secondary links or extra buttons. The label starts with a verb and is two words or fewer. It uses sentence case, which means only the first word is capitalised. Write "Try again", not "TRY AGAIN", "Retry request" or "Click here to retry". The button sits inside the assistant bubble, directly below the message. It never appears in a separate toast (a pop-up notice at the edge of the screen), a modal (a box that covers the page) or anywhere outside the bubble.

## How the bubble looks

The error is still an assistant reply. It keeps the same shape, corner radius, left alignment and avatar as a normal reply, so it reads as part of the conversation. Only the colours inside it change.

| Element | Rule | Tailwind CSS example |
|---|---|---|
| Bubble shape and position | Same classes as a normal assistant reply | Reuse the existing reply classes, e.g. `rounded-2xl`, `self-start`, `max-w-[80%]` |
| Background | Neutral only | `bg-gray-50` or `bg-white` |
| Border | Soft, thin | `border border-gray-200` |
| Message text | Dark neutral | `text-gray-800` |
| Red | Not allowed anywhere: no red fill, red text or red border | Never use `bg-red-*`, `text-red-*` or `border-red-*` |
| Banners | No warning-triangle or alert banners |, |
| Icon (optional) | Small and quiet, muted tone, never an alarm or warning icon | `h-4 w-4 text-gray-400` |
| Button | The chat's primary button style with comfortable padding, never a text link | Existing primary button classes plus `px-4 py-2.5 mt-3` |

## Accessibility minimums

| Requirement | Rule | How it is applied |
|---|---|---|
| Screen reader announcement | The message sits in a polite live region. A live region is an area that screen readers read aloud when it changes, and "polite" means it waits until the reader finishes speaking. | `aria-live="polite"` on the message container. The container is already on the page before the message text appears. |
| Focus ring | The button shows a visible outline when someone moves to it with the keyboard | `focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2` |
| Tap target | At least 44px tall on phones | `min-h-[44px]` on the button |
| Text contrast | Meets WCAG AA (Web Content Accessibility Guidelines, level AA): 4.5:1 against the bubble background | `text-gray-800` on `bg-gray-50` or `bg-white` passes. Light greys such as `text-gray-400` are allowed for the icon only, never for text. |
| Decorative icon | Hidden from screen readers | `aria-hidden="true"` on the icon |