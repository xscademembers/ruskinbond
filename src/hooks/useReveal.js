import { useEffect } from 'react'

function isInView(el) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.92 && rect.bottom > vh * 0.05
}

export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'))
    if (!nodes.length) return undefined

    nodes.forEach((node) => {
      if (isInView(node)) node.classList.add('is-in')
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )

    nodes.forEach((node) => {
      if (!node.classList.contains('is-in')) io.observe(node)
    })

    return () => io.disconnect()
  }, [])
}
