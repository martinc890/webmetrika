import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, RollWords, RevealParagraphs } from '../components/Anim.jsx'
import ServiceIcon from '../components/ServiceIcons.jsx'
import aboutImg from '../assets/quienes-somos.webp'
import { areas } from '../content.js'
import { reducedMotion, useActivate } from '../hooks.js'

// Texto de ejemplo: reemplazar por el texto real.
const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
]

function About() {
  return (
    <section className="about" aria-labelledby="about-t">
      <img className="about-img" src={aboutImg} alt="" />
      <div className="about-copy">
        <div className="about-text">
          <RollWords as="h1" id="about-t" text="Quiénes somos" />
          <RevealParagraphs paragraphs={LOREM} />
        </div>
      </div>
    </section>
  )
}

function ServiceTile({ area, index }) {
  const [ref, active] = useActivate()
  const panel = useRef(null)

  // Inclina el mosaico y mueve el brillo hacia donde está el mouse.
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reducedMotion()) return
    const p = panel.current
    const r = p.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    p.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
    p.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
    p.style.setProperty('--rx', `${((0.5 - py) * 8).toFixed(2)}deg`)
    p.style.setProperty('--ry', `${((px - 0.5) * 10).toFixed(2)}deg`)
  }
  const onLeave = () => {
    const p = panel.current
    p.style.setProperty('--rx', '0deg')
    p.style.setProperty('--ry', '0deg')
  }

  return (
    <Reveal as="li" delay={index * 0.12}>
      <Link
        ref={ref}
        className={`tile ${active ? 'is-active' : ''}`}
        to={`/servicios/${area.id}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className="tile-panel" ref={panel}>
          <span className="tile-icon">
            <ServiceIcon id={area.id} />
          </span>
        </span>
        <span className="tile-title">{area.title}</span>
      </Link>
    </Reveal>
  )
}

export default function Home() {
  return (
    <>
      <About />
      <section className="services-home" id="servicios" aria-labelledby="servicios-t">
        <RollWords id="servicios-t" text="Nuestros servicios" />
        <ul className="tiles">
          {areas.map((a, i) => (
            <ServiceTile key={a.id} area={a} index={i} />
          ))}
        </ul>
      </section>
    </>
  )
}
