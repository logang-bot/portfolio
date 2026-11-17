# Navbar Floating Pill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the full-width navbar into a floating pill. A themed marker rests on the current
section and slides to the hovered or focused link: a liquid-glass bubble, a PF gun sight, or a
BR neon tube.

**Architecture:**
- The navbar moves into a component folder, with its CSS split per theme.
- A `NavLinks` component owns the hover/focus state and the scroll-tracked current section. It
  renders one absolutely positioned `NavMarker`, which slides by measuring the target link.
- Theme looks are CSS on the marker. PF adds an SVG reticle.
- Chromium gets a refracting lens through an SVG filter, gated by `html[data-glass="lens"]`.
  That attribute is set at startup by a pure engine check.

**Tech Stack:** React 19, TypeScript, Vite, CSS modules.

**Spec:** `docs/superpowers/specs/2026-11-16-navbar-floating-pill-design.md`

## Global Constraints

- The pill sits 12px from the top: `width: min(100% - 32px, var(--content-max))`, height `--nav-pill-height: 56px`, radius `--radius-pill` (PF `--radius-sm`).
- `--nav-height` becomes `80px`, the reserved top space. It drives body `padding-top`, `scroll-padding-top` and the hero's `min-height`.
- Marker slides `transform`/`width` over `--duration-base` (300ms) ease-out and fades with opacity. Under `prefers-reduced-motion` there is no slide and no flicker.
- Marker target: hovered or focused link, otherwise the current section, otherwise hidden. The hero counts as no section.
- PF lock-on (200ms, scale ≈1.3→1) and BR `powerOn` (500ms, once) play only on hover/focus arrival. Never on the glide back, never on scroll changes, and they never stack.
- Current link: `aria-current="true"`, colour `--text-h` (PF: `--paper`).
- Hidden-theme entry stays as is: the avatar at the pill's left end, the whisper hint unchanged, and the light/dark toggle hidden in BR/PF.
- Files ≤250 lines; function bodies ≤10 lines; ≤3 params; no comments inside function bodies. Component folders hold `index.tsx`, `Name.tsx` and `types.ts`. Data lives in `src/data`.
- Commit on `main` as `logang-bot`, with no Co-Authored-By or other trailer.
- No unit-test framework.
  - Pure logic: throwaway `node` scripts with `node:assert` in the scratchpad (`$SP`). Node 26 runs TS directly.
  - UI: `npm run build`, `npm run lint` (only the 4 known `src/context/*` errors) and headless screenshots.

## Harness

- Reuse or recreate `$SP/shoot.mjs` from the hero plan (`docs/superpowers/plans/2026-11-16-hero-redesign.md`, "Screenshot harness"), served by `npx vite preview` on port 4173.
- Extend it with these options:
  - `--scroll <selector>` scrolls the window so the selector sits at the top, then waits 600ms.
  - `--hover <selector>` hovers the selector.
  - `--clip nav` screenshots `nav` only.
  - `--reduced` calls `page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])`.
  - `--browser chrome` uses a scratchpad Chromium. Install it with `npx @puppeteer/browsers install chrome-headless-shell@stable --path $SP/browsers`.

## Review Focus

1. **Language switch while a marker rests:** the label width changes (for example "Skills" → "Habilidades"), so the marker must resize to the new label. → Task 3, Step 5.
2. **Short Contact section at the page bottom:** scrolled to the very end, the marker must rest on "Contact" even if Contact never reaches the reading band. → Task 3, Steps 1 and 5.
3. **Window resize, or crossing 768px with the phone menu open:** no marker stuck at a stale position, and the desktop marker is hidden in the phone menu. → Task 3, Step 5.
4. **Fast sweep across all links in BR/PF:** each arrival restarts the effect cleanly, with no stacked or half-finished flicker. → Tasks 5 and 6, verification steps.
5. **Firefox/Safari never get an empty bubble:** the lens styles must not apply without `data-glass="lens"`. → Task 4, Step 5.

---

### Task 1: Navbar folder, split CSS, link data (no visual change)

