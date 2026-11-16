import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { mission, navLinks } from '../data/content'

const words = mission.map((m) => m.title)

export default function Footer() {
  const ref = useRef(null)

  useMotion(ref, () => {
    gsap.from('.foot-giant span', {
      yPercent: 110,
      duration: 1.6,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: { trigger: '.foot-giant', start: 'top 95%' },
    })
  })

  return (
    <footer className="footer" ref={ref} data-dark>
      <div className="foot-marquee" aria-hidden="true">
        <div className="foot-marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {words.concat(words).map((w, i) => (
                <b key={i}>
                  {w} <i>✺</i>
                </b>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap foot-grid">
        <div className="foot-brand">
          <p className="foot-tag" data-fade>Every child has a story worth hearing.</p>
          <a className="btn btn-outline-light" href="#top" data-magnetic>
            <span>Back to top ↑</span>
          </a>
        </div>
        <nav className="foot-nav" aria-label="Footer">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="link">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="foot-contact">
          <a className="link" href="mailto:officialruskinbond@gmail.com">officialruskinbond@gmail.com</a>
          <a className="link" href="tel:+918376931264">+91 83769 31264</a>
          <a className="link" href="https://www.instagram.com/ruskinbondfoundation" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <p className="foot-giant" aria-label="Ruskin Bond Foundation">
        {'Ruskin Bond'.split('').map((ch, i) => (
          <span key={i} aria-hidden="true">
            {ch === ' ' ? '\u00a0' : ch}
          </span>
        ))}
      </p>

      <div className="wrap foot-small">
        <p>© Ruskin Bond Foundation</p>
        <p>Photographs from Wikimedia Commons under their respective free licences.</p>
      </div>
    </footer>
  )
}
