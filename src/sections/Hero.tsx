import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useTypewriter } from '../hooks/useTypewriter'
import styles from './Hero.module.css'
import shared from '../styles/shared.module.css'

export default function Hero() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const { greetingLine, nameLine } = useTypewriter(lang, t.hero.name)

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.heroTag}>{t.hero.tag}</p>
        <h1 className={styles.typewriter}>
          {greetingLine}
          {nameLine ? <br /> : null}
          {nameLine}
          <span className={styles.cursor} />
        </h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <div className={styles.cta}>
          <a href="#projects" className={`${shared.btn} ${shared.btnPrimary}`}>{t.hero.ctaWork}</a>
          <a href="#contact" className={`${shared.btn} ${shared.btnSecondary}`}>{t.hero.ctaContact}</a>
        </div>
      </div>
      <img
        src={
          theme === 'blade-runner'
            ? '/img_bladerunner_illustration.png'
            : theme === 'pulp-fiction'
              ? '/img_pulpfiction_illustration.png'
              : theme === 'dark'
                ? '/img_hero_illustration_dark.png'
                : '/img_hero_illustration_ligth.png'
        }
        alt=""
        aria-hidden="true"
        className={styles.illustration}
      />
    </section>
  )
}
