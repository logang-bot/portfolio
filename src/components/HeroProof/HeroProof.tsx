import { useLanguage } from '../../context/LanguageContext'
import { socialLinks, isExternal } from '../../data/links'
import { fillTemplate } from '../../utils/fillTemplate'
import Icon from '../Icon'
import styles from './HeroProof.module.css'
import type { HeroProofProps } from './types'

const profileLinks = socialLinks.filter((link) => isExternal(link.href))

export default function HeroProof({ className = '' }: HeroProofProps) {
  const { t } = useLanguage()

  return (
    <div className={`${styles.row} ${className}`}>
      <ul className={styles.facts}>
        {t.hero.proof.map((fact) => (
          <li key={fact} className={styles.fact}>
            {fact}
          </li>
        ))}
      </ul>
      <div className={styles.profiles}>
        {profileLinks.map(({ name, href, icon }) => (
          <a
            key={href}
            href={href}
            className={styles.profile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fillTemplate(t.hero.socialLabel, { name })}
          >
            <Icon name={icon} size={20} />
          </a>
        ))}
      </div>
    </div>
  )
}
