export default function Band() {
  return (
    <section className="band" aria-label="From the hills">
      <div
        className="band-bg"
        style={{ backgroundImage: 'url(/assets/images/bazaar.jpg)' }}
      />
      <div className="band-shade" />
      <div className="wrap band-inner">
        <p className="eyebrow reveal">From the hills</p>
        <h2 className="reveal">Where stories begin</h2>
        <p className="reveal">
          Landour’s winding lanes, deodar forests and tea-shop corners shaped the
          stories millions of readers love. The Foundation carries that spirit to
          children who live beyond the bookshops.
        </p>
        <a
          className="btn btn-ghost reveal"
          href="https://www.instagram.com/ruskinbondfoundation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  )
}
