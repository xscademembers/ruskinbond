import { useRef } from 'react'
import { useMotion } from '../lib/motion'
import Words from './Words'

const details = [
  { label: 'Email', value: 'officialruskinbond@gmail.com', href: 'mailto:officialruskinbond@gmail.com' },
  { label: 'Phone', value: '+91 83769 31264', href: 'tel:+918376931264' },
  { label: 'Location', value: 'Mussoorie, Uttarakhand, India' },
  { label: 'Instagram', value: '@ruskinbondfoundation', href: 'https://www.instagram.com/ruskinbondfoundation', external: true },
]

export default function Contact() {
  const ref = useRef(null)
  useMotion(ref)

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow" data-fade>Get in touch</p>
          <h2 className="h2" data-split>
            <Words text="Volunteer, partner or just say hello" em={['hello']} />
          </h2>
          <dl className="contact-list">
            {details.map((d, i) => (
              <div key={d.label} data-fade={i * 0.06}>
                <i data-line aria-hidden="true" />
                <dt>{d.label}</dt>
                <dd>
                  {d.href ? (
                    <a
                      className="link"
                      href={d.href}
                      {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <form
          className="form"
          action="mailto:officialruskinbond@gmail.com"
          method="post"
          encType="text/plain"
          data-fade="0.15"
        >
          <label className="field">
            <input name="name" type="text" required autoComplete="name" placeholder=" " />
            <span>Your name</span>
          </label>
          <label className="field">
            <input name="email" type="email" required autoComplete="email" placeholder=" " />
            <span>Your email</span>
          </label>
          <label className="field">
            <textarea name="message" rows="4" required placeholder=" " />
            <span>Message</span>
          </label>
          <button className="btn btn-dark" type="submit" data-magnetic>
            <span>Send message</span>
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
