import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={close}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M10 28 L20 10 L30 28" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 28 L20 18 L26 28" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <span className="brand-text">Ruskin Bond Foundation</span>
      </a>

      <button
        className="burger"
        type="button"
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <nav id="menu" className={`menu${open ? ' is-open' : ''}`} aria-label="Main">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className="btn" href="#donate" onClick={close}>
          Support us
        </a>
      </nav>
    </header>
  )
}
