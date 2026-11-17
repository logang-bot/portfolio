import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { isExternal } from '../../data/links'
import type { ProjectId } from '../../data/projects'
import Icon from '../Icon'
import shared from '../../styles/shared.module.css'
import styles from './SkillPillar.module.css'
import type { SkillPillarProps } from './types'

export default function SkillPillar({ pillar, lead = false, className = '' }: SkillPillarProps) {
  const { t } = useLanguage()
  const copy = t.skills.pillars[pillar.id]
  const link = pillar.link
  const [usedInBefore, usedInAfter] = t.skills.usedIn.split('{project}')

  return (
    <article className={`${styles.card} ${lead ? styles.lead : ''} ${className}`}>
      <div className={styles.header}>
        <span className={styles.iconTile}>
          <Icon name={pillar.icon} size={24} />
        </span>
        <h3 className={styles.title}>{copy.title}</h3>
      </div>
      <p className={styles.summary}>{copy.summary}</p>
      <ul className={styles.tags}>
        {pillar.tags.map((tag) => (
          <li key={tag.name} className={shared.tag}>
            {tag.name}
            {tag.provenBy && (
              <span className={styles.proof}>
                , {usedInBefore}
                <strong>{projectName(tag.provenBy)}</strong>
                {usedInAfter}
              </span>
            )}
            {tag.inProgress && <span className={styles.badge}>· {t.skills.inProgress}</span>}
          </li>
        ))}
      </ul>
      {link && (
        <a
          href={link.href}
          className={styles.link}
          target={isExternal(link.href) ? '_blank' : undefined}
          rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
        >
          {t.skills.links[link.labelKey]}
        </a>
      )}
    </article>
  )
}

function projectName(id: ProjectId): string {
  return projects.find((p) => p.id === id)?.name ?? id
}
