# Dev Reference — Deferred Features & Notes

## data-prefill (Contact Form Pre-population)

**Status:** Implemented in markup, handler not yet wired up.
**Original intent:** When a user clicks a Problem card or Session tier CTA, the booking/contact form should pre-populate with a contextual message body based on `data-prefill`.

The `CalendarEmbed` replaced the original `BookingForm` (see commit history). If a native booking form returns, these prefill strings are ready to go.

### Problem card prefills (`src/pages/index.astro` — `PROBLEMS` array)

| Eyebrow | Short pain | Prefill text |
|---|---|---|
| Relationships | My relationship feels broken. | `"Hi Doug,\n\nMy relationship feels broken right now..."` |
| Life direction | I don't know which direction to take. | `"Hi Doug,\n\nI'm at a point where I genuinely don't know which direction to take..."` |
| Patterns & blocks | I keep repeating the same patterns. | `"Hi Doug,\n\nI keep ending up in the same place..."` |
| Future & timing | I need to know what's ahead. | `"Hi Doug,\n\nI'm at a point where I really need to understand what's coming..."` |

Full strings are in `PROBLEMS[n].prefill` in the frontmatter.

### Session tier prefills (`src/pages/index.astro` — `SESSIONS` array)

| Tier | CTA label | Prefill text |
|---|---|---|
| A First Conversation | Start Here | `"Hi Doug,\n\nI've been thinking about reaching out for a while..."` |
| A Clarity Session | Book a Session | `"Hi Doug,\n\nI'm at a point where I need to understand what's actually happening..."` |
| Private Ongoing Guidance | Get in Touch | `"Hi Doug,\n\nI'm going through an extended period of change..."` |

Full strings are in `SESSIONS[n].prefill` in the frontmatter.

### How to wire it up

1. Listen for `click` on `[data-prefill]` elements.
2. Read `event.currentTarget.dataset.prefill`.
3. Fire `document.dispatchEvent(new CustomEvent("clarity:prefill", { detail: { message: prefill } }))`.
4. The `BookingForm` island listens for `clarity:prefill` and sets its textarea value.

The custom event name `clarity:prefill` is already defined as `PREFILL_EVENT` in `index.astro`.

---

## Magic Anchor Links

These `href` values are used in CTAs and nav links. Sections must have matching `id` attributes.

| Anchor | Status | Location |
|---|---|---|
| `#about` | OK — `id="about"` exists | `src/pages/index.astro` ~line 246 |
| `#sessions` | OK — `id="sessions"` exists | `src/pages/index.astro` ~line 297 |
| `#faq` | OK — `id="faq"` exists | `src/pages/index.astro` ~line 364 |
| `#contact` | **MISSING** — no element has this id | See note below |
| `#forecasts` | Not verified — used in `ASTRO_NAV` | `src/pages/astro.astro` |
| `#consultations` | Not verified — used in `ASTRO_NAV` | `src/pages/astro.astro` |
| `#compatibility` | Not verified — used in `ASTRO_NAV` | `src/pages/astro.astro` |

### `#contact` TODO

Tier CTAs in `SESSIONS` (e.g. "Book a Session" buttons) link to `href="#contact"`.
`CalendarEmbed.astro` renders the booking section but has no `id`. Either:
- Add `id="contact"` to `<section>` in `CalendarEmbed.astro` (simplest), or
- Change tier CTA `href` to whatever ID the calendar section gets.

> **Fixed:** `id="contact"` was added to `CalendarEmbed.astro` as part of the initial cleanup pass.
