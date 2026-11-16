# Themed parallax backgrounds for Blade Runner and Pulp Fiction

Part 1 of 4 of the portfolio refresh. The order we agreed on: **BR + PF backgrounds (this plan)** → Skills section → Hero section. Each of the later parts gets its own brainstorm.

## Context

The normal light and dark themes use a scrolling background: tech logos sit on a random grid that moves at 15% of scroll speed. The hidden themes use photos instead. BR has a dim city photo that crossfades into the pink hologram scene. PF has a blurred poster with a briefcase that slides up at the end. The user wants both hidden themes to get the same parallax, styled for each film:

- **BR:** neon-glowing logos, and the neon signs move out of the Projects and Skills margins into the background, so the page reads as a city full of neon ads.
- **PF:** yellow background, logos styled in the film's poster language, plus film props (burger, shake, cigarette, Zed's keys…) that look clearly different from the logos.

The PF bullet holes are dropped. With the signs and holes gone, `GlowBackground` only draws the normal-theme blobs, which also clears the way for the Skills redesign.

## Decisions made with the user

| Topic | Decision |
|---|---|
| BR base | Navy `#0a0e1a`. The city photo goes. **The hologram crossfade at the bottom of the page stays.** |
| BR logos | Single-colour neon silhouettes on the same random grid at 15% speed |
| BR signs | Move into the background. They can appear **anywhere**, and the ones behind the content column are dimmed and blurred |
| PF base | Mustard yellow. The poster photo goes. **The briefcase slide-up at the bottom stays.** |
| PF logos | "Screen-print stickers": an ink-brown silhouette over an offset red copy of itself, slightly tilted |
| PF props | Film props from the site's existing icon pack (Lucide). They must look clearly different from the logos |
| Bullet holes | Removed everywhere |
| Build approach | **A**: a shared parallax-layer system, split into one file per theme (B, pre-drawn images, and C, canvas, were rejected) |

## Calls I made (correct any of these)

1. **Props look:** red Lucide line art centred on a cream "paper" sticker (`--paper`), with a 2px ink border, `--radius-sm` (4px), the theme's hard `--shadow-sm` and a ±8° tilt. They form a closer layer at **25%** speed. Logos are solid and props are outlined, which is what tells them apart.
2. **Sign speed:** BR signs are also a closer layer at **25%** speed, which gives both themes the same depth.
3. **No endless flicker.** Endless flicker breaks UX-4 (animations must be purposeful and 200–500ms). Instead, each sign does a one-time **power-on flicker** (`--duration-slow`, 500ms) the first time it enters the viewport. Under reduced motion there's no flicker and no parallax.
4. **Sign text:** "Projects here" is dropped because it pointed at a section. "Need a developer? I can fix that" stays, since it works as a city ad. New lines (yours to edit): "Replicant repair · open 24h", "Now hiring humans", "Native apps, built to last". Per the repo's texts rule, the sign text moves into i18n with Spanish and Portuguese versions, so the signs follow the language switch.
5. **PF dims in the content column too**, using the same rule as BR, so both themes behave the same.
6. **Unused assets are deleted:** `bullet-hole.webp`, `br2049-background-1.webp`, `pf_background-1.webp`.
7. **Stacking order:** BR is navy → hologram (crossfade) → logos → signs. PF is mustard + halftone → logos → props → briefcase on top.

## Web-design rule check (rules that apply here)

