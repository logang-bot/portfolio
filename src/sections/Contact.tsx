import { useLanguage } from '../context/LanguageContext'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Contact.module.css'
import shared from '../styles/shared.module.css'
import mailIcon from '../assets/icons/mail.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import githubIcon from '../assets/icons/github.svg'

const links = [
  {
    label: 'logangch8v@gmail.com',
    href: 'mailto:logangch8v@gmail.com',
    icon: mailIcon,
  },
  {
    label: 'linkedin.com/in/agrovercgomez',
    href: 'https://linkedin.com/in/agrovercgomez',
    icon: linkedinIcon,
  },
  {
    label: 'github.com/logang-bot',
    href: 'https://github.com/logang-bot',
    icon: githubIcon,
  },
]

export default function Contact() {
  const { t } = useLanguage()
  const ref = useFadeUp<HTMLElement>()

  return (
    <section id="contact" ref={ref}>
      <p className={shared.sectionLabel}>{t.contact.label}</p>
      <div className={styles.content}>
        <h2>{t.contact.heading}</h2>
        <p>{t.contact.description}</p>
        <div className={styles.links}>
          {links.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              className={styles.link}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <img src={icon} alt="" className={styles.linkIcon} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
