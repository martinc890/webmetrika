import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal, RollWords, RevealWords } from '../components/Anim.jsx'
import IconStage from '../components/IconStage.jsx'
import { areas } from '../content.js'

export default function AreaPage() {
  const { id } = useParams()
  const area = areas.find((a) => a.id === id)
  if (!area) return <Navigate to="/" replace />

  return (
    <article className="page">
      <Link className="back" to="/#servicios">
        Nuestros servicios
      </Link>
      <RollWords as="h1" text={area.title} />
      <Reveal>
        <IconStage id={area.id} />
      </Reveal>
      <dl className="services">
        {area.items.map((it) => (
          <Reveal className="service" key={it.name}>
            <dt>{it.name}</dt>
            <RevealWords as="dd" text={it.text} />
          </Reveal>
        ))}
      </dl>
      <nav className="others" aria-label="Otros servicios">
        {areas
          .filter((a) => a.id !== area.id)
          .map((a) => (
            <Link key={a.id} to={`/servicios/${a.id}`}>
              {a.title}
            </Link>
          ))}
      </nav>
    </article>
  )
}
