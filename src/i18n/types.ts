import type { PillarId, PillarLinkKey } from '../data/skills'
import type { ProjectId } from '../data/projects'

export type Language = 'en' | 'es' | 'pt'

export interface ProjectCopy {
  description: string
  summary: string
  highlights: string[]
}

export interface Translations {
  nav: {
    about: string
    projects: string
    skills: string
    contact: string
    egg: { whisper: string; exit: string; openMenu: string; neonSigns: string[] }
    a11y: {
      openMenu: string
      closeMenu: string
      switchLanguage: string
      toLight: string
      toDark: string
    }
  }
  hero: { headline: string; name: string; subtitle: string; ctaWork: string; ctaContact: string }
  about: { label: string; heading: string; p1: string; highlights: string[]; p3: string; resume: string }
  projects: {
    label: string
    heading: string
    noScreenshots: string
    viewDetails: string
    screenshotAlt: string
    items: Record<ProjectId, ProjectCopy>
    playStore: string
    playStoreSoon: string
    github: string
    liveDemo: string
    comingSoon: string
    filters: { all: string; mobile: string; web: string; gaming: string }
    modal: { close: string; previous: string; next: string; screenshot: string }
  }
  skills: {
    label: string
    heading: string
    subtitle: string
    categories: {
      languages: string
      android: string
      ios: string
      architecture: string
      crossPlatform: string
      backendWeb: string
      tools: string
    }
    pillars: Record<PillarId, { title: string; summary: string }>
    inProgress: string
    alsoUsed: string
    links: Record<PillarLinkKey, string>
  }
  contact: { label: string; heading: string; description: string; ctaEmail: string }
  footer: { rights: string; backToTop: string }
}
