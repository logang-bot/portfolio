import { Fragment } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useFadeUp } from "../hooks/useFadeUp";
import GlowBackground from "../components/GlowBackground";
import SkillPillar from "../components/SkillPillar";
import { alsoUsed, skillPillars, type PillarId } from "../data/skills";
import styles from "./Skills.module.css";
import shared from "../styles/shared.module.css";

const widePillars: PillarId[] = ["agentic", "mobile"];

export default function Skills() {
  const { t } = useLanguage();
  const { isEggTheme } = useTheme();
  const fadeRef = useFadeUp<HTMLElement>();

  return (
    <section id="skills" ref={fadeRef} className={styles.section}>
      {!isEggTheme && <GlowBackground slot={1} />}
      <div className={styles.content}>
        <p className={shared.sectionLabel}>{t.skills.label}</p>
        <h2>{t.skills.heading}</h2>
        <p className={styles.subtitle}>{t.skills.subtitle}</p>
        <div className={styles.grid}>
          {skillPillars.map((pillar) => (
            <SkillPillar
              key={pillar.id}
              pillar={pillar}
              lead={pillar.id === "agentic"}
              className={widePillars.includes(pillar.id) ? styles.wide : ""}
            />
          ))}
        </div>
        <p className={styles.alsoUsed}>
          <strong>{t.skills.alsoUsed}:</strong>{" "}
          {alsoUsed.map((term, i) => (
            <Fragment key={term}>
              {i > 0 && " · "}
              <span data-term className={styles.term}>
                {term}
              </span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
