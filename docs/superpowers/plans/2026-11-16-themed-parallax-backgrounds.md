# Themed Parallax Backgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the photo backgrounds of the Blade Runner and Pulp Fiction themes with themed multi-layer parallax (neon logos + neon signs; print-sticker logos + prop stickers), keeping the hologram and briefcase finales.

**Architecture:** One generic `ParallaxLayer` places items on a seeded random grid and translates at a given speed; each theme file stacks its own layers and supplies a `renderItem`. Pure grid/size maths lives in `src/utils`, item visuals in small presentational components.

**Tech Stack:** React 19 + TypeScript (strict), CSS Modules, Vite. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-16-themed-parallax-backgrounds-design.md`

## Global Constraints

- Code caps: file ≤250 lines (imports excluded), function body ≤10 lines, ≤3 parameters (group extras in a type), no explanatory comments inside bodies. React components are exempt from body/param caps only.
- Member order: properties, constructors, methods; helpers sit directly below their caller.
- Component folders: `index.tsx` (re-export), `Name.tsx`, `types.ts` (Props interface). Pattern: `src/components/EggThemeMenu/`.
- No literal colours in component CSS: every colour/opacity value is a token in `src/styles/tokens.css`.
- New user-visible text goes in `src/i18n/{en,es,pt}.ts` with all three languages.
- Every background element is `aria-hidden="true"` and `pointer-events: none`.
- Motion ≤500ms; under `prefers-reduced-motion` no parallax and no flicker (existing `usePrefersReducedMotion`).
- Type scale for sign text: `16 18 20 24` only. Radius: `--radius-sm` only.
- Contrast caps for items in the content column: BR opacity **0.2** + **blur(2px)**; PF opacity **0.1**. Outside: BR far 0.6 / near 0.9, PF far/near 0.85.
- Commits on `main`, plain imperative message, **no Co-Authored-By or other trailer**.
- No unit-test framework exists; pure utils are checked with throwaway `node` scripts in the scratchpad (Node 26 runs `.ts` directly), everything else with `npm run build`, `npm run lint` and the browser.

## Review Focus

1. **Page height changes after load** (images, fonts, filter changes Projects height): layers must grow to cover `innerHeight + maxScroll × speed` without reshuffling items already placed → Task 1 check script asserts extending `height` keeps the earlier cells identical.
2. **Window resize / phone width**: at 390px every item counts as in-column and is dimmed; crossing 1120px updates dim flags → Task 1 check asserts `isInContentColumnFor` at both widths; Task 5 browser check at 390px.
3. **Language switch while BR is open**: sign text changes without re-laying-out the grid → Task 2 browser step.
4. **Glow masked away**: CSS applies `filter` before `mask`, so a drop-shadow on the masked element disappears → Task 2 requires the glow on an unmasked wrapper; browser step checks the halo is visible.
5. **Reduced motion**: no translate, no flicker, signs fully visible, hologram/briefcase still driven by scroll position → Task 5 browser step with DevTools emulation.

---

### Task 1: Parallax layer foundation + regular background port

**Files:**
- Create: `src/utils/gridPlacement.ts`, `src/utils/contentColumn.ts`, `src/hooks/useLayerItems.ts`, `src/data/backgroundIcons.ts`
- Create: `src/components/BackgroundPattern/{index.tsx,types.ts,BackgroundPattern.tsx,ParallaxLayer.tsx,ParallaxLayer.module.css,RegularBackground.tsx,RegularBackground.module.css}`
- Modify: `src/utils/scrollProgress.ts`, `src/styles/tokens.css`, `src/index.css:74`, `src/App.tsx:4`
- Delete: `src/components/BackgroundPattern.tsx`, `src/components/BackgroundPattern.module.css` (the current BR/PF functions and their CSS move verbatim into `BladeRunnerBackground.tsx`/`.module.css` and `PulpFictionBackground.tsx`/`.module.css`, still using the photos, until Tasks 2–3 rewrite those files)

**Interfaces — Produces:**
- `gridPlacement.ts`: `interface Cell { row: number; col: number }`, `interface GridSpec { cellSize: number; fillRatio: number; width: number; height: number }`, `hashRand(cell: Cell, salt: number, seed: number): number` (current formula), `pickSpacedCells(spec: GridSpec, seed: number): Cell[]` (cols = ⌊width/cellSize⌋, rows = ⌊height/cellSize⌋, row-major, skip cells with a placed 8-neighbour — today's algorithm).
- `scrollProgress.ts`: `parallaxLayerHeight(speed: number): number` = `innerHeight + max(0, scrollHeight − innerHeight) × speed`.
- `contentColumn.ts`: `isInContentColumnFor(x: number, viewportWidth: number, columnMax: number): boolean` (|x − vw/2| ≤ min(columnMax, vw)/2) and `isInContentColumn(x: number): boolean` reading `--content-max` from `documentElement` and `document.documentElement.clientWidth`.
- `types.ts`: `interface LayerSpec { speed: number; cellSize: number; fillRatio: number }`, `interface LayerItem { index: number; cell: Cell; x: number; y: number; dim: boolean; rand: (salt: number) => number }`, `interface ParallaxLayerProps { spec: LayerSpec; renderItem: (item: LayerItem) => ReactNode; className?: string; style?: CSSProperties }`.
- `useLayerItems(spec: LayerSpec): { height: number; items: LayerItem[] }`: seed from `useState(() => Math.random() * 1000)`; height + width state refreshed in `useScrollFrame` (React drops identical values); items memoised on (height, width, seed); `rand = salt => hashRand(cell, salt, seed)`.
- `ParallaxLayer`: absolute-positioned cell boxes (`cellSize` square at x,y) holding `renderItem(item)`, class `dim` when `item.dim`; layer transform via `parallaxTransform(spec.speed)` or `none` under reduced motion.
- `backgroundIcons.ts`: `export const TECH_LOGOS: string[]` (the 16 SVG imports, same order as today).
- Tokens in `:root`: `--content-max: 1120px; --bg-far-opacity: 1; --bg-near-opacity: 1; --bg-item-opacity-dim: 1; --bg-item-blur-dim: 0px`.

- [ ] **Step 1: Write check script** `$SCRATCH/check-grid.ts` importing `gridPlacement.ts` and `contentColumn.ts` by relative path with `.ts` extension:

```ts
const spec = { cellSize: 140, fillRatio: 0.18, width: 1400, height: 2800 }
const a = pickSpacedCells(spec, 42)
const b = pickSpacedCells({ ...spec, height: 5600 }, 42)
assert.deepEqual(b.slice(0, a.length), a)              // growth keeps placed cells
assert.ok(a.every(c => c.col < 10 && c.row < 20))
assert.ok(!a.some(c => a.some(d => d !== c && Math.abs(d.row - c.row) <= 1 && Math.abs(d.col - c.col) <= 1)))
assert.equal(isInContentColumnFor(100, 1920, 1120), false)
assert.equal(isInContentColumnFor(960, 1920, 1120), true)
assert.equal(isInContentColumnFor(10, 390, 1120), true)  // phones: whole screen is column
```

- [ ] **Step 2:** Run `node $SCRATCH/check-grid.ts` → fails (modules missing).
- [ ] **Step 3:** Implement the two utils, `parallaxLayerHeight`, tokens, and `section { max-width: var(--content-max) }`.
- [ ] **Step 4:** Run `node $SCRATCH/check-grid.ts` → exits 0.
- [ ] **Step 5:** Implement `useLayerItems`, `ParallaxLayer` (+ `.dim { opacity: var(--bg-item-opacity-dim); filter: blur(var(--bg-item-blur-dim)); }`), `RegularBackground` (spec `{ speed: 0.15, cellSize: 140, fillRatio: 0.18 }`, grid-line background and `.icon` styles moved from the old CSS, icon `TECH_LOGOS[⌊rand(1)·16⌋]` at 22.5% inset, 55% size), `BackgroundPattern` theme switch, `index.tsx`; update `App.tsx` import to the folder.
- [ ] **Step 6:** `npm run build && npm run lint` → both pass.
- [ ] **Step 7:** `npm run dev`; light and dark look like before (faint logos + grid lines drifting at 15%); scroll to the footer, the pattern never runs out.
- [ ] **Step 8:** Commit: `Move background pattern onto a reusable parallax layer`.

### Task 2: Blade Runner neon city

**Files:**
- Create: `src/utils/neonFontSize.ts`, `src/components/NeonLogo/{index.tsx,NeonLogo.tsx,NeonLogo.module.css,types.ts}`, `src/components/NeonSign/{index.tsx,NeonSign.tsx,NeonSign.module.css,types.ts}`, `src/components/BackgroundPattern/BladeRunnerBackground.tsx` + `.module.css`
- Modify: `src/styles/tokens.css` (BR block), `src/i18n/types.ts`, `en.ts`, `es.ts`, `pt.ts` (rewrite the moved BR file)

**Interfaces — Consumes:** `ParallaxLayer`, `LayerItem`, `TECH_LOGOS` (Task 1). **Produces:**
- `neonFontSize(text: string, rand: number): number`: pick `NEON_FONT_SCALE[⌊rand·4⌋]` from `[16, 18, 20, 24]`, cap at `130 / (longestWord × 0.78)`, snap down to the largest scale value ≤ result, floor 16.
- `NeonLogoProps { src: string; color: string }`: outer span carries `filter: drop-shadow(0 0 4px color) drop-shadow(0 0 12px color)`; inner span is the masked shape (`mask: url(src) center / contain no-repeat`, background `color`). Glow must sit on the unmasked outer span.
- `NeonSignProps { text: string; color: string; fontSize: number; tilt: number; mount: 'left' | 'right' }`: markup and look moved from `GlowBackground` `.neonSign` + `::before` arm; the arm sits on the `mount` side. Power-on: `observeOnce` adds `.on`, keyframes flicker opacity 0 → 1 → 0.3 → 1 over `var(--duration-slow)`; reduced motion shows it lit with no animation.
- Tokens `[data-theme="blade-runner"]`: `--neon-1: #ff36a0; --neon-2: #00eaff; --neon-3: #ff7a18; --neon-4: #ffd166; --bg-far-opacity: 0.6; --bg-near-opacity: 0.9; --bg-item-opacity-dim: 0.2; --bg-item-blur-dim: 2px`.
- `Translations.nav.egg.neonSigns: string[]`, exact copy:
  - en: `Need a developer? I can fix that`, `More human than human`, `Within cells interlinked`, `Wake up`, `Like tears in rain`, `Born, not made`, `A world built on a wall`, `Off-world colonies`, `Los Angeles 2049`, `Replicant repair · open 24h`, `Now hiring humans`, `Native apps, built to last`
  - es: `¿Necesitas un desarrollador? Yo lo arreglo`, `Más humano que los humanos`, `Células entrelazadas`, `Despierta`, `Como lágrimas en la lluvia`, `Nacido, no fabricado`, `Un mundo construido sobre un muro`, `Colonias exteriores`, `Los Ángeles 2049`, `Reparación de replicantes · 24h`, `Se buscan humanos`, `Apps nativas, hechas para durar`
  - pt: `Precisa de um desenvolvedor? Eu resolvo`, `Mais humano que humano`, `Células interligadas`, `Acorde`, `Como lágrimas na chuva`, `Nascido, não fabricado`, `Um mundo construído sobre um muro`, `Colônias espaciais`, `Los Angeles 2049`, `Conserto de replicantes · 24h`, `Contratamos humanos`, `Apps nativos, feitos para durar`
