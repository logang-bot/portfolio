import { useMemo, useRef, useState } from "react";
import styles from "./BackgroundPattern.module.css";
import { useTheme } from "../context/ThemeContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useScrollFrame } from "../hooks/useScrollFrame";
import {
  pageScrollProgress,
  parallaxTransform,
  rangeProgress,
} from "../utils/scrollProgress";

import brBg1 from "../assets/images/blade-runner/br2049-background-1.webp";
import brBg2 from "../assets/images/blade-runner/br2049-background-2.webp";
import pfBg1 from "../assets/images/pulp-fiction/pf_background-1.webp";
import pfBg2 from "../assets/images/pulp-fiction/pf_background-2.webp";

import browser from "../assets/icons/browser.svg";
import browserWindow from "../assets/icons/browser-window.svg";
import coffee from "../assets/icons/coffee.svg";
import keyboard from "../assets/icons/keyboard.svg";
import mobilePhone from "../assets/icons/mobile-phone.svg";
import cSharp from "../assets/icons/c-sharp-logo.svg";
import kotlin from "../assets/icons/kotlin.svg";
import linux from "../assets/icons/linux.svg";
import mouse from "../assets/icons/mouse.svg";
import node from "../assets/icons/node.svg";
import screenPcSmartPhone from "../assets/icons/screen-pc-smart-phone.svg";
import swift from "../assets/icons/swift.svg";
import typescript from "../assets/icons/typescript.svg";
import javascript from "../assets/icons/javascript.svg";
import react from "../assets/icons/react.svg";
import xamarin from "../assets/icons/xamarin.svg";

const PARALLAX_FACTOR = 0.15;
const CELL_SIZE = 140;
const FILL_RATIO = 0.18;
const BR_FADE_START = 0.85;
const BR_FADE_END = 0.95;
const PF_SLIDE_START = 0.9;
const PF_SLIDE_END = 1;

const ICONS: string[] = [
  browser,
  browserWindow,
  coffee,
  keyboard,
  mobilePhone,
  cSharp,
  kotlin,
  linux,
  mouse,
  node,
  screenPcSmartPhone,
  swift,
  typescript,
  javascript,
  react,
  xamarin,
];

const NEIGHBOR_OFFSETS = [-1, 0, 1]
  .flatMap((dr) => [-1, 0, 1].map((dc) => [dr, dc]))
  .filter(([dr, dc]) => dr !== 0 || dc !== 0);

type Cell = { row: number; col: number };
type Placement = Cell & { icon: string };

function hashRand({ row, col }: Cell, salt: number, seed: number): number {
  const x =
    Math.sin(row * 127.1 + col * 311.7 + salt * 74.7 + seed * 53.3) * 43758.5453;
  return x - Math.floor(x);
}

function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

function gridCells(): Cell[] {
  const cols = Math.floor(window.innerWidth / CELL_SIZE);
  const rows = Math.floor((window.innerHeight * 3) / CELL_SIZE);
  return Array.from({ length: rows * cols }, (_, i) => ({
    row: Math.floor(i / cols),
    col: i % cols,
  }));
}

function hasPlacedNeighbor(placed: Set<string>, { row, col }: Cell): boolean {
  return NEIGHBOR_OFFSETS.some(([dr, dc]) => placed.has(cellKey(row + dr, col + dc)));
}

function generatePlacements(): Placement[] {
  const seed = Math.random() * 1000;
  return pickSpacedCells(seed).map((cell) => ({
    ...cell,
    icon: ICONS[Math.floor(hashRand(cell, 1, seed) * ICONS.length)],
  }));
}

function pickSpacedCells(seed: number): Cell[] {
  const placed = new Set<string>();
  return gridCells().filter((cell) => {
    if (hashRand(cell, 0, seed) >= FILL_RATIO || hasPlacedNeighbor(placed, cell)) return false;
    placed.add(cellKey(cell.row, cell.col));
    return true;
  });
}

function applyParallax(element: HTMLElement | null, reducedMotion: boolean): void {
  if (!element) return;
  element.style.transform = reducedMotion ? "none" : parallaxTransform(PARALLAX_FACTOR);
}

function briefcaseOffset(slide: number, reducedMotion: boolean): number {
  if (reducedMotion) return slide > 0 ? 0 : window.innerHeight;
  return (1 - slide) * window.innerHeight;
}

function BladeRunnerBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useScrollFrame(() => {
    setScrollProgress(pageScrollProgress());
    applyParallax(parallaxRef.current, reducedMotion);
  });

  return (
    <div className={styles.brWrapper}>
      <div
        ref={parallaxRef}
        className={`${styles.brImage} ${styles.brImageParallax}`}
        style={{ backgroundImage: `url(${brBg1})` }}
      />
      <div
        className={styles.brImage}
        style={{
          backgroundImage: `url(${brBg2})`,
          opacity: rangeProgress(scrollProgress, BR_FADE_START, BR_FADE_END),
        }}
      />
    </div>
  );
}

function PulpFictionBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const briefcaseRef = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    applyParallax(parallaxRef.current, reducedMotion);
    if (!briefcaseRef.current) return;
    const slide = rangeProgress(pageScrollProgress(), PF_SLIDE_START, PF_SLIDE_END);
    briefcaseRef.current.style.transform = `translateY(${briefcaseOffset(slide, reducedMotion)}px)`;
  });

  return (
    <div className={styles.pfWrapper}>
      <div
        ref={parallaxRef}
        className={`${styles.pfImage} ${styles.pfImageParallax} ${styles.pfImageBlur}`}
        style={{ backgroundImage: `url(${pfBg1})` }}
      />
      <div
        ref={briefcaseRef}
        className={`${styles.pfImage} ${styles.pfImageContain}`}
        style={{ backgroundImage: `url(${pfBg2})` }}
      />
    </div>
  );
}

function IconPatternBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const patternRef = useRef<HTMLDivElement>(null);
  const placements = useMemo(() => generatePlacements(), []);

  useScrollFrame(() => applyParallax(patternRef.current, reducedMotion));

  return (
    <div className={styles.wrapper}>
      <div
        ref={patternRef}
        className={styles.pattern}
        style={{ "--cell": `${CELL_SIZE}px` } as React.CSSProperties}
      >
        {placements.map(({ row, col, icon }, i) => (
          <img
            key={i}
            src={icon}
            alt=""
            aria-hidden="true"
            className={styles.icon}
            style={{
              top: `${row * CELL_SIZE + CELL_SIZE * 0.225}px`,
              left: `${col * CELL_SIZE + CELL_SIZE * 0.225}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BackgroundPattern() {
  const { theme } = useTheme();
  if (theme === "blade-runner") return <BladeRunnerBackground />;
  if (theme === "pulp-fiction") return <PulpFictionBackground />;
  return <IconPatternBackground />;
}
