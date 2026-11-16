import { mission } from '../data/content'

export default function Mission() {
  return (
    <section className="mission" id="mission" aria-label="Mission">
      <div className="wrap">
        <ul className="mission-list">
          {mission.map((item, i) => (
            <li key={item.title} className="reveal" style={{ '--d': `${i * 0.08}s` }}>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
