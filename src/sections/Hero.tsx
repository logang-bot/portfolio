import { useLanguage } from '../context/LanguageContext'
import styles from './Hero.module.css'
import shared from '../styles/shared.module.css'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className={styles.hero}>
      <p className={styles.heroTag}>{t.hero.tag}</p>
      <h1>{t.hero.greeting}<br />{t.hero.name}</h1>
      <p className={styles.subtitle}>{t.hero.subtitle}</p>
      <div className={styles.cta}>
        <a href="#projects" className={`${shared.btn} ${shared.btnPrimary}`}>{t.hero.ctaWork}</a>
        <a href="#contact" className={`${shared.btn} ${shared.btnSecondary}`}>{t.hero.ctaContact}</a>
      </div>
    </section>
  )
}
