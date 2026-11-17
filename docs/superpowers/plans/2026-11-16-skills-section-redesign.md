# Skills Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 7 equal skill cards with a 4-pillar bento layout (Agentic, Architecture, DevOps & Infra, Mobile) plus an "Also used" line, presenting the owner as a mobile engineer who now builds whole systems with AI agents.

**Architecture:** Skill data moves to `src/data/skills.ts`. A new presentational `SkillPillar` component renders one card. `Skills.tsx` lays out the heading, a 3-column grid (two pillars span 2 columns) and the also-used line. Theme looks come from the existing `glassCard` and `.tag` classes, plus a few `[data-theme]` overrides.

**Tech Stack:** React 19 + TypeScript (strict, `verbatimModuleSyntax`, `allowImportingTsExtensions`), CSS Modules, Vite. No new dependencies in the project.

**Spec:** `docs/superpowers/specs/2026-11-16-skills-section-redesign-design.md`

## Global Constraints

- Code caps: file ≤250 lines (imports excluded), function body ≤10 lines, ≤3 parameters (group extras in a type), no explanatory comments inside bodies. React components are exempt from the body and parameter caps only.
- Helpers sit directly below their caller (depth-first). Member order: properties, constructors, methods.
- Component folders: `index.tsx` (re-export), `Name.tsx`, `types.ts` (Props interface). Pattern: `src/components/PropSticker/`.
- CSS uses tokens only (`--accent`, `--accent-strong`, `--accent-bg`, `--text`, `--text-h`, `--ink`, `--radius-*`, `--shadow-*`). Type scale `12 14 16 18 20 24 36 56 64`; spacing scale `2 4 8 12 16 24 32 48 64 80 96 128`.
- Every new string goes in `src/i18n/{en,es,pt}.ts`, in all three languages. Skill and tag names are not translated.
- Docker and Kubernetes always carry the "in progress" badge. Nothing else does.
- Blade Runner gets no new glow. `DESIGN.md` keeps glow for the CTA and background.
- Commits on `main`, author `logang-bot`, plain imperative message, **no Co-Authored-By or other trailer**.
- There is no unit-test framework. Pure data is checked with throwaway `node` scripts in the scratchpad (Node 26 runs `.ts` directly), and the UI with `npm run build`, `npm run lint` (4 known errors in `src/context/*`; no new ones) and headless-Firefox screenshots.

## Review Focus