- `BladeRunnerBackground`, bottom to top: hologram (`br2049-background-2.webp`, `brightness(0.55)`, opacity `rangeProgress(pageScrollProgress(), 0.85, 0.95)`); logo layer `{0.15, 140, 0.18}` with `NeonLogo` colour `var(--neon-${1 + ⌊rand(2)·4⌋})` and layer opacity `--bg-far-opacity`; sign layer `{0.25, 280, 0.35}` with `NeonSign` text `deck[index % deck.length]` (deck = per-mount index shuffle applied to `t.nav.egg.neonSigns`, so a language switch swaps text in place), tilt `(rand(3) − 0.5) × 6`, mount `left` when the cell centre < viewport centre, layer opacity `--bg-near-opacity`.

- [ ] **Step 1: Check script** `$SCRATCH/check-neon.ts`:

```ts
assert.equal(neonFontSize('Wake up', 0.99), 24)
assert.equal(neonFontSize('Wake up', 0), 16)
assert.equal(neonFontSize('Desenvolvedor', 0.99), 16)          // long word caps to floor
assert.ok([16, 18, 20, 24].includes(neonFontSize('Replicant repair', 0.6)))
```

- [ ] **Step 2:** Run → fails. **Step 3:** Implement `neonFontSize`. **Step 4:** Run → passes.
- [ ] **Step 5:** Implement tokens, i18n, `NeonLogo`, `NeonSign`, `BladeRunnerBackground`; wire into `BackgroundPattern`.
- [ ] **Step 6:** `npm run build && npm run lint` → pass.
- [ ] **Step 7:** Browser, BR via the navbar avatar: navy base; glowing logos (halo visible) and signs drift at different speeds; signs behind the text column are faint and blurred; signs power on once when they scroll into view; the hologram fades in at the bottom; switching to ES/PT changes the sign text while the signs stay where they are.
- [ ] **Step 8:** Commit: `Give the Blade Runner theme a neon parallax city`.

