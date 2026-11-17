# Skills section redesign: design

Part 2 of `plans/2026-11-16-portfolio-refresh-remaining-draft.md`.

## Intent
The owner is repositioning as **a mobile engineer who now builds whole systems with AI agents**,
covering DevOps, code structure and infrastructure. Mobile stays the proven core (both projects
are native Android apps), and agentic work is the new edge the page leads with.

Today's section doesn't say any of that. It shows 7 equal glass cards listing 40 names, with no
hierarchy, an uneven 5+2 grid at desktop, and almost nothing agentic.

The owner's view: languages and frameworks matter less now. Architecture matters, and recruiters
should see command of several patterns.

**Audience:** recruiters, hiring managers and tech leads (see `DESIGN.md`).
**Success:** in a few seconds, a visitor reads "builds with AI agents, strong on architecture,
native mobile underneath", and can click through to proof.

**Anti-goals:**
- Overclaiming. Docker and Kubernetes work is in progress with nothing deployed, and must never
  read as production experience.
- A long, flat list where Kotlin weighs the same as VIPER.

## Approaches
- **A. Bento pillars (picked by the owner):** 4 cards of deliberately different sizes plus a quiet
  "also used" line. It's quick to scan, has clear hierarchy and room for proof links, and the
  theme card styles already exist.
- **B. Then → Now story:** "Where I started" beside "What I build now". It tells the shift
  directly, but it's more copy and harder to scan for one keyword.
- **C. Architecture centrepiece:** a tile per pattern with a "used in" line. It needs a story per
  pattern (only 2 exist today), and the agentic message gets less room.

## Design

### Heading
The "Skills" label stays. New heading "How I build", with one subtitle line, "From native apps to
whole systems, with AI agents in the loop". *(The copy is a builder's call; the owner may edit
it.)*

### Layout
- **Desktop (≥900px):** a 3-column grid. Row 1 is Agentic (spans 2) and Architecture (1). Row 2
  is DevOps & Infra (1) and Mobile (spans 2). Cards in a row stretch to equal height.
- **Under the grid:** one muted line, "Also used: …".
- **Below 900px:** one column, in the same order.
- Hierarchy comes from size and order, not extra colour.

```
┌──────────────────────────────┐┌──────────────┐
│ ✦ Agentic development        ││ ▣ Architecture│
│ summary line                 ││ tags          │
│ tags                         ││               │
│ → My plugin marketplace ↗    ││               │
└──────────────────────────────┘└──────────────┘
┌──────────────┐┌──────────────────────────────┐
│ ⟳ DevOps &    ││ ▢ Mobile                      │
│   Infra       ││ summary line · tags           │
│ tags (wip)    ││ → See projects                │
└──────────────┘└──────────────────────────────┘
Also used: Kotlin · Swift · TypeScript · …
```

### Pillars
Each card's title and one-line summary are translated. Tag names are not.

| Pillar | Tags | Proof link |
|---|---|---|
| Agentic development (lead) | Claude Code, OpenCode, Skills, Hooks, Review agents | "My plugin marketplace ↗" → `https://github.com/logang-bot/claude-marketplace` (public) |
| Architecture | Clean Architecture *(Phoebe Store)*, MVVM *(PartyPuzl)*, MVP, VIPER, MVC | none; the project names on the tags are the proof |
| DevOps & Infra | GitHub Actions, CI/CD, Azure DevOps, Docker *(in progress)*, Kubernetes *(in progress)* | an optional slot, filled when the Telegram release pipeline project is added |
| Mobile | Jetpack Compose, SwiftUI, UIKit, Room, Retrofit, CoreData, Firebase, Supabase | "See projects" → `#projects` |

**Also used:** Kotlin, Swift, TypeScript, JavaScript, C#, C++, HTML/CSS, Node.js, Express,
React, MongoDB, SQL Server, .NET MAUI, Xamarin, React Native, Unit testing.

**Dropped as noise** *(builder's call)*: Lottie, Navigation Component, Maps APIs, Android Studio,
Xcode.

**Card details:**
- "In progress" is a small translated badge on the tag.
- Proven patterns name the project in the tag, for example "Clean Architecture · Phoebe Store".
  The name comes from `projects.ts` through `provenBy`.
- Each card has a Lucide icon in an accent-tinted rounded square: sparkles (Agentic), layers
  (Architecture), workflow (DevOps & Infra), smartphone (Mobile). The paths go in
  `src/data/iconPaths.ts`.
- The lead card has a larger title (24 vs 20) and wider summary text, and no extra colour.
- The external link opens in a new tab and shows ↗, like the other external links on the site.

### Themes
Cards keep composing `glassCard`, and tags reuse the shared `.tag`, which already has Pulp
Fiction overrides.

| Theme | Treatment |
|---|---|
| Light / dark | As today, with `GlowBackground slot={1}` behind the section. |
| Blade Runner | Navy cards with orange borders. The lead card's border is at full orange strength. No glow, because `DESIGN.md` reserves glow for the CTA and background. |
| Pulp Fiction | Ink shadows and the 4px radius come from `glassCard`. The lead card gets `--shadow-lg`, the others `--shadow-md`. Badge text on red uses `--accent-strong`. |

The hidden themes stay undecorated, as they are since part 1.

### Code shape
- **`src/data/skills.ts`:** `PillarId`, `SkillTag { name; inProgress?; provenBy?: ProjectId }`,
  `PillarLink { href; labelKey }`, `SkillPillar { id; icon: IconName; tags; link? }`,
  `skillPillars`, `alsoUsed`.
- **`src/components/SkillPillar/`:** `index.tsx`, `SkillPillar.tsx`, `types.ts` and
  `SkillPillar.module.css`. It renders one card.
- **`src/sections/Skills.tsx`:** the heading, the grid (a span class per pillar) and the
  "also used" line.
- **i18n** (`src/i18n/types.ts` and `en`/`es`/`pt`): replace `skills.categories` with
  `skills.subtitle`, `skills.pillars.{agentic,architecture,devopsInfra,mobile}.{title,summary}`,
  `skills.inProgress`, `skills.alsoUsed` and `skills.links.{marketplace,projects}`.
- **Project rules:** files ≤250 lines, function bodies ≤10 lines, ≤3 parameters, no explanatory
  comments, and token values only.

## Non-goals
- The hero headline. It must change to match this positioning, which is done in Part 3.
- Adding the Telegram release pipeline project. It's a separate step, and the DevOps link slot
  waits for it.
- "Used for" stories for MVP, VIPER and MVC. The owner may add them later.

## Left to the builder
- Exact summary copy for each pillar, in all three languages, at similar lengths.
- Spacing, badge styling and icon tile size, taken from tokens.
- Whether "Skills", "Hooks" and "Review agents" read better as one combined tag.

## Verification
- `npm run build` passes, and lint shows only the 4 existing `src/context/*` errors.
- Screenshots at 1440px and 390px for light, dark, blade-runner and pulp-fiction, in en/es/pt.
- `/web-design:design-audit` and `/general-code-style:style-check` on the changed files.
