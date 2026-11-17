# Portfolio refresh: remaining work (draft)

> **Status:** draft roadmap, not an implementation plan. Parts 2 and 3 have no design yet. Each one
> starts with a brainstorm (`/superpowers:brainstorming`), then a spec in `docs/superpowers/specs/`,
> then a task plan via `superpowers:writing-plans`. Part 4 is a list of small follow-ups that can be
> picked up directly.

## Where things stand (2026-11-16)

The refresh was split into four parts, done in this order:

| # | Part | State |
|---|---|---|
| 1 | Themed parallax backgrounds (Blade Runner + Pulp Fiction) | **Done**, pushed (`06e0bbd..b796082`). Spec: `specs/2026-11-16-themed-parallax-backgrounds-design.md`. Plan: `plans/2026-11-16-themed-parallax-backgrounds.md` |
| 2 | Skills section redesign | **Done** (`61b5ff2..HEAD` of 2026-11-16). Spec: `specs/2026-11-16-skills-section-redesign-design.md`. Plan: `plans/2026-11-16-skills-section-redesign.md` |
| 3 | Hero section redesign | Not started. The headline is reopened, see below |
| 4 | Follow-ups deferred from part 1 | Open, see below |
| 5 | Telegram release pipeline project | Not started. The owner will provide it, then it's added to Projects and linked from the Skills DevOps card |

**New positioning (owner, 2026-11-16):** a mobile engineer who now builds whole systems with AI
agents (DevOps, code structure, infrastructure). Mobile stays the proven core, and agentic work is
the new edge. Every remaining part should support this.

Background for parts 2 and 3: an earlier design review said the Skills section could be better. The
owner agrees but has no direction yet ("not my best design, but I don't know how to make it look
good"), and feels the same about the hero. Both need open questions first. Don't open with a menu
of layouts.

## Constraints that apply to every part

- **Design brief:** `DESIGN.md` (personality, tokens, notes). Base themes are Startup/Upbeat:
  Inter, violet accent, rounded corners, frosted-glass cards. All values come from tokens in
  `src/styles/tokens.css`. Run `/web-design:design-audit` on the changed files before calling a
  part done.
- **Hidden themes:** Blade Runner and Pulp Fiction are custom sub-styles that restyle every section
  (see the DESIGN.md ingredient table). Any redesign must also look right in both. They open from the
  navbar avatar, and the light/dark toggle is hidden while one is active. **Ask before changing
  anything about how the easter egg works or where it lives.**
- **Code rules:** files ≤250 lines; function bodies ≤10 lines; ≤3 parameters; no explanatory
  comments inside function bodies; component folders contain `index.tsx`, `Name.tsx` and
  `types.ts`; data lives in `src/data`.
- **Text:** every new string goes in `src/i18n/{en,es,pt}.ts`, in all three languages.
- **Git:** commit on `main`, author `logang-bot`, with no Co-Authored-By or other trailer.
- **Tests:** there is no unit-test framework. Check pure logic with throwaway `node file.ts`
  scripts in the scratchpad (Node 26 runs TS directly). Check the UI with `npm run build`, lint
  (4 errors already exist in `src/context/*`) and screenshots. For screenshots, use headless
  Firefox driven by `puppeteer-core` installed in the scratchpad, after `npx vite preview`. Set the
  theme through `localStorage.theme` and reload.

## Part 2: Skills section redesign

**Today:** `src/sections/Skills.tsx` (+ `Skills.module.css`) renders 7 frosted-glass cards in an
auto-fill grid (`minmax(200px, 1fr)`). Each card is a heading plus a plain vertical list of names.
- Groups (in `skillGroups` inside the component): Languages, Android, iOS, Architecture,
  Cross-platform, Backend & Web, Tools. That's 40 names in total.
- Category names are translated (`t.skills.categories`); the skill names themselves aren't.
- The section shows the soft glow blobs (`GlowBackground slot={1}`) only in light/dark. In the
  hidden themes it has no decoration since part 1, so the redesign starts from a clean slate.
- Hidden themes restyle the cards: PF uses hard ink shadows, a 4px radius and heavy headings; BR uses
  navy cards with orange borders.

**To find out in the brainstorm** (ask open questions first):
- Who the section is for and what they should take away in a few seconds (for example, whether a
  recruiter scanning for "Kotlin" should find it instantly).
- Whether all 40 items earn their place, or whether there should be emphasis (main stack versus
  also-used).
- What the owner has seen elsewhere and liked or disliked.
- How the redesign should look in BR and PF.

**Known code smell to fix along the way:** the skill data lives inside the component. Move it to
`src/data/skills.ts`, per the project rules.

## Part 3: Hero section redesign

**Today:** `src/sections/Hero.tsx` (+ `Hero.module.css`) is a two-column flex layout.
- Text column: a typewriter greeting with a blinking caret, the `h1` "Software engineer building
  native Android and iOS apps", a subtitle and two CTAs ("View my work" primary, "Get in touch"
  secondary).
