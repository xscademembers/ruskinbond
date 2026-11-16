import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'

export default function Preloader({ onDone }) {
  const ref = useRef(null)
  const [gone, setGone] = useState(prefersReduced)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  })

  useEffect(() => {
    const root = ref.current
    if (prefersReduced) {
      doneRef.current()
      return undefined
    }

    const counter = { v: 0 }
    const num = root.querySelector('.pre-num')
    const loaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    })
    const minTime = new Promise((resolve) => setTimeout(resolve, 2200))
    const maxTime = new Promise((resolve) => setTimeout(resolve, 5000))

    const ctx = gsap.context(() => {
      gsap.fromTo('.pre-bar span', { scaleX: 0 }, { scaleX: 1, duration: 2.2, ease: 'power2.inOut' })
      gsap.from('.pre-word .wi', { yPercent: 120, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.3 })
      gsap.to(counter, {
        v: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
    }, root)

    let cancelled = false
    Promise.race([Promise.all([loaded, minTime]), maxTime]).then(() => {
      if (cancelled) return
      ctx.add(() => {
        gsap
          .timeline({ onComplete: () => setGone(true) })
          .to('.pre-inner', { autoAlpha: 0, y: -30, duration: 0.7, ease: 'power3.in' })
          .call(() => doneRef.current(), null, 0.6)
          .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0.45)
      })
    })

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  if (gone) return null

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="pre-inner">
        <p className="pre-word">
          <span className="w"><span className="wi">Ruskin</span></span>{' '}
          <span className="w"><span className="wi">Bond</span></span>{' '}
          <span className="w"><span className="wi"><em>Foundation</em></span></span>
        </p>
        <span className="pre-bar">
          <span />
        </span>
        <span className="pre-num">000</span>
      </div>
    </div>
  )
}
