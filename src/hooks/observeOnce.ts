export function observeOnce(
  el: Element,
  callback: () => void,
  threshold = 0.1,
): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(el)
      }
    },
    { threshold },
  )
  observer.observe(el)
  return () => observer.disconnect()
}