- Illustration column: one 768×1376 illustration per theme (`public/img_*_illustration*.webp`).
  They are faceless on purpose and share the same pose and canvas.
- Below 900px wide it stacks into one column.

**Raised by the Skills review, for the hero:** the hero subtitle names .NET MAUI as a core skill,
but Skills now lists it under "Also used". Align the two.

**Fixed by DESIGN.md unless the owner reopens them:**
- The headline states the role. **Reopened:** the current headline is mobile-only and has to
  reflect "mobile + agentic systems". Update the matching note in `DESIGN.md` as well.
- Only the greeting line animates.
- The primary CTA is the most prominent element.

**To find out in the brainstorm:**
- What feels wrong to the owner today.
- What a visitor should feel or do in the first five seconds.
- Whether the illustrations stay.
- How the hero works with the BR neon city and PF sticker backgrounds from part 1. At 1440px,
  lit signs mostly can't fit in the margins.

## Part 4: Follow-ups deferred from part 1

None of these are visible bugs. Pick them up when convenient.

**Need the owner's input or new assets:**
- [ ] **Sharper images:** `src/assets/images/pulp-fiction/pf_background-2.webp` (briefcase,
  600×242) and `src/assets/images/blade-runner/br2049-background-2.webp` (hologram, 1920×1080)
  are below 2x on desktop. They need about 2880px-wide exports (rule IMG-10).
- [ ] **Sign copy:** `nav.egg.neonSigns` in `src/i18n/{en,es,pt}.ts`. The UX reviewer felt
  "Need a developer? I can fix that" and "Now hiring humans" may confuse recruiters, and suggested
  "Bugs in your app? I can fix that" / "Developer for hire · humans welcome". Keep all three
  languages at the same length. Mismatched lengths are handled now, but should stay consistent.
- [ ] **Few lit signs at 1440px:** once the glow is counted, the margins there are too narrow for
  most signs, so they get dimmed. Decide whether that's acceptable or whether signs should get
  narrower (smaller max-width or padding).

**Code cleanups (no visual change):**
- [ ] Re-run the dim check after `document.fonts.ready` (or attach a ResizeObserver to the cells),
  so sign widths that change when Inter loads update the dim flags.
  Where: `src/components/BackgroundPattern/ParallaxLayer.tsx`.
- [ ] Merge each layer's scroll callbacks into one per frame that reads first and writes after
  (BR runs 5 `useScrollFrame` instances today).
  Where: `ParallaxLayer.tsx` and `src/hooks/useLayerItems.ts`.
- [ ] Move the literal rgba grid-line colours and icon opacities into per-theme tokens.
  Where: `src/components/BackgroundPattern/RegularBackground.module.css`.
- [ ] Skip the dim pass for layers that never dim. Today light/dark cells get `filter: blur(0px)`
  and are measured for nothing. Add a flag on `LayerSpec`, or a `--bg-item-filter-dim: none` token.
- [ ] Move `LayerItem`/`LayerSpec` out of `components/BackgroundPattern/types.ts` so
  `src/hooks/useLayerItems.ts` doesn't import from a component folder. Give `BackgroundFrame`
  its own CSS module.
- [ ] Order the helpers depth-first in `BladeRunnerBackground.tsx` and `ParallaxLayer.tsx`.
- [ ] Use `var(--content-max)` instead of the hard-coded `1120px` in `src/components/Footer.module.css`.
- [ ] (Pre-existing, out of scope so far) the 4 lint errors in `src/context/ThemeContext.tsx` and
  `src/context/LanguageContext.tsx`.

## How to resume in a new session

1. Read this file, `DESIGN.md`, and the part 1 spec for context.
2. For part 2 or 3, run `/superpowers:brainstorming` and point it at the matching section above.
3. For part 4, items can be done directly. Tick them off here and commit.
