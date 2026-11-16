import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { milestones } from '../data/content'
import Words from './Words'

export default function Timeline() {
  const ref = useRef(null)

  useMotion(ref, (root) => {
    gsap.fromTo(
      '.timeline-line span',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
      },
    )

    gsap.utils.toArray('.timeline li', root).forEach((li) => {
      const year = li.querySelector('time')
      const target = Number(year.dataset.year)
      const counter = { v: target - 60 }
      gsap
        .timeline({ scrollTrigger: { trigger: li, start: 'top 72%' } })
        .from(li.querySelector('.dot'), { scale: 0, duration: 0.8, ease: 'back.out(3)' })
        .to(
          counter,
          {
            v: target,
            duration: 1.6,
            ease: 'expo.out',
            onUpdate: () => {
              year.textContent = Math.round(counter.v)
            },
          },
          0,
        )
        .from(year, { autoAlpha: 0, x: -30, duration: 1.2, ease: 'power3.out' }, 0)
        .from(li.querySelector('p'), { autoAlpha: 0, y: 30, duration: 1.2, ease: 'power3.out' }, 0.15)
    })
  })

  return (
    <section className="section milestones" aria-label="Milestones" ref={ref}>
      <div className="wrap timeline-grid">
        <div className="timeline-head">
          <p className="eyebrow" data-fade>A life in books</p>
          <h2 className="display" data-split>
            <Words text="Milestones" />
          </h2>
          <figure className="timeline-photo" data-clip>
            <img src="/assets/images/old-print.jpg" alt="Mussoorie & Landour, 1860s" loading="lazy" />
            <figcaption>Mussoorie &amp; Landour, 1860s</figcaption>
          </figure>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true">
            <span />
          </div>
          <ol>
            {milestones.map((item) => (
              <li key={item.year}>
                <span className="dot" aria-hidden="true" />
                <time data-year={item.year}>{item.year}</time>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