**Files:**
- Move: `src/components/Navbar.tsx` → `src/components/Navbar/Navbar.tsx`
- Create: `src/components/Navbar/index.tsx`, `src/components/Navbar/types.ts`
- Split `src/components/Navbar.module.css` into `src/components/Navbar/`:
  - `Navbar.module.css` (base)
  - `NavbarMobile.module.css` (the `@media (max-width: 768px)` block)
  - `NavbarBladeRunner.module.css`
  - `NavbarPulpFiction.module.css`
- Create: `src/data/navLinks.ts`

**Interfaces:**
- Produces:
  - `export type NavSectionId = 'about' | 'projects' | 'skills' | 'contact'`.
  - `export const navSectionIds: readonly NavSectionId[] = ['about', 'projects', 'skills', 'contact']` in `src/data/navLinks.ts`.
  - The link label is `t.nav[id]`.
  - `NavbarProps = Record<string, never>` in `types.ts`, exported for the folder convention.
- Class names stay the same. Each theme file only holds `:global([data-theme=…])` rules. Every file is ≤250 lines.

- [ ] **Step 1:** Take baseline nav screenshots (`--clip nav`) at 1440 and 390px (menu open) in all four themes.
- [ ] **Step 2:** Do the move and split. Replace the four `<li>`s with a `navSectionIds.map`. Update the import in `src/App.tsx` (the path stays `./components/Navbar`).
- [ ] **Step 3: Verify.** Build and lint pass. `wc -l src/components/Navbar/*` shows every file ≤250 lines. The screenshots match the baselines visually.
- [ ] **Step 4: Commit.** `git commit -m "Move the navbar into its own folder and split its styles by theme"`

### Task 2: Floating pill (all themes) and the PF black pill

**Files:**
- Modify: `src/styles/tokens.css`
  - Add `--nav-pill-height: 56px` and set `--nav-height: 80px` in `:root`.
  - Light/dark `--nav-bg`: light `rgba(250, 248, 245, 0.55)`, dark `rgba(15, 17, 23, 0.55)`.
  - PF: `--nav-bg: rgba(26, 15, 8, 0.95)`, `--nav-menu-bg: rgba(26, 15, 8, 0.97)`, and a new `--nav-marker: <red tint ≥3:1 on #1a0f08>`. Start from `#e63946` and check it.
- Modify: `Navbar.module.css`, `NavbarMobile.module.css`, `NavbarPulpFiction.module.css`, `NavbarBladeRunner.module.css`

**Interfaces:**
- Produces: tokens `--nav-pill-height`, `--nav-marker` (PF), and the pill box (`.navbar`) that Task 3's list lives inside.

- [ ] **Step 1: Contrast.** Add the pairs to `$SP/contrast.ts`. Expected: PF `--nav-marker` on `#1a0f08` ≥3.0, mustard `#f4d35e` on `#1a0f08` ≥4.5, `--paper` `#f9f1dc` on `#1a0f08` ≥4.5.
- [ ] **Step 2: Pill.**
  - `.navbar` is fixed, `top: 12px`, centred with `left: 50%; translate: -50% 0`, uses the spec width, and is `--nav-pill-height` tall with `--radius-pill` corners.
  - It keeps the 1px `--nav-border` border on all sides (no `border-bottom`-only).
  - Light/dark add `--shadow-md`.
  - Its backdrop blur moves to a `::before` layer (`inset: 0; border-radius: inherit; z-index: -1`) with `blur(16px) saturate(160%)`. The pill element itself then doesn't become a backdrop root for the marker in Task 4.
- [ ] **Step 3: PF.**
  - `--radius-sm` corners, a `2.5px solid var(--ink)` border, and `box-shadow: 4px 4px 0 var(--accent)`.
  - Mustard text stays.
- [ ] **Step 4: Phone.** The menu panel (`.right` at ≤768px) becomes a card under the pill:
  - `top: calc(100% + 8px)`, same width, `--radius-lg` corners (PF `--radius-sm`), background `--nav-menu-bg`.
  - It keeps today's open/close transition.
