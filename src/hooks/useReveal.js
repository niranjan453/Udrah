import { useEffect, useRef } from 'react'

const DEFAULT_OPTIONS = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
}

export default function useReveal(options = {}) {
  const ref = useRef(null)
  const { threshold, rootMargin } = { ...DEFAULT_OPTIONS, ...options }

  useEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return

    const targets = root.classList.contains('reveal')
      ? [root]
      : [...root.querySelectorAll('.reveal')]

    if (targets.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return
        target.classList.add('visible')
        observer.unobserve(target)
      })
    }, { threshold, rootMargin })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return ref
}
