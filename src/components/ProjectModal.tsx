import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fillTemplate } from '../utils/fillTemplate'
import shared from '../styles/shared.module.css'
import styles from './ProjectModal.module.css'
import type { Project } from '../data/projects'

const ANIM_MS = 300

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  const [closing, setClosing] = useState(false)
  const [index, setIndex] = useState(0)

  const close = useCallback(() => {
    if (prefersReducedMotion()) return onClose()
    setClosing(true)
    setTimeout(onClose, ANIM_MS)
  }, [onClose])

  useEffect(() => {
    const count = project.screenshots.length
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(count - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, project.screenshots.length])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Preload every screenshot so navigating the carousel never flashes blank
  useEffect(() => {
    project.screenshots.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [project.screenshots])

  const images = project.screenshots
  const hasImages = images.length > 0
  const copy = t.projects.items[project.id]

  return createPortal(
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`}
      onClick={close}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={close}
          aria-label={t.projects.modal.close}
        >
          <Icon name="close" size={20} />
        </button>

        <div className={styles.carousel}>
          {hasImages ? (
            <>
              <img
                key={index}
                src={images[index]}
                alt={fillTemplate(t.projects.screenshotAlt, { name: project.name, n: index + 1 })}
                className={styles.image}
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    aria-label={t.projects.modal.previous}
                  >
                    <Icon name="chevronLeft" size={20} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
                    disabled={index === images.length - 1}
                    aria-label={t.projects.modal.next}
                  >
                    <Icon name="chevronRight" size={20} />
                  </button>
                  <div className={styles.dots}>
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={fillTemplate(t.projects.modal.screenshot, { n: i + 1 })}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className={styles.placeholder}>{t.projects.noScreenshots}</div>
          )}
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{project.name}</h2>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={shared.tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.description}>{copy.summary}</p>
          <ul className={styles.highlights}>
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.links}>
            {project.playStoreUrl && (
              <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                {t.projects.playStore}
              </a>
            )}
            {!project.playStoreUrl && project.playStoreComingSoon && (
              <span className={styles.linkDisabled}>{t.projects.playStoreSoon}</span>
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
      </div>
    </div>,
    document.body,
  )
}
