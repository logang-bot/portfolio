import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BackgroundPattern.module.css";
import { useTheme } from "../context/ThemeContext";

import brBg1 from "../assets/images/blade-runner/br2049-background-1.webp";
import brBg2 from "../assets/images/blade-runner/br2049-background-2.webp";
import pfBg1 from "../assets/images/pulp-fiction/pf_background-1.webp";
import pfBg2 from "../assets/images/pulp-fiction/pf_background-2.png";

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

function hashRand(r: number, c: number, salt: number, seed: number): number {
  const x =
    Math.sin(r * 127.1 + c * 311.7 + salt * 74.7 + seed * 53.3) * 43758.5453;
  return x - Math.floor(x);
}

type Placement = { row: number; col: number; icon: string };

const BR_FADE_START = 0.85;
const BR_FADE_END = 0.95;
const PF_SLIDE_START = 0.9;
const PF_SLIDE_END = 1;

export default function BackgroundPattern() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isBlade = theme === "blade-runner";
  const isPulp = theme === "pulp-fiction";
  const [scrollT, setScrollT] = useState(0);

  const placements = useMemo<Placement[]>(() => {
    if (typeof window === "undefined") return [];
    const seed = Math.random() * 1000;
    const cols = Math.floor(window.innerWidth / CELL_SIZE);
    const rows = Math.floor((window.innerHeight * 3) / CELL_SIZE);
    const out: Placement[] = [];
    const placed = new Set<string>();
    const hasNeighbor = (r: number, c: number) => {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          if (placed.has(`${r + dr},${c + dc}`)) return true;
        }
      }
      return false;
    };
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (hashRand(r, c, 0, seed) >= FILL_RATIO) continue;
        if (hasNeighbor(r, c)) continue;
        const idx = Math.floor(hashRand(r, c, 1, seed) * ICONS.length);
        out.push({ row: r, col: c, icon: ICONS[idx] });
        placed.add(`${r},${c}`);
      }
    }
    return out;
  }, []);

  useEffect(() => {
    if (isBlade || isPulp) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY * PARALLAX_FACTOR;
          ref.current.style.transform = `translateY(-${y}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlade, isPulp]);

  const img1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBlade) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setScrollT(pct);
        if (img1Ref.current) {
          const y = window.scrollY * PARALLAX_FACTOR;
          img1Ref.current.style.transform = `translateY(-${y}px)`;
        }
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isBlade]);

  const pfImgRef = useRef<HTMLDivElement>(null);
  const pfImg2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPulp) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const parallaxY = window.scrollY * PARALLAX_FACTOR;
        if (pfImgRef.current) {
          pfImgRef.current.style.transform = `translateY(-${parallaxY}px)`;
        }
        if (pfImg2Ref.current) {
          const slideProgress =
            pct <= PF_SLIDE_START
              ? 0
              : pct >= PF_SLIDE_END
                ? 1
                : (pct - PF_SLIDE_START) / (PF_SLIDE_END - PF_SLIDE_START);
          const translateY = (1 - slideProgress) * window.innerHeight;
          pfImg2Ref.current.style.transform = `translateY(${translateY}px)`;
        }
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isPulp]);

  if (isBlade) {
    const img2Opacity =
      scrollT <= BR_FADE_START
        ? 0
        : scrollT >= BR_FADE_END
          ? 1
          : (scrollT - BR_FADE_START) / (BR_FADE_END - BR_FADE_START);

    return (
      <div className={styles.brWrapper}>
        <div
          ref={img1Ref}
          className={`${styles.brImage} ${styles.brImageParallax}`}
          style={{ backgroundImage: `url(${brBg1})` }}
        />
        <div
          className={styles.brImage}
          style={{
            backgroundImage: `url(${brBg2})`,
            opacity: img2Opacity,
          }}
        />
      </div>
    );
  }

  if (isPulp) {
    return (
      <div className={styles.pfWrapper}>
        <div
          ref={pfImgRef}
          className={`${styles.pfImage} ${styles.pfImageParallax} ${styles.pfImageBlur}`}
          style={{ backgroundImage: `url(${pfBg1})` }}
        />
        <div
          ref={pfImg2Ref}
          className={`${styles.pfImage} ${styles.pfImageContain}`}
          style={{ backgroundImage: `url(${pfBg2})` }}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div
        ref={ref}
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
