import { useRef } from 'react'
import { useMotion } from '../lib/motion'
import { press } from '../data/content'
import Words from './Words'

export default function Press() {
  const ref = useRef(null)
  useMotion(ref)

  return (
    <section className="section press" id="press" ref={ref}>
      <div className="wrap">
        <div className="press-head">
          <p className="eyebrow" data-fade>In the press</p>
          <h2 className="h2" data-split>
            <Words text="Read about the Foundation in the news" em={['news']} />
          </h2>
        </div>
        <ul className="press-list">
          {press.map((item, i) => (
            <li key={item.href}>
              <i className="press-rule" data-line aria-hidden="true" />
              <a className="press-item" href={item.href} target="_blank" rel="noopener noreferrer" data-fade={i * 0.04}>
                <span className="press-src">{item.src}</span>
                <span className="press-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </span>
                <span className="press-go">
                  <span>{item.cta}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
