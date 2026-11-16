import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { work } from '../data/content'
import Words from './Words'

export default function Work() {
  const ref = useRef(null)

  useMotion(ref, (root) => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const track = root.querySelector('.work-track')
      const distance = () => track.scrollWidth - window.innerWidth

      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.work-pin'),
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.work-progress span', { scaleX: self.progress }),
        },
      })

      gsap.utils.toArray('.work-card', root).forEach((card) => {
        gsap.fromTo(
          card.querySelector('img'),
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
          },
        )
        gsap.from(card.querySelectorAll('.work-copy > *'), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left 75%' },
        })
      })
    })

    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.work-card', root).forEach((card) => {
        gsap.from(card, {
          y: 60,
          autoAlpha: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    })
  })

  return (
    <section className="work" id="work" ref={ref}>
      <div className="work-pin">
        <div className="work-track">
          <div className="work-intro">
            <p className="eyebrow" data-fade>What we do</p>
            <h2 className="h2" data-split>
              <Words text="Five ways we help children and the hills they call home" em={['children', 'home']} />
            </h2>
            <p className="work-hint" data-fade="0.2">
              <span>Keep scrolling</span>
              <i aria-hidden="true" />
            </p>
          </div>
          {work.map((item) => (
            <article className="work-card" key={item.n}>
              <div className="work-img">
                <img src={item.image} alt="" loading="lazy" />
                <span className="work-n" aria-hidden="true">{item.n}</span>
              </div>
              <div className="work-copy">
                <span className="work-num">{item.n} — 05</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="work-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
