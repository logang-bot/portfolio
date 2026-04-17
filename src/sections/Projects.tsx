import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { type Translations } from '../i18n/translations'
import styles from './Projects.module.css'
import shared from '../styles/shared.module.css'

type ProjectCategory = 'mobile' | 'web' | 'gaming'
type FilterKey = keyof Translations['projects']['filters']

interface Project {
  name: string
  description: string
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
    screenshots: [],
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.yourapp',
    githubUrl: 'https://github.com/yourusername/yourapp',
  },
  {
    name: 'Web Project',
    category: 'web',
    description: 'Short description of the web project.',
    screenshots: [],
    tags: ['React', 'TypeScript', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/webproject',
    liveDemoUrl: 'https://yourproject.vercel.app',
  },
  {
    name: 'Game Project',
    category: 'gaming',
    description: 'Short description of the game.',
    screenshots: [],
    tags: ['Unreal Engine', 'C++', 'Blueprints'],
    githubUrl: 'https://github.com/yourusername/gameproject',
  },
]

const FILTERS: FilterKey[] = ['all', 'mobile', 'web', 'gaming']

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  const isLandscape = project.category === 'web' || project.category === 'gaming'
  const aspectClass = isLandscape ? styles.landscape : styles.portrait

  return (
    <article className={styles.card}>
      <div className={`${styles.screenshots} ${aspectClass}`}>
        {project.screenshots.length > 0 ? (
          project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className={`${styles.screenshot} ${aspectClass}`}
              loading="lazy"
            />
          ))
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
        <div className={styles.links}>
          {project.playStoreUrl && (
            <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.playStore}
            </a>
          )}
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.liveDemo}
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.github}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects">
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
      <div className={styles.grid}>
        {filtered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
