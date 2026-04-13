---
name: creating-new-feature-or-file
description: >
  Use this skill whenever creating a new file, component, section, hook, or feature
  in the this project. Ensures consistent architecture, naming conventions,
  and design patterns are followed across every generation.
---

## Project Stack

- React + TypeScript (strict mode)
- Tailwind CSS for styling
- Path aliases: `@/components`, `@/sections`, `@/hooks`, `@/data`, `@/utils`, `@/styles`

---

## Folder Structure

Every new file must be placed according to this structure:

```
src/
├── components/        ← Atoms & molecules: reusable, generic UI (Button, Card, Badge, Icon)
├── sections/          ← Organisms tied to a portfolio section
│   ├── Hero/
│   ├── Projects/
│   ├── About/
│   └── Contact/
├── hooks/             ← Custom hooks (useScrollSpy, useTheme, useMediaQuery, etc.)
├── data/              ← Static content as TypeScript objects/arrays (projects, skills, experience)
├── styles/            ← Design tokens (CSS variables), global styles, Tailwind config extensions
└── utils/             ← Pure helper functions
```

**Rules:**
- Each section folder contains: `index.tsx`, `[SectionName].tsx`, `types.ts`, and optionally `[SectionName].module.css`
- Each component folder follows the same pattern: `index.tsx`, `[ComponentName].tsx`, `types.ts`
- Never place business logic or data directly inside JSX files — extract to `/data` or `/hooks`

---

## Naming Conventions

| Thing              | Convention             | Example                    |
|--------------------|------------------------|----------------------------|
| Components         | PascalCase             | `ProjectCard.tsx`          |
| Hooks              | camelCase + `use` prefix | `useScrollSpy.ts`        |
| Types/Interfaces   | PascalCase + descriptive | `ProjectCardProps`       |
| CSS variables      | kebab-case             | `--color-accent`           |
| Data files         | camelCase              | `projects.ts`              |
| Utility functions  | camelCase              | `formatDate.ts`            |

---

## Architecture Patterns

### 1. Atomic Design
Build UI bottom-up:
- **Atoms** → `src/components/`: single-purpose primitives (Button, Tag, Icon, Avatar)
- **Molecules** → `src/components/`: small compositions (ProjectCard, SkillBadge, SectionTitle)
- **Organisms** → `src/sections/`: full portfolio sections (ProjectGrid, HeroSection, AboutBlock)

Never skip levels — a section should compose molecules, not raw HTML directly.

### 2. Container / Presentational Split
- **Presentational components**: receive props only, contain no logic, live in `src/components/`
- **Container components**: handle data filtering/transformation, live in `src/sections/[Section]/`

```tsx
// ✅ Correct
// ProjectsContainer.tsx — owns filtering logic
// ProjectCard.tsx — receives and renders props only

// ❌ Wrong
// ProjectCard.tsx that also filters or transforms data
```

### 3. Compound Components
For layout wrappers and reusable organisms, use compound component pattern:

```tsx
// ✅ Correct
<Section>
  <Section.Header>Projects</Section.Header>
  <Section.Body>...</Section.Body>
</Section>

// ❌ Wrong
<Section title="Projects" body={...} />
```

### 4. Slot / Children Pattern
Pass content into layout shells via `children` or named render props — never hardcode content inside layout components.

### 5. Design Token System
All visual values must reference CSS variables defined in `src/styles/tokens.css`:

```css
/* src/styles/tokens.css */
:root {
  --color-bg: #0f0f0f;
  --color-text: #f0f0f0;
  --color-accent: #your-accent;
  --spacing-section: 6rem;
  --font-display: 'YourDisplayFont', serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

Never use hardcoded hex values or magic numbers in components.

---

## TypeScript Rules

- Every component must have an explicit `Props` interface defined in its `types.ts` file
- Use strict typing — no `any`, no implicit returns
- Co-locate types with the component they belong to

```ts
// src/components/ProjectCard/types.ts
export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  imageUrl?: string;
}
```

---

## Content / Data Rules

- All portfolio content (projects, skills, work experience, social links) lives in `src/data/` as typed TypeScript exports
- Components never contain hardcoded strings for real content — they receive it as props from data files
- Data files export plain arrays or objects, no JSX

```ts
// src/data/projects.ts
import { Project } from '@/sections/Projects/types';

export const projects: Project[] = [
  {
    title: 'My Project',
    description: '...',
    tags: ['React', 'TypeScript'],
    href: 'https://...',
  },
];
```

---

## What to Do When Creating a New Feature

1. Identify the level: atom, molecule, or section organism
2. Create the folder under the correct `src/` directory
3. Add `index.tsx`, `[Name].tsx`, and `types.ts`
4. Define the Props interface in `types.ts` first
5. If the feature needs data, add it to `src/data/` — never inline it
6. If the feature needs logic, extract it to `src/hooks/`
7. Reference design tokens — never hardcode visual values
8. Export via `index.tsx` for clean imports

---

## Anti-Patterns to Avoid

- ❌ Placing components directly in `src/` root
- ❌ Hardcoded colors, spacing, or font names outside of `tokens.css`
- ❌ Logic or data fetching inside presentational components
- ❌ Prop interfaces defined inline in the component file (use `types.ts`)
- ❌ Generic folder names like `misc/`, `stuff/`, `common/` without clear scope
- ❌ Skipping atomic levels (building an organism directly with raw HTML)
