import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./GlowBackground.module.css";
import { useTheme } from "../context/ThemeContext";
import { observeOnce } from "../hooks/observeOnce";
import bulletHole from "../assets/images/bullet-hole.webp";

export type GlowVariant = "purple" | "green";

interface Props {
  variant: GlowVariant;
  // Which slice of the shared neon deck this section uses, so two
  // sections on the page never show the same sign (Blade Runner only).
  slot?: number;
}

interface Hole {
  top: number;
  left: number;
  size: number;
  rotation: number;
  delay: number;
}

interface Neon {
  text: string;
  color: string;
  fontSize: number;
  rotation: number;
  delay: number;
  // Stable random factors so the layout doesn't reshuffle on resize
  jitterX: number; // -1..1, horizontal position within the margin
  jitterY: number; // -1..1, vertical offset within the free space
}

type Side = "left" | "right";

interface Placement {
  top: number;
  left: number;
}

const HOLE_COUNT = 6;

const NEON_TEXTS = [
  "Projects here",
  "Need a developer? I can fix that",
  "More human than human",
  "Within cells interlinked",
  "Wake up",
  "Like tears in rain",
  "Born, not made",
  "A world built on a wall",
  "Off-world colonies",
  "Los Angeles 2049",
];

const NEON_COLORS = ["#ff36a0", "#00eaff", "#ff7a18", "#ffd166"];
const NEONS_PER_SECTION = 5;

// Neon layout tuning (px)
const SIGN_GAP = 40; // min space between signs, and above/below the stack
const ARM_LENGTH = 26; // mounting arm (.neonSign::before)
const EDGE_PAD = 12; // keep clear of the content column / screen edge

// Font sizing: cap the size so a sign's longest word stays about
// MAX_WORD_PX wide (bold italic caps + letter-spacing ≈ CHAR_EM per char).
// Words are never split, so this keeps long words from making huge signs.
const MAX_WORD_PX = 130;
const CHAR_EM = 0.78;
const MIN_FONT = 16;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateHoles(): Hole[] {
  const holes: Hole[] = Array.from({ length: HOLE_COUNT }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 70 + Math.random() * 70,
    rotation: Math.random() * 360,
    delay: 0,
  }));
  const delays = shuffle(
    Array.from({ length: HOLE_COUNT }, (_, i) => i * 180 + Math.random() * 80),
  );
  return holes.map((h, i) => ({ ...h, delay: delays[i] }));
}

// Shuffled once per page load. Each section takes its own slice, so
// signs never repeat across sections.
const NEON_DECK = shuffle(NEON_TEXTS);

function neonTexts(slot: number): string[] {
  return Array.from(
    { length: NEONS_PER_SECTION },
    (_, i) => NEON_DECK[(slot * NEONS_PER_SECTION + i) % NEON_DECK.length],
  );
}

function neonFontSize(text: string): number {
  const longestWord = Math.max(...text.split(/\s+/).map((w) => w.length));
  const fit = MAX_WORD_PX / (longestWord * CHAR_EM);
  return Math.max(MIN_FONT, Math.min(20 + Math.random() * 14, fit));
}

// Candidates alternate between the two side margins; the layout keeps
// only the ones that fit.
function generateNeons(slot: number): Record<Side, Neon[]> {
  const neons = neonTexts(slot).map((text, i) => ({
    text,
    color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    fontSize: neonFontSize(text),
    rotation: (Math.random() - 0.5) * 6,
    delay: i * 220 + Math.random() * 120,
    jitterX: Math.random() * 2 - 1,
    jitterY: Math.random() * 2 - 1,
  }));
  return {
    left: neons.filter((_, i) => i % 2 === 0),
    right: neons.filter((_, i) => i % 2 === 1),
  };
}

/**
 * Stack signs vertically inside a margin column of size width × height.
 * Signs that don't fit completely (too wide, or no vertical room left)
 * are skipped, so nothing ever gets cut. The chosen ones are spread
 * evenly with a little jitter that can never make them overlap.
 */
