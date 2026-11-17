# Projects Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Carlos V app and the Claude Marketplace as projects, give PartyPuzl its new theme-matched screenshots and Play Store link, and link the Skills DevOps card to the release pipeline.

**Architecture:** Project screenshots become a `ScreenshotSet` (`light` plus an optional `dark`), resolved per theme by a pure `screenshotsFor` helper. Projects without screenshots can carry `tiles`, which a new `PreviewTiles` component renders in the card and in the modal. A new `aiTooling` category brings the existing filter bar back.

**Tech Stack:** React 19 + TypeScript, CSS Modules, Vite. ffmpeg (libwebp) for the images. No new project dependencies.

**Spec:** `docs/superpowers/specs/2026-11-16-projects-update-design.md`

## Global Constraints

- Code caps: file ≤250 lines (imports excluded), function body ≤10 lines, ≤3 parameters, no explanatory comments inside bodies. React components are exempt from the body and parameter caps only.
- Component folders: `index.tsx`, `Name.tsx`, `types.ts`. CSS uses tokens only. Every new string goes in en/es/pt.
- Images are WebP at quality 80: full size 1080×2424, thumbs 184×413, under `public/projects/<folder>/<light|dark>/` (thumbs in `thumbs/`).
- Dark set for `dark` and `blade-runner`; light set for `light` and `pulp-fiction`; light is the fallback.
- Commits on `main`, author logang-bot, **no trailers**. No push without asking. The zips at the repo root stay untracked.

## Review Focus

1. **Theme switch while the page is open:** the card thumbs must follow the new theme without a reload → Task 4 switches the theme in the browser and re-checks the thumb paths.
2. **Phoebe Store has no dark set:** dark themes must fall back to its light images, not show nothing → Task 2 node check, Task 4 DOM check in dark.
3. **The modal for a tile project:** no carousel controls, no "No screenshots yet", 4 tiles → Task 4 DOM check.
4. **Filter "AI tooling" in es and pt:** the longer labels must not overflow the filter bar at 390px → Task 4 screenshot.
5. **Stale PartyPuzl paths:** no reference to the removed `/projects/partypuzl/NN.webp` → Task 2 check that every path exists on disk.

---

### Task 1: Screenshot images

**Files:**
- Create: `public/projects/partypuzl/{light,dark}/{01..12}.webp` (+ `thumbs/`), `public/projects/carlosv/{light,dark}/{01..08}.webp` (+ `thumbs/`)
- Delete: `public/projects/partypuzl/{01..11}.webp`, `public/projects/partypuzl/thumbs/`

- [ ] **Step 1:** Extract both zips into `<scratchpad>/zips/`.
- [ ] **Step 2:** Convert each image into the matching folder:
  - Full size: `ffmpeg -i in.png -c:v libwebp -quality 80 out.webp`.
  - Thumb: `-vf scale=184:413` with the same quality.
  - **PartyPuzl:** `store-screenshots/en-US/<theme>/NN_*.png` → `partypuzl/<theme>/NN.webp`, NN 01–12.
  - **Carlos V:** `screenshots/<theme>_` in the order 01_mercados, 02_catalogo, 08_nuevo_pedido, 07_detalle_pedido, 06_detalle_cliente, 03_reporte, 12_sincronizacion, 10_lista_negra → `carlosv/<theme>/01..08.webp`.
- [ ] **Step 3:** Remove the old PartyPuzl files with `git rm`.
- [ ] **Step 4:** Verify. `ls` shows 12+12 PartyPuzl and 8+8 Carlos V files per size. `file` on one full-size image and one thumb reports 1080x2424 and 184x413.
- [ ] **Step 5:** Commit after Task 2, together with the paths that use these images, so the build never points at missing files.

### Task 2: Project data and `screenshotsFor`

**Files:**
- Create: `src/utils/screenshotsFor.ts`, `src/data/marketplacePlugins.ts`
- Modify: `src/data/projects.ts`, `src/data/iconPaths.ts` (add `braces`, `gitBranch`, `palette`)
- Test: `<scratchpad>/check-projects.ts`

**Interfaces (produces):**
```ts
// projects.ts
export type ProjectId = 'carlosV' | 'partyPuzl' | 'claudeMarketplace' | 'phoebeStore'
export type ProjectCategory = 'mobile' | 'web' | 'gaming' | 'aiTooling'
export interface ScreenshotSet { light: string[]; dark?: string[] }
export interface PreviewTile { label: string; icon: IconName }
// Project: screenshots: ScreenshotSet; tiles?: PreviewTile[]  (other fields unchanged)
// utils/screenshotsFor.ts
export function screenshotsFor(set: ScreenshotSet, theme: Theme): string[]
// data/marketplacePlugins.ts
export const marketplacePlugins: PreviewTile[]
```

