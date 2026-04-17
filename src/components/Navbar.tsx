import { useLanguage } from '../context/LanguageContext'
import { type Language } from '../i18n/translations'
import styles from './Navbar.module.css'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()

  return (
    <nav className={styles.navbar}>
      <a href="#hero" className={styles.logo}>
        <img src="/avatar_small.png" alt="Alvaro Choque" className={styles.avatar} />
        Alvaro Choque
      </a>
      <div className={styles.right}>
        <ul className={styles.links}>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#projects">{t.nav.projects}</a></li>
          <li><a href="#skills">{t.nav.skills}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div className={styles.langSwitcher}>
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`}
              aria-label={`Switch to ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
