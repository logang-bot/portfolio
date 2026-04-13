const skillGroups = [
  {
    category: 'Languages',
    skills: ['Kotlin', 'Java', 'XML'],
  },
  {
    category: 'Android',
    skills: ['Jetpack Compose', 'MVVM', 'Room', 'WorkManager', 'Navigation'],
  },
  {
    category: 'Networking',
    skills: ['Retrofit', 'OkHttp', 'REST APIs', 'Firebase'],
  },
  {
    category: 'Tools',
    skills: ['Android Studio', 'Git', 'Gradle', 'Google Play Console'],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Skills</p>
      <h2>What I work with</h2>
      <div className="skills-grid">
        {skillGroups.map(({ category, skills }) => (
          <div key={category} className="skill-group">
            <h3>{category}</h3>
            <div className="skill-list">
              {skills.map((skill) => (
                <span key={skill} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
