const links = [
  {
    label: 'yourname@email.com',
    href: 'mailto:yourname@email.com',
    icon: '✉',
  },
  {
    label: 'github.com/yourusername',
    href: 'https://github.com/yourusername',
    icon: '⌥',
  },
  {
    label: 'linkedin.com/in/yourprofile',
    href: 'https://linkedin.com/in/yourprofile',
    icon: '⚇',
  },
]

export default function Contact() {
  return (
    <section id="contact">
      <p className="section-label">Contact</p>
      <div className="contact-content">
        <h2>Let's work together</h2>
        <p>
          I'm open to new opportunities, freelance projects, and interesting
          collaborations. Feel free to reach out.
        </p>
        <div className="contact-links">
          {links.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              className="contact-link"
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="contact-link-icon">{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
