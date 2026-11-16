import { useLanguage } from '../context/LanguageContext'
import { useFadeUp } from '../hooks/useFadeUp'
import { EMAIL, RESUME, socialLinks, isExternal } from '../data/links'
import Icon from '../components/Icon'
import styles from './Contact.module.css'
import shared from '../styles/shared.module.css'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useFadeUp<HTMLElement>()

  return (
    <section id="contact" ref={ref} className={styles.section}>
      <p className={shared.sectionLabel}>{t.contact.label}</p>
      <div className={styles.content}>
        <h2>{t.contact.heading}</h2>
        <p>{t.contact.description}</p>
        <div className={styles.cta}>
          <a href={`mailto:${EMAIL}`} className={`${shared.btn} ${shared.btnPrimary} ${styles.primaryCta}`}>
            {t.contact.ctaEmail}
          </a>
          <a
            href={RESUME.href}
            download={RESUME.fileName}
            className={`${shared.btn} ${shared.btnSecondary} ${styles.secondaryCta}`}
          >
            {t.about.resume}
          </a>
        </div>
        <div className={styles.links}>
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              className={styles.link}
              target={isExternal(href) ? '_blank' : undefined}
              rel={isExternal(href) ? 'noopener noreferrer' : undefined}
            >
              <Icon name={icon} size={20} className={styles.linkIcon} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
