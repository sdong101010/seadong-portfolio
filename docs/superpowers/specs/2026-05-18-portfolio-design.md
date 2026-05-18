# Sea Dong Portfolio — Design Spec

**Date:** 2026-05-18
**Owner:** Sea Dong
**Status:** Draft for review

## Goal

A personal portfolio site at a Heroku-hosted URL that lets anyone landing on it quickly grok what Sea Dong builds and dig into individual projects. Audience is general public — Salesforce community, internal colleagues, and anyone else who finds it.

Success = a visitor scans the homepage in 30 seconds, picks a project that interests them, and on the detail page sees enough media + prose to understand what it does and why without having to clone the repo.

## Non-goals

- No CMS, admin UI, or runtime content editing — MDX in repo is the source of truth.
- No auth, contact form, comments, search, RSS for v1.
- No analytics for v1 (can add Plausible/Umami later).
- No CDN beyond Heroku's defaults.
- No blog or long-form writing surface — projects only.

## Scope of v1

The 10 existing projects under `~/projects/`:

| Slug | Project dir | Likely demo type |
|---|---|---|
| af-labs | afLabs | carousel |
| af-vibe | afVibe | carousel |
| agentforce-sales-coach-grounding | agentforce-sales-coach-grounding | carousel or gif |
| automation-playground | automation-playground | carousel |
| bloomberg-poc | Bloomberg POC | iframe (slide deck at `presentation/index.html`) |
| ecs-cdp-pot | ecs-cdp-pot | carousel |
| meeting-copilot | meeting-copilot | gif (desktop app) |
| models-api-lwc | ModelsAPILWC | carousel |
| org-roast | org-roast | iframe (deployed web app) if running, else gif |
| salesforce-mcp-bridge | salesforce-mcp-bridge | carousel |
| se-daily-audit | se-daily-audit | gif (Slack interaction) |

Final demo type per project is locked during the pair-authoring step, not now.

## Stack

- **Framework:** Next.js (App Router) with `output: 'export'` for static site generation
- **Content:** MDX files in `content/projects/<slug>.mdx`, one per project
- **Server:** Tiny Express wrapper (`server.js`) serving the exported `out/` dir
- **Hosting:** Heroku, `heroku/nodejs` buildpack, `web: node server.js` Procfile
- **Styling:** CSS modules or Tailwind (decide in implementation plan); single dark theme; system-font + one display font
- **Animation:** Framer Motion (light usage)
- **Image handling:** Next `<Image>` for non-iframe media

## Architecture

```
seadong-portfolio/
├── app/
│   ├── page.tsx                Homepage: hero + card grid
│   ├── projects/[slug]/page.tsx  Detail page (generateStaticParams from MDX)
│   ├── layout.tsx              Shared shell, fonts, theme
│   └── globals.css
├── content/projects/           MDX, one per project
│   ├── org-roast.mdx
│   ├── meeting-copilot.mdx
│   └── ...
├── public/
│   ├── media/<slug>/           Screenshots, GIFs, video posters per project
│   └── og/                     OpenGraph cards
├── components/
│   ├── Hero.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectCard.tsx
│   ├── DemoEmbed.tsx           Switches on demo.type
│   ├── ScreenshotCarousel.tsx
│   └── Layout.tsx
├── lib/
│   └── projects.ts             Reads + parses all MDX frontmatter at build
├── server.js                   Express static server for Heroku
├── Procfile                    `web: node server.js`
├── next.config.mjs             output: 'export'
└── package.json                Includes Node engines pin
```

**Build:** `npm run build` runs `next build`, exports to `out/`.
**Run:** `node server.js` serves `out/` with long cache on hashed assets, no cache on HTML, SPA-style fallback to `out/404.html`.

## Data model — MDX frontmatter

```yaml
---
slug: org-roast                 # required, must match filename
title: Org Roast                # required
tagline: Logs into your Salesforce org and rap-disses what it finds.
year: 2025                      # required, integer
status: shipped                 # shipped | wip | archived
tech: [Next.js, OpenAI, Salesforce]
links:
  github: https://github.com/sdong101010/org-roast
  live: https://org-roast.example.com   # optional
  video: https://...                     # optional
demo:
  type: iframe                  # iframe | carousel | gif | video
  src: https://org-roast.example.com    # iframe only
  screenshots: [01-home.png, 02-results.png]  # carousel only, ordered
  gif: walkthrough.gif          # gif only
  poster: hero.png              # video only — required for OG card
featured: false                 # if true, card spans 2 columns on desktop
order: 10                       # homepage sort key, ascending
---

MDX body — prose, headings, screenshots, code. Renders below DemoEmbed.
```

