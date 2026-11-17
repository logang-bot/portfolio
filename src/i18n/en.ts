import type { Translations } from './types'

export const en: Translations = {
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    egg: {
      whisper: 'psst… over here',
      exit: 'Back to normal theme',
      openMenu: 'Open hidden themes menu',
      neonSigns: [
        'Need a developer? I can fix that',
        'More human than human',
        'Within cells interlinked',
        'Wake up',
        'Like tears in rain',
        'Born, not made',
        'A world built on a wall',
        'Off-world colonies',
        'Los Angeles 2049',
        'Replicant repair · open 24h',
        'Now hiring humans',
        'Native apps, built to last',
      ],
    },
    a11y: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLanguage: 'Switch to {lang}',
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
    },
  },
  hero: {
    headline: 'Software engineer building native Android and iOS apps',
    name: 'Alvaro Choque',
    subtitle:
      'I build Android and iOS apps with Kotlin, Jetpack Compose, Swift and .NET MAUI. I use AI coding agents at every step, with automated tests and a clear code structure keeping the work reliable.',
    ctaWork: 'View my work',
    ctaContact: 'Get in touch',
  },
  about: {
    label: 'About',
    heading: 'A bit about me',
    p1: "I'm a software engineer with 4+ years of professional experience, currently a Staff Engineer at Jalasoft building native and cross-platform apps for Android and iOS.",
    highlights: [
      'Led refactors of legacy modules over 1,800 lines into Clean Architecture and MVVM',
      'Built .NET bindings for native SDKs (Lottie, Transcoder, Flurry Analytics) and a video compression tool for Android with FFmpeg',
      'Fixed critical device-permission bugs on Android and iOS using thread-safe concurrency',
      'Build AI coding tools: open-source Claude Code plugins that enforce clean code standards, and an Appium setup that finds and fixes mobile UI/UX issues on its own',
    ],
    p3: 'I graduated in Systems Engineering from Universidad Autónoma Tomás Frías with the highest academic honors, and hold a Graduate Diploma in Software Architecture from Universidad Autónoma de Chile.',
    resume: 'Download resume',
  },
  projects: {
    label: 'Projects',
    heading: "Things I've built",
    noScreenshots: 'No screenshots yet',
    viewDetails: 'View details →',
    screenshotAlt: '{name} screenshot {n}',
    items: {
      partyPuzl: {
        description:
          'A native Android party game for groups of friends: truth or dare, dare challenges, trivia and quick mini-games.',
        summary: 'A native Android party game for groups of friends.',
        highlights: [
          'Four modes in one app: truth or dare, dare challenges, trivia and quick mini-games',
          'Built with Kotlin and Jetpack Compose, using MVVM',
          'Play Store release coming soon',
        ],
      },
      phoebeStore: {
        description:
          'A native Android app for running a small shop: products, stock and sales in one place.',
        summary: 'An Android app for running a small shop.',
        highlights: [
          'Products, stock and sales in one place',
          'Built for my own use',
          'Kotlin, Jetpack Compose and Clean Architecture, with Supabase for sign-in and data, so there is no server to maintain',
        ],
      },
    },
    playStore: 'Play Store ↗',
    playStoreSoon: 'Play Store — coming soon',
    github: 'GitHub ↗',
    liveDemo: 'Live Demo ↗',
    comingSoon: 'Coming soon…',
    filters: { all: 'All', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    modal: { close: 'Close', previous: 'Previous', next: 'Next', screenshot: 'Screenshot {n}' },
  },
  skills: {
    label: 'Skills',
    heading: 'How I build',
    subtitle: 'From native apps to whole systems, with AI agents in the loop.',
    pillars: {
      agentic: {
        title: 'Agentic development',
        summary: 'I build software with AI agents and write my own plugins to keep them to my standards.',
      },
      architecture: {
        title: 'Architecture',
        summary: 'I pick the pattern that fits the app and its team.',
      },
      devopsInfra: {
        title: 'DevOps & Infrastructure',
        summary: 'Pipelines that build and ship my apps; containers and clusters in progress.',
      },
      mobile: {
        title: 'Mobile',
        summary: 'Native Android and iOS apps, from the first screen to release.',
      },
    },
    inProgress: 'in progress',
    alsoUsed: 'Also used',
    links: {
      marketplace: 'My plugin marketplace ↗',
      projects: 'See projects',
    },
  },
  contact: {
    label: 'Contact',
    heading: "Let's work together",
    description:
      "I'm open to new opportunities, freelance projects, and interesting collaborations. Feel free to reach out.",
    ctaEmail: 'Send me an email',
  },
  footer: {
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
}