- [ ] **Step 1: Write the check** in `<scratchpad>/check-projects.ts`, using absolute `.ts` imports. Assert that:
  - Projects are in this order: `projects.map(p => p.id)` deep-equals `['carlosV','partyPuzl','claudeMarketplace','phoebeStore']`.
  - `screenshotsFor({light:['a'],dark:['b']}, x)` gives `['b']` for `dark` and `blade-runner`, and `['a']` for `light` and `pulp-fiction`.
  - `screenshotsFor({light:['a']}, 'dark')` deep-equals `['a']`.
  - Every path in every set, and its `toThumbnailPath` (both under `public/`), exists on disk.
  - The screenshot counts are: carlosV light and dark 8 each, partyPuzl light and dark 12 each, phoebeStore light 10, claudeMarketplace light 0.
  - `claudeMarketplace.tiles.map(t => t.label)` deep-equals `['general-code-style','android-compose','dev-workflow','web-design']`, and its category is `'aiTooling'`.
  - The partyPuzl Play Store URL is `https://play.google.com/store/apps/details?id=com.restrusher.partypuzl` and `playStoreComingSoon` is falsy.
  - The carlosV `githubUrl` is `https://github.com/logang-bot/EcommerceCarlosVMobileApp`.
  - The claudeMarketplace `githubUrl` is `https://github.com/logang-bot/claude-marketplace`.

  `projects.ts` imports only types, so Node can load it directly. `screenshotsFor.ts` imports `Theme` as a type only.
- [ ] **Step 2:** Run it. It fails on the missing module or a property.
- [ ] **Step 3:** Implement. Carlos V tags: Kotlin, Jetpack Compose, Room, Supabase, GitHub Actions. Marketplace tags: Claude Code, Agent plugins, Hooks.
  - Tiles: general-code-style uses `braces`, android-compose uses `smartphone`, dev-workflow uses `gitBranch`, web-design uses `palette`.
  - Lucide paths:
    - `braces`: `M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1` and `M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1`.
    - `gitBranch`: path `M6 3v12`, circle (18,6,r3), circle (6,18,r3), path `M18 9a9 9 0 0 1-9 9`.
    - `palette`: path `M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z`, plus circles (13.5,6.5,r.5), (17.5,10.5,r.5), (6.5,12.5,r.5) and (8.5,7.5,r.5).
- [ ] **Step 4:** Run the check and confirm exit 0. `npx tsc -b` will fail until Task 4 updates the callers. That's expected; record a ruling and keep going.

### Task 3: Copy

**Files:** `src/i18n/types.ts`, `en.ts`, `es.ts`, `pt.ts`. **Test:** `<scratchpad>/check-projects-i18n.ts`.

- [ ] **Step 1: Write the check.** For en, es and pt, assert that:
  - `Object.keys(projects.items)` contains all 4 ids.
  - `projects.filters.aiTooling` is set.
  - `skills.links.pipeline` ends with `↗`.
  - `projects.items.partyPuzl.highlights[2]` doesn't contain "soon", "próximamente" or "em breve".
- [ ] **Step 2:** Run it. It fails.
- [ ] **Step 3:** Add the copy. `PillarLinkKey` gains `'pipeline'` (in `skills.ts`, Task 5 uses it).

  | key | en |
  |---|---|
  | filters.aiTooling | AI tooling |
  | carlosV.description | A native Android sales and inventory app for a real business, built to work offline. |
  | carlosV.summary | A sales and inventory app for a real business, with an automated release pipeline. |
  | carlosV.highlights | Customers, orders, payments, product catalogue and PDF reports · Works offline: changes queue up and sync to Supabase in the background · A GitHub Actions pipeline builds a signed APK and posts it, with release notes, to the client's Telegram channel · Built with AI agents following my own plugins |
  | claudeMarketplace.description | My engineering conventions packaged as plugins for AI coding agents. |
  | claudeMarketplace.summary | Plugins that teach AI coding agents how I build software. |
  | claudeMarketplace.highlights | Four plugins with skills, hooks and review agents: code style, Android and Compose, release workflow and web design · Hooks check code size and design rules while the agent writes · Used to build this portfolio and my Android apps |
  | partyPuzl.highlights[2] | Available on Google Play |
  | skills.links.pipeline | See the release pipeline ↗ |

  Spanish and Portuguese are natural translations of the same lines. "AI tooling" becomes "Herramientas de IA" / "Ferramentas de IA". The Google Play line becomes "Disponible en Google Play" / "Disponível no Google Play". The pipeline link becomes "Ver el pipeline de publicación ↗" / "Ver o pipeline de publicação ↗".
