export type Language = 'en' | 'es' | 'pt'

export interface Translations {
  nav: { about: string; projects: string; skills: string; contact: string }
  hero: { tag: string; greeting: string; name: string; subtitle: string; ctaWork: string; ctaContact: string }
  about: { label: string; heading: string; p1: string; p2: string; p3: string; resume: string }
  projects: {
    label: string
    heading: string
    noScreenshots: string
    playStore: string
    github: string
    liveDemo: string
    filters: { all: string; mobile: string; web: string; gaming: string }
  }
  skills: {
    label: string
    heading: string
    categories: {
      languages: string
      android: string
      ios: string
      architecture: string
      crossPlatform: string
      backendWeb: string
      tools: string
      learning: string
    }
  }
  contact: { label: string; heading: string; description: string }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      tag: 'Mobile & Web Developer',
      greeting: "Hi, I'm",
      name: 'Alvaro Choque',
      subtitle:
        'I build native Android and iOS apps and web applications with 3+ years of professional experience. Focused on clean architecture, great UX, and continuous learning.',
      ctaWork: 'View my work',
      ctaContact: 'Get in touch',
    },
    about: {
      label: 'About',
      heading: 'A bit about me',
      p1: "I'm a mobile developer with 3+ years of professional experience. I embrace the concept of being a perpetual student — the rapid pace of innovation in this industry fuels my desire for continuous learning and exploration.",
      p2: "My focus is on native Android and iOS development using Kotlin, Swift, Jetpack Compose, and SwiftUI. I've also taken on freelance projects and independently mastered backend technologies like Node.js, React, and Docker. I apply MVVM and Clean Architecture patterns in my daily work and have contributed to cross-platform projects using .NET, MAUI, and Xamarin.",
      p3: 'I graduated with the top honor of academic excellence in Systems Engineering from Universidad Autónoma Tomás Frías.',
      resume: 'Download resume',
    },
    projects: {
      label: 'Projects',
      heading: "Things I've built",
      noScreenshots: 'No screenshots yet',
      playStore: 'Play Store ↗',
      github: 'GitHub ↗',
      liveDemo: 'Live Demo ↗',
      filters: { all: 'All', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    },
    skills: {
      label: 'Skills',
      heading: 'What I work with',
      categories: {
        languages: 'Languages',
        android: 'Android',
        ios: 'iOS',
        architecture: 'Architecture',
        crossPlatform: 'Cross-platform',
        backendWeb: 'Backend & Web',
        tools: 'Tools',
        learning: 'Currently Learning',
      },
    },
    contact: {
      label: 'Contact',
      heading: "Let's work together",
      description:
        "I'm open to new opportunities, freelance projects, and interesting collaborations. Feel free to reach out.",
    },
  },

  es: {
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      tag: 'Desarrollador Mobile y Web',
      greeting: 'Hola, soy',
      name: 'Alvaro Choque',
      subtitle:
        'Desarrollo aplicaciones nativas para Android e iOS y aplicaciones web con más de 3 años de experiencia profesional. Enfocado en arquitectura limpia, buenas experiencias de usuario y aprendizaje continuo.',
      ctaWork: 'Ver mi trabajo',
      ctaContact: 'Contáctame',
    },
    about: {
      label: 'Sobre mí',
      heading: 'Un poco sobre mí',
      p1: 'Soy un desarrollador mobile con más de 3 años de experiencia profesional. Me considero un estudiante perpetuo — el rápido ritmo de innovación en esta industria impulsa mi deseo de aprender y explorar constantemente.',
      p2: 'Me enfoco en el desarrollo nativo para Android e iOS usando Kotlin, Swift, Jetpack Compose y SwiftUI. También he trabajado en proyectos freelance y he aprendido de forma independiente tecnologías backend como Node.js, React y Docker. Aplico patrones MVVM y Clean Architecture en mi trabajo diario, y he contribuido a proyectos multiplataforma con .NET, MAUI y Xamarin.',
      p3: 'Me gradué con máxima distinción académica en Ingeniería de Sistemas de la Universidad Autónoma Tomás Frías.',
      resume: 'Descargar currículum',
    },
    projects: {
      label: 'Proyectos',
      heading: 'Lo que he construido',
      noScreenshots: 'Sin capturas aún',
      playStore: 'Play Store ↗',
      github: 'GitHub ↗',
      liveDemo: 'Demo ↗',
      filters: { all: 'Todos', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    },
    skills: {
      label: 'Habilidades',
      heading: 'Con qué trabajo',
      categories: {
        languages: 'Lenguajes',
        android: 'Android',
        ios: 'iOS',
        architecture: 'Arquitectura',
        crossPlatform: 'Multiplataforma',
        backendWeb: 'Backend y Web',
        tools: 'Herramientas',
        learning: 'Aprendiendo',
      },
    },
    contact: {
      label: 'Contacto',
      heading: 'Trabajemos juntos',
      description:
        'Estoy abierto a nuevas oportunidades, proyectos freelance y colaboraciones interesantes. No dudes en escribirme.',
    },
  },

  pt: {
    nav: {
      about: 'Sobre mim',
      projects: 'Projetos',
      skills: 'Habilidades',
      contact: 'Contato',
    },
    hero: {
      tag: 'Desenvolvedor Mobile e Web',
      greeting: 'Olá, eu sou',
      name: 'Alvaro Choque',
      subtitle:
        'Desenvolvo aplicativos nativos para Android e iOS e aplicações web com mais de 3 anos de experiência profissional. Focado em arquitetura limpa, ótimas experiências de usuário e aprendizado contínuo.',
      ctaWork: 'Ver meu trabalho',
      ctaContact: 'Entre em contato',
    },
    about: {
      label: 'Sobre mim',
      heading: 'Um pouco sobre mim',
      p1: 'Sou um desenvolvedor mobile com mais de 3 anos de experiência profissional. Acredito no conceito de ser um eterno estudante — o ritmo acelerado de inovação nessa área alimenta meu desejo de aprender e explorar continuamente.',
      p2: 'Meu foco é no desenvolvimento nativo para Android e iOS usando Kotlin, Swift, Jetpack Compose e SwiftUI. Também trabalhei em projetos freelance e aprendi de forma independente tecnologias backend como Node.js, React e Docker. Aplico padrões MVVM e Clean Architecture no meu trabalho diário e contribuí para projetos multiplataforma com .NET, MAUI e Xamarin.',
      p3: 'Me formei com honra máxima em Engenharia de Sistemas pela Universidad Autónoma Tomás Frías.',
      resume: 'Baixar currículo',
    },
    projects: {
      label: 'Projetos',
      heading: 'O que já construí',
      noScreenshots: 'Sem capturas ainda',
      playStore: 'Play Store ↗',
      github: 'GitHub ↗',
      liveDemo: 'Demo ↗',
      filters: { all: 'Todos', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    },
    skills: {
      label: 'Habilidades',
      heading: 'Com o que trabalho',
      categories: {
        languages: 'Linguagens',
        android: 'Android',
        ios: 'iOS',
        architecture: 'Arquitetura',
        crossPlatform: 'Multiplataforma',
        backendWeb: 'Backend e Web',
        tools: 'Ferramentas',
        learning: 'Aprendendo',
      },
    },
    contact: {
      label: 'Contato',
      heading: 'Vamos trabalhar juntos',
      description:
        'Estou aberto a novas oportunidades, projetos freelance e colaborações interessantes. Sinta-se à vontade para entrar em contato.',
    },
  },
}
