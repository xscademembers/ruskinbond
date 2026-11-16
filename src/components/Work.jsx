import { work } from '../data/content'

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <p className="eyebrow reveal">What we do</p>
        <h2 className="reveal work-title">Five ways we help children and the hills they call home</h2>
        <div className="work-rail">
          {work.map((item, i) => (
            <article
              key={item.n}
              className="work-item reveal"
              style={{ '--d': `${i * 0.06}s` }}
            >
              <div
                className="work-visual"
                style={{ backgroundImage: `url(${item.image})` }}
                role="img"
                aria-label=""
              />
              <div className="work-copy">
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
