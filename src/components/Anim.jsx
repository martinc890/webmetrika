import { useInView } from '../hooks.js'

const words = (text) => String(text).trim().split(/\s+/)

// Título cuyas palabras suben desde una máscara, una tras otra.
export function RollWords({ text, as: Tag = 'h2', className = '', ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <Tag ref={ref} className={`roll ${inView ? 'in' : ''} ${className}`} aria-label={text} {...rest}>
      {words(text).map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="rw">
            <span className="rw-in" style={{ '--i': i }}>
              {w}
            </span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}

// Párrafo cuyas palabras aparecen en cadena al entrar en pantalla.
export function RevealWords({ text, as: Tag = 'p', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <Tag ref={ref} className={`words ${inView ? 'in' : ''} ${className}`} aria-label={text}>
      {words(text).map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w" style={{ '--i': Math.min(i, 45) }}>
            {w}
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}

// Bloque que se descubre al entrar en pantalla.
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  return (
    <Tag ref={ref} className={`rv ${inView ? 'in' : ''} ${className}`} style={{ '--delay': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

// Varios párrafos que aparecen de arriba abajo, palabra por palabra, como un solo barrido (una sola vez).
export function RevealParagraphs({ paragraphs }) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const lists = paragraphs.map(words)
  const starts = lists.map((_, i) => lists.slice(0, i).reduce((n, l) => n + l.length, 0))

  return (
    <div ref={ref} className={`scrub words ${inView ? 'in' : ''}`}>
      {lists.map((list, pi) => (
        <p key={pi} aria-label={paragraphs[pi]}>
          {list.map((w, wi) => (
            <span key={wi} aria-hidden="true">
              <span className="w" style={{ '--i': starts[pi] + wi }}>
                {w}
              </span>{' '}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
