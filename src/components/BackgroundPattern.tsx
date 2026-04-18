import { useEffect, useMemo, useRef } from "react";
import styles from "./BackgroundPattern.module.css";

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

export default function BackgroundPattern() {
  const ref = useRef<HTMLDivElement>(null);

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
  }, []);

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
