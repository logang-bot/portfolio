import { useCallback, useEffect, useRef, useState } from 'react'
import type { Language } from '../i18n/translations'

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
}

const connectors: Record<Language, string> = {
  en: ", I'm",
  es: ", soy",
  pt: ", eu sou",
}

const TYPE_SPEED = 60
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 13_000
const PAUSE_AFTER_DELETE = 400

type Phase = 'typing' | 'paused' | 'deleting' | 'deleted'

export function useTypewriter(lang: Language, name: string) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const indexRef = useRef(0)
  const prevIndexRef = useRef(-1)

  const getFullText = useCallback((idx: number) => {
    const list = greetings[lang]
    const g = list[idx % list.length]
    return `${g.text} ${g.emoji}${connectors[lang]}\n${name}`
  }, [lang, name])

  // Pick a random index different from the previous one
  const pickIndex = useCallback(() => {
    const list = greetings[lang]
    let next: number
    do {
      next = Math.floor(Math.random() * list.length)
    } while (next === prevIndexRef.current && list.length > 1)
    prevIndexRef.current = next
    return next
  }, [lang])

  // Reset on language change
  useEffect(() => {
    indexRef.current = pickIndex()
    setDisplayed('')
    setPhase('typing')
  }, [lang, pickIndex])

  useEffect(() => {
    const fullText = getFullText(indexRef.current)

    let timer: ReturnType<typeof setTimeout>

    switch (phase) {
      case 'typing': {
        if (displayed.length < fullText.length) {
          timer = setTimeout(() => {
            setDisplayed(fullText.slice(0, displayed.length + 1))
          }, TYPE_SPEED)
        } else {
          timer = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
        }
        break
      }
      case 'deleting': {
        if (displayed.length > 0) {
          timer = setTimeout(() => {
            setDisplayed(displayed.slice(0, -1))
          }, DELETE_SPEED)
        } else {
          setPhase('deleted')
        }
        break
      }
      case 'deleted': {
        timer = setTimeout(() => {
          indexRef.current = pickIndex()
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
        break
      }
    }

    return () => clearTimeout(timer)
  }, [displayed, phase, getFullText, pickIndex])

  // Split the displayed text into greeting line and name line
  const newlineIdx = displayed.indexOf('\n')
  const greetingLine = newlineIdx >= 0 ? displayed.slice(0, newlineIdx) : displayed
  const nameLine = newlineIdx >= 0 ? displayed.slice(newlineIdx + 1) : ''

  return { greetingLine, nameLine }
}