| Rule | How the design complies |
|---|---|
| COLOR-11 contrast 4.5:1 | Measured against the theme tokens. **BR** body text `#a8b2c7` on navy is 9.0:1. Cyan behind it may reach at most 0.28 opacity, and yellow at most 0.27. → Items whose box, plus its glow reach, overlaps the text area (the 1120px column minus its side padding) are capped at **opacity 0.2 + blur(2px)**. **PF**: red accent text `#9e1b20` on mustard is 5.4:1. Ink behind it may reach at most 0.11 opacity, and red at most 0.14. → PF items in the column are capped at **opacity 0.1**. Outside the column, items render at full theme strength (BR logos 0.6 and signs 0.75, PF logos 0.85 and props 0.7). On phones the whole screen counts as column, so everything is dimmed. |
| COLOR-2 no ad-hoc colours | The neon colours (`#ff36a0 #00eaff #ff7a18 #ffd166`, hard-coded in TS today) move to `tokens.css` as `--neon-1..4` under `[data-theme="blade-runner"]`, with the orange replaced by violet `#b388ff` so orange stays the CTA's colour. New PF token: `--paper: #f9f1dc`. The dim opacities become per-theme tokens: `--bg-item-opacity`, `--bg-item-opacity-dim`. |
| TYPO-4 type scale | Sign font size is currently a random 16–34px. It changes to a pick from the scale `16 18 20 24`, still capped by the longest-word fit. |
| TYPO-8 weight ≥400 | Signs stay at 700 |
| ICON-2 one pack | Props come from Lucide, the pack already in use. The tech logos stay decorative brand marks (already noted in DESIGN.md) |
| ICON-4 / ICON-11 | Props are outline icons, matching Inter. Each is enclosed in a sticker shape rather than scaled up on its own (32px icon in a 64px sticker) |
| SHADOW | BR glows are already part of the theme (SHADOW-8). PF's hard offset shadows are the already-relaxed SHADOW-03 |
| RADIUS-4 | Only `--radius-sm` is used |
| UX-4 motion | Parallax follows the scroll. The sign power-on runs once, in 500ms. Everything is off under `prefers-reduced-motion` |
| HIER-7 | Dimming in the column keeps the background from competing with the content |
| Decorative a11y | Every background element is `aria-hidden` with `pointer-events: none` |

After building, `/design-audit` (the web-design plugin) runs on every changed file. Any finding gets fixed or reported before calling this done.

## Implementation

The project follows its own conventions: component folders contain `index.tsx`, `Name.tsx` and `types.ts`; data lives in `src/data`; visual values live in `tokens.css`. Code limits: 250 lines per file, 10-line function bodies, 3 parameters (more get grouped into a type), and no explanatory comments inside function bodies.

### New / moved files
- `src/utils/gridPlacement.ts`: the grid code moved out of `BackgroundPattern.tsx` (`hashRand`, `gridCells`, `pickSpacedCells`, `hasPlacedNeighbor`). It's generalised with a `GridSpec { cellSize; fillRatio; height }` type, so each layer can use its own cell size and density.
- `src/utils/scrollProgress.ts`: add `parallaxLayerHeight(speed)` = `innerHeight + maxScroll × speed`, replacing the fixed `300vh`, so the faster 25% layers never run out of content.
- `src/utils/contentColumn.ts`: `readColumnMetrics()`, `textAreaSpan(metrics)` (column minus `--section-pad-x`), `expandSpan(span, margin)` and `overlapsSpan(a, b)`.
- `src/data/backgroundIcons.ts`: the tech-logo SVG imports (moved from `BackgroundPattern.tsx`) plus the `PF_PROPS: IconName[]` list.
- `src/data/iconPaths.ts`: add Lucide shapes for `hamburger, cupSoda, cigarette, keyRound, briefcase, banknote, watch, cassetteTape, glasses, car` (plus `motorbike` if Lucide has it). Copy the exact path data from the `lucide-static` SVGs on unpkg; it stays a data file with no new dependency.
- `src/components/BackgroundPattern/`
  - `index.tsx`, `types.ts` (`ParallaxLayerProps`, `Placement`)
  - `BackgroundPattern.tsx`: the theme switch only
  - `ParallaxLayer.tsx`: applies `translateY(-scrollY × speed)` through the existing `useScrollFrame`, sets its height from `parallaxLayerHeight`, places items absolutely, and after each render sets `data-dim` on every cell whose item box, padded by the layer's `glowMargin`, overlaps the text area
  - `RegularBackground.tsx` + `.module.css`: today's `IconPatternBackground`, unchanged in look
  - `BladeRunnerBackground.tsx` + `.module.css`: navy, the hologram crossfade (existing `rangeProgress` logic), a logo layer (0.15) and a sign layer (0.25, larger cells, low fill)
  - `PulpFictionBackground.tsx` + `.module.css`: mustard with a halftone made from `radial-gradient` dots, a logo layer (0.15), a prop layer (0.25) and the briefcase (existing `briefcaseOffset` logic)
