import { useEffect, useRef } from 'react'
import { observeOnce } from './observeOnce'

export function useFadeUp<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('fade-up')
    return observeOnce(el, () => el.classList.add('fade-up-visible'))
  }, [])

  return ref
}
