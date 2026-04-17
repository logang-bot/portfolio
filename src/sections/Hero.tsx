import { useLanguage } from '../context/LanguageContext'
import { useTypewriter } from '../hooks/useTypewriter'
import styles from './Hero.module.css'
import shared from '../styles/shared.module.css'

export default function Hero() {
  const { t, lang } = useLanguage()
  const { greetingLine, nameLine } = useTypewriter(lang, t.hero.name)

  return (
    <section id="hero" className={styles.hero}>
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
    </section>
  )
}
