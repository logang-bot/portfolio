import type { IconName } from './iconPaths'
import type { ProjectId } from './projects'

export type PillarId = 'agentic' | 'architecture' | 'devopsInfra' | 'mobile'
export type PillarLinkKey = 'marketplace' | 'projects'

export interface SkillTag {
  name: string
  inProgress?: boolean
  provenBy?: ProjectId
}

export interface PillarLink {
  href: string
  labelKey: PillarLinkKey
}

export interface SkillPillar {
  id: PillarId
  icon: IconName
  tags: SkillTag[]
  link?: PillarLink
}

function named(...names: string[]): SkillTag[] {
  return names.map((name) => ({ name }))
}

export const skillPillars: SkillPillar[] = [
  {
    id: 'agentic',
    icon: 'sparkles',
    tags: named('Claude Code', 'OpenCode', 'Agent plugins'),
    link: { href: 'https://github.com/logang-bot/claude-marketplace', labelKey: 'marketplace' },
  },
  {
    id: 'architecture',
    icon: 'layers',
    tags: [
      { name: 'Clean Architecture', provenBy: 'phoebeStore' },
      { name: 'MVVM', provenBy: 'partyPuzl' },
      ...named('MVP', 'VIPER', 'MVC'),
    ],
  },
  {
    id: 'devopsInfra',
    icon: 'workflow',
    tags: [
      ...named('GitHub Actions', 'CI/CD', 'Azure DevOps'),
      { name: 'Docker', inProgress: true },
      { name: 'Kubernetes', inProgress: true },
    ],
  },
  {
    id: 'mobile',
    icon: 'smartphone',
    tags: named('Kotlin', 'Swift', 'Jetpack Compose', 'SwiftUI', 'UIKit', 'Room', 'Retrofit', 'CoreData', 'Firebase', 'Supabase'),
    link: { href: '#projects', labelKey: 'projects' },
  },
]

export const alsoUsed: string[] = [
  'TypeScript',
  'JavaScript',
  'C#',
  'C++',
  'HTML/CSS',
  'Node.js',
  'Express',
  'React',
  'MongoDB',
  'SQL Server',
  '.NET MAUI',
  'Xamarin',
  'React Native',
  'Unit testing',
]