- [ ] **Step 5: Verify.** Build and lint pass. Screenshots at 1440 and 390px (menu open) in all four themes show:
  - The pill floats with page content visible above and beside it.
  - The whisper hint still sits under the avatar.
  - The hero isn't overlapped.
  - Jumping to `#projects` puts the section heading below the pill (`scroll-padding-top`).
- [ ] **Step 6: Commit.** `git commit -m "Float the navbar as a pill and turn the Pulp Fiction navbar black"`

### Task 3: Current section, NavLinks and the sliding glass marker

**Files:**
- Create: `src/utils/activeSection.ts`, `src/hooks/useActiveSection.ts`
- Create: `src/components/NavLinks/` (`index.tsx`, `NavLinks.tsx`, `types.ts`, `NavLinks.module.css`)
- Create: `src/components/NavMarker/` (`index.tsx`, `NavMarker.tsx`, `types.ts`, `NavMarker.module.css`)
- Modify: `src/components/Navbar/Navbar.tsx` (render `<NavLinks onNavigate={closeMenu} />` instead of the `<ul>`). Move the link styles out of `Navbar.module.css` and `NavbarMobile.module.css` into `NavLinks.module.css`.

**Interfaces:**
- Consumes: `NavSectionId` and `navSectionIds` (Task 1).
- Produces:
  - `pickActiveSection(intersecting: ReadonlySet<NavSectionId>, atPageBottom: boolean): NavSectionId | null` in `src/utils/activeSection.ts`. It returns `'contact'` when `atPageBottom`, otherwise the first id in `navSectionIds` order that is in `intersecting`, otherwise `null`.
  - `useActiveSection(): NavSectionId | null`. It uses an `IntersectionObserver` on the four ids with a reading band (start from `rootMargin: '-35% 0px -60% 0px'`). `atPageBottom` is `innerHeight + scrollY >= scrollHeight - 2`, re-checked on scroll through the existing `useScrollFrame`.
  - `NavLinksProps = { onNavigate: () => void }`.
  - `NavMarkerProps = { target: HTMLElement | null; arrival: number }`. `arrival` increments only on pointer-enter or focus of a link. The marker renders `<span className={marker}><span key={arrival} className={inner}>…</span></span>`, so re-keying restarts the arrival animation and never stacks.
  - The marker sets `--marker-x` and `--marker-w` from `target.offsetLeft` and `offsetWidth` in a layout effect. It re-measures when `target` changes and through a `ResizeObserver` on the list. It never measures on mouse move.
  - Opacity is 0 when `target` is null.

- [ ] **Step 1: Failing test.** Write `$SP/activeSection.test.ts` with these asserts (imported from `src/utils/activeSection.ts`). Run it with `node $SP/activeSection.test.ts`. Expected: FAIL (module missing).
  - `pickActiveSection(new Set(), false) === null`
  - `pickActiveSection(new Set(['projects']), false) === 'projects'`
  - `pickActiveSection(new Set(['skills', 'projects']), false) === 'projects'`
  - `pickActiveSection(new Set(['skills']), true) === 'contact'`
- [ ] **Step 2:** Implement `pickActiveSection`, then re-run the test. Expected: PASS.
- [ ] **Step 3: Components.**
  - NavLinks holds `pointed: NavSectionId | null` and `arrival: number`. The target is `pointed ?? active`.
  - Links get `aria-current="true"` when `id === active`.
  - Hover and focus set `pointed`. Leaving the list, or blurring out of it, clears `pointed`.
  - The marker sits behind the link text (`z-index` below, `pointer-events: none`).
  - Under reduced motion, transitions use `0ms` and the opacity fade stays.
- [ ] **Step 4: Glass look (light/dark default).** On `.inner`:
  - About 8px×16px padding around the link (the marker box is the link box plus that inset).
  - `--radius-pill` corners.
  - Fill `rgba(255,255,255,0.25)` (dark `0.08`).
  - `backdrop-filter: blur(8px) saturate(180%)`.
  - A 1px `rgba(255,255,255,0.5)` border, plus `inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05), var(--shadow-sm)`.
  - In BR and PF, `.inner` is unstyled until Tasks 5 and 6. No glass in those themes.
