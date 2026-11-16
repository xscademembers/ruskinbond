export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow reveal">Get in touch</p>
          <h2 className="reveal">Volunteer, partner or just say hello</h2>
          <address className="reveal">
            <p>
              <strong>Email</strong>
              <a href="mailto:officialruskinbond@gmail.com">
                officialruskinbond@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone</strong>
              <a href="tel:+918376931264">+91 83769 31264</a>
            </p>
            <p>
              <strong>Location</strong>
              Mussoorie, Uttarakhand, India
            </p>
            <p>
              <strong>Instagram</strong>
              <a
                href="https://www.instagram.com/ruskinbondfoundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ruskinbondfoundation
              </a>
            </p>
          </address>
        </div>
        <form
          className="form reveal"
          action="mailto:officialruskinbond@gmail.com"
          method="post"
          encType="text/plain"
        >
          <label>
            Your name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Your email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="btn btn-dark" type="submit">
            Send message
          </button>
          <p className="form-note">
            Messages are sent by email. You can also write to
            officialruskinbond@gmail.com.
          </p>
        </form>
      </div>
    </section>
  )
}
