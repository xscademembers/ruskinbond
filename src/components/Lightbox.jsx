import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useGSAP } from '@gsap/react'
import { gsap, lockScroll, prefersReduced } from '../lib/motion'

/**
 * Full-screen viewer shared by the gallery (images) and stories (videos).
 * `items` need `src` and `caption`; videos also carry `poster`.
 */
export default function Lightbox({ items, index, onChange, onClose, kind = 'image' }) {
  const ref = useRef(null)
  const item = items[index]
  const closeBtnRef = useRef(null)

  useEffect(() => {
    lockScroll(true)
    const opener = document.activeElement
    closeBtnRef.current?.focus()
    return () => {
      lockScroll(false)
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onChange, onClose])

  useGSAP(
    () => {
      if (prefersReduced) return
      gsap.from(ref.current, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' })
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      if (prefersReduced) return
      gsap.fromTo(
        '.lb-media',
        { clipPath: 'inset(8% 8% 8% 8% round 24px)', scale: 0.94, autoAlpha: 0 },
        { clipPath: 'inset(0% 0% 0% 0% round 18px)', scale: 1, autoAlpha: 1, duration: 1.1, ease: 'expo.out' },
      )
      gsap.from('.lb-caption > *', { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'power3.out', delay: 0.2 })
    },
    { scope: ref, dependencies: [index] },
  )

  return createPortal(
    <div
      className={`lightbox lightbox-${kind}`}
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="lb-backdrop"
        style={{ backgroundImage: `url(${kind === 'video' ? item.poster : item.src})` }}
        aria-hidden="true"
      />
      <div className="lb-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="lb-media" key={item.src}>
          {kind === 'video' ? (
            <video src={item.src} poster={item.poster} controls autoPlay playsInline />
          ) : (
            <img src={item.src} alt={item.caption} />
          )}
        </div>
        <div className="lb-caption">
          {item.tag && <span>{item.tag}</span>}
          <p>{item.caption}</p>
          <small>
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </small>
        </div>
      </div>
      <button className="lb-btn lb-close" type="button" onClick={onClose} ref={closeBtnRef} aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
      <button
        className="lb-btn lb-prev"
        type="button"
        aria-label="Previous"
        onClick={() => onChange((index - 1 + items.length) % items.length)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        className="lb-btn lb-next"
        type="button"
        aria-label="Next"
        onClick={() => onChange((index + 1) % items.length)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>,
    document.body,
  )
}
