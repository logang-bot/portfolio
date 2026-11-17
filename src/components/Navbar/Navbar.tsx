import { useCallback, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useDismissOnOutside } from "../../hooks/useDismissOnOutside";
import Icon from "../Icon";
import EggThemeMenu from "../EggThemeMenu";
import NavLinks from "../NavLinks";
import LanguageSwitch from "../LanguageSwitch";
import LiquidGlassFilter from "../LiquidGlassFilter";
import base from "./Navbar.module.css";
import mobile from "./NavbarMobile.module.css";
import bladeRunner from "./NavbarBladeRunner.module.css";
import pulpFiction from "./NavbarPulpFiction.module.css";
import { mergeCssModules } from "../../utils/mergeCssModules";

const styles = mergeCssModules(base, mobile, bladeRunner, pulpFiction);

export default function Navbar() {
  const { t } = useLanguage();
  const { theme, toggleTheme, isEggTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDismissOnOutside(menuOpen, menuRef, closeMenu);

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <LiquidGlassFilter />
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
        <NavLinks onNavigate={closeMenu} />
        <LanguageSwitch />
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
