import { lazy, Suspense, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useFadeUp } from '../hooks/useFadeUp'
import GlowBackground from '../components/GlowBackground'

const ProjectModal = lazy(() => import('../components/ProjectModal'))
import { type Translations } from '../i18n/translations'
import { toThumbnailPath } from '../utils/toThumbnailPath'
import { fillTemplate } from '../utils/fillTemplate'
import { projects, type Project } from '../data/projects'
import styles from './Projects.module.css'
import shared from '../styles/shared.module.css'

type FilterKey = keyof Translations['projects']['filters']

const FILTERS: FilterKey[] = ['all', 'mobile', 'web', 'gaming']

// Only offer filters that match at least one project, so empty categories
// never show up. They reappear automatically once a project uses them.
const visibleFilters = FILTERS.filter(
  (key) => key === 'all' || projects.some((p) => p.category === key),
)
const showFilters = visibleFilters.length > 2

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { t } = useLanguage()
  const thumbs = project.screenshots.slice(0, 3).map(toThumbnailPath)

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.screenshots}>
        {thumbs.length > 0 ? (
          <div className={styles.thumbGrid}>
            {thumbs.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={fillTemplate(t.projects.screenshotAlt, { name: project.name, n: i + 1 })}
                className={styles.thumb}
                width={184}
                height={408}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className={styles.placeholder}>{t.projects.noScreenshots}</div>
        )}
      </div>
      <div className={styles.info}>
        <h3>{project.name}</h3>
        <p>{t.projects.items[project.id].description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={shared.tag}>{tag}</span>
          ))}
        </div>
        <span className={styles.viewDetails}>{t.projects.viewDetails}</span>
      </div>
    </button>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const { isEggTheme } = useTheme()
  const fadeRef = useFadeUp<HTMLElement>()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const glow = <GlowBackground key={activeFilter} slot={0} />

  return (
    <section id="projects" ref={fadeRef} className={styles.section}>
      {!isEggTheme && glow}
      <div className={styles.content}>
        <p className={shared.sectionLabel}>{t.projects.label}</p>
        <h2>{t.projects.heading}</h2>
        {showFilters && (
          <div className={styles.filters}>
            {visibleFilters.map((key) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${activeFilter === key ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                {t.projects.filters[key]}
              </button>
            ))}
          </div>
        )}
        <div className={styles.gridWrap}>
          {isEggTheme && glow}
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          ) : (
            <p className={styles.comingSoon}>{t.projects.comingSoon}</p>
          )}
        </div>
      </div>
      {selected && (
        <Suspense fallback={null}>
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </Suspense>
      )}
    </section>
  )
}