function layoutSigns(
  neons: Neon[],
  sizes: ({ w: number; h: number } | null)[],
  width: number,
  height: number,
  side: Side,
): (Placement | null)[] {
  const chosen: { i: number; w: number; h: number }[] = [];
  let stack = 0;
  sizes.forEach((size, i) => {
    if (!size || size.w + ARM_LENGTH + EDGE_PAD * 2 > width) return;
    const next = stack + size.h + (chosen.length ? SIGN_GAP : 0);
    if (next + SIGN_GAP * 2 > height) return;
    stack = next;
    chosen.push({ i, ...size });
  });

  const result: (Placement | null)[] = sizes.map(() => null);
  const slot = (height - stack) / (chosen.length + 1);
  let y = 0;
  chosen.forEach(({ i, w, h }) => {
    y += slot;
    // The arm points to the outer wall, so leave room for it on that side
    const lo = EDGE_PAD + (side === "left" ? ARM_LENGTH : 0);
    const hi = width - EDGE_PAD - w - (side === "right" ? ARM_LENGTH : 0);
    result[i] = {
      top: y + neons[i].jitterY * slot * 0.4,
      left: lo + (hi - lo) * (0.5 + neons[i].jitterX * 0.35),
    };
    y += h + SIGN_GAP;
  });
  return result;
}

function NeonGutter({ side, neons }: { side: Side; neons: Neon[] }) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const signRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [layout, setLayout] = useState<(Placement | null)[]>([]);

  useEffect(() => {
    const gutter = gutterRef.current;
    if (!gutter) return;

    const compute = () => {
      // Only count the part of the margin that's actually on screen
      // (50vw includes the vertical scrollbar).
      const rect = gutter.getBoundingClientRect();
      const viewportW = document.documentElement.clientWidth;
      const visibleLeft = Math.max(rect.left, 0);
      const visibleRight = Math.min(rect.right, viewportW);
      const width = Math.max(0, visibleRight - visibleLeft);
      const offset = visibleLeft - rect.left;

      const sizes = signRefs.current.map((el) =>
        el ? { w: el.offsetWidth, h: el.offsetHeight } : null,
      );
      setLayout(
        layoutSigns(neons, sizes, width, rect.height, side).map((p) =>
          p ? { ...p, left: p.left + offset } : null,
        ),
      );
    };

    // Re-layout when the margin resizes (window resize) or a sign does
    // (web font finishing loading).
    const ro = new ResizeObserver(compute);
    ro.observe(gutter);
    signRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [neons, side]);

  return (
    <div
      ref={gutterRef}
      className={`${styles.gutter} ${side === "left" ? styles.gutterLeft : styles.gutterRight}`}
    >
      {neons.map((n, i) => {
        const p = layout[i];
        return (
          <span
            key={n.text}
            ref={(el) => {
              signRefs.current[i] = el;
            }}
            className={`${styles.neonSign} ${side === "left" ? styles.mountLeft : styles.mountRight}`}
            style={
              {
                top: `${p?.top ?? 0}px`,
                left: `${p?.left ?? 0}px`,
                visibility: p ? undefined : "hidden",
                fontSize: `${n.fontSize}px`,
                "--neon-color": n.color,
                "--neon-rot": `${n.rotation}deg`,
                animationDelay: `${n.delay}ms`,
              } as React.CSSProperties
            }
          >
            {n.text}
          </span>
        );
      })}
    </div>
  );
}

export default function GlowBackground({ variant, slot = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const holes = useMemo(() => generateHoles(), []);
  const neons = useMemo(() => generateNeons(slot), [slot]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => setVisible(true));
  }, []);

  const isPulp = theme === "pulp-fiction";
  const isBlade = theme === "blade-runner";

  return (
    <div
      ref={ref}
      className={`${styles.glow} ${visible ? styles.visible : ""}`}
    >
      {isBlade && (
        <>
          <NeonGutter side="left" neons={neons.left} />
          <NeonGutter side="right" neons={neons.right} />
        </>
      )}
      {isPulp && (
        <div className={styles.signArea}>
          {holes.map((h, i) => (
            <span
              key={i}
              className={styles.bulletHole}
              style={
                {
                  top: `${h.top}%`,
                  left: `${h.left}%`,
                  "--hole-size": `${h.size}px`,
                  "--hole-rot": `${h.rotation}deg`,
                  "--hole-img": `url(${bulletHole})`,
                  animationDelay: `${h.delay}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      {!isPulp && !isBlade && (
        <>
          <div className={`${styles.blob} ${styles[`${variant}1`]}`} />
          <div className={`${styles.blob} ${styles[`${variant}2`]}`} />
          <div className={`${styles.blob} ${styles[`${variant}3`]}`} />
        </>
      )}
    </div>
  );
}
