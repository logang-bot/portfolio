import { useLanguage } from '../context/LanguageContext'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './About.module.css'
import shared from '../styles/shared.module.css'

export default function About() {
  const { t } = useLanguage()
  const ref = useFadeUp<HTMLElement>()

  return (
    <section id="about" ref={ref}>
      <p className={shared.sectionLabel}>{t.about.label}</p>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>{t.about.heading}</h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <a href="/resume.pdf" className={`${shared.btn} ${shared.btnSecondary}`}>
            {t.about.resume}
          </a>
        </div>
        {/* Replace src with your actual photo */}
        <img
          src="/avatar.png"
          alt="Alvaro Choque"
          className={styles.avatar}
        />
      </div>
    </section>
  )
}
