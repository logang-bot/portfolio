import { useEffect, useEffectEvent } from 'react'

export function useScrollFrame(onFrame: () => void): void {
  const handleFrame = useEffectEvent(onFrame)

  useEffect(() => {
    const schedule = throttleToAnimationFrame(() => handleFrame())
    schedule()
    return listenToScrollAndResize(schedule)
  }, [])
}

function throttleToAnimationFrame(callback: () => void): () => void {
  let pending = false
  return () => {
    if (pending) return
    pending = true
    requestAnimationFrame(() => {
      pending = false
      callback()
    })
  }
}

function listenToScrollAndResize(listener: () => void): () => void {
  const observer = new ResizeObserver(listener)
  observer.observe(document.documentElement)
  window.addEventListener('scroll', listener, { passive: true })
  window.addEventListener('resize', listener)
  return () => {
    window.removeEventListener('scroll', listener)
    window.removeEventListener('resize', listener)
    observer.disconnect()
  }
}
