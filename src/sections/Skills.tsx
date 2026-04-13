import styles from './Skills.module.css'
import shared from '../styles/shared.module.css'

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
      <p className={shared.sectionLabel}>Skills</p>
      <h2>What I work with</h2>
      <div className={styles.grid}>
        {skillGroups.map(({ category, skills }) => (
          <div key={category} className={styles.group}>
            <h3>{category}</h3>
            <div className={styles.list}>
              {skills.map((skill) => (
                <span key={skill} className={styles.item}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
