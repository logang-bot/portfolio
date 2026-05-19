import { lazy, Suspense, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useFadeUp } from '../hooks/useFadeUp'
import GlowBackground from '../components/GlowBackground'

const ProjectModal = lazy(() => import('../components/ProjectModal'))
import { type Translations } from '../i18n/translations'
import styles from './Projects.module.css'
import shared from '../styles/shared.module.css'

type ProjectCategory = 'mobile' | 'web' | 'gaming'
type FilterKey = keyof Translations['projects']['filters']

export interface Project {
  name: string
  description: string
  longDescription?: string
  category: ProjectCategory
  screenshots: string[]
  tags: string[]
  playStoreUrl?: string
  playStoreComingSoon?: boolean
  githubUrl?: string
  liveDemoUrl?: string
}

const partyPuzlShots = Array.from(
  { length: 11 },
  (_, i) => `/projects/partypuzl/${String(i + 1).padStart(2, '0')}.webp`,
)

const phoebeStoreShots = Array.from(
  { length: 10 },
  (_, i) => `/projects/phoebestore/${String(i + 1).padStart(2, '0')}.webp`,
)

const projects: Project[] = [
  {
    name: 'PartyPuzl',
    category: 'mobile',
    description:
      'A native Android party game that brings friends together with truth-or-dare rounds, dare challenges, trivia, and quick mini-games.',
    longDescription:
      'PartyPuzl is a native Android party game built to liven up hangouts and gatherings with friends. It combines several game modes in a single app — truth-or-dare rounds, sticky dare challenges, general-knowledge trivia, and a set of quick mini-games — so the group always has something new to play. Developed with Kotlin and Jetpack Compose and structured around the MVVM architecture pattern, the project emphasizes a clean, modular, and maintainable codebase.',
    screenshots: partyPuzlShots,
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreComingSoon: true,
    githubUrl: 'https://github.com/logang-bot/party-puzz',
  },
  {
    name: 'Phoebe Store',
    category: 'mobile',
    description:
      'A native Android app for managing stores end to end — products, inventory, and sales in one place.',
    longDescription:
      'Phoebe Store is a native Android application for managing small retail stores, covering product catalogs, inventory levels, and sales tracking within a single, streamlined interface. Originally developed for personal use, it is built with Kotlin and Jetpack Compose and follows Clean Architecture principles to keep business logic decoupled and the codebase easy to test and extend. It relies on Supabase for authentication and data persistence, providing a reliable cloud backend without the overhead of a custom server.',
    screenshots: phoebeStoreShots,
    tags: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Supabase'],
    githubUrl: 'https://github.com/logang-bot/phoebe-store',
  },
]

const FILTERS: FilterKey[] = ['all', 'mobile', 'web', 'gaming']

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { t } = useLanguage()
  const thumbs = project.screenshots.slice(0, 3)

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.screenshots}>
        {thumbs.length > 0 ? (
          <div className={styles.thumbGrid}>
            {thumbs.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot ${i + 1}`}
                className={styles.thumb}
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
        <p>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={shared.tag}>{tag}</span>
          ))}
        </div>
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

  const glow = <GlowBackground key={activeFilter} variant="purple" />

  return (
    <section id="projects" ref={fadeRef} className={styles.section}>
      {!isEggTheme && glow}
      <div className={styles.content}>
        <p className={shared.sectionLabel}>{t.projects.label}</p>
        <h2>{t.projects.heading}</h2>
        <div className={styles.filters}>
          {FILTERS.map((key) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${activeFilter === key ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(key)}
            >
              {t.projects.filters[key]}
            </button>
          ))}
        </div>
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
