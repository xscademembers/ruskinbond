import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import Words from './Words'

export default function Band() {
  const ref = useRef(null)

  useMotion(ref, (root) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: root.querySelector('.band-pin'),
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.5,
        },
      })
      .fromTo(
        '.band-media',
        { clipPath: 'inset(20% 38% 20% 38% round 400px 400px 8px 8px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'power2.inOut', duration: 1 },
      )
      .fromTo('.band-media img', { scale: 1.6 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.band-label', { autoAlpha: 0, y: -40, duration: 0.3 }, 0)
      .fromTo('.band-shade', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5)
      .from('.band-inner .wi', { yPercent: 120, stagger: 0.04, duration: 0.4, ease: 'power3.out' }, 0.65)
      .from('.band-inner .band-fade', { autoAlpha: 0, y: 30, stagger: 0.08, duration: 0.3 }, 0.8)
  })

  return (
    <section className="band" aria-label="From the hills" ref={ref} data-dark>
      <div className="band-pin">
        <div className="band-media">
          <img src="/assets/images/bazaar.jpg" alt="Mussoorie town spread across the hillside" loading="lazy" />
        </div>
        <p className="band-label" aria-hidden="true">
          <span>From the hills</span>
          <span>Landour · Mussoorie</span>
        </p>
        <div className="band-shade" />
        <div className="band-inner">
          <p className="eyebrow band-fade">From the hills</p>
          <h2 className="display">
            <Words text="Where stories begin" em={['stories']} />
          </h2>
          <p className="band-fade">
            Landour’s winding lanes, deodar forests and tea-shop corners shaped the
            stories millions of readers love. The Foundation carries that spirit to
            children who live beyond the bookshops.
          </p>
          <a
            className="btn btn-outline-light band-fade"
            href="https://www.instagram.com/ruskinbondfoundation"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
}
