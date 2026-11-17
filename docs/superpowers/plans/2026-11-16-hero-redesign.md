# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace violet with cyan in light/dark, give the primary CTA a cyan→indigo gradient, and
rework the hero copy (highlighted agentic phrase, proof line, GitHub/LinkedIn icons).

**Architecture:** Colour changes go through `src/styles/tokens.css` plus one new
`--accent-gradient` token, used only by `.btnPrimary` and the headline highlight. The hidden themes
(Blade Runner, Pulp Fiction) override both of those with solid accents. The hero gets a split
headline (`before`/`highlight`/`after` per language) and a new `HeroProof` component.

**Tech Stack:** React 19, TypeScript, Vite, CSS modules.

**Spec:** `docs/superpowers/specs/2026-11-16-hero-redesign-design.md`

## Global Constraints

- Light: `--accent`/`--accent-strong` `#0e7490`, `--on-accent` `#ffffff`, gradient `linear-gradient(135deg, #0e7490, #4f46e5)`.
- Dark: `--accent`/`--accent-strong` `#22d3ee`, `--on-accent` `#0f1117`, gradient `linear-gradient(135deg, #22d3ee, #818cf8)`.
- Blade Runner and Pulp Fiction must look exactly as before, apart from the new hero copy and proof row.
- No pink or magenta in light/dark. Only the greeting animates. The primary CTA stays the most prominent element.
- Files ≤250 lines; function bodies ≤10 lines; ≤3 params; no comments inside function bodies; component folders hold `index.tsx`, `Name.tsx`, `types.ts` (+ CSS module); data in `src/data`.
- Every new string goes in `src/i18n/{en,es,pt}.ts` (typed in `src/i18n/types.ts`).
- Commit on `main` as `logang-bot`, no Co-Authored-By or other trailer.
- No unit-test framework. Verify with `npm run build`, `npm run lint` (only the 4 known errors in
  `src/context/*` may remain) and headless-Firefox screenshots.

## Screenshot harness (used by every task)

Set it up once in the scratchpad (`$SP` = session scratchpad): `npm i puppeteer-core` there, then
write `$SP/shoot.mjs`. Usage: `node $SP/shoot.mjs <theme> <width> <lang> <out.png> [selector]`.
- Launch `/usr/bin/firefox` with `browser: 'firefox'`, headless, against `http://localhost:4173`.
- Set `localStorage.theme` (and `theme-regular` for light/dark), then reload.
- Language isn't persisted: for `es`/`pt`, click the navbar language switch (aria-label
  "Switch to …").
- Screenshot `#hero` by default, or the given selector.

Serve with `npm run build && npx vite preview` (port 4173) in the background.

## Review Focus

1. **Long ES/PT headlines at 390px and 1440px:** no overflow, and the highlight never orphans a single word. → Task 2, Step 4.
2. **Hidden themes lose the highlight:** in BR/PF the highlight must be solid accent text, never transparent (that would be invisible). → Task 2, Step 4.
3. **Proof row wrapping at 390px:** a `·` separator must never start a line, and items never break mid-phrase. → Task 3, Step 3.
4. **Icon links reachable by keyboard:** a visible focus ring and an accessible name ("GitHub profile") in all four themes. → Task 3, Step 3.
5. **Leftover violet** in sections not touched directly (Skills pillars, project modal, links, focus rings). → Task 1, Step 4.

---

### Task 1: Cyan palette and gradient primary button

**Files:**
- Modify: `src/styles/tokens.css` (`:root` and `[data-theme="dark"]` blocks only)
- Modify: `src/styles/shared.module.css` (`.btnPrimary`, around line 44)
- Modify: `src/components/GlowBackground.module.css` (blob backgrounds, lines ~38–60)
- Modify: `DESIGN.md` (line 6 personality sentence, line 33 `palette:` token)

**Interfaces:**
- Produces: CSS custom property `--accent-gradient`, defined in `:root` and `[data-theme="dark"]`.
  It is inherited by BR/PF from `:root`, so any rule using it must be overridden in the hidden
  themes (BR/PF `.btnPrimary` already sets its own `background`).

- [ ] **Step 1: Contrast check.** Write `$SP/contrast.ts` (WCAG relative luminance) and run
  `node $SP/contrast.ts`. Expected: light accent on `#faf8f5` 5.05, white on `#0e7490` 5.36 and on
  `#4f46e5` 6.29, dark accent on `#0f1117` 10.44, `#0f1117` on `#22d3ee` 10.44 and on `#818cf8` 6.33.
  All must be ≥4.5. Then take baseline hero screenshots in BR and PF at 1440px
  (`$SP/before-br.png`, `$SP/before-pf.png`).
