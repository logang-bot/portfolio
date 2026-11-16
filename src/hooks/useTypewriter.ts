import { useEffect, useState } from 'react'
import type { Language } from '../i18n/types'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import {
  greetingText,
  initialTypewriterState,
  nextTypewriterState,
  typewriterDelay,
} from '../utils/typewriterStep'

export function useTypewriter(lang: Language): string {
  const reducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState(() => initialTypewriterState(lang))
  if (state.lang !== lang) setState(initialTypewriterState(lang))

  useEffect(() => {
    if (reducedMotion) return
    const timer = setTimeout(() => setState(nextTypewriterState), typewriterDelay(state))
    return () => clearTimeout(timer)
  }, [state, reducedMotion])

  return reducedMotion ? greetingText(state.lang, state.idx) : state.displayed
}
