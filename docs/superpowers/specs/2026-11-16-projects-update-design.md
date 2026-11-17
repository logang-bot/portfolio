# Projects update: design

Carlos V, Claude Marketplace and new PartyPuzl screenshots. Follows `specs/2026-11-16-skills-section-redesign-design.md`.

## Context
The Skills redesign (done, pushed) claims "mobile + agentic systems". The Projects section only
shows two Android apps, so nothing backs up the agentic and DevOps claims yet. The owner shared:
- **Carlos V** (`github.com/logang-bot/EcommerceCarlosVMobileApp`, public). A Kotlin/Compose sales
  and inventory app for a real business (markets, customers, orders, payments, catalogue,
  blacklist, PDF reports), offline-first with Room, WorkManager and Supabase sync. Built with
  Claude Code using the owner's plugins. Its `release.yml` builds a signed APK on a version tag and
  posts it to a Telegram channel with Spanish release notes. It refuses to ship on a version/tag
  mismatch, an already-released version, missing changelog notes, or an APK over 50 MB. 8 runs,
  all green. The owner says the business name can be shown.
- **Claude Marketplace** (`github.com/logang-bot/claude-marketplace`, public): 4 plugins
  (general-code-style, android-compose, dev-workflow, web-design) with skills, hooks and review
  agents.
- **PartyPuzl** is now live: `https://play.google.com/store/apps/details?id=com.restrusher.partypuzl`,
  with new screenshots.

Zip contents (their names are swapped compared with how the owner described them):
`store-screenshots.zip` holds PartyPuzl (en-US and es-ES, light and dark, 12 each), and
`screenshots.zip` holds Carlos V (light and dark, 13 each). All images are 1080×2424 PNG.

## Owner decisions
- **Screenshots match the site theme:** light and Pulp Fiction show the light set; dark and Blade
  Runner show the dark set. PartyPuzl uses en-US. Phoebe Store keeps its single set.
- **The marketplace card previews its 4 plugins as tiles** (icon + plugin id) in place of phone
  screenshots, on the card and in the modal.
- **A new "AI tooling" category** for the marketplace, so the filters reappear as All / Mobile /
  AI tooling (translated).

## My calls (owner can override)
- **Order:** Carlos V, PartyPuzl, Claude Marketplace, Phoebe Store.
- **Carlos V shots (8):** 01_mercados, 02_catalogo, 08_nuevo_pedido, 07_detalle_pedido,
  06_detalle_cliente, 03_reporte, 12_sincronizacion, 10_lista_negra. The first three appear on the
  card.
- **PartyPuzl shots:** all 12, in store order.
- **Plugin tiles** use the plugin ids, untranslated like other tags. Icons are Lucide `braces`
  (general-code-style), `smartphone` (android-compose), `gitBranch` (dev-workflow) and `palette`
  (web-design).
- **Skills DevOps card** gets a link, "See the release pipeline ↗", pointing to Carlos V's
  `.github/workflows/release.yml` on GitHub.
- **The zips stay at the repo root, untracked.** I don't delete or commit them; the owner decides.

## Design

**Data (`src/data/projects.ts`):**
- `ScreenshotSet { light: string[]; dark?: string[] }`. `Project.screenshots: ScreenshotSet`.
- `Project.tiles?: PreviewTile[]`, where `PreviewTile { label: string; icon: IconName }`.
- `ProjectCategory` gains `'aiTooling'`. `ProjectId` gains `'carlosV' | 'claudeMarketplace'`.
- `screenshotPaths(folder, count)` is reused per theme folder:
  `screenshotPaths('partypuzl/light', 12)`.
- The marketplace tiles live in `src/data/marketplacePlugins.ts`, which keeps `projects.ts` under
  the line cap.
- PartyPuzl: set `playStoreUrl`, drop `playStoreComingSoon`.

**Helper:** `src/utils/screenshotsFor.ts`, `screenshotsFor(set: ScreenshotSet, theme: Theme):
string[]`. It returns `set.dark ?? set.light` for `dark`/`blade-runner`, otherwise `set.light`.
`ProjectCard` (in `Projects.tsx`) and `ProjectModal` call it with `useTheme().theme`; it replaces
their direct `project.screenshots` reads.

**Tiles component:** `src/components/PreviewTiles/` (`index.tsx`, `PreviewTiles.tsx`, `types.ts`,
`PreviewTiles.module.css`). A 2×2 grid of small rounded tiles, each an `Icon` in an accent tile
(the same look as the Skills icon tile) plus the label. It's used in the card's `.screenshots` area
and the modal's `.carousel` empty branch, in place of the "No screenshots yet" placeholder when
`project.tiles` is set. Themes come from tokens; PF and BR tweaks follow `SkillPillar.module.css`.

**Images:** extract the zips into the scratchpad, then convert with ffmpeg (libwebp, quality 80).
- Full size: 1080×2424. Thumbs: 184×413.
- Layout: `public/projects/<folder>/<light|dark>/NN.webp` and `.../<light|dark>/thumbs/NN.webp`,
  so `toThumbnailPath` keeps working.
- Remove the old `public/projects/partypuzl/*.webp` and `thumbs/`.
- Update the card `<img height>` from 408 to 413. Phoebe Store's images stay where they are, with
  their paths unchanged.

**Copy (`src/i18n/{types,en,es,pt}.ts`):**
- `projects.filters.aiTooling`: "AI tooling" / "Herramientas de IA" / "Ferramentas de IA".
- `projects.items.carlosV` and `projects.items.claudeMarketplace`, each with description, summary
  and 3–4 highlights.
- PartyPuzl's third highlight becomes "Available on Google Play" / "Disponible en Google Play" /
  "Disponível no Google Play".
- `skills.links.pipeline`: "See the release pipeline ↗" (es "Ver el pipeline de publicación ↗",
  pt "Ver o pipeline de publicação ↗").
- Carlos V highlights:
  1. Customers, orders, payments, catalogue and PDF reports.
  2. Works offline, with changes syncing to Supabase in the background.
  3. A GitHub Actions pipeline that builds a signed APK and posts it, with release notes, to the
     client's Telegram channel.
  4. Built with AI agents following my own plugins.
- Carlos V tags: Kotlin, Jetpack Compose, Room, Supabase, GitHub Actions.
- Marketplace highlights:
  1. Four plugins with skills, hooks and review agents.
  2. Hooks check code size and design rules as the agent writes.
  3. Used to build this portfolio and my Android apps.
- Marketplace tags: Claude Code, Agent plugins, Hooks.

**Filters:** add `'aiTooling'` to `FILTERS` in `Projects.tsx`. The existing `visibleFilters` logic
shows the buttons automatically.

**Roadmap:** mark item 5 done and note the zip-name mix-up.

## Approaches
The owner chose each option in the conversation:
- **Screenshots:** match the site theme (picked), theme + language, or one fixed set.
- **Marketplace preview:** plugin tiles (picked), a terminal snippet, or no preview.
- **Filters:** add "AI tooling" (picked), or keep the filters hidden.

## Verification
- **Build and lint:** `npm run build` passes, and lint shows only the 4 known `src/context/*`
  errors.
- **Node checks:** `screenshotsFor` returns the right set for each theme. The data and every
  screenshot file exist on disk. The i18n keys match across all three languages.
- **Headless-Firefox checks:** the theme-matched thumbs, the filters, the marketplace tiles, the
  Play Store link, and the Skills pipeline link.