- [ ] **Step 2: Tokens.**
  - Set the light and dark values from Global Constraints.
  - `--accent-bg`: `rgba(14, 116, 144, 0.08)` light, `rgba(34, 211, 238, 0.1)` dark.
  - `--accent-border`: `rgba(14, 116, 144, 0.3)` light, `rgba(34, 211, 238, 0.3)` dark.
  - Add `--accent-gradient` to both blocks.
  - `.btnPrimary` gets `background: var(--accent-gradient)`.
  - Glow blobs:
    - Light: blob1 `rgba(34, 211, 238, 0.45)`, blob2 `rgba(129, 140, 248, 0.4)`, blob3 `rgba(14, 116, 144, 0.3)`.
    - Dark: blob1 `rgba(34, 211, 238, 0.2)`, blob2 `rgba(79, 70, 229, 0.18)`, blob3 `rgba(129, 140, 248, 0.1)`.
- [ ] **Step 3: DESIGN.md.**
  - Line 6: replace "a violet main colour" with "a cyan main colour with an indigo gradient on the primary button".
  - Line 33: `palette: primary #0e7490; primary-dark-theme #22d3ee; secondary #4f46e5; secondary-dark-theme #818cf8; grey #4b5563; heading #111827; background #faf8f5`.
- [ ] **Step 4: Verify.**
  - `npm run build` passes, and lint shows only the 4 known errors.
  - `grep -rniE "7c3aed|a78bfa|124, *58, *237|167, *139, *250|109, *40, *217|196, *181, *253" src` returns nothing.
  - Screenshots of the full page at 1440px in light and dark show cyan everywhere violet used to be, and a gradient primary button.
  - The BR and PF hero buttons look identical to the Step 1 baselines.
- [ ] **Step 5: Commit.** `git commit -m "Switch the light and dark accent to cyan with a gradient primary button"`

### Task 2: Hero headline, subtitle and illustration map

**Files:**
- Modify: `src/i18n/types.ts:27` (`hero` type)
- Modify: `src/i18n/en.ts`, `es.ts`, `pt.ts` (`hero` block, lines ~36–43)
- Create: `src/data/heroIllustrations.ts`
- Modify: `src/sections/Hero.tsx`, `src/sections/Hero.module.css`
- Modify: `DESIGN.md` line 70 (hero headline note)