- [ ] **Step 4:** Run it and confirm exit 0.

### Task 4: PreviewTiles, card, modal, filters

**Files:**
- Create: `src/components/PreviewTiles/{index.tsx,PreviewTiles.tsx,types.ts,PreviewTiles.module.css}` with `PreviewTilesProps { tiles: PreviewTile[] }`
- Modify: `src/sections/Projects.tsx`, `src/components/ProjectModal.tsx`
- Test: `<scratchpad>/shoot-projects.mjs`

- [ ] **Step 1: Write the browser check** (puppeteer-core with Firefox, as in the Skills plan). In light at 1440:
  - The first card's thumb `src` attributes all contain `/carlosv/light/thumbs/`.
  - Three filter buttons are visible.
  - Clicking the AI-tooling filter leaves 1 card, and that card has 4 `[data-tile]` elements.
  - Opening that card's modal shows 4 `[data-tile]` and no `.navBtn`.
  - The PartyPuzl modal has a link to the Play Store URL with target `_blank`.

  Then:
  - Set `localStorage.theme='dark'` and reload: the thumbs contain `/carlosv/dark/`, and the Phoebe Store card's thumbs contain `/phoebestore/thumbs/`.
  - Toggle the theme without a reload, through the navbar toggle: the thumbs switch to `/light/`.
  - Take screenshots of `#projects` at 1440 and 390 in all 4 themes, plus es at 390.
- [ ] **Step 2:** Run it against the current build (start `vite preview` first). It fails.
- [ ] **Step 3: Build `PreviewTiles`.** A 2-column grid with gap 12. Each tile has `data-tile`, a 32px accent `iconTile` (Icon size 20), and a 14px label, weight 600, `color: var(--text-h)`. Tiles use radius md, `--accent-bg` and a border `var(--border)`. In PF, `iconTile` uses `--accent-strong` and the tile border uses `--ink`.
- [ ] **Step 4: Wire it in.**
  - `ProjectCard`: `const shots = screenshotsFor(project.screenshots, theme)`; the thumbs come from `shots`. When there are no shots and `project.tiles` is set, render `<PreviewTiles>`; otherwise keep the placeholder. Change the img `height` to 413.
  - `ProjectModal`: `images = screenshotsFor(...)`, and the effects use `images`. The carousel's empty branch renders `PreviewTiles` when `project.tiles` is set.
  - Add `'aiTooling'` to `FILTERS`.
- [ ] **Step 5:** Run `npm run build` and lint (only the 4 known errors), then run the browser check and look at the screenshots.
- [ ] **Step 6: Commit** Tasks 1–4:
  ```bash
  git add public/projects src docs/superpowers/specs/2026-11-16-projects-update-design.md docs/superpowers/plans/2026-11-16-projects-update.md
  git commit -m "Add Carlos V and Claude Marketplace projects with theme-matched screenshots"
  ```

### Task 5: Skills pipeline link

**Files:** `src/data/skills.ts`. **Test:** extend `<scratchpad>/check-skills.ts`.

- [ ] **Step 1: Write the test.** Change the link assertion to `['marketplace', undefined, 'pipeline', 'projects']`, and assert the DevOps href is `https://github.com/logang-bot/EcommerceCarlosVMobileApp/blob/main/.github/workflows/release.yml`. Also add a browser assertion: `#skills a[href$="release.yml"]` has target `_blank`.
- [ ] **Step 2:** Run it. It fails.
- [ ] **Step 3:** Add the `link` to `devopsInfra`. The type already allows it.
- [ ] **Step 4:** Run the node and browser checks.
- [ ] **Step 5: Commit** with the message "Link the DevOps pillar to the Carlos V release pipeline".

### Task 6: Audits and roadmap

- [ ] **Step 1:** Run `/web-design:design-audit` on `src/sections/Projects.tsx src/components/ProjectModal.tsx src/components/PreviewTiles`, and `/general-code-style:style-check` on the same paths plus `src/data/projects.ts src/utils/screenshotsFor.ts`. Fix the confirmed findings, then rerun the build and the checks.
- [ ] **Step 2:** In the roadmap, mark item 5 done with the commit range and note the zip names.
- [ ] **Step 3: Commit.**
