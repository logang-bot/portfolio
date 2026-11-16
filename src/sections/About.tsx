import { useLanguage } from "../context/LanguageContext";
import { useFadeUp } from "../hooks/useFadeUp";
import { RESUME } from "../data/links";
import styles from "./About.module.css";
import shared from "../styles/shared.module.css";

export default function About() {
  const { t } = useLanguage();
  const ref = useFadeUp<HTMLElement>();

  return (
    <section id="about" ref={ref}>
      <p className={shared.sectionLabel}>{t.about.label}</p>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>{t.about.heading}</h2>
          <p>{t.about.p1}</p>
          <ul className={styles.highlights}>
            {t.about.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.about.p3}</p>
          <a
            href={RESUME.href}
            download={RESUME.fileName}
            className={`${shared.btn} ${shared.btnSecondary}`}
          >
            {t.about.resume}
          </a>
        </div>
        <img
          src="/avatar.webp"
          alt="Alvaro Choque"
          width={720}
          height={960}
          loading="lazy"
          decoding="async"
          className={styles.avatar}
        />
      </div>
    </section>
  );
}