**Interfaces:**
- Consumes: `--accent-gradient` (Task 1); `Theme` from `src/context/ThemeContext.tsx`.
- Produces:
  - `hero.headline: { before: string; highlight: string; after: string }`.
  - `export const heroIllustrations: Record<Theme, string>` in `src/data/heroIllustrations.ts`
    (same four `/img_*.webp` paths as today's ternary).

- [ ] **Step 1: Strings (exact copy from the spec).**
  - Headline:
    - EN: `before: 'Mobile engineer building whole systems with '`, `highlight: 'AI agents'`, `after: ''`.
    - ES: `'Ingeniero móvil que crea sistemas completos con '` / `'agentes de IA'` / `''`.
    - PT: `'Engenheiro mobile que cria sistemas completos com '` / `'agentes de IA'` / `''`.
  - Subtitles, verbatim:
    - EN: "Native Android and iOS apps are my core, built with Kotlin, Jetpack Compose and Swift. With AI agents I build the rest of the system too: code structure, tests and release pipelines."
    - ES: "Mi base son las apps nativas Android e iOS, con Kotlin, Jetpack Compose y Swift. Con agentes de IA construyo también el resto del sistema: arquitectura, pruebas y pipelines de publicación."
    - PT: "Minha base são apps nativos Android e iOS, com Kotlin, Jetpack Compose e Swift. Com agentes de IA construo também o resto do sistema: arquitetura, testes e pipelines de publicação."
- [ ] **Step 2: Hero markup.**
  - `<h1>` renders `{before}<span className={styles.highlight}>{highlight}</span>{after}`.
  - `<img src={heroIllustrations[theme]}>` replaces the nested ternary.
  - `.highlight` uses `background: var(--accent-gradient)`, `background-clip: text` (plus
    `-webkit-` prefix) and `color: transparent`.
  - `:global([data-theme="blade-runner"]) .highlight, :global([data-theme="pulp-fiction"]) .highlight`
    set `background: none; color: var(--accent-strong)`.
- [ ] **Step 3: DESIGN.md line 70.** It becomes: `Headline states the role and the agentic edge
  ("Mobile engineer building whole systems with AI agents"); the key phrase carries the accent
  gradient in light/dark and the solid accent in BR/PF. Only the greeting line animates.`
- [ ] **Step 4: Verify.**
  - Build and lint pass.
  - Hero screenshots at 1440px and 390px:
    - Light and dark: gradient highlight.
    - BR: orange text. PF: dark red text. Never invisible.
  - ES and PT at both widths: no horizontal overflow (`document.documentElement.scrollWidth === innerWidth`), and "agentes de IA" stays on one line (add `white-space: nowrap` to `.highlight` if it breaks).
- [ ] **Step 5: Commit.** `git commit -m "Rewrite the hero headline and subtitle around agentic work"`

### Task 3: Proof line and social icons

**Files:**
- Create: `src/components/HeroProof/index.tsx`, `HeroProof.tsx`, `types.ts`, `HeroProof.module.css`
- Modify: `src/i18n/types.ts`, `en.ts`, `es.ts`, `pt.ts` (`hero` block)
- Modify: `src/sections/Hero.tsx` (render `<HeroProof />` after the `.cta` div)

**Interfaces:**
- Consumes:
  - `socialLinks`, `isExternal` from `src/data/links.ts`.
  - `Icon` from `src/components/Icon`.
  - `useLanguage()`.
- Produces:
  - `export default function HeroProof({ className }: HeroProofProps)`, where
    `HeroProofProps = { className?: string }` in `types.ts`.
  - i18n `hero.proof: string[]` and `hero.socialLabel: string` (containing a `{name}`
    placeholder, like `nav.a11y.switchLanguage`).

- [ ] **Step 1: Strings.**
  - `proof`:
    - EN `['4+ years experience', 'Staff Engineer at Jalasoft', 'Published on Google Play']`
    - ES `['4+ años de experiencia', 'Staff Engineer en Jalasoft', 'Publicado en Google Play']`
    - PT `['4+ anos de experiência', 'Staff Engineer na Jalasoft', 'Publicado no Google Play']`
  - `socialLabel`: EN `'{name} profile'`, ES `'Perfil de {name}'`, PT `'Perfil no {name}'`.
  - This is a deliberate refinement of the spec's per-network keys: `links.ts` already holds
    `name`, so one template covers both networks.
- [ ] **Step 2: Component.**
  - Proof items go in a `<ul>`, one `<li>` each, with `white-space: nowrap`. The `·` separator comes
    from `li + li::before`, so it sits at the start of an item and stays on the same line.
  - Icon links come from `socialLinks.filter(link => isExternal(link.href))`:
    - `<Icon size={20}>`, `aria-label` from `socialLabel`
    - `target="_blank" rel="noopener noreferrer"`
    - colour `var(--text)`, hover `var(--accent)`
    - visible `:focus-visible` outline in `var(--accent)`
  - Layout:
    - Row: `flex-wrap: wrap`, gap 16px between the list and the icons, 8px between icons.
    - Text: 16px in `var(--text)`.
    - The row sits 16px below the CTAs.
- [ ] **Step 3: Verify.**
  - Build and lint pass.
  - Hero screenshots in all four themes at 1440 and 390px, EN and ES:
    - No line starts with `·`.
    - Icons are legible.
  - Press Tab from the "Get in touch" button: both icons show a visible focus ring in every theme.
  - `page.$eval('[aria-label="GitHub profile"]', a => a.href)` returns `https://github.com/logang-bot`.
- [ ] **Step 4: Commit.** `git commit -m "Add a proof line and profile links to the hero"`

### Task 4: Audit and roadmap

**Files:**
- Modify: `docs/superpowers/plans/2026-11-16-portfolio-refresh-remaining-draft.md`

- [ ] **Step 1:** Run `/web-design:design-audit` on `src/sections/Hero.*`, `src/components/HeroProof/`,
  `src/styles/tokens.css` and `src/styles/shared.module.css`. Fix confirmed findings and re-run build.
- [ ] **Step 2: Roadmap.**
  - Mark Part 3 **Done**, with the spec and plan paths.
  - Add **Part 6: Navbar liquid-glass hover bubble (iOS 26 style)**, not started, needing a brainstorm.
  - In the favicon item, change "violet accent" to "cyan accent (`#0e7490`/`#22d3ee`)".
- [ ] **Step 3: Commit.** `git commit -m "Mark the hero redesign done and add the navbar follow-up"`
