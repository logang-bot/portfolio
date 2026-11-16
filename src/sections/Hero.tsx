import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useTypewriter } from "../hooks/useTypewriter";
import { greetingConnectors, greetings } from "../data/greetings";
import styles from "./Hero.module.css";
import shared from "../styles/shared.module.css";

export default function Hero() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const greeting = useTypewriter(lang);
  const introSuffix = `${greetingConnectors[lang]} ${t.hero.name}`;

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
        <h1 className={styles.headline}>{t.hero.headline}</h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <div className={styles.cta}>
          <a href="#projects" className={`${shared.btn} ${shared.btnPrimary}`}>
            {t.hero.ctaWork}
          </a>
          <a href="#contact" className={`${shared.btn} ${shared.btnSecondary}`}>
            {t.hero.ctaContact}
          </a>
        </div>
      </div>
      <img
        src={
          theme === "blade-runner"
            ? "/img_bladerunner_illustration.webp"
            : theme === "pulp-fiction"
              ? "/img_pulpfiction_illustration.webp"
              : theme === "dark"
                ? "/img_hero_illustration_dark.webp"
                : "/img_hero_illustration_light.webp"
        }
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
