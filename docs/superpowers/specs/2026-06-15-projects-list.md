# Portfolio — Project List (concept-agnostic copy)

**Date:** 2026-06-15
**Status:** Curated. Each project ships with a long card and a one-liner.
**Source:** Inventory of `~/projects/` on 2026-06-15.
**Voice:** Capability over credential. Deadpan. Every claim is true if you squint.

> **Render-short rule:** Concepts A (SEADONG-1) and B (Changelog) use the
> one-liner. Concept D (Quiet Editorial) uses the card. Concept C (Terminal)
> uses both — the long card behind `cat ./proof/<slug>` and the one-liner in
> `ls ./proof`.

---

## 1. org-roast

**Slug:** `org-roast`
**Headline:** *Roasts your Salesforce org until it apologizes.*
**Tags:** Next.js · Salesforce OAuth · Gemini · ElevenLabs
**Link:** https://github.com/sdong101010/org-roast
**Demo:** localhost:3000 → "ROAST MY ORG"

**Card.** A web app that logs into your Salesforce org and audits it across
five dimensions — metadata sprawl, Apex test coverage, security exposure,
automation overload, governor limits — then has Gemini deliver the findings
as a savage rap diss. ElevenLabs reads it back to you in case the silence
of a `Modify All Data` profile wasn't loud enough.

The audit is real. The format is the joke. Both ship.

**One-liner.** *Audits your Salesforce org. Returns the findings as a rap diss.*

---

## 2. sea-cret-agent

**Slug:** `sea-cret-agent`
**Headline:** *The earpiece that listens to your meeting so you don't have to fake it.*
**Tags:** macOS · Apple SpeechAnalyzer · BlackHole · Claude · Slack MCP
**Link:** https://github.com/sdong101010/sea-cret-agent
**Demo:** local-only by design

**Card.** A local meeting assistant that captures system audio from
Teams / Meet, transcribes on-device via Apple's SpeechAnalyzer (macOS 26),
labels speakers, watches for customer questions, and surfaces a researched
answer card to a sidebar on your second monitor — pulled from Salesforce
docs, Slack, and the public web. Nothing leaves the laptop except the
specific web fetches it decides to do.

Built because cloud meeting bots are weird and I wanted real-time
"actually, here's the answer" cards before the next slide.

**One-liner.** *Local meeting copilot. Hears the question, finds the answer, drops it in your sidebar.*

---

## 3. agentforce-teams-demo

**Slug:** `agentforce-teams-demo`
**Headline:** *A Microsoft Teams bot that talks to a Salesforce Agentforce agent. End-to-end. Both halves shippable.*
**Tags:** Agentforce · Microsoft Teams Bot Framework · External Client App · OAuth · Node.js
**Link:** *(internal — describable, source not public)*
**Demo:** zip-and-hand-to-a-teammate

**Card.** Reference implementation of an external chat surface (Microsoft
Teams) calling Agentforce via the public `/einstein/ai-agent/v1/*` REST API.
Salesforce side is a deployable SFDX bundle — agent, External Client App,
planner snapshots. Teams side is a Bot Framework app that exchanges the
user's Microsoft token for a Salesforce access token and proxies turns to
the agent.

Includes a 40 MB hand-it-to-a-teammate zip with `node_modules` pre-bundled
and a `Start-Demo.command` for the moment a teammate's WiFi gives up.

**One-liner.** *Teams bot ↔ Agentforce agent, end-to-end. Both halves deployable.*

---

## 4. data360-demo-builder

**Slug:** `data360-demo-builder`
**Headline:** *The skill that stands up a customer-specific Data 360 demo while the AE describes it.*
**Tags:** Claude Code skill · Data Cloud · LWC · FlexiPage · Apex seed plan
**Link:** *(internal — describable, source not public)*
**Demo:** `/data360-demo-builder` in any AE's Claude Code session

**Card.** An AE-invocable skill that takes a short, non-technical intake
(industry, hero account, three or four pains) and stands up a real
customer-specific Data 360 demo in a Data-Cloud-enabled org — Account
Customer-360 record page, LWC suite, FlexiPage, Data Cloud streams, mappings,
identity resolution, calculated insights — then hands back to the AE for
conversational customization.

