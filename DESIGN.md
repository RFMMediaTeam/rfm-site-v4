# RFM Site v2 — Design System

## The Concept: "Living Scripture"

Every design choice serves one question:
**"Would this feel at home in a beautifully produced faith publication?"**

Not another dark-navy + neon-gold church template. Not a Bootstrap-shaped
Shopify look-alike for the store. Something warmer, quieter, more *considered.*
A modern faith publication that also happens to run a store — think *Wired × Aesop
× a leather-bound Bible.*

## Palette — rationale

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0908` | Primary background. Near-black with warmth, not the cold `#050816` of v1. |
| `--ink-2` | `#14110F` | Card surfaces, dropdowns, cart drawer. |
| `--ink-3` | `#1F1B17` | Raised surfaces, hover states. |
| `--parchment` | `#F5EDE0` | Primary text on ink. Warm off-white — reads like old-book paper against ink. |
| `--parchment-2` | `#E8DDC9` | Body copy, softer contrast. |
| `--parchment-3` | `#C9B896` | Meta text, captions, timestamps. |
| `--gold` | `#C9992B` | Burnished, not neon. Signature. Used for eyebrow labels, accents, hairlines. |
| `--gold-bright` | `#E4B547` | Hover state, italicized emphasis in headlines. |
| `--gold-deep` | `#8A6516` | Pressed / dark borders. |
| `--oxblood` | `#7A1F1F` | The "Give" CTA. Sacred emphasis. Used sparingly — its weight matters. |
| `--sage` | `#7C8471` | Youth / growth / kids sections. Reserved for future kids/youth pages. |
| `--hairline` | `rgba(245,237,224,0.10)` | 1px dividers everywhere. Barely visible on purpose. |

## Typography

Three families. Each has one job.

- **Fraunces** (variable serif) — display headings. `opsz` at 144 for that expressive
  optical-size treatment, weights 300–500. Letter-spacing `-0.02em` at display sizes.
- **Instrument Serif** — italic pull-quotes, editorial emphasis inside headlines,
  price labels in the store. It's the "voice" of the site.
- **Inter** — everything UI: nav, buttons, labels, body copy where prose isn't dominant.

Scale is **fully fluid** — `clamp(min, preferred, max)` on every step from `--step--2`
to `--step-7`. No breakpoint jumps. Works from 320px to 4K.

Two special text treatments:
- **Eyebrow labels** — 12px, uppercase, letter-spacing 0.24em, gold, prefixed by a
  24px hairline `::before`. Used above every section heading.
- **Drop-caps** — the opening `<p>` in any `.prose` container gets an automatic
  4em Fraunces gold drop-cap on `::first-letter`.

## Layout

- Three wrapper widths — `--wrap` (1360), `--wrap-narrow` (760), `--wrap-wide` (1600).
- `.grid-editorial` — 1.4fr / 1fr asymmetric split. Used constantly. Feels
  intentional in a way that 50/50 never does.
- `.split` and `.split.reverse` — image + text with `direction: rtl` trick.
- `.pillars` — four equal cells joined by 1px hairlines, black-on-black-on-black. No
  drop shadows, no floating cards, no clip-paths. Just space and hairlines.

## Motion

- Reveal is **opt-in only** via `[data-reveal]`. Anything above the fold on load
  reveals immediately (no delayed pop-in on page load).
- `[data-reveal="mask"]` gives the child element a 105% translateY inside an
  overflow-hidden parent — text mask reveal without needing SplitText.
- Cursor-tracked hero spotlight — `mousemove` throttled by rAF, writes CSS variables
  `--mx` and `--my` on `.hero-spotlight`. Zero jank.
- All motion respects `@media (prefers-reduced-motion: reduce)`.
- Two easing curves cover everything: `--ease-out-quart` for most, `--ease-in-out-expo`
  for large slides (nav drawer, cart drawer).

## The Verse Rail (signature element)

Fixed right-side element, `writing-mode: vertical-rl`, cycles through five verses
based on scroll progress. Hidden below 1200px. Small opacity fade on change, not a
distraction. This is the piece that will make the site feel like *nothing else in
its category.*

## The Store — editorial commerce

- Categories are **"Chapters."** Numbered `Ch. 01`, `Ch. 02` in italic Instrument
  Serif. Each is a big generous card with a radial-gradient hover state.
- Product cards are quiet — 4:5 aspect ratio, small collection eyebrow, one line for
  the name, italic price. No fake urgency, no "3 people are viewing this."
- The cart is a **right-side drawer**, glassy, calm. Empty state says "Your bag is
  quiet."
- **Checkout is WhatsApp.** The cart JSON is formatted into a message and opened in
  wa.me/919000320028 — the RFM team confirms manually. This is the honest solution
  for a ministry that doesn't have a payment gateway yet, and lets you launch the
  store *now* while Razorpay is being set up.

## Accessibility

- Every interactive element has an `aria-label` or visible label.
- Focus-visible with a 2px gold outline, offset 3px.
- Dropdowns use `aria-expanded` on the trigger and are keyboard-navigable.
- Popup and cart drawer close on Escape.
- Contrast ratios all AA at minimum against the ink background.
- Skip-link can be added easily (one-liner) but isn't there yet — flag for follow-up.

## What was rejected (and why)

- **Neumorphism / glass everywhere** — reads dated in 2026 and cheap on a ministry site.
- **Big rounded corners** — chose `--r-sm: 4px` as default. Editorial, not app-y.
- **Gradient headings** — used sparingly; italic gold color is the emphasis.
- **A carousel on the homepage** — v1 had a 4-slide auto-advancing hero. Replaced with
  a single confident hero + scripture ticker. Carousels are where good content goes
  to be ignored.
- **AI-illustrated hero images** — real photography of Pastor Raja and the church is
  more honest and more moving.
- **Emoji in section headings** — v1's homepage has ✝ 📖 🤝 🌱 icons. Replaced with
  numbered typographic pillars. Feels less like a PowerPoint.

## The one rule

If in doubt, **use more space and fewer elements.**
Editorial design is subtraction.
