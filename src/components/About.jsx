import { useRef } from 'react'
import { useMotion } from '../lib/motion'
import { books } from '../data/content'
import Words from './Words'

export default function About() {
  const ref = useRef(null)
  useMotion(ref)

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-media">
          <figure className="about-portrait" data-clip>
            <img
              data-parallax="8"
              src="/assets/images/portrait-2.jpg"
              alt="Author Ruskin Bond seated with a book, speaking at a literary event"
              loading="lazy"
            />
          </figure>
          <p className="caption" data-fade>Photo: Vicharam, CC BY-SA 3.0</p>
          <figure className="about-small" data-clip>
            <img src="/assets/images/childhood.jpg" alt="Ruskin with Ellen, 1938" loading="lazy" />
          </figure>
        </div>

        <div className="about-copy">
          <p className="eyebrow" data-fade>The author behind the foundation</p>
          <h2 className="h2" data-split>
            <Words text="A lifetime of small stories about a big, kind world" em={['small', 'kind']} />
          </h2>
          <p data-fade>
            Ruskin Bond was born in Kasauli in 1934 and has lived for decades in
            Landour, above Mussoorie. His gentle tales of hill villages, trees,
            trains, ghosts and growing up have made him one of India’s best-loved
            writers for readers of every age.
          </p>
          <p data-fade="0.1">
            His first novel, <em>The Room on the Roof</em>, was written when he
            was a teenager and went on to win the John Llewellyn Rhys Prize. He
            received the Sahitya Akademi Award in 1992, the Padma Shri in 1999
            and the Padma Bhushan in 2014.
          </p>
          <ul className="books">
            {books.map((book, i) => (
              <li key={book.title}>
                <i data-line />
                <span className="books-n" data-fade={i * 0.08}>{String(i + 1).padStart(2, '0')}</span>
                <b data-fade={i * 0.08}>{book.title}</b>
                <span className="books-meta" data-fade={i * 0.08}>{book.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
