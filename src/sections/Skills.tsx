import styles from './Skills.module.css'
import shared from '../styles/shared.module.css'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Kotlin', 'Swift', 'Java', 'JavaScript', 'TypeScript', 'C#', 'Python', 'C++', 'HTML/CSS'],
  },
  {
    category: 'Android & iOS',
    skills: ['Jetpack Compose', 'XML / Views', 'UIKit', 'SwiftUI', 'Room', 'Retrofit', 'Navigation Component', 'Maps API', 'Lottie', 'Firebase'],
  },
  {
    category: 'Architecture',
    skills: ['MVVM', 'MVC', 'Clean Architecture', 'MVP', 'VIPER'],
  },
  {
    category: 'Cross-platform',
    skills: ['.NET Android', '.NET iOS', 'Xamarin', 'MAUI', 'React Native'],
  },
  {
    category: 'Backend & Web',
    skills: ['Node.js', 'Express', 'React.js', 'MongoDB', 'Microsoft SQL Server', 'Docker'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Android Studio', 'Xcode', 'Jira', 'Postman', 'Azure DevOps', 'CI/CD', 'Unit Testing'],
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
