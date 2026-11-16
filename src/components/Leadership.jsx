import { useRef } from 'react'
import { useMotion } from '../lib/motion'
import Words from './Words'

export default function Leadership() {
  const ref = useRef(null)

  useMotion(ref)

  return (
    <section className="section leader" id="leadership" ref={ref}>
      <div className="wrap leader-grid">
        <figure className="leader-portrait" data-clip>
          <img
            src="/assets/images/siddharth.jpg"
            alt="Siddharth Bond, Founder Director of the Ruskin Bond Foundation"
            loading="lazy"
          />
        </figure>
        <div className="leader-copy">
          <p className="eyebrow" data-fade>Leadership</p>
          <h2 className="display" data-split>
            <Words text="Siddharth Bond" em={['Bond']} />
          </h2>
          <p className="leader-role" data-fade>Founder Director, Ruskin Bond Foundation</p>
          <p data-fade="0.1">
            Siddharth leads the Foundation’s work to bring books, learning and
            cultural heritage to children in the hills and villages of
            Uttarakhand — so that every child has a story worth hearing.
          </p>
          <div className="leader-award" data-fade="0.15">
            <figure data-clip>
              <img src="/assets/images/award.jpg" alt="" loading="lazy" />
            </figure>
            <p>
              Recipient of the <strong>Literary &amp; Cultural Recognition</strong>{' '}
              at Dialogues Uttarakhand: Stories of the Hills.
            </p>
          </div>
          <p className="leader-links" data-fade="0.2">
            <a href="https://www.instagram.com/siddhartth.bond/" target="_blank" rel="noopener noreferrer" className="link">
              Instagram @siddhartth.bond
            </a>
            <span>officialruskinbond@gmail.com · +91 83769 31264</span>
          </p>
        </div>
      </div>
    </section>
  )
}
