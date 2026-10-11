# Clarity with Doug

Live site: **https://claritywithdoug.com**

Built for Clarity with Doug, a relationship-clarity coaching practice.

Static Astro site for a relationship & life-clarity coach (Vedic + Western astrology, life coaching), with PayPal checkout, contact/booking flows, SEO/structured data, and analytics wiring.

## Screenshots

| Page | Screenshot |
|---|---|
| Homepage hero | <img src="public/screenshots/home-hero.png" alt="Homepage hero" width="720"> |
| Services | <img src="public/screenshots/services.png" alt="Services" width="720"> |
| Checkout | <img src="public/screenshots/checkout.png" alt="Checkout" width="720"> |

Live site is the source of truth — https://claritywithdoug.com

## Stack

- **Astro 6** + TypeScript (static output, no backend)
- **Tailwind CSS v4** (+ `@tailwindcss/typography`)
- **Bun** (install/build/preview)
- Self-hosted fonts (`@fontsource-variable/inter`, `playfair-display`)
- Integrations: `@astrojs/sitemap`
- Third parties (all keyed via env): **PayPal JS SDK** (checkout), **Web3Forms** (contact + checkout order email), **Google Tag Manager** (analytics, optional)

## Quickstart

```bash
bun install
cp .env.example .env   # fill in real keys for full checkout/contact behavior
bun run dev            # http://localhost:4321
bun run build          # static output in dist/
bun run preview        # serve dist/ locally
```

### Env setup

| Var | Used in | Notes |
|---|---|---|
| `PUBLIC_PAYPAL_CLIENT_ID` | `src/components/CheckoutForm.astro` | Client ID; unset = `"sb"` sandbox fallback. |
| `PUBLIC_WEB3FORMS_CHECKOUT_KEY` | `src/components/CheckoutForm.astro` | Order-notification key; placeholder fallback for local dev. |
| `PUBLIC_WEB3FORMS_CONTACT_KEY` | `src/components/ContactForm.astro` | Contact-form key; placeholder fallback for local dev. |
| `PUBLIC_GTM_ID` | `src/layouts/Base.astro` | Container ID (`GTM-XXXXXXX`); empty = GTM omitted. |

`.env` is gitignored; production values come from CI/host env, never committed. Empty `PUBLIC_GTM_ID` omits the GTM snippet.

## Structure

```
src/
  pages/          index.astro  services.astro  about.astro  contact.astro
                  checkout.astro  astro.astro (redirect → /services)  blog/
  components/     CheckoutForm.astro  ContactForm.astro  Header/Footer/StickyContact
  layouts/        Base.astro (head, SEO, schema, GTM)  BlogPost.astro
  lib/            offers.ts (products/pricing)
  content/blog/   Markdown posts (content collections)
  styles/         global.css (Tailwind v4 tokens)
public/           favicon, og image, robots.txt, llms.txt, screenshots/
```

Key flows:

| Route | Behavior |
|---|---|
| `/services` | product cards → `/checkout?product=<slug>` |
| `/checkout` | birth-details form → PayPal buttons → Web3Forms order email |
| `/contact` | WhatsApp deep-link, or Web3Forms email with honeypot |
| footer newsletter | `mailto:` compose (no backend) |

## Accessibility / SEO

- Skip-to-content link, semantic landmarks, labeled required fields, `aria-live` status regions, focus-visible rings, honeypot `botcheck` (no CAPTCHA).
- Canonical URLs, per-page titles/descriptions, OG + Twitter cards, sitemap, `robots.txt`, JSON-LD graph.
- GA4-via-GTM events: `cta_clicked`, `whatsapp_click`, `phone_click`, `email_click`, `form_submitted`, `begin_checkout`, `purchase`.
