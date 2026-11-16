import { useRef } from 'react'
import { gsap, useMotion } from '../lib/motion'
import Words from './Words'

export default function Support() {
  const ref = useRef(null)

  useMotion(ref, (root) => {
    gsap.fromTo(
      '.donate-bg img',
      { scale: 1.3 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: true },
      },
    )
  })

  return (
    <section className="donate" id="donate" ref={ref} data-dark>
      <div className="donate-bg" aria-hidden="true">
        <img src="/assets/images/hills-4.jpg" alt="" loading="lazy" />
      </div>
      <div className="donate-veil" aria-hidden="true" />
      <div className="donate-inner">
        <p className="eyebrow" data-fade>Support the Foundation</p>
        <h2 className="display" data-split>
          <Words text="Help a child hear their own story" em={['own', 'story']} />
        </h2>
        <p className="donate-text" data-fade="0.1">
          Online donations are being set up. To give or partner with us today, get
          in touch and the team will share the current ways to contribute.
        </p>
        <div className="donate-actions" data-fade="0.2">
          <a className="btn btn-light" href="mailto:officialruskinbond@gmail.com" data-magnetic>
            <span>Email us to donate</span>
          </a>
          <a className="btn btn-outline-light" href="tel:+918376931264" data-magnetic>
            <span>Call us</span>
          </a>
        </div>
        <p className="donate-contact" data-fade="0.3">
          officialruskinbond@gmail.com · +91 83769 31264
        </p>
      </div>
    </section>
  )
}
