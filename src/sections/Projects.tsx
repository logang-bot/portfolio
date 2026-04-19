import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useFadeUp } from '../hooks/useFadeUp'
import GlowBackground from '../components/GlowBackground'
import ProjectModal from '../components/ProjectModal'
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
  githubUrl?: string
  liveDemoUrl?: string
}

const projects: Project[] = [
  {
    name: 'App Name',
    category: 'mobile',
    description: 'Short description of what the app does and the problem it solves.',
    longDescription:
      'Longer description of the app: the problem it solves, the stack used, interesting technical challenges, and the outcome.',
    screenshots: [],
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.yourapp',
    githubUrl: 'https://github.com/yourusername/yourapp',
  },
  {
    name: 'Web Project',
    category: 'web',
    description: 'Short description of the web project.',
    longDescription:
      'Longer description of the web project: goals, architecture, and what makes it interesting.',
    screenshots: [],
    tags: ['React', 'TypeScript', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/webproject',
    liveDemoUrl: 'https://yourproject.vercel.app',
  },
  {
    name: 'Game Project',
    category: 'gaming',
    description: 'Short description of the game.',
    longDescription:
      'Longer description of the game: gameplay, engine features used, and development highlights.',
    screenshots: [],
    tags: ['Unreal Engine', 'C++', 'Blueprints'],
    githubUrl: 'https://github.com/yourusername/gameproject',
  },
]

const FILTERS: FilterKey[] = ['all', 'mobile', 'web', 'gaming']

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { t } = useLanguage()
  const isLandscape = project.category === 'web' || project.category === 'gaming'
  const aspectClass = isLandscape ? styles.landscape : styles.portrait
  const cover = project.screenshots[0]

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={`${styles.screenshots} ${aspectClass}`}>
        {cover ? (
          <img
            src={cover}
            alt={`${project.name} screenshot`}
            className={`${styles.screenshot} ${aspectClass}`}
            loading="lazy"
          />
        ) : (
          <div className={`${styles.placeholder} ${aspectClass}`}>{t.projects.noScreenshots}</div>
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
          <div className={styles.grid}>
            {filtered.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </div>
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
