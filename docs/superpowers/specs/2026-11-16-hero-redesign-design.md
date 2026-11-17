# Hero redesign (Part 3): design

## Context
Part 3 of `docs/superpowers/plans/2026-11-16-portfolio-refresh-remaining-draft.md`. The owner thinks
the hero's primary button looks like a default (violet), and the headline is still mobile-only
while Skills already says "How I build with AI agents". Goal: a cyan brand in light/dark, a
gradient primary CTA, and a hero that shows the "mobile + agentic systems" edge in about 5 seconds.
The navbar "liquid glass" hover bubble is a **separate follow-up** (own brainstorm/spec, after this).

Approved by the owner on 2026-11-16, including the copy below. Contrast checked: light accent on
bg 5.05:1, white on gradient stops 5.36/6.29:1; dark accent on bg 10.44:1, dark text on stops
10.44/6.33:1.

## Goals / non-goals / anti-goals
- **Goals:** cyan replaces violet as the main colour in light and dark modes. The primary button
  gets a cyan→indigo gradient. The headline highlights the agentic phrase. A proof line and
  GitHub/LinkedIn icons sit under the CTAs. The copy matches Skills (no .NET MAUI as core).
- **Non-goals:** the navbar redesign. The favicon (Part 4 item; it gets the new colour then). The
  illustrations (they're neutral slate/olive/orange and already work with cyan). The layout
  (two columns plus the 900px stack stay as they are). An availability badge (owner didn't confirm
  they're looking).
- **Anti-goals:** Blade Runner and Pulp Fiction must not change look. Only the greeting animates.
  The primary CTA stays the most prominent element. No pink/magenta anywhere (it would read as BR
  neon).

## Approaches considered
1. **Token swap + one `--accent-gradient` token (picked).** The site already routes colour through
   `src/styles/tokens.css`. The hidden themes never define or use the gradient, so they're untouched.
2. Per-component recolouring: rejected, because it undoes the token system.
3. Cyan only on buttons, violet elsewhere: rejected by the owner (two brands fighting).

## Decided design

### Colour (light / dark; BR and PF unchanged)
| Token | Light | Dark |
|---|---|---|
| `--accent`, `--accent-strong` | `#0e7490` | `#22d3ee` |
| `--on-accent` | `#ffffff` | `#0f1117` |
| `--accent-bg` | `rgba(14,116,144,0.08)` | `rgba(34,211,238,0.10)` |
| `--accent-border` | `rgba(14,116,144,0.30)` | `rgba(34,211,238,0.30)` |
| `--accent-gradient` (new) | `linear-gradient(135deg, #0e7490, #4f46e5)` | `linear-gradient(135deg, #22d3ee, #818cf8)` |

- `.btnPrimary` in `src/styles/shared.module.css` uses `background: var(--accent-gradient, var(--accent))`.
  BR and PF already override `.btnPrimary` with solid `var(--accent)`/`--accent-strong`, so check
  that the override still wins.
- `src/components/GlowBackground.module.css`: the 6 hard-coded violet blob values (3 light, 3 dark) become cyan
  (`#0e7490` / `#22d3ee`) and indigo (`#4f46e5` / `#818cf8`) at the same alphas.
- `DESIGN.md`: the personality line ("violet main colour") and the `palette:` token line get the new
  values plus an indigo secondary. Hero notes: the headline now states "mobile + agentic". The
  gradient is reserved for the primary CTA and the headline highlight.

### Headline highlight
- i18n `hero.headline` becomes `{ before, highlight, after }`, because word order differs per language.
- The highlight is a `<span>` with `background: var(--accent-gradient)`, `background-clip: text`
  and `color: transparent`. In BR/PF (no gradient token) it falls back to `color: var(--accent)`,
  with no clip, so BR's text glow isn't muddied. Implement via
  `@supports` / token fallback so the BR/PF selectors set `background: none; color: var(--accent)`.

### Proof line + social icons (under the CTAs)
- One row: proof items separated by `·`, in muted `--text` at 16px, followed by GitHub and LinkedIn
  icon links (`<Icon>`, `aria-label` from i18n, `target="_blank" rel="noopener noreferrer"`).
- Links come from `socialLinks` in `src/data/links.ts`, filtered with the existing `isExternal`
  (drops the email entry).
- New component folder `src/components/HeroProof/` (`index.tsx`, `HeroProof.tsx`, `types.ts`,
  `HeroProof.module.css`), so `Hero.tsx` stays small. It wraps under 900px.
- BR/PF: the icons use `currentColor` and pick up each theme's text and accent on hover. Check
  with screenshots.

### Copy (en / es / pt)
- **Headline**
  - EN: "Mobile engineer building whole systems with **AI agents**"
  - ES: "Ingeniero móvil que crea sistemas completos con **agentes de IA**"
  - PT: "Engenheiro mobile que cria sistemas completos com **agentes de IA**"
- **Subtitle**
  - EN: "Native Android and iOS apps are my core, built with Kotlin, Jetpack Compose and Swift. With AI agents I build the rest of the system too: code structure, tests and release pipelines."
  - ES: "Mi base son las apps nativas Android e iOS, con Kotlin, Jetpack Compose y Swift. Con agentes de IA construyo también el resto del sistema: arquitectura, pruebas y pipelines de publicación."
  - PT: "Minha base são apps nativos Android e iOS, com Kotlin, Jetpack Compose e Swift. Com agentes de IA construo também o resto do sistema: arquitetura, testes e pipelines de publicação."
- **Proof** (`hero.proof: string[]`)
  - EN: "4+ years experience" · "Staff Engineer at Jalasoft" · "Published on Google Play"
  - ES: "4+ años de experiencia" · "Staff Engineer en Jalasoft" · "Publicado en Google Play"
  - PT: "4+ anos de experiência" · "Staff Engineer na Jalasoft" · "Publicado no Google Play"
- **Icon labels** (`hero.social.github` / `.linkedin`)
  - EN: "GitHub profile" / "LinkedIn profile"
  - ES: "Perfil de GitHub" / "Perfil de LinkedIn"
  - PT: "Perfil no GitHub" / "Perfil no LinkedIn"

### Left to the builder (my calls)
- Move the nested illustration ternary in `Hero.tsx` to a theme→src map in `src/data/heroIllustrations.ts`.
- Gradient angle 135deg. Hover keeps the existing `opacity: 0.85`.
- The exact proof-line spacing comes from the spacing scale (8/16px).

## Constraints
Files ≤250 lines, function bodies ≤10 lines, ≤3 params, no in-body comments. Component folder
convention. All strings in en/es/pt. Commit on `main` as `logang-bot`, no trailers.

## Verification
- Throwaway `node` script in the scratchpad computing WCAG contrast for every new pair: accent on
  `--bg` (light/dark), and on-accent against both gradient stops. Each must be ≥4.5:1.
- `npm run build` and lint (only the 4 known errors in `src/context/*`).
- Headless Firefox + `puppeteer-core` against `npx vite preview`: hero at 1440 and 390px in light,
  dark, blade-runner and pulp-fiction (set `localStorage.theme`, reload). Also check the Skills
  section and a project modal for leftover violet.
- `/web-design:design-audit` on the changed files.
- Update the roadmap: Part 3 done, navbar liquid-glass added as a new part, favicon note → cyan.

## Revisions after the design and UX review (2026-11-16)
- Light accent and gradient start darkened from `#0e7490` to `#0e6a84`. Light background tiles
  sit behind text undimmed, and `#0e7490` dropped to 4.22:1 on a tile. `#0e6a84` gives 5.80:1 on
  the background, 4.85:1 on a tile, and 6.15:1 for white text.
- Hero spacing now separates the groups: greeting→headline 8px, headline→subtitle 24px, 32px
  before the CTAs, and 32px before the proof row.
- Copy fixes:
  - "4+ years of experience".
  - "An app on Google Play" / "Una app en Google Play" / "Um app no Google Play". The earlier
    "Publicado…" had no noun.
  - EN subtitle "architecture" instead of "code structure", to match ES/PT.
