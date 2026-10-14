import { useState } from 'react'
import { useInView } from '../hooks.js'
import ServiceIcon from './ServiceIcons.jsx'

// Escenario con el ícono animado del servicio: se anima al verlo y se repite al pasar el mouse.
export default function IconStage({ id }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const [run, setRun] = useState(0)

  return (
    <div
      ref={ref}
      className={`stage ${inView ? 'is-active' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setRun((n) => n + 1)}
    >
      <div className="stage-icon">
        <ServiceIcon key={run} id={id} />
      </div>
    </div>
  )
}
