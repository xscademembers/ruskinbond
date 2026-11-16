import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion'

/** A small "Play" / "View" tag that follows the native pointer over media. */
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return undefined
    const tag = ref.current
    let raf = 0
    let x = 0
    let y = 0

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(() => {
          tag.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`
          raf = 0
        })
      }
    }

    const over = (e) => {
      const target = e.target.closest('[data-cursor]')
      tag.classList.toggle('is-on', Boolean(target))
      if (target) tag.textContent = target.dataset.cursor
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
    }
  }, [])

  return <span className="cursor-tag" ref={ref} aria-hidden="true" />
}