Three stages: design (smart intake → narrative → ⛔ AE gate), generate
(deterministic Python compiler with a `check_defensible` honesty gate that
refuses to bake any headline figure unsupported by the seeded records),
execute (parallel subagent dispatch across CRM/LWC and Data Cloud halves,
with auto-resolve for known-deferred error patterns).

Every artifact is slug-namespaced and strictly additive: checks-before-creates,
treats `already exists` as success, never deletes.

**One-liner.** *AE describes the customer. Skill builds the Data 360 demo. The honesty gate refuses to bake numbers it can't defend.*

---

## 5. rfp-loop

**Slug:** `rfp-loop`
**Headline:** *Slack-in, drafted-RFP-out. Runs on a laptop. No server.*
**Tags:** Slack workflow · launchd · Claude Code skill · Google Sheets MCP · OAuth
**Link:** *(internal — describable, source not public)*
**Demo:** `/submit-rfp` in the team Slack

**Card.** A 15-minute-on-your-laptop pipeline. SE clicks "Submit RFP" in
Slack, drops a Google Sheet URL plus optional notes ("competing against
Adobe RTCDP", "concise", "only the security tab"). A launchd job fires the
`rfp-loop` skill, which scans the channel for new submissions, runs the
`rfp-answering` skill against each sheet, writes answers + a Review tab
back to the source sheet, and posts a completion message in-thread. Replies
on completed threads become read-only follow-up answers.

Locked, idempotent, resumable. No Heroku. No always-on infra. Designed for
a 5–20 person SE team with occasional usage.

**One-liner.** *Submit RFP in Slack. Get a drafted sheet back. Pure laptop infrastructure.*

---

## 6. claude-update-all

**Slug:** `claude-update-all`
**Headline:** *One job. Updates everything Claude-shaped on your laptop. Daily, 07:30.*
**Tags:** launchd · bash · Claude Code · Homebrew · Salesforce CLI · uv
**Link:** https://github.com/sdong101010/claude-update-all
**Demo:** `./install.sh`

**Card.** Daily mass-update for the Claude Code ecosystem and the dev tools
that ride along with it: Claude Code CLI, all installed plugins (with the
context-mode plugin's bespoke rebuild), git-managed skills, Homebrew, the
Salesforce CLI, `uv`, and any extra repos you list. Each section is
independent — one failure doesn't kill the rest.

Ships with an `update-all-tools` skill so Claude Code knows when to run it
for you (e.g. when you ask "is everything up to date?").

**One-liner.** *Daily cron that updates Claude Code, plugins, skills, Homebrew, sf CLI, uv. One job.*

---

## 7. se-daily-audit

**Slug:** `se-daily-audit`
**Headline:** *Posts to Slack at 8 AM weekdays. Reconciles your week against your calendar without asking.*
**Tags:** Claude Code skill · launchd · Salesforce REST · Slack · interactive thread
**Link:** *(internal — describable, source not public)*
**Demo:** posts to a Slack channel, Mon–Fri 08:00

**Card.** A daily audit skill for Salesforce SEs. Mon–Fri 08:00 (skipping
US federal holidays) it posts a thread to a Slack channel: unlogged
calendar work, Slack-detected customer conversations without a matching
Event, missing Deal Contributions, stale SFR (Specialist Forecast) SE
Comments. Reply in the thread (`y`, `n`, `y except 4-9`, `<n> confirm`) and
it writes back to Salesforce at the configured autonomy level.

Three rollout modes: dry-run (list only), events-only (auto-create Events,
confirm everything else), full autonomy.

**One-liner.** *8 AM Slack thread. Reconciles your week. Replies become Salesforce writes.*

---

## Voice spot-checks (so the entries don't drift)

- Capability over credential — every entry says *what it does*, not *how impressive it is*.
- Deadpan, never smug. "Audits your Salesforce org. Returns the findings as a rap diss." is the level.
- Footnotes / asterisks fine, but not on every entry — they're a spice, not a base layer.
- Each one-liner stands alone. Strip them out into a flat list and they still read like a person who ships.
- The 3 internal entries describe the *mechanism* (Slack workflow, launchd, External Client App, AE intake) — never customer names, never deal context.
