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
    headline: {
      before: 'Engenheiro mobile que cria sistemas completos com ',
      highlight: 'agentes de IA',
      after: '',
    },
    name: 'Alvaro Choque',
    subtitle:
      'Minha base são apps nativos Android e iOS, com Kotlin, Jetpack Compose e Swift. Com agentes de IA construo também o resto do sistema: arquitetura, testes e pipelines de publicação.',
    ctaWork: 'Ver meu trabalho',
    ctaContact: 'Entre em contato',
    proof: [
      '4+ anos de experiência',
      'Staff Engineer na Jalasoft',
      'Publicado no Google Play',
    ],
    socialLabel: 'Perfil no {name}',
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
      carlosV: {
        description:
          'Um app de vendas e estoque para um negócio real, feito com agentes de IA e publicado no Telegram do cliente por um pipeline automatizado.',
        summary: 'Um app de vendas e estoque para um negócio real, com um pipeline de publicação automatizado.',
        highlights: [
          'Clientes, pedidos, pagamentos, catálogo de produtos e relatórios em PDF',
          'Funciona offline: as alterações entram em fila e sincronizam com o Supabase em segundo plano',
          'Um pipeline do GitHub Actions gera um APK assinado e o publica, com notas de versão, no canal do Telegram do cliente',
          'Feito com agentes de IA que seguem as regras dos meus próprios plugins (veja Claude Marketplace)',
        ],
      },
      partyPuzl: {
        description:
          'Um jogo de festa nativo para Android para grupos de amigos: verdade ou desafio, desafios, trivia e minijogos rápidos.',
        summary: 'Um jogo de festa nativo para Android para grupos de amigos.',
        highlights: [
          'Quatro modos em um só app: verdade ou desafio, desafios, trivia e minijogos rápidos',
          'Feito com Kotlin e Jetpack Compose, usando MVVM',
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
      claudeMarketplace: {
        description:
          'Plugins de código aberto que mantêm agentes de IA dentro dos meus padrões de código, Android e design.',
        summary: 'Plugins que ensinam agentes de IA a construir software do meu jeito.',
        highlights: [
          'Quatro plugins com skills, hooks e agentes de revisão: estilo de código, Android e Compose, fluxo de publicação e web design',
          'Os hooks verificam o tamanho do código e as regras de design enquanto o agente escreve',
          'Usados para construir este portfólio e meus apps Android',
        ],
      },
    },
    playStore: 'Baixe no Google Play ↗',
    playStoreSoon: 'Play Store — em breve',
    github: 'GitHub ↗',
    liveDemo: 'Demo ↗',
    comingSoon: 'Em breve…',
    filters: { all: 'Todos', mobile: 'Mobile', web: 'Web', gaming: 'Gaming', aiTooling: 'Ferramentas de IA' },
    modal: { close: 'Fechar', previous: 'Anterior', next: 'Próximo', screenshot: 'Captura {n}' },
  },
  skills: {
    label: 'Habilidades',
    heading: 'Como eu construo com agentes de IA',
    subtitle: 'Android e iOS nativos como base. Agora construo sistemas completos, da arquitetura aos pipelines de publicação.',
    pillars: {
      agentic: {
        title: 'Desenvolvimento agêntico',
        summary: 'Construo software com agentes de IA e escrevo meus próprios plugins (skills, hooks e agentes de revisão) para que sigam meus padrões.',
      },
      architecture: {
        title: 'Arquitetura',
        summary: 'Escolho o padrão que combina com cada app e sua equipe.',
      },
      devopsInfra: {
        title: 'DevOps e infra',
        summary: 'Pipelines que compilam e publicam meus apps; contêineres e clusters em andamento.',
      },
      mobile: {
        title: 'Mobile',
        summary: 'Apps nativos Android e iOS, da primeira tela ao lançamento.',
      },
    },
    inProgress: 'em andamento',
    usedIn: 'usado em {project}',
    alsoUsed: 'Também usei',
    links: {
      marketplace: 'Meus plugins para agentes de IA no GitHub ↗',
      projects: 'Ver os apps que criei',
      pipeline: 'Ver o pipeline de publicação ↗',
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
