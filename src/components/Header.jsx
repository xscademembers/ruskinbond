import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, lockScroll, prefersReduced } from '../lib/motion'
import { navLinks } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        header.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 400)
      },
    })

    const active = new Set()
    const darkTriggers = Array.from(document.querySelectorAll('[data-dark]')).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40px',
        end: 'bottom 40px',
        onToggle: (self) => {
          if (self.isActive) active.add(section)
          else active.delete(section)
          header.classList.toggle('on-dark', active.size > 0)
        },
      }),
    )

    return () => {
      st.kill()
      darkTriggers.forEach((t) => t.kill())
    }
  }, [])

  useGSAP(
    () => {
      tlRef.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { visibility: 'visible' })
        .fromTo(
          menuRef.current,
          { clipPath: 'circle(0% at 100% 0%)' },
          { clipPath: 'circle(150% at 100% 0%)', duration: 1.1, ease: 'expo.inOut' },
        )
        .from('.menu-links .wi', { yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.05 }, 0.45)
        .from('.menu-media', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.35)
        .from('.menu-media img', { scale: 1.4, duration: 1.6, ease: 'expo.out' }, 0.5)
        .from('.menu-foot > *', { autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.8 }, 0.7)
    },
    { scope: menuRef },
  )

  useEffect(() => {
    const tl = tlRef.current
    if (open) {
      lockScroll(true)
      if (prefersReduced) tl.progress(1)
      else tl.timeScale(1).play()
    } else if (tl.progress() > 0) {
      lockScroll(false)
      if (prefersReduced) tl.progress(0)
      else tl.timeScale(1.6).reverse()
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav${open ? ' is-open' : ''}`} ref={headerRef}>
        <a className="brand" href="#top" onClick={close} aria-label="Ruskin Bond Foundation, back to top">
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18.5" />
            <path d="M9 28 L20 10 L31 28" />
            <path d="M15 28 L20 19.5 L25 28" />
          </svg>
          <span>Ruskin Bond Foundation</span>
        </a>
        <div className="nav-right">
          <a className="nav-support" href="#donate" onClick={close}>
            Support us
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
            data-magnetic
          >
            <span className="menu-btn-label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-btn-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div className="menu" id="menu" ref={menuRef} aria-hidden={!open} inert={!open}>
        <div className="menu-grid">
          <nav className="menu-links" aria-label="Main">
            {navLinks.map((link, i) => (
              <a key={link.href} href={link.href} onClick={close}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                <span className="w">
                  <span className="wi">{link.label}</span>
                </span>
              </a>
            ))}
          </nav>
          <figure className="menu-media">
            <img src="/assets/images/hills-3.jpg" alt="" />
            <figcaption>Nature walk, Mussoorie</figcaption>
          </figure>
        </div>
        <div className="menu-foot">
          <a href="mailto:officialruskinbond@gmail.com">officialruskinbond@gmail.com</a>
          <a href="tel:+918376931264">+91 83769 31264</a>
          <a href="https://www.instagram.com/ruskinbondfoundation" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span>Mussoorie, Uttarakhand</span>
        </div>
      </div>
    </>
  )
}
