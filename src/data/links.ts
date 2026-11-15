import mailIcon from '../assets/icons/mail.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import githubIcon from '../assets/icons/github.svg'

export const EMAIL = 'logangch8v@gmail.com'

export const RESUME = {
  href: '/CV_Eng_2026_Alvaro_Grover_Choque_Gomez.pdf',
  fileName: 'CV_Eng_2026_Alvaro_Grover_Choque_Gomez.pdf',
}

export interface SocialLink {
  label: string
  name: string
  href: string
  icon: string
}

export const socialLinks: SocialLink[] = [
  {
    label: EMAIL,
    name: 'Email',
    href: `mailto:${EMAIL}`,
    icon: mailIcon,
  },
  {
    label: 'linkedin.com/in/agrovercgomez',
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/agrovercgomez',
    icon: linkedinIcon,
  },
  {
    label: 'github.com/logang-bot',
    name: 'GitHub',
    href: 'https://github.com/logang-bot',
    icon: githubIcon,
  },
]

export const isExternal = (href: string) => href.startsWith('http')