**Validation:** A small build-time check in `lib/projects.ts` asserts required fields exist and `demo.type` matches the supplied keys (`iframe` requires `src`, `carousel` requires `screenshots`, etc.). Build fails on invalid frontmatter so we never ship broken pages.

## Components

### Homepage

- **`<Hero>`** — Name "Sea Dong", tagline placeholder ("TODO: pick a tagline"), GitHub link. One subtle entrance animation. No photo.
- **`<ProjectGrid>`** — CSS grid: 3 cols ≥1024px, 2 cols ≥640px, 1 col mobile. Featured projects span 2 cols on desktop.
- **`<ProjectCard>`** — Thumbnail (first screenshot or hero), title, tagline, tech chips, status badge. Hover: lift + shadow + slight cursor-tracking tilt.

### Detail page (`/projects/[slug]`)

1. Back-to-home link
2. Header: title, tagline, year, status badge, tech chips, link buttons (GitHub / Live / Video — each renders only if its link is present)
3. **`<DemoEmbed>`** dispatches on `demo.type`:
   - `iframe` → responsive iframe + "open in new tab" fallback link
   - `carousel` → **`<ScreenshotCarousel>`** with keyboard arrows, swipe, click-to-zoom lightbox
   - `gif` → autoplay loop with pause-on-click; `<img>` tag, no controls
   - `video` → `<video controls>` with `poster`
4. MDX body — prose, code blocks with syntax highlighting, inline screenshots
5. Prev/next project nav (sorted by `order`)

### Shared

- **`<Layout>`** — Header (small "Sea Dong" wordmark linking home), footer (GitHub link + tiny "built with Next.js" credit).
- Single dark theme. System font for body, one display font for hero/headings.

## Playful touches (intentionally limited)

- Card hover tilt+lift driven by cursor proximity (Framer Motion)
- Page transitions: subtle fade
- Cursor-following accent on hero only
- Optional: one small Konami-code easter egg

These are nice-to-haves; if they slip, the site still ships.

## Heroku deployment

- App name: TBD (e.g., `seadong-portfolio`)
- Buildpack: `heroku/nodejs` (auto-detected)
- `Procfile`: `web: node server.js`
- `engines.node` pinned in `package.json`
- `server.js` (~20 lines): Express, `express.static('out')` with long max-age + `immutable` on `_next/static/**`, `max-age=0` on HTML, catch-all fallback to `out/404.html`
- Free/eco dyno is sufficient for v1
- Custom domain: optional, attached post-launch via Heroku CLI

## Media pipeline

- All media in `public/media/<slug>/`
- Screenshots: PNG, max 1920×1080 for hero, max 1200px wide elsewhere; numeric prefix `01-`, `02-` for deterministic carousel order
- GIFs: max 5 MB, max 1280px wide. Larger → convert to MP4 (handled in implementation step, not v1 spec)
- Posters: one `hero.png` per project for OG cards
- Next `<Image>` for non-iframe images for lazy load + responsive sizing

## Local dev

- `npm run dev` — Next dev server with MDX hot reload
- `npm run build && node server.js` — exact production replica
- `git push heroku main` — deploy

## Open items deferred to implementation plan

- CSS approach: Tailwind vs. CSS modules (one decision in implementation plan)
- Tagline final wording (placeholder ships; user edits later)
- Per-project final demo type, screenshots, copy (locked during pair-authoring after the implementation plan is approved)
- Heroku app name and custom domain attachment
- OG card generator (static OG image per project derived from `hero.png` + title; could use `@vercel/og` or pre-rendered)

## Risks

- **Iframe-embedding non-Salesforce sites:** the only iframe demos are org-roast (own domain, fine) and Bloomberg POC slides (own static HTML, fine). Both are first-party, no X-Frame-Options issues expected.
- **GIF file size:** if walkthrough GIFs balloon past 5 MB, fall back to MP4 with `<video autoplay muted loop playsinline>`. Component should handle either.
- **Heroku free tier sleep:** eco dyno sleeps after inactivity, cold start is ~5s. Acceptable for v1; upgrade to Basic if it bothers us.
- **Content drift:** MDX-in-repo means every copy edit is a Git commit. Acceptable for a portfolio; reconsider if we ever go content-heavy.

## Out of scope (explicit YAGNI)

- CMS, admin UI, draft/publish workflow
- Search, tagging beyond `tech`, RSS
- Comments, contact form, mailing list
- Per-project analytics events
- A/B testing or feature flags
- i18n
- Server-side rendering (we're static-exporting on purpose)
