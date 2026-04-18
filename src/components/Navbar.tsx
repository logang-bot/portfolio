import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { type Language } from "../i18n/translations";
import styles from "./Navbar.module.css";
import SunIcon from "../assets/icons/sun-regular-full.svg";
import MoonIcon from "../assets/icons/moon-solid-full.svg";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <a href="#hero" className={styles.logo} onClick={closeMenu}>
        <img
          src="/avatar_small.png"
          alt="Alvaro Choque"
          className={styles.avatar}
        />
        Alvaro Choque
      </a>
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
      </div>
    </nav>
  );
}
