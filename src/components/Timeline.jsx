import { milestones } from '../data/content'

export default function Timeline() {
  return (
    <section className="section timeline-sec" aria-label="Milestones">
      <div className="wrap timeline-wrap">
        <div className="timeline-head">
          <p className="eyebrow reveal">A life in books</p>
          <h2 className="reveal">Milestones</h2>
        </div>
        <ol className="timeline">
          {milestones.map((item, i) => (
            <li key={item.year} className="reveal" style={{ '--d': `${i * 0.06}s` }}>
              <time>{item.year}</time>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
