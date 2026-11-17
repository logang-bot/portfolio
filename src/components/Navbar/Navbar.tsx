import { useCallback, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useDismissOnOutside } from "../../hooks/useDismissOnOutside";
import { type Language } from "../../i18n/translations";
import Icon from "../Icon";
import EggThemeMenu from "../EggThemeMenu";
import { fillTemplate } from "../../utils/fillTemplate";
import { navSectionIds } from "../../data/navLinks";
import base from "./Navbar.module.css";
import mobile from "./NavbarMobile.module.css";
import bladeRunner from "./NavbarBladeRunner.module.css";
import pulpFiction from "./NavbarPulpFiction.module.css";
import { mergeCssModules } from "../../utils/mergeCssModules";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

const styles = mergeCssModules(base, mobile, bladeRunner, pulpFiction);

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, isEggTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDismissOnOutside(menuOpen, menuRef, closeMenu);

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.logo}>
        <EggThemeMenu />
        <a href="#hero" className={styles.logoName} onClick={closeMenu}>
          {t.hero.name}
        </a>
      </div>
      <button
        type="button"
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? t.nav.a11y.closeMenu : t.nav.a11y.openMenu}
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
          {navSectionIds.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={closeMenu}>{t.nav[id]}</a>
            </li>
          ))}
        </ul>
        <div className={styles.langSwitcher}>
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ""}`}
              aria-label={fillTemplate(t.nav.a11y.switchLanguage, { lang: label })}
              aria-pressed={lang === code}
            >
              {label}
            </button>
          ))}
        </div>
        {!isEggTheme && (
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={theme === "dark" ? t.nav.a11y.toLight : t.nav.a11y.toDark}
          >
            <span className={styles.themeToggleTrack}>
              <span className={styles.themeToggleIcon}>
                <Icon name="sun" size={12} />
              </span>
              <span className={styles.themeToggleIcon}>
                <Icon name="moon" size={12} />
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
