import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReduced } from '../lib/motion'
import Words from './Words'
import Motes from './Motes'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const introRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReduced) return
      introRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          '.hero-media',
          { clipPath: 'inset(18% 32% 18% 32% round 999px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 2, ease: 'expo.inOut' },
        )
        .from('.hero-media img', { scale: 1.5, duration: 2.6, ease: 'expo.inOut' }, 0)
        .from('.hero-title .wi', { yPercent: 120, rotate: 4, duration: 1.6, ease: 'expo.out', stagger: 0.07 }, 1.1)
        .from('.hero-kicker, .hero-lead, .hero-cta > *, .hero-scroll, .hero-vert', {
          autoAlpha: 0,
          y: 30,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.08,
        }, 1.5)

      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        .to('.hero-inner', { yPercent: -30, autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero-media', { yPercent: 25, scale: 1.1, ease: 'none' }, 0)
    },
    { scope: ref },
  )

  useEffect(() => {
    if (ready) introRef.current?.play()
  }, [ready])

  return (
    <section className="hero" id="top" ref={ref} data-dark>
      <div className="hero-media">
        <div className="hero-kenburns">
          <img
            src="/assets/images/hills-1.jpg"
            alt="Misty hills and tower above Mussoorie, Uttarakhand"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero-mist" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Motes count={30} />
      <div className="hero-veil" />

      <div className="hero-inner">
        <p className="hero-kicker">Ruskin Bond Foundation · Mussoorie, Uttarakhand</p>
        <h1 className="hero-title">
          <Words text="Every child has a story worth hearing." em={['story']} />
        </h1>
        <div className="hero-foot">
          <p className="hero-lead">
            We open doors to books, learning and heritage for children in the hills
            and villages of Uttarakhand.
          </p>
          <div className="hero-cta">
            <a className="btn btn-light" href="#donate" data-magnetic>
              <span>Support the Foundation</span>
            </a>
            <a className="btn btn-outline-light" href="#work" data-magnetic>
              <span>See our work</span>
            </a>
          </div>
        </div>
      </div>

      <p className="hero-vert" lang="hi" aria-hidden="true">
        पहाड़ों की कहानियाँ
      </p>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