- `src/components/NeonLogo/`: the SVG as a CSS `mask-image` filled with `var(--neon-color)`, plus a `drop-shadow` glow
- `src/components/NeonSign/`: the sign markup and CSS moved from `GlowBackground` (border, glow, mounting arm pointing to the nearer screen edge). Font size comes from the type scale. The one-time power-on uses the existing `observeOnce`
- `src/components/PrintLogo/`: an ink mask over a red mask offset by (4px, 4px) and scaled up 6%, with a tilt
- `src/components/PropSticker/`: a cream sticker that wraps the existing `<Icon>` in red

### Edited files
- `src/styles/tokens.css`: `--content-max: 1120px` (also used by `section` in `index.css:74`); BR `--neon-1..4`; PF `--paper`; per-theme `--bg-item-opacity`, `--bg-item-opacity-dim`
- `src/i18n/types.ts`, `en.ts`, `es.ts`, `pt.ts`: `egg.neonSigns: string[]` (moved from `GlowBackground`'s `NEON_TEXTS`, with the edits above)
- `src/components/GlowBackground.tsx` / `.module.css`: remove the neon sign, gutter, bullet hole and egg-theme rules, keeping only the blobs (the file shrinks from 294 lines to about 60)
- `src/sections/Projects.tsx`, `Skills.tsx`: render `GlowBackground` only when `!isEggTheme` and drop the second `isEggTheme && glow` mount inside `gridWrap`
- `DESIGN.md`: update the Images row of the theme table and add notes on the content-column dim rule, the new tokens and the one-time neon power-on
- Delete `src/components/BackgroundPattern.tsx` and `.module.css` (replaced by the folder) and the three unused images

### Order of work
1. Save the design as `docs/superpowers/specs/2026-11-16-themed-parallax-backgrounds-design.md` and commit it on `main` (no Co-Authored-By trailer, as you prefer). Then expand this section into a task-by-task plan with `superpowers:writing-plans`.
2. Tokens, the grid and column utilities, and `ParallaxLayer`. Then move the regular background onto it with no visual change.
3. Blade Runner: `NeonLogo`, `NeonSign`, i18n sign text, layers and the hologram.
4. Pulp Fiction: icon paths, `PrintLogo`, `PropSticker`, layers, the halftone and the briefcase.
5. Strip `GlowBackground` and the egg-theme branches in Projects and Skills, then delete the unused assets.
6. Update `DESIGN.md`, then verify.

## Verification
- `npm run build` and `npm run lint` pass.
- `npm run dev`, checked in a browser at 1440px and 390px wide, in light, dark, BR (opened from the navbar avatar) and PF:
  - The light and dark backgrounds look exactly as they do today.
  - BR: neon logos and signs scroll at different speeds; signs behind text are dimmed and blurred; the hologram fades in at the bottom; signs flicker on once.
  - PF: sticker logos and prop stickers are clearly different from each other; items behind text are faint; the briefcase slides up at the end.
  - No bullet holes and no neon signs remain inside Projects or Skills.
  - With "reduce motion" turned on in the OS or DevTools: no parallax, no flicker, the hologram and briefcase show their end states, and the page still works.
  - Changing the language changes the sign text.
- Spot-check contrast with the DevTools picker over the brightest dimmed sign and the strongest PF sticker that sits behind body text (target ≥4.5:1).
- Run `/design-audit` on the changed files and fix or report every finding.

## Changed during the build

These came out of the browser checks and the design audit (UX and visual reviewers). The text above already reflects them.

- **Dim rule:** the first version tested the cell centre against the column. Long signs spilled out of their cell and sat bright over body text, and glow halos reached the text even when the box didn't. Each item's real box is now measured, padded by its glow reach (BR logos 16px, signs 24px, PF 8px).
- **Glow strength:** signs out-glowed the primary button. The 40px text-shadow and 28px box-shadow layers were dropped, and the near-layer opacity was lowered.
- **Sign placement:** signs hug the outer side of their cell. In the last column, right-mounted signs hug the screen edge.
- **Dimmed signs don't flicker,** and the italic style was removed because Inter's italic file isn't loaded.
- **PF logos:** brand marks only. The generic outline device icons stay in the light, dark and BR themes.
- **Not done (needs a decision or new assets):** a 2x export of the briefcase and hologram images, and possibly new wording for "Need a developer? I can fix that" and "Now hiring humans".

