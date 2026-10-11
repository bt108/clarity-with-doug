# CLAUDE.md — Doug Greenberg | Relationship & Life Clarity

Multi-section static site for Doug Greenberg — relationship & life clarity coach and Vedic astrologer.
**Email:** contact@claritywithdoug.com | **Phone/WhatsApp:** +1 727-308-9422

---

## Stack

- **Astro** + TypeScript, Tailwind CSS v4, Bun
- Static `.astro` components + vanilla client scripts (no framework islands)
- Icons: inline SVG (no icon library)
- Fonts: self-hosted via `@fontsource-variable/playfair-display` + `inter`
- Deploy: static files only (`astro build`), no backend

## Key Files

| File | Purpose |
|---|---|
| `src/pages/index.astro` | Coaching landing page (/) |
| `src/pages/astro.astro` | Astrology services page (/astro) |
| `src/pages/blog/index.astro` | Blog index (/blog) |
| `src/pages/blog/[id].astro` | Blog post template |
| `src/layouts/Base.astro` | Base HTML layout (head, header, footer) |
| `src/layouts/BlogPost.astro` | Blog post layout |
| `src/components/Header.astro` | Site header |
| `src/components/Footer.astro` | Site footer |
| `src/components/CheckoutForm.astro` | Checkout flow (PayPal SDK + Web3Forms, keys via env) |
| `src/components/ContactForm.astro` | Contact form (WhatsApp + Web3Forms via env) |
| `src/components/StickyContact.astro` | Fixed WhatsApp button |
| `src/styles/global.css` | Color tokens, fonts, base styles |
| `src/content/blog/` | Markdown blog posts |
| `src/content/blog/_template.md` | Template for new posts (draft: true) |
| `src/content.config.ts` | Content Collections schema |
| `src/assets/` | `doug.webp` (hero), other images |

## Astro Rules

- `.astro` files use `class=` (standard HTML)
- Interactive components are `.astro` + inline `<script>` (no framework islands)
- Use `is:inline` for head/global scripts that must not be bundled

## Blog workflow (non-technical editor)

1. Go to `src/content/blog/` on GitHub
2. Open `_template.md`, copy raw content
3. Create new file: `my-post-title.md`
4. Paste template, update frontmatter (title, description, pubDate, tags)
5. Set `draft: false`
6. Write content in Markdown
7. Commit to `main` → auto-deploys

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--primary` | `oklch(0.44 0.14 38)` | Terracotta — CTAs, accents |
| `--primary-foreground` | `oklch(0.97 0.022 85)` | Cream — text on terracotta |
| `--gold` | `oklch(0.52 0.13 65)` | Amber — eyebrows, borders, icons |
| `--background` | `oklch(0.975 0.018 85)` | Warm cream page bg |
| `--cream` | `oklch(0.94 0.028 82)` | Section tints |
| `--ink` | `oklch(0.22 0.02 30)` | Headings |
| `--muted-foreground` | `oklch(0.45 0.03 40)` | Body copy — never below `/80` opacity |

- `text-gold` on `bg-primary` fails WCAG AA — use `text-primary-foreground/85` instead
- Never use `text-muted-foreground` below `/80` opacity

## Typography & Layout

- Headings: `font-serif text-4xl leading-tight text-ink sm:text-5xl`
- Eyebrow: `text-xs uppercase tracking-[0.28em]`
- Brand subtitle (header/footer tagline): `tracking-[0.18em]` — intentionally tighter, do not "fix"
- Italic serif: quotations only (blockquotes, pull quotes)
- Max content width: `max-w-7xl`, padding: `px-6 lg:px-10`
- Cards: `rounded-2xl border border-border`, content `p-7`, display `p-8`

## Site Structure

```
/          → Coaching landing page
/astro     → Astrology services (forecasts, consultations, compatibility)
/blog      → Blog index
/blog/[id] → Blog post
```

## Dev Commands

```bash
bun run dev
bun run build   # verify before committing
```

## Git

- Sentence-case imperative commit messages
- Co-author: none.
- Branch: `main`, push directly (currently on `feat/astro-rebuild`)

## Do Not Re-add

React, TanStack Router/Start, Radix components, `preact/compat`, `tw-animate-css`, `vite` directly, birth details form fields, Testimonials section, HowItWorks section, Qualifier section, stats banner, marquee animation.
