interface Project {
  name: string
  description: string
  screenshots: string[]
  tags: string[]
  playStoreUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    name: 'App Name',
    description: 'Short description of what the app does and the problem it solves.',
    screenshots: [
      // Add your screenshot paths here, e.g.:
      // '/screenshots/app1/screen1.png',
      // '/screenshots/app1/screen2.png',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.yourapp',
    githubUrl: 'https://github.com/yourusername/yourapp',
  },
  {
    name: 'Another App',
    description: 'Short description of what this app does.',
    screenshots: [],
    tags: ['Kotlin', 'XML', 'Retrofit', 'Room'],
    playStoreUrl: undefined,
    githubUrl: 'https://github.com/yourusername/anotherapp',
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-screenshots">
        {project.screenshots.length > 0 ? (
          project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="project-screenshot"
              loading="lazy"
            />
          ))
        ) : (
          <div className="project-screenshot-placeholder">No screenshots yet</div>
        )}
      </div>
      <div className="project-info">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.playStoreUrl && (
            <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
              Play Store ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Projects</p>
      <h2>Things I've built</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
