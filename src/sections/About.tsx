export default function About() {
  return (
    <section id="about">
      <p className="section-label">About</p>
      <div className="about-content">
        <div className="about-text">
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
          <a href="/resume.pdf" className="btn btn-secondary" style={{ width: 'fit-content' }}>
            Download resume
          </a>
        </div>
        {/* Replace src with your actual photo */}
        <img
          src="/avatar.jpg"
          alt="Your Name"
          className="about-avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    </section>
  )
}