### Task 3: Pulp Fiction print stickers

**Files:**
- Create: `src/components/PrintLogo/{index.tsx,PrintLogo.tsx,PrintLogo.module.css,types.ts}`, `src/components/PropSticker/{index.tsx,PropSticker.tsx,PropSticker.module.css,types.ts}`, `src/components/BackgroundPattern/PulpFictionBackground.tsx` + `.module.css`
- Modify: `src/data/iconPaths.ts`, `src/data/backgroundIcons.ts`, `src/styles/tokens.css` (PF block) (rewrite the moved PF file)

**Interfaces — Consumes:** Task 1 layer API, `<Icon>`. **Produces:**
- `IconName` gains `hamburger | cupSoda | cigarette | keyRound | briefcase | banknote | watch | cassetteTape | glasses | car | motorbike`; shapes copied exactly from `https://unpkg.com/lucide-static@1.73.0/icons/<kebab-name>.svg` (only `path`, `rect`, `circle` occur).
- `backgroundIcons.ts`: `export const PF_PROPS: IconName[]` (the 11 above).
- `PrintLogoProps { src: string; tilt: number }`: rotated wrapper with two masked spans of `src`: back one `var(--accent)`, `translate(4px, 4px) scale(1.06)`; front one `var(--ink)`.
- `PropStickerProps { icon: IconName; tilt: number }`: 64px box, `background: var(--paper)`, `2px solid var(--ink)`, `border-radius: var(--radius-sm)`, `box-shadow: var(--shadow-md)`, rotated `tilt`; `<Icon size={32}>` coloured `var(--accent)`.
- Tokens `[data-theme="pulp-fiction"]`: `--paper: #f9f1dc; --bg-far-opacity: 0.85; --bg-near-opacity: 0.85; --bg-item-opacity-dim: 0.1; --bg-item-blur-dim: 0px`.
- `PulpFictionBackground`, bottom to top: wrapper halftone `radial-gradient(color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1.5px) 0 0 / 8px 8px`; logo layer `{0.15, 140, 0.18}` → `PrintLogo` (logo `TECH_LOGOS[⌊rand(1)·16⌋]`, tilt `(rand(3) − 0.5) × 16`); prop layer `{0.25, 220, 0.25}` → `PropSticker` (icon `PF_PROPS[⌊rand(1)·11⌋]`, same tilt formula); briefcase (`pf_background-2.webp`, existing `briefcaseOffset` and 0.9–1 slide).

