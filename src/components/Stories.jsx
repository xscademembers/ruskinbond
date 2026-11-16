import { useRef, useState } from 'react'
import { gsap, useMotion } from '../lib/motion'
import { videos } from '../data/content'
import Words from './Words'
import Lightbox from './Lightbox'

const items = videos.map((v) => ({ ...v, caption: v.title }))

function StoryCard({ video, index, onOpen }) {
  const videoRef = useRef(null)

  const preview = (on) => {
    const el = videoRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    if (on) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }

  return (
    <div className="story-slot">
      <button
        type="button"
        className="story-card"
        data-cursor="Play"
        onClick={() => onOpen(index)}
        onMouseEnter={() => preview(true)}
        onMouseLeave={() => preview(false)}
        onFocus={() => preview(true)}
        onBlur={() => preview(false)}
        aria-label={`Play video: ${video.title}`}
      >
        <span className="story-media">
          <img src={video.poster} alt="" loading="lazy" />
          <video ref={videoRef} src={video.src} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
          <span className="story-play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span className="story-cap">
          <i>{String(index + 1).padStart(2, '0')} · {video.tag}</i>
          <b>{video.short}</b>
        </span>
      </button>
    </div>
  )
}

export default function Stories() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useMotion(ref, (root) => {
    gsap.fromTo(
      '.stories-marquee span',
      { xPercent: 0 },
      {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )

    const cards = gsap.utils.toArray('.story-card', root)
    gsap.from(cards, {
      y: 140,
      rotate: (i) => (i % 2 ? 4 : -4),
      autoAlpha: 0,
      duration: 1.6,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '.stories-row', start: 'top 85%' },
    })

    gsap.matchMedia().add('(min-width: 900px)', () => {
      gsap.utils.toArray('.story-slot', root).forEach((slot, i) => {
        gsap.to(slot, {
          y: i % 2 ? -60 : 40,
          ease: 'none',
          scrollTrigger: { trigger: '.stories-row', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })
  })

  return (
    <section className="stories" id="stories" ref={ref} data-dark>
      <div className="stories-marquee" aria-hidden="true">
        <span>Stories in motion · Stories in motion · Stories in motion ·</span>
      </div>
      <div className="wrap stories-head">
        <p className="eyebrow" data-fade>Stories</p>
        <h2 className="h2" data-split>
          <Words text="Stories in motion" em={['motion']} />
        </h2>
        <p className="stories-sub" data-fade="0.1">
          Talks, memories and stage moments from the Foundation’s journey through
          the hills.
        </p>
      </div>
      <div className="stories-row">
        {items.map((video, i) => (
          <StoryCard key={video.id} video={video} index={i} onOpen={setOpen} />
        ))}
      </div>
      {open !== null && (
        <Lightbox kind="video" items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
