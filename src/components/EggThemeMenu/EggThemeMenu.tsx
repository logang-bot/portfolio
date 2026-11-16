import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { EGG_THEMES, useTheme, type EggTheme } from "../../context/ThemeContext";
import { useDismissOnOutside } from "../../hooks/useDismissOnOutside";
import { observeOnce } from "../../hooks/observeOnce";
import Icon from "../Icon";
import type { EggThemeMenuProps } from "./types";
import styles from "./EggThemeMenu.module.css";

const EGG_LABELS: Record<EggTheme, string> = {
  "blade-runner": "Blade Runner 2049",
  "pulp-fiction": "Pulp Fiction",
};

export default function EggThemeMenu({ className = "" }: EggThemeMenuProps) {
  const { t } = useLanguage();
  const { theme, setEggTheme, exitEggTheme, isEggTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useDismissOnOutside(open, wrapRef, close);

  useEffect(() => {
    if (!wrapRef.current) return;
    return observeOnce(wrapRef.current, () => setInView(true), 1);
  }, []);

  const handleTriggerClick = () => {
    setDiscovered(true);
    setOpen((v) => !v);
  };

  const handleThemeClick = (eggTheme: EggTheme) => {
    if (theme === eggTheme) exitEggTheme();
    else setEggTheme(eggTheme);
    setOpen(false);
  };

  const handleExitClick = () => {
    exitEggTheme();
    setOpen(false);
  };

  const showWhisper = inView && !discovered && !isEggTheme && !open;

  return (
    <div className={`${styles.wrap} ${className}`} ref={wrapRef}>
      {showWhisper && (
        <span className={styles.whisper} aria-hidden="true">
          <Icon name="cornerLeftUp" size={20} className={styles.whisperArrow} />
          <span className={styles.whisperText}>{t.nav.egg.whisper}</span>
        </span>
      )}
      <button
        type="button"
        onClick={handleTriggerClick}
        className={styles.trigger}
        aria-label={t.nav.egg.openMenu}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <img
          src="/avatar.webp"
          alt=""
          width={32}
          height={32}
          className={styles.avatar}
        />
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          {EGG_THEMES.map((eggTheme) => {
            const active = theme === eggTheme;
            return (
              <button
                key={eggTheme}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => handleThemeClick(eggTheme)}
                className={`${styles.item} ${active ? styles.itemActive : ""}`}
              >
                <span>{EGG_LABELS[eggTheme]}</span>
                {active && <Icon name="check" size={16} className={styles.check} />}
              </button>
            );
          })}
          {isEggTheme && (
            <button
              type="button"
              role="menuitem"
              onClick={handleExitClick}
              className={`${styles.item} ${styles.exitItem}`}
            >
              {t.nav.egg.exit}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
