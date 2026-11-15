import { useLanguage } from '../context/LanguageContext'
import { socialLinks, isExternal } from '../data/links'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {year} {t.hero.name}. {t.footer.rights}
        </p>
        <div className={styles.icons}>
          {socialLinks.map(({ name, href, icon }) => (
            <a
              key={href}
              href={href}
              aria-label={name}
              title={name}
              className={styles.iconLink}
              target={isExternal(href) ? '_blank' : undefined}
              rel={isExternal(href) ? 'noopener noreferrer' : undefined}
            >
              <img
                src={icon}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                decoding="async"
                className={styles.icon}
              />
            </a>
          ))}
        </div>
        <a href="#hero" className={styles.top}>
          {t.footer.backToTop} ↑
        </a>
      </div>
    </footer>
  )
}
