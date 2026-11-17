import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useTypewriter } from "../hooks/useTypewriter";
import { greetingConnectors, greetings } from "../data/greetings";
import { heroIllustrations } from "../data/heroIllustrations";
import HeroProof from "../components/HeroProof";
import styles from "./Hero.module.css";
import shared from "../styles/shared.module.css";

export default function Hero() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const greeting = useTypewriter(lang);
  const introSuffix = `${greetingConnectors[lang]} ${t.hero.name}`;
  const { before, highlight, after } = t.hero.headline;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.intro}>
          <span className={shared.srOnly}>
            {greetings[lang][0].text}
            {introSuffix}
          </span>
          <span aria-hidden="true">
            {greeting}
            <span className={styles.cursor} />
            {introSuffix}
          </span>
        </p>
        <h1 className={styles.headline}>
          {before}
          <span className={styles.highlight}>{highlight}</span>
          {after}
        </h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <div className={styles.cta}>
          <a href="#projects" className={`${shared.btn} ${shared.btnPrimary}`}>
            {t.hero.ctaWork}
          </a>
          <a href="#contact" className={`${shared.btn} ${shared.btnSecondary}`}>
            {t.hero.ctaContact}
          </a>
        </div>
        <HeroProof className={styles.proof} />
      </div>
      <img
        src={heroIllustrations[theme]}
        alt=""
        aria-hidden="true"
        width={768}
        height={1376}
        fetchPriority="high"
        decoding="sync"
        className={styles.illustration}
      />
    </section>
  );
}
