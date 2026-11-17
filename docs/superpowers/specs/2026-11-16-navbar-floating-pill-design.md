# Navbar: floating pill with a section marker (Part 6): design

## Intent
The owner finds the navbar too plain. Today it's a full-width frosted bar that is fixed to the top.
It becomes a **floating, transparent pill**. A **marker** behind the nav links does two jobs. At
rest it shows the section you're reading. On hover or keyboard focus it slides to that link,
then glides back when the pointer leaves. Each theme gets its own marker:
- **Light/dark:** an iOS 26-style liquid-glass bubble.
- **Pulp Fiction:** a gun sight. PF's navbar also changes from red to black.
- **Blade Runner:** a neon tube that lights up under the link.

Who it's for: recruiters and tech leads scanning the site. The marker has to be real wayfinding
("you are in Projects"), not just decoration.

## Goals
- A floating pill in all four themes, holding today's items: the avatar (hidden-theme trigger),
  the name, the four section links, the language switch, and the light/dark toggle (hidden in BR
  and PF, as today).
- One marker that rests on the current section and slides to the hovered or focused link.
- A themed marker and pill look for light/dark, PF and BR, as described below.
- The phone menu works and shows the current section.

## Non-goals
- No changes to how the hidden themes are opened or exited. The avatar stays at the pill's left
  end, and the "psst… over here" hint still points to it.
- No new nav items, and no changes to link text or order.
- No custom mouse cursor anywhere. The PF gun sight is a marker on the links, not a cursor.

## Anti-goals (a failure even if it works)
- The nav gets harder to read or use. Link text must stay readable on top of every marker.
- Motion that loops, bounces more than once, or runs without the user doing anything. The
  marker only moves when someone scrolls, hovers or focuses.
- Jank. Measure on enter, focus or resize, never on every mouse move.
- The hidden themes stop looking like their films, or PF loses its comic-poster style.

## Constraints
- Inherits every rule in `DESIGN.md`:
  - Values come from tokens in `src/styles/tokens.css`.
  - Animations last 200–500ms.
  - `prefers-reduced-motion` turns off all marker motion and flicker.
- Code rules: files ≤250 lines, function bodies ≤10 lines, ≤3 params, no comments inside function
  bodies. Component folders hold `index.tsx`, `Name.tsx` and `types.ts`. Data lives in `src/data`.
- `src/components/Navbar.module.css` is already 292 lines. The navbar moves into
  `src/components/Navbar/` and its styles are split by concern (see Structure).
- Every new string goes in `src/i18n/{en,es,pt}.ts`. None are expected beyond what exists.
- **Browser support (owner's decision):** Chromium (Chrome, Edge) gets a visibly bending lens.
  Firefox and Safari get the glass look: a frosted bubble with glass edges and highlights, never a
  broken or empty one. CSS can't reliably detect `backdrop-filter: url()` support (a browser can
  accept the declaration and render nothing, blur included), so a small engine check in JS adds a
  `data-glass="lens"` attribute on `<html>` in Chromium only. All lens styles hang off that
  attribute.
- Only Firefox is installed locally. Checking the Chromium path needs a scratchpad Chromium (for
  example `npx @puppeteer/browsers install chrome-headless-shell`) or a manual check by the owner.

## Approaches considered
1. **One shared marker element, moved by measuring the target link (picked).** It's absolutely
   positioned inside the links list, gets `transform` and `width` from the target link's
   `offsetLeft`/`offsetWidth`, and is animated by CSS transitions. It slides naturally between
   links and can be styled per theme. It needs a little JS.
2. **A marker per link (pseudo-elements), faded in and out.** Pure CSS, but it can't slide
   between links. That loses the "glide back to the current section" effect that justifies the
   resting state. Rejected.
3. **CSS anchor positioning or view transitions.** Elegant, but Firefox and Safari support
   isn't good enough for the only nav on the site. Rejected.

Current section tracking: an `IntersectionObserver` on the four section ids (`about`,
`projects`, `skills`, `contact`) with a reading band near the upper middle of the viewport. While
the hero is in view, no section is current and the resting marker is hidden.

## Decided design

### Pill (all themes)
- Fixed, centred, 12px from the top, `width: min(100% - 32px, var(--content-max))`, about 56px
  tall, radius `--radius-pill`. In PF the radius is `--radius-sm` (see below).
- Background `--nav-bg` (more transparent than today in light/dark), `backdrop-filter: blur(16px)
  saturate(160%)`, a 1px `--nav-border` border, and a soft `--shadow-md` in light/dark.
- The top-of-page spacing tokens change. `--nav-height` becomes the space reserved at the top
  (12 + 56 + 12 = 80px). It drives `body` padding, `scroll-padding-top` and the hero's
  `min-height`. A new `--nav-pill-height: 56px` sets the pill itself.

### Marker behaviour
- **Target:** the hovered or keyboard-focused link if there is one, otherwise the current
  section's link, otherwise none (marker hidden, opacity 0).
- **Motion:**
  - Slides with `transform`/`width` over `--duration-base` (300ms) ease-out.
  - Appears and disappears with an opacity fade.
  - Under reduced motion it jumps with no slide or flicker.
- **Current section link:** gets `aria-current="true"` and `--text-h` text colour. In PF it gets
  cream `--paper` instead, because `--text-h` is the same ink as the black pill.
- **When PF lock-on and BR `powerOn` play:** only when hover or keyboard focus lands on a link.
  Never on the glide back to the current section or on scroll-driven changes. Sweeping the
  pointer across links restarts the effect on each arrival, and it must never stack.