- [ ] **Step 1:** Implement icon shapes + `PF_PROPS`; `npm run build` → passes (types prove every name has shapes).
- [ ] **Step 2:** Implement tokens, `PrintLogo`, `PropSticker`, `PulpFictionBackground`; wire into `BackgroundPattern`.
- [ ] **Step 3:** `npm run build && npm run lint` → pass.
- [ ] **Step 4:** Browser, PF: mustard with faint dots; solid ink logos with an offset red copy; cream outlined prop stickers that read clearly as a different kind of item; props drift faster than logos; items behind the text column are very faint; the briefcase slides up at the end.
- [ ] **Step 5:** Commit: `Give the Pulp Fiction theme a print-sticker parallax`.

### Task 4: Remove section decorations and unused assets

**Files:**
- Modify: `src/components/GlowBackground.tsx` + `.module.css` (keep only the blobs: `Props { slot?: number }`, `observeOnce` reveal, `.mirrored` when `slot % 2`), `src/sections/Projects.tsx:67-98`, `src/sections/Skills.tsx`, `src/sections/Projects.module.css`, `src/sections/Skills.module.css`
- Delete: `src/assets/images/bullet-hole.webp`, `src/assets/images/blade-runner/br2049-background-1.webp`, `src/assets/images/pulp-fiction/pf_background-1.webp`

