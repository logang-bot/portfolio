# Design brief

## Personality
Startup/Upbeat for the base light and dark themes. Why: a software engineer's portfolio aimed at
recruiters and tech leads. It should feel modern, friendly and competent: medium sans-serif, soft
warm-grey surfaces, a cyan main colour with an indigo gradient on the primary button, rounded
corners and frosted-glass cards.

Two hidden easter-egg themes (opened from the avatar in the navbar) are custom sub-styles. They
reuse the same tokens, layout and type, and change only the ingredients below:

| Ingredient | Blade Runner 2049 (custom — neon noir) | Pulp Fiction (custom — comic poster) |
|---|---|---|
| Colour | Deep navy background, warm cream text, neon-orange accent | Mustard-yellow background, ink-brown text, deep red accent |
| Images | Navy base, neon logo and sign parallax, hologram finale | Mustard halftone, print-sticker logo and prop parallax, briefcase finale |
| Shadows | Orange glow on the primary button; neon glows on background logos and signs and the pink nav tube only | Hard ink offset shadows, no blur (cards, buttons, prop stickers) |
| Border-radius | Same as base | Small (4px) or none |
| Type | Uppercase buttons, weight 600 | Headings 900, body 500, uppercase buttons 800 |
| Navbar | Navy pill; pink (`--neon-1`) neon tube under the current or hovered link, flickers on hover arrival | Black ink bar (4px corners, red offset shadow), mustard links; red gun-sight reticle (`--nav-marker`) with a 200ms lock-on |

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
palette: primary #0e6a84; primary-dark-theme #22d3ee; secondary #4f46e5; secondary-dark-theme #818cf8; grey #4b5563; heading #111827; background #faf8f5
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
- Themed backgrounds (`src/components/BackgroundPattern/`): one `ParallaxLayer` places items on a
  seeded random grid and scrolls at its own speed. Far layer (logos) 15%, near layer (BR signs, PF
  props) 25%. All decorative: `aria-hidden`, no pointer events.
  - Blade Runner: tech logos as single-colour neon silhouettes, neon text signs (copy in
    `nav.egg.neonSigns`, translated), and the hologram photo fading in at the end of the page.
  - Pulp Fiction: brand logos printed in ink over an off-register red copy, film props (Lucide,
    the same pack) as red line art on cream stickers, and the briefcase sliding up at the end.
    The generic outline device icons are left out here so logos stay solid and props outlined.
- Background items never sit at full strength behind text. An item whose box, plus its glow
  reach, overlaps the text area (the content column minus its side padding) is dimmed: BR to
  0.2 opacity with a 2px blur, PF to 0.1. Worst-case contrast for body and accent text over a
  dimmed item stays at or above 4.5:1. On phones the text area spans the screen, so everything
  is dimmed. Away from text: BR logos 0.6, signs 0.75; PF 0.85 and 0.7.
- Background tokens: `--content-max`, `--neon-1..4` (pink, cyan, violet, yellow; orange is
  kept for the CTA), `--paper`, `--bg-far-opacity`, `--bg-near-opacity`,
  `--bg-item-opacity-dim`, `--bg-item-blur-dim`.
- Neon signs power on once (500ms flicker) when first scrolled into view, never in a loop, and
  not at all when dimmed or under reduced motion.
- Headline states the role and the agentic edge ("Mobile engineer building whole systems with AI
  agents"); the key phrase carries the accent gradient in light/dark and the solid accent in
  BR/PF. Only the greeting line animates.
- Hero illustrations are faceless on purpose.
- Navbar: a floating pill 12px from the top, as wide as `--content-max`. `--nav-height` (80px) is
  the space reserved above content, and `--nav-pill-height` (56px) is the pill itself. One marker
  rests on the current section's link (scroll-tracked; hidden on the hero) and slides to the hovered
  or keyboard-focused link. Light/dark marker: a liquid-glass bubble (`--glass-*` tokens). Chromium
  adds a refracting lens via the `#liquid-glass` SVG filter, gated by `html[data-glass="lens"]`,
  which `src/main.tsx` sets from a user-agent engine check. Other browsers get the frosted bubble.
  The pill tint stays at least 0.82 opaque so links keep 4.5:1 over any content. Below 900px the
  links move into a card menu.
- Always write `-webkit-backdrop-filter` before `backdrop-filter`. The CSS minifier drops the
  unprefixed line when the prefixed one follows it.
