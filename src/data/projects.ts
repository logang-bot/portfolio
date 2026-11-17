import type { IconName } from './iconPaths'

export type ProjectId = 'carlosV' | 'partyPuzl' | 'claudeMarketplace' | 'phoebeStore'
export type ProjectCategory = 'mobile' | 'web' | 'gaming' | 'aiTooling'

export interface ScreenshotSet {
  light: string[]
  dark?: string[]
}

export interface PreviewTile {
  label: string
  icon: IconName
}

export interface Project {
  id: ProjectId
  name: string
  category: ProjectCategory
  screenshots: ScreenshotSet
  tiles?: PreviewTile[]
  tags: string[]
  playStoreUrl?: string
  playStoreComingSoon?: boolean
  githubUrl?: string
  pipelineUrl?: string
  liveDemoUrl?: string
}

function screenshotPaths(folder: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/${folder}/${String(i + 1).padStart(2, '0')}.webp`,
  )
}

function themedScreenshots(folder: string, count: number): ScreenshotSet {
  return {
    light: screenshotPaths(`${folder}/light`, count),
    dark: screenshotPaths(`${folder}/dark`, count),
  }
}

export const projects: Project[] = [
  {
    id: 'carlosV',
    name: 'Carlos V',
    category: 'mobile',
    screenshots: themedScreenshots('carlosv', 8),
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'Supabase', 'GitHub Actions'],
    githubUrl: 'https://github.com/logang-bot/EcommerceCarlosVMobileApp',
    pipelineUrl:
      'https://github.com/logang-bot/EcommerceCarlosVMobileApp/blob/main/.github/workflows/release.yml',
  },
  {
    id: 'partyPuzl',
    name: 'PartyPuzl',
    category: 'mobile',
    screenshots: themedScreenshots('partypuzl', 12),
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.restrusher.partypuzl',
    githubUrl: 'https://github.com/logang-bot/party-puzz',
  },
  {
    id: 'claudeMarketplace',
    name: 'Claude Marketplace',
    category: 'aiTooling',
    screenshots: { light: [] },
    tiles: [
      { label: 'general-code-style', icon: 'braces' },
      { label: 'android-compose', icon: 'smartphone' },
      { label: 'dev-workflow', icon: 'gitBranch' },
      { label: 'web-design', icon: 'palette' },
    ],
    tags: ['Claude Code', 'Agent plugins', 'Hooks'],
    githubUrl: 'https://github.com/logang-bot/claude-marketplace',
  },
  {
    id: 'phoebeStore',
    name: 'Phoebe Store',
    category: 'mobile',
    screenshots: { light: screenshotPaths('phoebestore', 10) },
    tags: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Supabase'],
    githubUrl: 'https://github.com/logang-bot/phoebe-store',
  },
]
