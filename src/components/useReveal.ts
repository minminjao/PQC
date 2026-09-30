import { useEffect, useRef, useState } from 'react'

/** Returns [ref, seen]. `seen` flips to true once the element enters the viewport and never resets. */
export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -40px 0px') {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) { setSeen(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect() }
    }, { rootMargin, threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, rootMargin])
  return [ref, seen] as const
}
