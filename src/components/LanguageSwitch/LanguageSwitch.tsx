import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { languageOptions } from '../../data/languages'
import type { Language } from '../../i18n/translations'
import { fillTemplate } from '../../utils/fillTemplate'
import NavMarker from '../NavMarker'
import styles from './LanguageSwitch.module.css'

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  const [hovered, setHovered] = useState<Language | null>(null)

  return (
    <div className={styles.switch} onPointerLeave={() => setHovered(null)}>
      {languageOptions.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          data-lang={code}
          className={`${styles.option} ${lang === code ? styles.optionActive : ''}`}
          aria-label={fillTemplate(t.nav.a11y.switchLanguage, { lang: label })}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          onPointerEnter={() => setHovered(code)}
        >
          {label}
        </button>
      ))}
      <NavMarker
        target={`[data-lang="${hovered ?? lang}"]`}
        arrival={0}
        variant="compact"
      />
    </div>
  )
}
