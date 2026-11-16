import { books } from '../data/content'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <figure className="portrait reveal">
          <img
            src="/assets/images/portrait-2.jpg"
            alt="Author Ruskin Bond seated with a book, speaking at a literary event"
            loading="lazy"
          />
          <figcaption>Photo: Vicharam, CC BY-SA 3.0</figcaption>
        </figure>
        <div>
          <p className="eyebrow reveal">The author behind the foundation</p>
          <h2 className="reveal">A lifetime of small stories about a big, kind world</h2>
          <p className="reveal">
            Ruskin Bond was born in Kasauli in 1934 and has lived for decades in
            Landour, above Mussoorie. His gentle tales of hill villages, trees,
            trains, ghosts and growing up have made him one of India’s best-loved
            writers for readers of every age.
          </p>
          <p className="reveal">
            His first novel, <em>The Room on the Roof</em>, was written when he
            was a teenager and went on to win the John Llewellyn Rhys Prize. He
            received the Sahitya Akademi Award in 1992, the Padma Shri in 1999
            and the Padma Bhushan in 2014.
          </p>
          <ul className="books">
            {books.map((book, i) => (
              <li key={book.title} className="reveal" style={{ '--d': `${i * 0.06}s` }}>
                <b>{book.title}</b>
                <span>{book.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
