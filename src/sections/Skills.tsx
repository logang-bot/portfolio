import { useLanguage } from "../context/LanguageContext";
import { useFadeUp } from "../hooks/useFadeUp";
import GlowBackground from "../components/GlowBackground";
import { type Translations } from "../i18n/translations";
import styles from "./Skills.module.css";
import shared from "../styles/shared.module.css";

type SkillCategoryKey = keyof Translations["skills"]["categories"];

const LEARNING_KEY = "learning";

const skillGroups: { key: SkillCategoryKey; skills: string[] }[] = [
  {
    key: "languages",
    skills: [
      "Kotlin",
      "Swift",
      "JavaScript",
      "TypeScript",
      "C#",
      "C++",
      "HTML/CSS",
    ],
  },
  {
    key: "android",
    skills: [
      "Jetpack Compose",
      "XML / Views",
      "Room",
      "Retrofit",
      "Navigation Component",
      "Maps API",
      "Lottie",
      "Firebase",
    ],
  },
  {
    key: "ios",
    skills: ["SwiftUI", "UIKit", "CoreData", "Apple Maps API"],
  },
  {
    key: "architecture",
    skills: ["MVVM", "MVC", "Clean Architecture", "MVP", "VIPER"],
  },
  {
    key: "crossPlatform",
    skills: [".NET Android", ".NET iOS", "Xamarin", "MAUI", "React Native"],
  },
  {
    key: "backendWeb",
    skills: [
      "Node.js",
      "Express",
      "React.js",
      "MongoDB",
      "Microsoft SQL Server",
      "Docker",
    ],
  },
  {
    key: "tools",
    skills: [
      "Git",
      "GitHub",
      "Android Studio",
      "Xcode",
      "Jira",
      "Postman",
      "Azure DevOps",
      "CI/CD",
      "Unit Testing",
    ],
  },
  {
    key: "learning",
    skills: ["Python", "Django", "Vue.js", "Go", "Unreal Engine", "Monogame"],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const fadeRef = useFadeUp<HTMLElement>();

  return (
    <section id="skills" ref={fadeRef} className={styles.section}>
      <GlowBackground variant="green" />
      <div className={styles.content}>
        <p className={shared.sectionLabel}>{t.skills.label}</p>
        <h2>{t.skills.heading}</h2>
        <div className={styles.grid}>
          {skillGroups.map(({ key, skills }) => (
            <div
              key={String(key)}
              className={`${styles.group} ${key === LEARNING_KEY ? styles.learning : ""}`}
            >
              <h3>{t.skills.categories[key]}</h3>
              <div className={styles.list}>
                {skills.map((skill) => (
                  <span key={skill} className={styles.item}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
