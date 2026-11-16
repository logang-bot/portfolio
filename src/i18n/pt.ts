import type { Translations } from './types'

export const pt: Translations = {
  nav: {
    about: 'Sobre mim',
    projects: 'Projetos',
    skills: 'Habilidades',
    contact: 'Contato',
    egg: {
      whisper: 'psst… por aqui',
      exit: 'Voltar ao tema normal',
      openMenu: 'Abrir menu de temas ocultos',
      neonSigns: [
        'Precisa de um desenvolvedor? Eu resolvo',
        'Mais humano que humano',
        'Células interligadas',
        'Acorde',
        'Como lágrimas na chuva',
        'Nascido, não fabricado',
        'Um mundo construído sobre um muro',
        'Colônias espaciais',
        'Los Angeles 2049',
        'Conserto de replicantes · 24h',
        'Contratamos humanos',
        'Apps nativos, feitos para durar',
      ],
    },
    a11y: {
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      switchLanguage: 'Mudar para {lang}',
      toLight: 'Mudar para modo claro',
      toDark: 'Mudar para modo escuro',
    },
  },
  hero: {
    headline: 'Engenheiro de software que cria apps nativos para Android e iOS',
    name: 'Alvaro Choque',
    subtitle:
      'Desenvolvo apps Android e iOS com Kotlin, Jetpack Compose, Swift e .NET MAUI. Uso agentes de IA em cada etapa, e testes automatizados e uma arquitetura clara mantêm o trabalho confiável.',
    ctaWork: 'Ver meu trabalho',
    ctaContact: 'Entre em contato',
  },
  about: {
    label: 'Sobre mim',
    heading: 'Um pouco sobre mim',
    p1: 'Sou engenheiro de software com mais de 4 anos de experiência profissional; atualmente sou Staff Engineer na Jalasoft, onde desenvolvo apps nativos e multiplataforma para Android e iOS.',
    highlights: [
      'Liderei refatorações de módulos legados com mais de 1.800 linhas para Clean Architecture e MVVM',
      'Criei bindings .NET para SDKs nativos (Lottie, Transcoder, Flurry Analytics) e uma ferramenta de compressão de vídeo para Android com FFmpeg',
      'Corrigi bugs críticos de permissões do dispositivo no Android e no iOS com concorrência thread-safe',
      'Crio ferramentas de desenvolvimento com IA: plugins open source do Claude Code que aplicam padrões de código limpo e uma configuração com Appium que detecta e corrige problemas de UI/UX mobile sozinha',
    ],
    p3: 'Me formei com honra máxima em Engenharia de Sistemas pela Universidad Autónoma Tomás Frías e tenho uma Pós-graduação em Arquitetura de Software pela Universidad Autónoma de Chile.',
    resume: 'Baixar currículo',
  },
  projects: {
    label: 'Projetos',
    heading: 'O que já construí',
    noScreenshots: 'Sem capturas ainda',
    viewDetails: 'Ver detalhes →',
    screenshotAlt: 'Captura {n} de {name}',
    items: {
      partyPuzl: {
        description:
          'Um jogo de festa nativo para Android para grupos de amigos: verdade ou desafio, desafios, trivia e minijogos rápidos.',
        summary: 'Um jogo de festa nativo para Android para grupos de amigos.',
        highlights: [
          'Quatro modos em um só app: verdade ou desafio, desafios, trivia e minijogos rápidos',
          'Feito com Kotlin e Jetpack Compose, usando MVVM',
          'Lançamento na Play Store em breve',
        ],
      },
      phoebeStore: {
        description:
          'Um app nativo para Android para gerenciar uma pequena loja: produtos, estoque e vendas em um só lugar.',
        summary: 'Um app para Android para gerenciar uma pequena loja.',
        highlights: [
          'Produtos, estoque e vendas em um só lugar',
          'Criado para uso próprio',
          'Kotlin, Jetpack Compose e Clean Architecture, com Supabase para login e dados, sem servidor próprio para manter',
        ],
      },
    },
    playStore: 'Play Store ↗',
    playStoreSoon: 'Play Store — em breve',
    github: 'GitHub ↗',
    liveDemo: 'Demo ↗',
    comingSoon: 'Em breve…',
    filters: { all: 'Todos', mobile: 'Mobile', web: 'Web', gaming: 'Gaming' },
    modal: { close: 'Fechar', previous: 'Anterior', next: 'Próximo', screenshot: 'Captura {n}' },
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
    },
  },
  contact: {
    label: 'Contato',
    heading: 'Vamos trabalhar juntos',
    description:
      'Estou aberto a novas oportunidades, projetos freelance e colaborações interessantes. Sinta-se à vontade para entrar em contato.',
    ctaEmail: 'Envie-me um e-mail',
  },
  footer: {
    rights: 'Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },
}