- [ ] **Step 5: Verify.** Build and lint pass. Screenshots, light and dark, at 1440px:
  - At the top of the page the marker is hidden.
  - With `--scroll '#projects'` the bubble sits on "Projects".
  - With `--scroll '#projects' --hover 'a[href="#contact"]'` it sits on "Contact".
  - Scrolled to the very bottom it sits on "Contact" (Review Focus 2).
  - After switching to ES while it rests on Skills, the bubble width matches "Habilidades" (Review Focus 1).
  - Resizing 1440→390→1440 doesn't leave the marker misplaced, and it is `display: none` in the phone menu (Review Focus 3).
  - Tabbing through the links moves the bubble, and the focus ring stays visible.
- [ ] **Step 6: Commit.** `git commit -m "Add a sliding nav marker that rests on the current section"`

### Task 4: Chromium lens

**Files:**
- Create: `src/utils/glassSupport.ts`
- Create: `src/components/LiquidGlassFilter/` (`index.tsx`, `LiquidGlassFilter.tsx`, `types.ts`), rendered once in `Navbar.tsx`
- Modify: `src/main.tsx` (set `document.documentElement.dataset.glass` before render)
- Modify: `NavMarker.module.css`, `Navbar.module.css` (lens rules under `:global(html[data-glass="lens"])`)

**Interfaces:**
- Produces:
  - `isChromiumEngine(nav: EngineHints): boolean`, with `EngineHints = { userAgent: string; userAgentData?: { brands: { brand: string }[] } }`. It returns true when a `userAgentData` brand is `'Chromium'`, or when `userAgent` contains `Chrome/` and doesn't contain `Firefox`.
  - `glassMode(nav: EngineHints): 'lens' | 'frost'`.
  - The SVG filter id is `liquid-glass`. Use `feTurbulence`/`feImage` → `feDisplacementMap`, with a visible but bounded scale. Start around `scale="30"` and tune it from the screenshots.

- [ ] **Step 1: Failing test.** Write `$SP/glassSupport.test.ts` with the UA cases below. Run it with `node $SP/glassSupport.test.ts`. Expected: FAIL.
  - Chrome desktop `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36` → `'lens'`
  - Edge (`… Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0`) → `'lens'`
  - Firefox `Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0` → `'frost'`
  - Safari `… Version/18.0 Safari/605.1.15` → `'frost'`
  - iOS Chrome (`… CriOS/140.0 Mobile/15E148 Safari/604.1`) → `'frost'`
  - `userAgentData` brands containing `{ brand: 'Chromium' }` → `'lens'`
- [ ] **Step 2:** Implement, then re-run the test. Expected: PASS.
- [ ] **Step 3: Lens styles.** Under `html[data-glass="lens"]`, in light/dark only:
  - The pill `::before` uses `blur(4px)` and the pill tint is `--nav-bg` at about 0.7 alpha.
  - The bubble `.inner` uses `backdrop-filter: url(#liquid-glass) blur(2px) saturate(180%)`, with the same edges and highlights.
- [ ] **Step 4:** Install the scratchpad Chromium (see Harness).
- [ ] **Step 5: Verify.**
  - Build and lint pass.
  - Firefox: `document.documentElement.dataset.glass === 'frost'`, and the bubble isn't blank: it shows the glass look from Task 3 (Review Focus 5).
  - Chromium:
    - `dataset.glass === 'lens'`.
    - Scrolled to `#projects` and hovering a link, the grid lines and icons behind the bubble look visibly bent in a side-by-side with Firefox.
    - Nav text stays readable over Projects content.
- [ ] **Step 6: Commit.** `git commit -m "Add a refracting liquid-glass lens for Chromium browsers"`

### Task 5: Pulp Fiction gun sight

**Files:**
- Create: `src/components/NavMarker/Reticle.tsx`
- Create: `src/components/NavMarker/NavMarkerPulpFiction.module.css`
- Modify: `NavMarker.tsx` (render `<Reticle />` inside `.inner` when `theme === 'pulp-fiction'`)
- Modify: `NavLinks.module.css` (PF current link `--paper`; the phone static marker)

