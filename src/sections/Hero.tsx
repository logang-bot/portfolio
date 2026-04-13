import styles from './Hero.module.css'
import shared from '../styles/shared.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <p className={styles.heroTag}>Android Developer</p>
      <h1>Hi, I'm<br />Your Name</h1>
      <p className={styles.subtitle}>
        I build native Android apps focused on clean architecture,
        great UX, and solid performance.
      </p>
      <div className={styles.cta}>
        <a href="#projects" className={`${shared.btn} ${shared.btnPrimary}`}>View my work</a>
        <a href="#contact" className={`${shared.btn} ${shared.btnSecondary}`}>Get in touch</a>
      </div>
    </section>
  )
}
