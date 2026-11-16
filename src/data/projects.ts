export type ProjectId = 'partyPuzl' | 'phoebeStore'
export type ProjectCategory = 'mobile' | 'web' | 'gaming'

export interface Project {
  id: ProjectId
  name: string
  category: ProjectCategory
  screenshots: string[]
  tags: string[]
  playStoreUrl?: string
  playStoreComingSoon?: boolean
  githubUrl?: string
  liveDemoUrl?: string
}

function screenshotPaths(folder: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/${folder}/${String(i + 1).padStart(2, '0')}.webp`,
  )
}

export const projects: Project[] = [
  {
    id: 'partyPuzl',
    name: 'PartyPuzl',
    category: 'mobile',
    screenshots: screenshotPaths('partypuzl', 11),
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreComingSoon: true,
    githubUrl: 'https://github.com/logang-bot/party-puzz',
  },
  {
    id: 'phoebeStore',
    name: 'Phoebe Store',
    category: 'mobile',
    screenshots: screenshotPaths('phoebestore', 10),
    tags: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Supabase'],
    githubUrl: 'https://github.com/logang-bot/phoebe-store',
  },
]