**Interfaces:**
- Consumes: `--nav-marker` (Task 2), `arrival` re-keying (Task 3).
- Produces: `Reticle()`, an `aria-hidden` SVG. It has:
  - a ⌀40px circle centred on the link
  - four tick marks
  - crosshair lines extending about 8px past the circle
  - `stroke: var(--nav-marker)`, 2px

- [ ] **Step 1:** Build the reticle and the lock-on animation (`200ms ease-out`, `scale: 1.3 → 1`, `opacity: 0 → 1`) on `.inner`. Because of the `arrival` re-key it plays only on hover/focus arrival. It is off under reduced motion. Glide-back and scroll changes slide without lock-on.
- [ ] **Step 2: Phone menu.** The current link shows a 16px reticle before its text.
- [ ] **Step 3: Verify.**
  - Build and lint pass.
  - PF screenshots at 1440px:
    - resting on Projects
    - hovering Contact
    - a mid-lock-on frame, taken 80ms after hover, that shows scale > 1
  - Link text is readable over the reticle, and the current link is cream.
  - At 390px with the menu open, the small reticle shows on the current link.
  - Sweeping the pointer across all four links at 100ms per step shows one reticle at a time (Review Focus 4).
- [ ] **Step 4: Commit.** `git commit -m "Add the Pulp Fiction gun-sight nav marker"`

### Task 6: Blade Runner neon tube

**Files:**
- Create: `src/styles/keyframes.css` (global `@keyframes neon-power-on`, moved from `NeonSign.module.css`), imported in `src/index.css`
- Modify: `src/components/NeonSign/NeonSign.module.css` (use the shared keyframes)
- Create: `src/components/NavMarker/NavMarkerBladeRunner.module.css`
- Modify: `NavLinks.module.css` (BR phone static marker)

**Interfaces:**
- Produces: global keyframes `neon-power-on`. CSS modules hash animation names, so modules must reference it as `animation-name: :global(neon-power-on)`. Verify the computed `animationName` is exactly `neon-power-on`. If Vite still hashes it, rule on the fallback and ledger it: keep a module-local copy in each file and remove the global one.

- [ ] **Step 1: Shared keyframes.** Move the keyframes and switch NeonSign to them. Screenshot a BR section with signs and confirm they still power on: the computed `animationName` on a lit `.sign` is `neon-power-on`.
- [ ] **Step 2: Tube.** On `.inner` in BR:
  - A 3px rounded tube under the text in `--neon-1`.
  - `box-shadow: 0 0 6px var(--neon-1), 0 0 16px var(--neon-1)`.
  - A soft upward glow behind the link: a radial gradient of `--neon-1` at about 18% alpha.
  - `neon-power-on` plays once per `arrival` re-key and not under reduced motion.
- [ ] **Step 3: Phone menu.** The current link gets a 3px vertical pink tube at its left edge.
- [ ] **Step 4: Verify.**
  - Build and lint pass.
  - BR screenshots at 1440px:
    - resting on Skills
    - hovering About
    - a frame mid-flicker
  - At 390px, the menu open.
  - A fast sweep shows one tube with no stacked flicker (Review Focus 4).
  - NeonSign behaviour is unchanged.
- [ ] **Step 5: Commit.** `git commit -m "Add the Blade Runner neon-tube nav marker"`

### Task 7: Audit, docs, roadmap

**Files:**
- Modify: `DESIGN.md` (notes: floating pill, the marker per theme, the `data-glass` lens split, PF black navbar)
- Modify: `docs/superpowers/plans/2026-11-16-portfolio-refresh-remaining-draft.md` (Part 6 → Done, with the spec and plan paths)

- [ ] **Step 1:** Run `/web-design:design-audit` on `src/components/Navbar/ src/components/NavLinks/ src/components/NavMarker/ src/components/LiquidGlassFilter/ src/styles/tokens.css`. Fix confirmed findings, then build.
- [ ] **Step 2:** Update DESIGN.md and the roadmap.
- [ ] **Step 3: Commit.** `git commit -m "Document the floating navbar and mark part 6 done"`
