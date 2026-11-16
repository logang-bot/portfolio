import type { IconName } from './iconPaths'

export const EMAIL = 'logangch8v@gmail.com'

export const RESUME = {
  href: '/CV_Eng_2026_Alvaro_Grover_Choque_Gomez.pdf',
  fileName: 'CV_Eng_2026_Alvaro_Grover_Choque_Gomez.pdf',
}

export interface SocialLink {
  label: string
  name: string
  href: string
  icon: IconName
}

export const socialLinks: SocialLink[] = [
  {
    label: EMAIL,
    name: 'Email',
    href: `mailto:${EMAIL}`,
    icon: 'mail',
  },
  {
    label: 'linkedin.com/in/agrovercgomez',
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/agrovercgomez',
    icon: 'linkedin',
  },
  {
    label: 'github.com/logang-bot',
    name: 'GitHub',
    href: 'https://github.com/logang-bot',
    icon: 'github',
  },
]

export const isExternal = (href: string) => href.startsWith('http')
