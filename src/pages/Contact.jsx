import { Reveal, RollWords } from '../components/Anim.jsx'
import { contact } from '../content.js'

export default function Contact() {
  return (
    <article className="page">
      <RollWords as="h1" text="Contacto" />
      <dl className="services">
        <Reveal className="service">
          <dt>Mail</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </Reveal>
        <Reveal className="service" delay={0.1}>
          <dt>Instagram</dt>
          <dd>
            <a href={`https://www.instagram.com/${contact.instagram}/`} target="_blank" rel="noreferrer">
              {contact.instagram}
            </a>
          </dd>
        </Reveal>
        <Reveal className="service" delay={0.2}>
          <dt>Ubicación</dt>
          <dd>
            {contact.address}
            <br />
            {contact.city}
          </dd>
        </Reveal>
      </dl>
    </article>
  )
}
