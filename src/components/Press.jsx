import { press } from '../data/content'

export default function Press() {
  return (
    <section className="section press" id="press">
      <div className="wrap">
        <p className="eyebrow reveal">In the press</p>
        <h2 className="reveal">Read about the Foundation in the news</h2>
        <div className="press-list">
          {press.map((item, i) => (
            <a
              key={item.href}
              className="press-item reveal"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--d': `${i * 0.05}s` }}
            >
              <span className="press-src">{item.src}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="press-go">{item.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
