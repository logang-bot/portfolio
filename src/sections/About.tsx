import styles from './About.module.css'
import shared from '../styles/shared.module.css'

export default function About() {
  return (
    <section id="about">
      <p className={shared.sectionLabel}>About</p>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>A bit about me</h2>
          <p>
            I'm a mobile developer with 3+ years of professional experience. I embrace the
            concept of being a perpetual student — the rapid pace of innovation in this
            industry fuels my desire for continuous learning and exploration.
          </p>
          <p>
            My focus is on native Android and iOS development using Kotlin, Swift, Jetpack
            Compose, and SwiftUI. I've also taken on freelance projects and independently
            mastered backend technologies like Node.js, React, and Docker. I apply MVVM and
            Clean Architecture patterns in my daily work and have contributed to cross-platform
            projects using .NET, MAUI, and Xamarin.
          </p>
          <p>
            I graduated with the top honor of academic excellence in Systems Engineering
            from Universidad Autónoma Tomás Frías.
          </p>
          <a href="/resume.pdf" className={`${shared.btn} ${shared.btnSecondary}`}>
            Download resume
          </a>
        </div>
        {/* Replace src with your actual photo */}
        <img
          src="/avatar.jpg"
          alt="Alvaro Choque"
          className={styles.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    </section>
  )
}
