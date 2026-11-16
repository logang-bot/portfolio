# Design brief

## Personality
Startup/Upbeat for the base light and dark themes. Why: a software engineer's portfolio aimed at
recruiters and tech leads. It should feel modern, friendly and competent: medium sans-serif, soft
warm-grey surfaces, a violet main colour, rounded corners and frosted-glass cards.

Two hidden easter-egg themes (opened from the avatar in the navbar) are custom sub-styles. They
reuse the same tokens, layout and type, and change only the ingredients below:

| Ingredient | Blade Runner 2049 (custom — neon noir) | Pulp Fiction (custom — comic poster) |
|---|---|---|
| Colour | Deep navy background, warm cream text, neon-orange accent | Mustard-yellow background, ink-brown text, deep red accent |
| Images | Dark cinematic city backgrounds, neon signs in the side margins | Blurred poster background, briefcase reveal, bullet holes |
| Shadows | Orange glow on the primary button and neon signs only | Hard ink offset shadows, no blur |
| Border-radius | Same as base | Small (4px) or none |
| Type | Uppercase buttons, weight 600 | Headings 900, body 500, uppercase buttons 800 |

## Audience and goal
Recruiters, hiring managers and tech leads, mostly on desktop, often on mobile. Primary actions:
"View my work" (projects) and "Send me an email" (contact).

## Relaxed rules
- SHADOW-03: the Pulp Fiction theme uses hard, fully opaque ink offset shadows on purpose. They
  are the signature of its comic-poster style.

```tokens
personality: startup-upbeat
font-families: Inter
icon-pack: lucide
type-scale: 12 14 16 18 20 24 36 56 64
spacing-scale: 2 4 8 12 16 24 32 48 64 80 96 128
palette: primary #7c3aed; primary-dark-theme #a78bfa; grey #4b5563; heading #111827; background #faf8f5
radius: 2 4 8 16 999
shadows: sm 0 1px 3px rgba(17,24,39,.08); md 0 10px 15px -3px rgba(17,24,39,.08); lg 0 24px 48px -12px rgba(17,24,39,.18)
relax: SHADOW-03
```

## Notes
- All tokens live in `src/styles/tokens.css`, per theme. Components use only the custom
  properties (`--accent`, `--on-accent`, `--accent-strong`, `--shadow-sm|md|lg`, `--radius-*`,
  `--duration-*`), never literals.
- Text on an accent background always uses `--on-accent`. In Pulp Fiction, yellow-on-red surfaces
  use `--accent-strong` (#9e1b20) to reach 4.5:1.
- Motion: 200–500ms (`--duration-fast|base|slow`). Everything is disabled under
  `prefers-reduced-motion`. Deliberate exception: the hero greeting's caret blinks on a 1.5s loop,
  the standard text-cursor pattern. It is static under reduced motion.
- Pulp Fiction's secondary buttons are outline-only, so the filled primary always leads.
- Icons: Lucide outline paths in `src/data/iconPaths.ts`, rendered by `<Icon>` with
  `currentColor`. The background-pattern tech logos are decorative brand marks and stay as they
  are.
- Headline states the role ("Software engineer building native Android and iOS apps"). Only the
  greeting line animates.
- Hero illustrations are faceless on purpose.