- [ ] **Step 1:** Strip `GlowBackground` (neon, gutter, holes, egg-theme `.glow` rules). In Projects and Skills render `{!isEggTheme && <GlowBackground … />}` once, at the section level (Projects keeps `key={activeFilter}`), and drop the comment about bounding the glow in `gridWrap`.
- [ ] **Step 2:** Delete the three images. Run `grep -rn "bullet-hole\|br2049-background-1\|pf_background-1\|NEON_TEXTS" src` → no output.
- [ ] **Step 3:** `npm run build && npm run lint` → pass; browser: Projects and Skills show blobs in light/dark and nothing extra in BR/PF.
- [ ] **Step 4:** Commit: `Drop section neon signs and bullet holes`.

### Task 5: Verify and design audit

- [ ] **Step 1:** Browser at 1440px and 390px, in all four themes: Task 1–4 checks hold; at 390px BR/PF items are all dimmed.
- [ ] **Step 2:** DevTools "prefers-reduced-motion: reduce": no layer movement, signs lit with no flicker, hologram and briefcase still follow scroll position.
- [ ] **Step 3:** Contrast with the DevTools picker: body text over the brightest dimmed sign (BR) and over the strongest dimmed sticker (PF) ≥4.5:1; red accent text in PF ≥4.5:1.
- [ ] **Step 4:** Run `/web-design:design-audit` on the changed files; fix each finding or report it to the user with the reason it stays.
- [ ] **Step 5:** Fixes (if any) → `npm run build && npm run lint` → commit: `Apply design audit fixes to themed backgrounds`.

### Task 6: Update the docs

Runs last, so the docs describe what actually shipped, including any audit fixes from Task 5.

**Files:**
- Modify: `DESIGN.md`, `docs/superpowers/specs/2026-11-16-themed-parallax-backgrounds-design.md`

- [ ] **Step 1:** `DESIGN.md` theme table, Images row: BR "Navy base, neon logo and sign parallax, hologram finale"; PF "Mustard halftone, print-sticker logo and prop parallax, briefcase finale". Shadows row (PF): add "prop stickers".
- [ ] **Step 2:** `DESIGN.md` Notes: add the content-column dim rule and its caps (BR 0.2 + 2px blur, PF 0.1); list the new tokens (`--content-max`, `--neon-1..4`, `--paper`, `--bg-far-opacity`, `--bg-near-opacity`, `--bg-item-opacity-dim`, `--bg-item-blur-dim`); say neon signs power on once in 500ms (no endless flicker); say PF props come from Lucide (same pack) and the tech logos stay decorative brand marks. Remove mentions of bullet holes and the blurred poster.
- [ ] **Step 3:** Spec: if anything changed during the build (values, layer specs, sign copy, audit fixes), update the matching line so the spec matches the code. If nothing changed, leave it.
- [ ] **Step 4:** `grep -n "bullet\|blurred poster\|side margins" DESIGN.md` → no stale lines.
- [ ] **Step 5:** Commit: `Document themed parallax backgrounds`.
