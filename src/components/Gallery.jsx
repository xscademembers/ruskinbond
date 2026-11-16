import { gallery } from '../data/content'

export default function Gallery() {
  return (
    <section className="section gallery-sec" id="gallery">
      <div className="wrap">
        <p className="eyebrow reveal">Mussoorie &amp; beyond</p>
        <h2 className="reveal">A glimpse of the hills and the man</h2>
        <div className="gallery">
          {gallery.map((item, i) => (
            <figure
              key={item.src}
              className={`reveal${item.tall ? ' tall' : ''}${item.wide ? ' wide' : ''}`}
              style={{ '--d': `${i * 0.05}s` }}
            >
              <img src={item.src} alt={item.caption} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="gal-more reveal">
          <a
            href="https://www.instagram.com/ruskinbondfoundation"
            target="_blank"
            rel="noopener noreferrer"
          >
            See more on Instagram
          </a>
        </p>
      </div>
    </section>
  )
}
