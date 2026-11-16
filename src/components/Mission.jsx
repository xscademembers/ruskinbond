import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { mission } from '../data/content'
import Words from './Words'

export default function Mission() {
  const ref = useRef(null)

  useMotion(ref, (root) => {
    const stage = root.querySelector('.pillars')
    const items = gsap.utils.toArray('.pillar', root)
    const ticks = gsap.utils.toArray('.pillars-index i', root)
    stage.classList.add('is-pinned')

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: `+=${items.length * 90}%`,
        pin: true,
        scrub: 0.5,
      },
    })
    tl.set({}, {}, items.length)

    gsap.set(items.slice(1), { autoAlpha: 0 })
    gsap.set(ticks[0], { scaleX: 1, backgroundColor: '#9a472e' })
    gsap.from(items[0].children, {
      y: 60,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: stage, start: 'top 55%' },
    })

    items.forEach((item, i) => {
      const at = i
      if (i > 0) {
        tl.fromTo(
          item,
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          at - 0.2,
        ).to(ticks[i], { scaleX: 1, backgroundColor: '#9a472e', duration: 0.3 }, at - 0.2)
      }
      if (i < items.length - 1) {
        tl.to(item, { autoAlpha: 0, y: -80, duration: 0.4 }, at + 0.4)
      }
    })
  })

  return (
    <section className="mission" id="mission" ref={ref}>
      <div className="wrap manifesto">
        <p className="eyebrow" data-fade>Our purpose</p>
        <p className="manifesto-text" data-scrub>
          <Words
            text="The Ruskin Bond Foundation opens doors to books, learning and heritage for children in the hills and villages of Uttarakhand."
            em={['books,', 'heritage']}
          />
        </p>
      </div>

      <div className="pillars" aria-label="Mission">
        <ul className="pillars-list">
          {mission.map((item, i) => (
            <li className="pillar" key={item.title}>
              <small>{String(i + 1).padStart(2, '0')} / {String(mission.length).padStart(2, '0')}</small>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="pillars-index" aria-hidden="true">
          {mission.map((item) => (
            <i key={item.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
