export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <img
          src="/assets/images/hills-1.jpg"
          alt="Misty hills and tower above Mussoorie, Uttarakhand"
          fetchPriority="high"
        />
      </div>
      <div className="hero-veil" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-content">
        <p className="brand-hero reveal is-in">Ruskin Bond Foundation</p>
        <h1 className="reveal is-in" style={{ '--d': '0.08s' }}>
          Every child has a <em>story</em> worth hearing.
        </h1>
        <p className="lead reveal is-in" style={{ '--d': '0.16s' }}>
          We open doors to books, learning and heritage for children in the hills
          and villages of Uttarakhand.
        </p>
        <div className="cta reveal is-in" style={{ '--d': '0.24s' }}>
          <a className="btn" href="#donate">
            Support the Foundation
          </a>
          <a className="btn btn-ghost" href="#work">
            See our work
          </a>
        </div>
      </div>
      <div className="hero-edge" aria-hidden="true" />
    </section>
  )
}
