import { greetings } from '../data/greetings'
import type { Language } from '../i18n/types'

const TYPE_SPEED = 60
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 8_000
const PAUSE_AFTER_DELETE = 400

export interface TypewriterState {
  lang: Language
  idx: number
  displayed: string
  phase: 'typing' | 'deleting'
}

export function greetingText(lang: Language, idx: number): string {
  const greeting = greetings[lang][idx]
  return `${greeting.text} ${greeting.emoji}`
}

export function initialTypewriterState(lang: Language): TypewriterState {
  const idx = pickGreetingIndex(lang, -1)
  return { lang, idx, displayed: greetingText(lang, idx), phase: 'typing' }
}

export function typewriterDelay(state: TypewriterState): number {
  const isComplete = state.displayed.length >= greetingText(state.lang, state.idx).length
  if (state.phase === 'typing') return isComplete ? PAUSE_AFTER_TYPE : TYPE_SPEED
  return state.displayed.length > 0 ? DELETE_SPEED : PAUSE_AFTER_DELETE
}

export function nextTypewriterState(state: TypewriterState): TypewriterState {
  if (state.phase === 'typing') return advanceTyping(state)
  if (state.displayed.length > 0) return { ...state, displayed: state.displayed.slice(0, -1) }
  return { ...state, idx: pickGreetingIndex(state.lang, state.idx), phase: 'typing' }
}

function pickGreetingIndex(lang: Language, previous: number): number {
  const count = greetings[lang].length
  if (previous < 0) return Math.floor(Math.random() * count)
  const candidate = Math.floor(Math.random() * (count - 1))
  return candidate >= previous ? candidate + 1 : candidate
}

function advanceTyping(state: TypewriterState): TypewriterState {
  const fullText = greetingText(state.lang, state.idx)
  if (state.displayed.length >= fullText.length) return { ...state, phase: 'deleting' }
  return { ...state, displayed: fullText.slice(0, state.displayed.length + 1) }
}
