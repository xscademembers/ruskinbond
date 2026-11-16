import { useEffect, useRef, useState } from 'react'
import { videos } from '../data/content'

export default function Stories() {
  const [active, setActive] = useState(videos[0])
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.load()
    setPlaying(false)
  }, [active.id])

  const playFeature = async () => {
    const el = videoRef.current
    if (!el) return
    try {
      await el.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const scrollRow = (dir) => {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  return (
    <section className="section watch" id="stories">
      <div className="wrap watch-head">
        <p className="eyebrow reveal">Stories</p>
        <h2 className="reveal">Stories in motion</h2>
        <p className="sub reveal">
          Talks, memories and stage moments from the Foundation’s journey through
          the hills.
        </p>
      </div>

      <div className="story-stage reveal">
        <div className="story-feature">
          <video
            ref={videoRef}
            key={active.id}
            playsInline
            preload="metadata"
            poster={active.poster}
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source src={active.src} type="video/mp4" />
          </video>
          <button
            className={`play-fab${playing ? ' is-hidden' : ''}`}
            type="button"
            aria-label="Play featured video"
            onClick={playFeature}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="story-meta">
            <span>{active.tag}</span>
            <h3>{active.title}</h3>
          </div>
        </div>
      </div>

      <div className="vrow-wrap">
        <button className="vnav prev" type="button" aria-label="Previous videos" onClick={() => scrollRow(-1)}>
          ‹
        </button>
        <div className="vrow" ref={rowRef} tabIndex={0} aria-label="Video stories, scroll sideways">
          {videos.map((video) => (
            <button
              key={video.id}
              className={`vcard${active.id === video.id ? ' is-active' : ''}`}
              type="button"
              onClick={() => setActive(video)}
              aria-pressed={active.id === video.id}
            >
              <img src={video.poster} alt="" loading="lazy" />
              <span className="vplay" aria-hidden="true" />
              <span className="vcap">
                <i>{video.tag}</i>
                <b>{video.short}</b>
              </span>
            </button>
          ))}
        </div>
        <button className="vnav next" type="button" aria-label="Next videos" onClick={() => scrollRow(1)}>
          ›
        </button>
      </div>
    </section>
  )
}
