import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion'

export default function Motes({ count = 60, color = '255, 250, 238' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReduced) return undefined
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.25 + 0.05),
      drift: Math.random() * Math.PI * 2,
      a: Math.random() * 0.5 + 0.15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        m.drift += 0.006
        m.y += m.vy
        m.x += Math.sin(m.drift) * 0.25
        if (m.y < -10) {
          m.y = h + 10
          m.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${m.a * (0.6 + 0.4 * Math.sin(m.drift * 2))})`
        ctx.fill()
      }
      if (visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count, color])

  return <canvas className="motes" ref={ref} aria-hidden="true" />
}
