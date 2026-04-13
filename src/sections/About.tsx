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
            I'm an Android developer with X years of experience building
            production apps. I care about clean code, intuitive interfaces,
            and apps that feel native.
          </p>
          <p>
            I work primarily with Kotlin, Jetpack Compose, and follow MVVM /
            Clean Architecture patterns. I also have experience with REST APIs,
            Firebase, and publishing to the Google Play Store.
          </p>
          <a href="/resume.pdf" className={`${shared.btn} ${shared.btnSecondary}`}>
            Download resume
          </a>
        </div>
        {/* Replace src with your actual photo */}
        <img
          src="/avatar.jpg"
          alt="Your Name"
          className={styles.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    </section>
  )
}
