import { useRef, useState } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { gallery } from '../data/content'
import Words from './Words'
import Lightbox from './Lightbox'

const columns = [0, 1, 2].map((c) => gallery.map((item, i) => ({ ...item, i })).filter((_, i) => i % 3 === c))
const speeds = [-12, 14, -6]

export default function Gallery() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useMotion(ref, (root) => {
    gsap.matchMedia().add('(min-width: 760px)', () => {
      gsap.utils.toArray('.gal-col', root).forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: speeds[i] * -0.5 },
          {
            yPercent: speeds[i] * 0.5,
            ease: 'none',
            scrollTrigger: { trigger: '.gal-cols', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })
  })

  return (
    <section className="section gallery" id="gallery" ref={ref}>
      <div className="wrap">
        <div className="gal-head">
          <p className="eyebrow" data-fade>Mussoorie &amp; beyond</p>
          <h2 className="h2" data-split>
            <Words text="A glimpse of the hills and the man" em={['hills', 'man']} />
          </h2>
        </div>
        <div className="gal-cols">
          {columns.map((col, c) => (
            <div className="gal-col" key={c}>
              {col.map((item) => (
                <button
                  type="button"
                  className="gal-item"
                  key={item.src}
                  data-clip
                  data-cursor="View"
                  onClick={() => setOpen(item.i)}
                  aria-label={`Open photo: ${item.caption}`}
                >
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <span className="gal-cap">{item.caption}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <p className="gal-more" data-fade>
          <a
            className="link"
            href="https://www.instagram.com/ruskinbondfoundation"
            target="_blank"
            rel="noopener noreferrer"
          >
            See more on Instagram
          </a>
        </p>
      </div>
      {open !== null && (
        <Lightbox items={gallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
