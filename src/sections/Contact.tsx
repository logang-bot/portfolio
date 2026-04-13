import styles from './Contact.module.css'
import shared from '../styles/shared.module.css'

const links = [
  {
    label: 'logangch8v@gmail.com',
    href: 'mailto:logangch8v@gmail.com',
    icon: '✉',
  },
  {
    label: 'linkedin.com/in/agrovercgomez',
    href: 'https://linkedin.com/in/agrovercgomez',
    icon: '⚇',
  },
]

export default function Contact() {
  return (
    <section id="contact">
      <p className={shared.sectionLabel}>Contact</p>
      <div className={styles.content}>
        <h2>Let's work together</h2>
        <p>
          I'm open to new opportunities, freelance projects, and interesting
          collaborations. Feel free to reach out.
        </p>
        <div className={styles.links}>
          {links.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              className={styles.link}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.linkIcon}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
