import type { Translations } from './types'

export const es: Translations = {
  nav: {
    about: 'Sobre mí',
    projects: 'Proyectos',
    skills: 'Habilidades',
    contact: 'Contacto',
    egg: {
      whisper: 'psst… por aquí',
      exit: 'Volver al tema normal',
      openMenu: 'Abrir menú de temas ocultos',
      neonSigns: [
        '¿Necesitas un desarrollador? Yo lo arreglo',
        'Más humano que los humanos',
        'Células entrelazadas',
        'Despierta',
        'Como lágrimas en la lluvia',
        'Nacido, no fabricado',
        'Un mundo construido sobre un muro',
        'Colonias exteriores',
        'Los Ángeles 2049',
        'Reparación de replicantes · 24h',
        'Se buscan humanos',
        'Apps nativas, hechas para durar',
      ],
    },
    a11y: {
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      switchLanguage: 'Cambiar a {lang}',
      toLight: 'Cambiar a modo claro',
      toDark: 'Cambiar a modo oscuro',
    },
  },
  hero: {
    headline: 'Ingeniero de software que crea apps nativas para Android e iOS',
    name: 'Alvaro Choque',
    subtitle:
      'Desarrollo apps Android e iOS con Kotlin, Jetpack Compose, Swift y .NET MAUI. Uso agentes de IA en cada paso, y las pruebas automáticas y una arquitectura clara mantienen el trabajo fiable.',
    ctaWork: 'Ver mi trabajo',
    ctaContact: 'Contáctame',
  },
  about: {
    label: 'Sobre mí',
    heading: 'Un poco sobre mí',
    p1: 'Soy ingeniero de software con más de 4 años de experiencia profesional; actualmente soy Staff Engineer en Jalasoft, donde desarrollo apps nativas y multiplataforma para Android e iOS.',
    highlights: [
      'Lideré refactorizaciones de módulos legados de más de 1.800 líneas hacia Clean Architecture y MVVM',
      'Creé bindings de .NET para SDKs nativos (Lottie, Transcoder, Flurry Analytics) y una herramienta de compresión de video para Android con FFmpeg',
      'Corregí errores críticos de permisos del dispositivo en Android e iOS con concurrencia segura entre hilos',
      'Construyo herramientas de desarrollo con IA: plugins open source de Claude Code que aplican estándares de código limpio, y una configuración con Appium que detecta y corrige problemas de UI/UX móvil por sí sola',
    ],
    p3: 'Me gradué con máxima distinción académica en Ingeniería de Sistemas de la Universidad Autónoma Tomás Frías y tengo un Diplomado en Arquitectura de Software de la Universidad Autónoma de Chile.',
    resume: 'Descargar currículum',
  },
  projects: {
    label: 'Proyectos',
    heading: 'Lo que he construido',
    noScreenshots: 'Sin capturas aún',
    viewDetails: 'Ver detalles →',
    screenshotAlt: 'Captura {n} de {name}',
    items: {
      partyPuzl: {
        description:
          'Un juego de fiesta nativo para Android para grupos de amigos: verdad o reto, retos, trivia y minijuegos rápidos.',
        summary: 'Un juego de fiesta nativo para Android para grupos de amigos.',
        highlights: [
          'Cuatro modos en una sola app: verdad o reto, retos, trivia y minijuegos rápidos',
          'Hecho con Kotlin y Jetpack Compose, usando MVVM',
          'Lanzamiento en Play Store próximamente',
        ],
      },
      phoebeStore: {
        description:
          'Una app nativa para Android para administrar una tienda pequeña: productos, inventario y ventas en un solo lugar.',
        summary: 'Una app para Android para administrar una tienda pequeña.',
        highlights: [
          'Productos, inventario y ventas en un solo lugar',
          'Creada para mi propio uso',
          'Kotlin, Jetpack Compose y Clean Architecture, con Supabase para el inicio de sesión y los datos, sin servidor propio que mantener',
        ],
      },
    },
    playStore: 'Play Store ↗',
    playStoreSoon: 'Play Store — próximamente',
    github: 'GitHub ↗',
    liveDemo: 'Demo ↗',
    comingSoon: 'Próximamente…',
    filters: { all: 'Todos', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    modal: { close: 'Cerrar', previous: 'Anterior', next: 'Siguiente', screenshot: 'Captura {n}' },
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
    },
  },
  contact: {
    label: 'Contacto',
    heading: 'Trabajemos juntos',
    description:
      'Estoy abierto a nuevas oportunidades, proyectos freelance y colaboraciones interesantes. No dudes en escribirme.',
    ctaEmail: 'Envíame un correo',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    backToTop: 'Volver arriba',
  },
}
