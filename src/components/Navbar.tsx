import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { EGG_THEMES, useTheme, type EggTheme } from "../context/ThemeContext";
import { useDismissOnOutside } from "../hooks/useDismissOnOutside";
import { type Language } from "../i18n/translations";
import styles from "./Navbar.module.css";
import SunIcon from "../assets/icons/sun-regular-full.svg";
import MoonIcon from "../assets/icons/moon-solid-full.svg";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

const EGG_LABELS: Record<EggTheme, string> = {
  "blade-runner": "Blade Runner 2049",
  "pulp-fiction": "Pulp Fiction",
};

const WHISPER_COOLDOWN_MS = 5 * 60 * 1000;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, setEggTheme, exitEggTheme, isEggTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggMenuOpen, setEggMenuOpen] = useState(false);
  const [whisperActive, setWhisperActive] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeEggMenu = useCallback(() => setEggMenuOpen(false), []);
  useDismissOnOutside(menuOpen, menuRef, closeMenu);
  useDismissOnOutside(eggMenuOpen, avatarWrapRef, closeEggMenu);

  useEffect(() => {
    if (whisperActive) return;
    const timer = window.setTimeout(
      () => setWhisperActive(true),
      WHISPER_COOLDOWN_MS,
    );
    return () => window.clearTimeout(timer);
  }, [whisperActive]);

  const handleAvatarClick = () => {
    if (whisperActive) setWhisperActive(false);
    setEggMenuOpen((v) => !v);
  };

  const handleEggThemeClick = (t: EggTheme) => {
    if (theme === t) {
      exitEggTheme();
    } else {
      setEggTheme(t);
    }
    setEggMenuOpen(false);
  };

  const showWhisper = whisperActive && !isEggTheme && !eggMenuOpen;

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.logo}>
        <div className={styles.avatarWrap} ref={avatarWrapRef}>
          <button
            type="button"
            onClick={handleAvatarClick}
            className={styles.avatarBtn}
            aria-label="Open hidden themes menu"
            aria-expanded={eggMenuOpen}
            aria-haspopup="menu"
          >
            <img
              src="/avatar_small.png"
              alt="Alvaro Choque"
              className={styles.avatar}
            />
          </button>
          {showWhisper && (
            <span className={styles.whisper} aria-hidden="true">
              <span className={styles.whisperArrow} />
              <span className={styles.whisperText}>{t.nav.egg.whisper}</span>
            </span>
          )}
          {eggMenuOpen && (
            <div className={styles.eggMenu} role="menu">
              {EGG_THEMES.map((eggTheme) => {
                const active = theme === eggTheme;
                return (
                  <button
                    key={eggTheme}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => handleEggThemeClick(eggTheme)}
                    className={`${styles.eggItem} ${active ? styles.eggItemActive : ""}`}
                  >
                    <span>{EGG_LABELS[eggTheme]}</span>
                    {active && <span className={styles.eggCheck}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <a href="#hero" className={styles.logoName} onClick={closeMenu}>
          Alvaro Choque
        </a>
      </div>
      <button
        type="button"
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
      >
        <span />
        <span />
        <span />
      </button>
      <div
        id="navbar-menu"
        className={`${styles.right} ${menuOpen ? styles.rightOpen : ""}`}
      >
        <ul className={styles.links}>
          <li>
            <a href="#about" onClick={closeMenu}>{t.nav.about}</a>
          </li>
          <li>
            <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
          </li>
          <li>
            <a href="#skills" onClick={closeMenu}>{t.nav.skills}</a>
          </li>
          <li>
            <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
          </li>
        </ul>
        <div className={styles.langSwitcher}>
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ""}`}
              aria-label={`Switch to ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
        {!isEggTheme && (
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className={styles.themeToggleTrack}>
              <span className={styles.themeToggleIcon}>
                <img src={SunIcon} alt="" />
              </span>
              <span className={styles.themeToggleIcon}>
                <img src={MoonIcon} alt="" />
              </span>
              <span
                className={`${styles.themeToggleThumb} ${theme === "dark" ? styles.themeToggleThumbDark : ""}`}
              />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
