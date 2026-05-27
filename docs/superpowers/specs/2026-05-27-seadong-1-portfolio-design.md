# SeaDong-1 Portfolio — Design Spec

**Date:** 2026-05-27
**Owner:** Sea Dong
**Status:** Draft for review
**Reference:** [oryzo.ai](https://oryzo.ai/) — Lusion's parody product launch site for a cork coaster
**Supersedes:** `2026-05-18-portfolio-design.archived.md` (project-gallery direction; different concept)

---

## Goal

A single-page personal portfolio that treats Sea Dong like Oryzo treats a cork coaster — a deadpan, polished, slightly-absurdist product launch for a person. The site is the joke; the joke is the resume; the resume is real.

The visitor's takeaway, in this order:
1. "This is beautifully made."
2. "...wait, is this a person or a product?"
3. "Both. And actually that *is* what they do."

**Success criterion:** the site is sharable for the bit alone (sub-30s scroll-through), but stands up to a careful read by someone evaluating the work underneath.

## Non-goals

- No CMS, no MDX, no project gallery, no detail pages — single page only.
- No build step, no framework, no bundler. Plain HTML/CSS/JS.
- No auth, contact form, search, blog, RSS, analytics for v1.
- No real LLM / API calls. Every "AI" interaction on the page is a deterministic prank.
- No 3D / WebGL. Visual punch comes from typography, motion, copy.

## Tone

**Capability over credential.** The bit is the *act of the work* — discovery, architecture, demo craft, calm under fire — not the trophies (no Forrester rankings, no deal sizes, no "top X%"). Oryzo never says "winner of best coaster"; it shows you the coaster doing coaster things. We mirror that.

The voice is deadpan. Every claim is true *if you squint*. Asterisks footnote the joke without breaking the rhythm.

## Audience

"Just for fun" — no recruiter optimization, no hiring funnel. Built because shipping it is the move.

## Stack

- Static HTML/CSS/JS, single page, single repo.
- No build, no dependencies, no package.json required.
- Hostable on GitHub Pages, Netlify, or Vercel free tier.
- Self-hosted webfonts (woff2, Latin subset) — no Google Fonts CDN.
- Total page weight target: <500KB excluding the headshot.

## File layout

```
/Users/sea.dong/projects/seadong-portfolio/
  index.html                       # ~250 lines — semantic sections, content
  styles.css                       # ~500 lines — tokens, layout, motion
  app.js                           # ~150 lines — scroll reveals, flip card, dialog
  /assets
    headshot.webp                  # 1x + 2x WebP
    headshot@2x.webp
    og.png                         # social preview
    favicon.svg                    # tiny "S—1" mark
    /fonts
      Fraunces-Variable.woff2      # display serif
      Inter-Variable.woff2         # body sans
      JetBrainsMono-Regular.woff2  # mono (rare)
  README.md                        # local preview + deploy notes
  /docs/superpowers/specs/         # (this file)
```

## Visual system

### Palette

```css
--bg: #0a0a0a;       /* near-black, not pure */
--fg: #f4f1ea;       /* warm off-white */
--accent: #c8a27a;   /* cork tan — quiet nod to source */
--muted: #6b6b6b;
--signal: #ff5722;   /* reserved for interactive bits + hover */
```

### Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Fraunces** (variable, free) | Optical sizing, soft, wide weight range. Self-hosted. |
| Body | **Inter** (variable) | Tight 13–14px for the spec-sheet feel, line-height 1.6. |
| Mono | **JetBrains Mono** | Used only in the encryption demo + footer credits. |

Mixed type sizes within one phrase ("isn't just / a coaster" treatment) appears in 3+ places — hero, section 2, section 7.

### Layout

- Each chapter is `min-height: 100vh` with content centered. Generous breathing room.
- Max content width 1100px; display headlines break out wider when called for.
- Mobile is real responsive (reflow + stack), not just shrink. Display type stays huge; multi-column rows stack; TDM cards become one-per-scroll.

### Motion

- **Scroll reveal:** text fades up with 200ms stagger via IntersectionObserver. Once only — no repeat-on-scroll-up.
- **Hero parallax:** "S—1" wordmark translates Y by `scrollY * 0.3` for the first viewport. Headshot scales 1.0 → 1.05 over the same range.
- **Stat cards (sections 3, 7):** numbers count up from 0 to final value over 1.5s on entry.
- **TDM cards (section 6):** CSS-only animated backgrounds matching their "temperature" (T=10 chaotic, T=1 calm, T=0.1 frozen). No canvas.
- **Smart-flip card (section 4):** genuine `transform: rotateY(180deg)` on click, 500ms ease.
- **No scroll-jacking.** Native scroll throughout.
- **Respects `prefers-reduced-motion`** — disables reveal/parallax/scale.

## Content — the 9 chapters

Each chapter is one ~100vh scene. One idea per scene. Big type. Generous space.

### 1. HERO — "SEADONG-1"

- Wordmark "S—1" left, headshot right.
- Tagline: *Made for customers. Built for deals.*
- Sub: *Designed to listen, architect, and demo in all the right ways. The simplest discovery call — considered.*
- Pill: *Designed by Salesforce, the AI-powered enterprise platform.*
- Faint **▶ PLAY** overlay on the headshot. Click opens a `<dialog>` modal: *"Video unavailable. SeaDong-1 prefers live calls."* That's the joke; no actual video.

### 2. ISN'T JUST A SE

- Big type: *SeaDong-1 isn't just a Solutions Engineer. It's the result of unprecedented AI\* breakthroughs.*
- Footnote: `* Adobe Illustrator`

### 3. POWERED BY AI\* — capability cards

*"An open-weight Principal Data and AI Architect designed to be lightweight and easy to carry."*

Three stat cards animate in:

| Stat | Tagline |
|---|---|
| **Real-time semantic compression** | Turns 90 minutes of customer rambling into one architecture diagram. |
| **Sub-second time to thoughtful answer** | From cold "tell me about yourselves" to a useful POV in under 800ms. |
| **Handles extremes with ease** | From C-level QBRs to Apex stack traces. |

### 4. SMART-FLIP RFP ENCRYPTION *(interactive)*

A 640px-wide card centered on screen. Front face: textarea ("Paste a vendor RFP question..."). Button: **FLIP**. Card 3D-flips along Y-axis (500ms ease) revealing the back face with a deadpan response. **DECODE** flips it back.

Response selection logic — pure client-side string matching, deterministic, deliberately dumb:

| Trigger keyword(s) | Response |
|---|---|
| `SLA` | "Yes, but only on weekdays we feel like it." |
| `scale`, `concurrent` | "Horizontally. Like everyone else's marketing slide." |
| `AI`, `GenAI`, `Agentforce` | "Yes. Powered by AI* (*Adobe Illustrator)." |
| `security`, `compliance` | "We have a screenshot of the SOC2 report." |
| `roadmap`, `Q3`, `Q4` | "Q3. Confidence interval: ±2 quarters." |
| (default) | "Acknowledged. Will follow up with our Solution Architect, who is also me." |

The site is in on the joke that it claims to be encryption.

### 5. GRIP-LOCKED DEMO TECHNOLOGY

*"Micro-textured discovery so precise the customer files their own architecture diagram."*

- Animated stat: *Demo confidence (est): 0.87*
- Three short vignettes about *the moves*:
  - "Whiteboards faster than the slide deck loads."
  - "Refuses to demo without the real data model."
  - "Will pause a demo to argue with the docs."

### 6. THERMAL DIFFUSION MODEL (TDM) *(visualization)*

Three cards side-by-side, each with a CSS-animated background expressing its "temperature":

| Card | Animation | Tagline |
|---|---|---|
| **T = 10 (Creative)** | chaotic conic-gradient, hue cycles every 3s | "every demo is also a TED Talk" |
| **T = 1 (Balanced)** | calm linear gradient, slow 360° rotate over 30s | "professional, with one (1) joke per call" |
| **T = 0.1 (Deterministic)** | static gradient, no animation | "reads exclusively from official documentation" |

Footer line: *"A visualization, not a warranty."*

### 7. SUSTAINABILITY — "100% plant-based\*"

`* Mostly coffee.`

Three numbers in the Oryzo style:

| Metric | Value | Caption |
|---|---|---|
| Years to first harvest | ~22 | UMich → Fast Enterprises → C3.ai → Salesforce |
| Harvesting interval | 18 months | per role |
| Compute draw while in use | Minimal | Runs primarily on espresso and Slack DMs. So you can say "please" and "thank you" as much as you want, guilt free. |

### 8. REVIEWS — "People all around the world love SeaDong-1"

4–6 fake testimonials in the Oryzo style with cropped credentials. **All about craft, not credentials.**

> "Asked the question I was afraid to ask. Twice."
> — *AE, Salesforce* ★★★★★

> "Asked one clarifying question that saved us six months."
> — *PM, [REDACTED]* ★★★★★

> "Refused to demo until I sent the actual data model. Annoying. Correct."
> — *Customer, F500 data co.* ★★★★★

> "Drew our entire integration architecture on a napkin in the lobby. We hung it on the wall."
> — *VP Eng, [REDACTED]* ★★★★★

> "Showed up with a working POC instead of a slide deck. We are still recovering."
> — *AE, Salesforce* ★★★★★

> "Showed up to a Forrester eval and ranked #1. Showed up to my birthday party and ranked also #1."
> — *Friend, real one* ★★★★★

(Workshop-able. Authorial voice should sound like someone tired but right.)

### 9. FOOTER — Real contact

The one place we drop the bit.

- Email
- LinkedIn
- GitHub
- Tiny tagline: *© Sea Dong, 2026. No coasters were harmed in the making of this site.*

Quiet. Earned.

## Interaction surface

| # | Interaction | Mechanism |
|---|---|---|
| Hero | ▶ PLAY button → modal dialog | `<dialog>` element, native |
| §3 | Stat counters animate on entry | IntersectionObserver + requestAnimationFrame |
| §4 | Smart-flip card flips on click | `transform: rotateY(180deg)` + state class |
| §6 | TDM cards lift + brighten on hover | CSS `:hover` |
| Throughout | Scroll reveal fade-up | IntersectionObserver, run-once |

No external scripts. No analytics. No 3rd-party fonts. No tracking pixels.

## Accessibility

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- Headings in document order (h1 → h2 → h3, no skips).
- All interactive elements keyboard reachable; focus rings visible.
- All animations respect `prefers-reduced-motion: reduce`.
- Color contrast: fg/bg ≥ 7:1 (AAA); muted/bg ≥ 4.5:1 (AA).
- Headshot has descriptive alt text.
- Smart-flip card announces flip state to screen readers via `aria-live`.
- Modal dialog uses native `<dialog>` for focus trap + escape-to-close.

## Performance budget

| Resource | Budget |
|---|---|
| HTML | < 30KB |
| CSS | < 50KB |
| JS | < 20KB |
| Fonts (3 woff2, subsetted) | < 200KB total |
| Hero image | < 200KB (1x), 1x + 2x WebP, lazy below fold |
| **Total page weight** | **< 500KB** |
| Lighthouse Performance | ≥ 95 |

## Deployment

- v1: GitHub Pages from `main` branch root, custom domain optional later.
- Fallback: drag-and-drop `index.html` + `styles.css` + `app.js` + `assets/` to Netlify or Vercel.
- No CI/CD pipeline for v1. Push to deploy.

## Out of scope (for now, on purpose)

- Project case-study pages (deferred — single page is the bit)
- Real video or screen recording
- Real LLM API integration on the encryption demo
- Multi-language
- Print stylesheet
- Dark/light mode toggle (it's dark; that's the design)
- Easter eggs beyond the ▶ PLAY modal (we may add ONE later)

## Open questions

None blocking. Workshop items for implementation:
- Final wording on the 6 reviews — current drafts are 80% there.
- Final headshot crop / treatment — black-and-white, high-contrast, warm shadows.
- Whether to add ONE easter egg (e.g., konami code reveals the *real* tagline). Decide during build.

## Risks

- **Risk:** the bit doesn't land; reads as "trying too hard."
  **Mitigation:** every section has substance underneath the joke. The site survives a careful read because the claims are true if you squint. If a section is funny but hollow, cut it.
- **Risk:** scope creep into 3D / WebGL chasing Oryzo fidelity.
  **Mitigation:** spec is explicit — typography + motion + copy carry the visual punch. No Three.js in v1.
- **Risk:** the testimonials read as smug.
  **Mitigation:** weight toward self-deprecation and craft ("annoying. correct.") over flexes.
