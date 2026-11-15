import { useEffect, useState, useSyncExternalStore } from "react";
import type { Language } from "../i18n/translations";

const greetings: Record<Language, { text: string; emoji: string }[]> = {
  en: [
    { text: "Hi", emoji: "👋" },
    { text: "Hey", emoji: "🤙" },
    { text: "Hello", emoji: "✌️" },
    { text: "Hi there", emoji: "😊" },
    { text: "Howdy", emoji: "🤠" },
    { text: "Hey there", emoji: "🖐️" },
  ],
  es: [
    { text: "Hola", emoji: "👋" },
    { text: "Hey", emoji: "🤙" },
    { text: "Qué tal", emoji: "✌️" },
    { text: "Buenas", emoji: "😊" },
    { text: "Hola", emoji: "🖐️" },
    { text: "Hey", emoji: "🤠" },
  ],
  pt: [
    { text: "Olá", emoji: "👋" },
    { text: "E aí", emoji: "🤙" },
    { text: "Oi", emoji: "✌️" },
    { text: "Hey", emoji: "😊" },
    { text: "Olá", emoji: "🖐️" },
    { text: "Oi", emoji: "🤠" },
  ],
};

const connectors: Record<Language, string> = {
  en: ", I'm",
  es: ", soy",
  pt: ", eu sou",
};

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 8_000;
const PAUSE_AFTER_DELETE = 400;

type Phase = "typing" | "deleting";

interface TypewriterState {
  key: string; // lang + name the state was built for
  idx: number;
  displayed: string;
  phase: Phase;
}

function buildText(lang: Language, name: string, idx: number) {
  const g = greetings[lang][idx];
  return `${g.text} ${g.emoji}${connectors[lang]}\n${name}`;
}

// Random greeting index, different from `prev` when possible
function pickIndex(lang: Language, prev: number) {
  const len = greetings[lang].length;
  let next: number;
  do {
    next = Math.floor(Math.random() * len);
  } while (next === prev && len > 1);
  return next;
}

// Start fully typed so the name is visible immediately; the
// delete → retype cycle only begins after the first pause.
function initialState(lang: Language, name: string): TypewriterState {
  const idx = pickIndex(lang, -1);
  return {
    key: `${lang}|${name}`,
    idx,
    displayed: buildText(lang, name, idx),
    phase: "typing",
  };
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;

export function useTypewriter(lang: Language, name: string) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
  );
  const [state, setState] = useState(() => initialState(lang, name));

  // Language/name changed: reset during render (no blank frame, no effect)
  const key = `${lang}|${name}`;
  let current = state;
  if (state.key !== key) {
    current = initialState(lang, name);
    setState(current);
  }

  const { idx, displayed, phase } = current;
  const fullText = buildText(lang, name, idx);

  useEffect(() => {
    if (reducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      timer =
        displayed.length < fullText.length
          ? setTimeout(
              () =>
                setState((s) => ({
                  ...s,
                  displayed: fullText.slice(0, s.displayed.length + 1),
                })),
              TYPE_SPEED,
            )
          : setTimeout(
              () => setState((s) => ({ ...s, phase: "deleting" })),
              PAUSE_AFTER_TYPE,
            );
    } else {
      timer =
        displayed.length > 0
          ? setTimeout(
              () =>
                setState((s) => ({ ...s, displayed: s.displayed.slice(0, -1) })),
              DELETE_SPEED,
            )
          : setTimeout(
              () =>
                setState((s) => ({
                  ...s,
                  idx: pickIndex(lang, s.idx),
                  phase: "typing",
                })),
              PAUSE_AFTER_DELETE,
            );
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, fullText, lang, reducedMotion]);

  const text = reducedMotion ? fullText : displayed;

  // Split the displayed text into greeting line and name line
  const newlineIdx = text.indexOf("\n");
  const greetingLine = newlineIdx >= 0 ? text.slice(0, newlineIdx) : text;
  const nameLine = newlineIdx >= 0 ? text.slice(newlineIdx + 1) : "";

  // Stable, complete text for assistive tech: no emoji, never changes
  // while the animation cycles (e.g. "Hi, I'm Alvaro Choque").
  const accessibleText = `${greetings[lang][0].text}${connectors[lang]} ${name}`;

  return { greetingLine, nameLine, accessibleText };
}