- **Layering:** the marker sits behind the link text, so text is always on top.

### Light/dark: liquid-glass bubble
- A pill around the link (about 8px × 16px padding).
- Translucent fill: white about 25% in light, about 8% in dark.
- `backdrop-filter: blur(8px) saturate(180%)`.
- A 1px light border, an inset top highlight and a faint inset bottom shade, so it reads as a
  glass lens. Plus `--shadow-sm`.
- **Two variants of the pill and the bubble, chosen by `html[data-glass="lens"]`:**
  - **Glass look (Firefox, Safari, default):** the pill and bubble as described above. A heavy
    pill blur (16px) keeps text calm.
  - **Lens (Chromium):**
    - The pill gets a light blur (about 4px) with a stronger tint behind its content (about 70%
      opaque `--nav-bg`), so the page shows through but text stays readable.
    - The bubble bends what is behind it through an inline SVG `feDisplacementMap` filter
      referenced in its `backdrop-filter`. The bending must be visible on the background grid
      and icons and on section text scrolling under the pill.
    - The bubble keeps the same glass edges and highlights.
    - The pill's own backdrop filter goes on a pseudo-element. Otherwise the pill becomes the
      bubble's backdrop root and the bubble only sees the pill's flat tint.
    - The link text itself is not bent; it sits above the bubble.
  - **Verification:**
    - In Firefox, the bubble must never be blank.
    - In a Chromium headless shell (scratchpad), the bending is visible when compared with the
      Firefox shot.
- No accent tint on the bubble. Cyan stays for the CTA and links.

### Pulp Fiction: black pill + gun sight (owner's idea)
- **Pill:** black ink (`--ink` `#1a0f08`, about 95% opaque) with mustard text (`--on-accent`
  `#f4d35e`, about 12:1). It keeps PF's comic style: `--radius-sm` corners instead of a full pill
  (my call, since PF's ingredient table uses a 4px radius everywhere), a 2.5px ink border and a
  hard red offset shadow (`4px 4px 0` in the PF red).
- The language switch and hamburger keep today's PF treatment. Their mustard offset shadows still
  work on black.
- **Gun sight marker:**
  - A sniper-scope reticle drawn in SVG: a circle about 40px across, centred on the link, with
    four tick marks and thin crosshair lines running a little past the circle.
  - It's drawn behind the link text in a red tint that reaches at least 3:1 against the black pill
    (PF `#c1272d` alone is about 2.9:1, so use a lighter tint as a new PF token).
  - When it arrives on a new link it does a quick 200ms "lock-on": it scales from about 1.3 to 1
    and fades in. It slides like the other markers.
- The phone menu panel matches the black pill.

### Blade Runner: neon tube (owner's idea)
- **Pill:** today's navy and orange-border style, reshaped as a pill.
- **Neon tube marker:**
  - A 3px-tall rounded tube under the link text, in BR pink (`--neon-1` `#ff36a0`, my call).
    DESIGN.md keeps orange for the CTA, and pink is the theme's signature neon.
  - It has a strong glow and a soft upward light falloff behind the link, so the link looks lit
    from below.
  - When it lights a new link it plays the existing `powerOn` flicker (500ms, once), the same one
    the neon signs use. The resting marker never flickers in a loop.

### Phones (≤768px)
- The pill holds the avatar, the name and the hamburger. The menu opens as a card under the pill:
  the same width, `--radius-lg` corners, the same glass or theme background.
- Links stack vertically. The current section's link shows a static version of the theme's marker:
  - Light/dark: a glass bubble behind the row.
  - PF: a small reticle before the text.
  - BR: a vertical neon tube at the left edge of the row.
- There's no sliding in the vertical menu.

### Structure (decided)
- `src/components/Navbar/`:
  - `index.tsx`, `Navbar.tsx`, `types.ts`
  - `Navbar.module.css` for layout and base
  - `NavbarMobile.module.css`
  - `NavbarBladeRunner.module.css` and `NavbarPulpFiction.module.css` for the theme overrides
- `src/components/NavMarker/` (folder convention): the sliding marker. It renders the
  theme-specific inside: the bubble, the reticle SVG or the tube.
- `src/hooks/useActiveSection.ts` for the IntersectionObserver.
- `src/data/navLinks.ts`: section ids paired with their i18n keys, which replaces the four
  hard-coded `<li>`s.
- `powerOn` keyframes: shared between NeonSign and the BR marker instead of being copied.

## Left to the builder
- The exact reading-band `rootMargin`, the bubble's highlight values, the reticle's exact
  geometry, and how the liquid-glass SVG filter is mounted (a small component rendered once).
- How the marker measures links on resize and language change (labels change width), as long as
  it never measures on every mouse move.
- Whether hover sets the target through React state or by a CSS custom property on the list.

## Verification
- `npm run build`; lint shows only the 4 known errors.
- Headless Firefox screenshots at 1440 and 390px in light, dark, BR and PF:
  - at the top of the page (marker hidden)
  - scrolled into Projects (marker on "Projects")
  - while hovering "Contact"
  - with the phone menu open
- Keyboard: Tab through the links. The marker follows focus and a visible focus ring stays.
- Reduced motion: emulate it and confirm the marker jumps with no flicker.
- Chromium (scratchpad headless shell): the lens visibly bends the grid or text behind it, and
  nav text stays readable over Projects content at 1440px. Firefox: the glass look, never blank.
- `/web-design:design-audit` on the changed files.