1. **Tablet widths (900–1100px) in Spanish and Portuguese:** "DevOps e infraestructura" and long tags in the one-third-width card must wrap, never overflow → Task 3 takes a screenshot at 960px in `es`.
2. **Keyboard users:** the marketplace and "See projects" links need a visible focus ring in all four themes → Task 3 tabs to the link and takes a screenshot.
3. **External vs internal link:** the marketplace opens in a new tab with `rel="noopener noreferrer"`; `#projects` stays in the same tab → Task 3 asserts both in the DOM.
4. **Pulp Fiction badge contrast:** "in progress" text on the mustard `--code-bg` (#ead184) must reach 4.5:1 → Task 3 badge uses `--accent-strong` in PF (#9e1b20 on #ead184 ≈ 5.3:1), checked by design-audit in Task 4.
5. **A pillar without a link** (DevOps today): the card must not leave an empty gap or a dangling arrow → Task 3 renders the link only when `pillar.link` is set, and the screenshot shows DevOps without one.

---

### Task 1: Skill data and pillar icons

**Files:**
- Create: `src/data/skills.ts`
- Modify: `src/data/iconPaths.ts` (add 4 names to `IconName` and to `iconShapes`)
- Test: `<scratchpad>/check-skills.ts` (throwaway, not committed)

**Interfaces:**
- Consumes: `ProjectId` (type) from `src/data/projects.ts`; `IconName` (type) from `src/data/iconPaths.ts`.
- Produces (`src/data/skills.ts`):
  ```ts
  export type PillarId = 'agentic' | 'architecture' | 'devopsInfra' | 'mobile'
  export type PillarLinkKey = 'marketplace' | 'projects'
  export interface SkillTag { name: string; inProgress?: boolean; provenBy?: ProjectId }
  export interface PillarLink { href: string; labelKey: PillarLinkKey }
  export interface SkillPillar { id: PillarId; icon: IconName; tags: SkillTag[]; link?: PillarLink }
  export const skillPillars: SkillPillar[]
  export const alsoUsed: string[]
  ```
- Produces (`iconPaths.ts`): the icon names `'sparkles' | 'layers' | 'workflow' | 'smartphone'`.

- [ ] **Step 1: Write the check script** `<scratchpad>/check-skills.ts`. Import `skillPillars` and `alsoUsed` from the absolute path of `src/data/skills.ts` (with the `.ts` extension) and assert:
  ```ts
  assert.deepEqual(skillPillars.map(p => p.id), ['agentic', 'architecture', 'devopsInfra', 'mobile'])
  assert.deepEqual(skillPillars.map(p => p.icon), ['sparkles', 'layers', 'workflow', 'smartphone'])
  const tags = skillPillars.flatMap(p => p.tags)
  assert.deepEqual(tags.filter(t => t.inProgress).map(t => t.name), ['Docker', 'Kubernetes'])
  assert.deepEqual(tags.filter(t => t.provenBy).map(t => [t.name, t.provenBy]),
    [['Clean Architecture', 'phoebeStore'], ['MVVM', 'partyPuzl']])
  assert.equal(alsoUsed.length, 16)
  const all = [...tags.map(t => t.name), ...alsoUsed]
  assert.equal(new Set(all).size, all.length)
  assert.deepEqual(skillPillars.map(p => p.link?.labelKey), ['marketplace', undefined, undefined, 'projects'])
  assert.equal(skillPillars[0].link?.href, 'https://github.com/logang-bot/claude-marketplace')
  assert.equal(skillPillars[3].link?.href, '#projects')
  ```

- [ ] **Step 2: Run it.** `node <scratchpad>/check-skills.ts` → fails with a module-not-found error.

- [ ] **Step 3: Write `src/data/skills.ts`.** Use `import type` only, so Node can strip it. Tags in this exact order:
  - agentic: Claude Code, OpenCode, Skills, Hooks, Review agents
  - architecture: Clean Architecture (`provenBy: 'phoebeStore'`), MVVM (`provenBy: 'partyPuzl'`), MVP, VIPER, MVC
  - devopsInfra: GitHub Actions, CI/CD, Azure DevOps, Docker (`inProgress`), Kubernetes (`inProgress`). No `link` yet; it's added with the Telegram pipeline project.
  - mobile: Jetpack Compose, SwiftUI, UIKit, Room, Retrofit, CoreData, Firebase, Supabase
  - `alsoUsed`: Kotlin, Swift, TypeScript, JavaScript, C#, C++, HTML/CSS, Node.js, Express, React, MongoDB, SQL Server, .NET MAUI, Xamarin, React Native, Unit testing

- [ ] **Step 4: Add the Lucide shapes to `iconPaths.ts`** (append to the `IconName` union and to `iconShapes`):
  ```ts
  sparkles: [
    { kind: 'path', d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' },
    { kind: 'path', d: 'M20 3v4' }, { kind: 'path', d: 'M22 5h-4' },
    { kind: 'path', d: 'M4 17v2' }, { kind: 'path', d: 'M5 18H3' },
  ],
  layers: [
    { kind: 'path', d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' },
    { kind: 'path', d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' },
    { kind: 'path', d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' },
  ],
  workflow: [
    { kind: 'rect', x: 3, y: 3, width: 8, height: 8, rx: 2 },
    { kind: 'path', d: 'M7 11v4a2 2 0 0 0 2 2h4' },
    { kind: 'rect', x: 13, y: 13, width: 8, height: 8, rx: 2 },
  ],
  smartphone: [
    { kind: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 2 },
    { kind: 'path', d: 'M12 18h.01' },
  ],
  ```

- [ ] **Step 5: Run the check again.** `node <scratchpad>/check-skills.ts` → no output, exit 0. Then run `npx tsc -b` → no errors.

- [ ] **Step 6: Commit.**
  ```bash
  git add src/data/skills.ts src/data/iconPaths.ts
  git commit -m "Add skill pillar data and pillar icons"
  ```

---

### Task 2: Skills copy in three languages

**Files:**
- Modify: `src/i18n/types.ts` (the `skills` block), `src/i18n/en.ts`, `src/i18n/es.ts`, `src/i18n/pt.ts` (`skills` blocks)
- Test: `<scratchpad>/check-i18n.ts` (throwaway)

**Interfaces:**
- Consumes: `PillarId` and `PillarLinkKey` from Task 1.
- Produces: `Translations['skills']`. Keep `categories` until Task 3 removes it, so the build stays green.
  ```ts
  skills: {
    label: string; heading: string; subtitle: string
    categories: { ... unchanged ... }
    pillars: Record<PillarId, { title: string; summary: string }>
    inProgress: string; alsoUsed: string
    links: Record<PillarLinkKey, string>
  }
  ```

- [ ] **Step 1: Write the check script.** Import `en`, `es` and `pt` and assert:
  - `Object.keys(x.skills.pillars)` deep-equals `['agentic', 'architecture', 'devopsInfra', 'mobile']` for each language.
  - Each `summary` in es and pt is within 0.75–1.35× the length of en's.
  - `links.marketplace` ends with `↗` in all three languages.

  If importing the i18n files directly fails on extensionless imports, copy the three `skills` objects into the script instead.

- [ ] **Step 2: Run it.** `node <scratchpad>/check-i18n.ts` → FAIL (`pillars` is undefined).

- [ ] **Step 3: Add the copy exactly:**

  | key | en | es | pt |
  |---|---|---|---|
  | heading | How I build | Cómo construyo | Como eu construo |
  | subtitle | From native apps to whole systems, with AI agents in the loop. | De apps nativas a sistemas completos, con agentes de IA en el proceso. | De apps nativos a sistemas completos, com agentes de IA no processo. |
  | pillars.agentic.title | Agentic development | Desarrollo agéntico | Desenvolvimento agêntico |
  | pillars.agentic.summary | I build software with AI agents and write my own plugins to keep them to my standards. | Construyo software con agentes de IA y escribo mis propios plugins para que sigan mis estándares. | Construo software com agentes de IA e escrevo meus próprios plugins para que sigam meus padrões. |
  | pillars.architecture.title | Architecture | Arquitectura | Arquitetura |
  | pillars.architecture.summary | I pick the pattern that fits the app and its team. | Elijo el patrón que encaja con cada app y su equipo. | Escolho o padrão que combina com cada app e sua equipe. |
  | pillars.devopsInfra.title | DevOps & Infrastructure | DevOps e infraestructura | DevOps e infraestrutura |
  | pillars.devopsInfra.summary | Pipelines that build and ship my apps; containers and clusters in progress. | Pipelines que compilan y publican mis apps; contenedores y clústeres en progreso. | Pipelines que compilam e publicam meus apps; contêineres e clusters em andamento. |
  | pillars.mobile.title | Mobile | Móvil | Mobile |
  | pillars.mobile.summary | Native Android and iOS apps, from the first screen to release. | Apps nativas Android y iOS, de la primera pantalla al lanzamiento. | Apps nativos Android e iOS, da primeira tela ao lançamento. |
  | inProgress | in progress | en progreso | em andamento |
  | alsoUsed | Also used | También he usado | Também usei |
  | links.marketplace | My plugin marketplace ↗ | Mi marketplace de plugins ↗ | Meu marketplace de plugins ↗ |
  | links.projects | See projects | Ver proyectos | Ver projetos |
- [ ] **Step 4: Run the check again.** `node <scratchpad>/check-i18n.ts` → exit 0. Then `npx tsc -b` → no errors.

- [ ] **Step 5: Commit.**
  ```bash
  git add src/i18n/types.ts src/i18n/en.ts src/i18n/es.ts src/i18n/pt.ts
  git commit -m "Add copy for the skill pillars"
  ```

---

### Task 3: SkillPillar card and the bento Skills section

**Files:**
- Create: `src/components/SkillPillar/index.tsx`, `SkillPillar.tsx`, `types.ts`, `SkillPillar.module.css`
- Modify: `src/sections/Skills.tsx` (rewrite), `src/sections/Skills.module.css` (rewrite)
- Modify: `src/i18n/types.ts`, `en.ts`, `es.ts`, `pt.ts` (remove `skills.categories`)
- Test: `<scratchpad>/shoot.mjs` (puppeteer-core with headless Firefox at `/usr/bin/firefox`; `npm i puppeteer-core` inside the scratchpad)

**Interfaces:**
- Consumes: `SkillPillar` (type), `skillPillars`, `alsoUsed` (Task 1); `t.skills.*` (Task 2); `projects` from `src/data/projects.ts`; `isExternal` from `src/data/links.ts`; `Icon` from `src/components/Icon`.
- Produces:
  ```ts
  // src/components/SkillPillar/types.ts
  export interface SkillPillarProps { pillar: SkillPillar; lead?: boolean; className?: string }
  ```

- [ ] **Step 1: Build `SkillPillar.tsx`** as an `<article>`, in this order:
  - **Header row:** an icon tile (`<Icon name={pillar.icon} size={24} />` inside a 40×40 span) and an `h3` with the pillar title.
  - **Summary:** a `<p>` with the pillar summary.
  - **Tags:** a `<ul>` of tags, each `<li>` composing the shared `tag` class.
  - **Link:** only when `pillar.link` is set. Its text is `t.skills.links[labelKey]`, and `target`/`rel` follow `isExternal(href)`, as in `Contact.tsx:36`.

  Tag label: `name`, or `` `${name} · ${projectName}` `` when `provenBy` is set, with the project name looked up from `projects` through a module-level helper `tagLabel(tag: SkillTag): string` placed below the component. When `inProgress` is set, append `<span className={styles.badge}>{t.skills.inProgress}</span>` inside the tag.

- [ ] **Step 2: Write `SkillPillar.module.css`:**
  - `.card`: composes `glassCard`; padding 24px; flex column; gap 16px; `height: 100%`.
  - `.lead`: padding 32px; title 24px; summary `max-width: 60ch`.
  - `.iconTile`: 40×40; `border-radius: var(--radius-md)`; `background: var(--accent-bg)`; `color: var(--accent)`; centred.
  - Title: 20px, weight 600, `color: var(--text-h)`.
  - Summary: 16px, line-height 1.6.
  - `.tags`: flex wrap, gap 8px, no list style.
  - `.badge`: weight 600, `color: var(--accent-strong)`, margin-left 4px.
  - `.link`: `margin-top: auto`; 14px; weight 600; `color: var(--accent)`; a visible `:focus-visible` outline 2px `var(--accent)`, offset 4px.
  - PF: `.lead` gets `box-shadow: var(--shadow-lg)`; `.link` and `.iconTile` use `color: var(--accent-strong)`.
  - BR: `.lead` gets `border-width: 2px`.

- [ ] **Step 3: Rewrite `Skills.tsx`.** Keep the `useFadeUp` ref, the `GlowBackground slot={1}` guard for non-egg themes, the label and the `h2` (now `t.skills.heading`). Add `<p className={styles.subtitle}>` with `t.skills.subtitle`. The grid maps `skillPillars` to `<SkillPillar>`. A module constant `widePillars: PillarId[] = ['agentic', 'mobile']` picks the `styles.wide` class, and `lead` is `pillar.id === 'agentic'`. After the grid: `<p className={styles.alsoUsed}><strong>{t.skills.alsoUsed}:</strong> {alsoUsed.join(' · ')}</p>`.

- [ ] **Step 4: Rewrite `Skills.module.css`:**
  - `.grid`: `grid-template-columns: repeat(3, 1fr)`; gap 16px; margin-top 48px.
  - `.wide`: `grid-column: span 2`.
  - `.subtitle`: 18px; margin-top 12px; `color: var(--text)`.
  - `.alsoUsed`: margin-top 24px; 14px; `color: var(--text)`; `strong` is weight 600 with `color: var(--text-h)`.
  - `@media (max-width: 900px)`: the grid becomes 1 column and `.wide` spans 1.

- [ ] **Step 5: Remove `skills.categories`** from `types.ts` and from the three language files.

- [ ] **Step 6: Build and lint.** `npm run build` → success. `npm run lint` → only the 4 known `src/context/*` errors.

- [ ] **Step 7: Screenshot check.** Run `npx vite preview --port 4173` in the background, then `node <scratchpad>/shoot.mjs`. For each theme in `light dark blade-runner pulp-fiction`, set `localStorage.theme`, reload, scroll `#skills` into view and save a screenshot at 1440 and 390 wide. Also take:
  - `es` at 960px for each theme (set the language via the navbar switcher or its `localStorage` key; check `LanguageContext.tsx` for the key).
  - One screenshot after pressing Tab until the marketplace link is focused.

  In the same script, assert in the DOM:
  ```js
  const mk = await page.$eval('#skills a[href^="https://github.com/logang-bot/claude-marketplace"]', a => [a.target, a.rel])
  assert.deepEqual(mk, ['_blank', 'noopener noreferrer'])
  assert.equal(await page.$eval('#skills a[href="#projects"]', a => a.target), '')
  assert.equal(await page.$$eval('#skills article', els => els.length), 4)
  ```

  Look at every image. Check that:
  - Row 1 is 2+1 and row 2 is 1+2 at 1440.
  - Cards in a row are equal height.
  - Nothing overflows at 960 in es.
  - At 390 the layout is one column.
  - The badges are readable.
  - DevOps has no link and no gap at the bottom.
  - The focus ring is visible.

- [ ] **Step 8: Commit.**
  ```bash
  git add src/components/SkillPillar src/sections/Skills.tsx src/sections/Skills.module.css src/i18n
  git commit -m "Redesign Skills as a bento of four pillars"
  ```

---

### Task 4: Audits and roadmap

**Files:**
- Modify: whatever the audits flag in the Task 3 files
- Modify: `docs/superpowers/plans/2026-11-16-portfolio-refresh-remaining-draft.md`

- [ ] **Step 1: Design audit.** Run `/web-design:design-audit src/sections/Skills.tsx src/sections/Skills.module.css src/components/SkillPillar`. Fix every confirmed finding, then rerun → clean (or only findings the spec explicitly accepts).
- [ ] **Step 2: Style check.** Run `/general-code-style:style-check` on the same paths plus `src/data/skills.ts` → no violations.
- [ ] **Step 3: Re-check after fixes.** If either audit changed code, rerun `npm run build` and the Task 3 screenshot script, and look at the changed views.
- [ ] **Step 4: Update the roadmap.** In the remaining-work draft, set Part 2's state to "**Done**", with the commit range and this plan's path.
- [ ] **Step 5: Commit.**
  ```bash
  git add -A src docs/superpowers/plans/2026-11-16-portfolio-refresh-remaining-draft.md
  git commit -m "Apply design audit fixes to Skills and mark part 2 done"
  ```
