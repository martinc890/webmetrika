// Iconos animados. Se ven completos en reposo y se vuelven a dibujar cuando el mosaico está activo
// (mouse encima en PC, o visible en pantalla en celular). Las animaciones están en index.css.

const base = {
  className: 'svc-icon',
  viewBox: '0 0 120 120',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

// Investigación y análisis: encuesta con casillas y barras de resultados.
function Poll() {
  const rows = [
    { y: 34, w: 52, main: true },
    { y: 60, w: 30 },
    { y: 86, w: 40 },
  ]
  return (
    <svg {...base}>
      <rect className="ic-frame" x="12" y="12" width="96" height="96" rx="8" />
      {rows.map((r, k) => (
        <g key={r.y} style={{ '--k': k }}>
          <rect className="ic-box" x="22" y={r.y - 7} width="14" height="14" rx="3" />
          <path className="ic-tick" d={`M25 ${r.y} L29 ${r.y + 4} L34 ${r.y - 3}`} />
          <rect className={`ic-bar ${r.main ? 'ic-bar--main' : ''}`} x="44" y={r.y - 5} width={r.w} height="10" rx="3" />
        </g>
      ))}
    </svg>
  )
}

// Campañas electorales: una boleta cae en la urna y se marca el voto.
function Ballot() {
  return (
    <svg {...base}>
      <defs>
        <clipPath id="ballot-clip">
          <rect x="0" y="0" width="120" height="58" />
        </clipPath>
      </defs>
      <g clipPath="url(#ballot-clip)">
        <g className="ic-ballot">
          <rect x="42" y="12" width="36" height="46" rx="3" />
          <path d="M50 24 H70 M50 32 H70" />
          <path d="M50 44 L55 49 L68 38" />
        </g>
      </g>
      <rect x="20" y="58" width="80" height="48" rx="5" />
      <path className="ic-slot" d="M40 58 H80" strokeWidth="7" />
      <path className="ic-vote" d="M44 82 L56 94 L78 70" />
    </svg>
  )
}

// Publicidad: megáfono con ondas de sonido.
function Megaphone() {
  return (
    <svg {...base}>
      <g className="ic-mega">
        <path d="M34 48 L74 30 V90 L34 72 Z" />
        <rect x="18" y="48" width="16" height="24" rx="3" />
        <path d="M40 74 L44 94 H54 L52 82" />
      </g>
      <path className="ic-wave" style={{ '--k': 0 }} d="M84 50 A14 14 0 0 1 84 70" />
      <path className="ic-wave" style={{ '--k': 1 }} d="M91 43 A24 24 0 0 1 91 77" />
      <path className="ic-wave" style={{ '--k': 2 }} d="M98 36 A34 34 0 0 1 98 84" />
    </svg>
  )
}

// Gestión gubernamental: edificio con columnas y bandera.
function Building() {
  return (
    <svg {...base}>
      <path className="ic-pole" d="M60 22 V6" />
      <path className="ic-flag" d="M60 6 L78 11 L60 16 Z" fill="currentColor" />
      <path className="ic-ped" d="M16 46 L60 22 L104 46 Z" />
      <path className="ic-ent" d="M18 52 H102" />
      {[25, 45, 65, 85].map((x, k) => (
        <rect className="ic-col" style={{ '--k': k }} key={x} x={x} y="58" width="10" height="30" rx="1.5" />
      ))}
      <path d="M18 93 H102 M12 101 H108" />
    </svg>
  )
}

const icons = { investigacion: Poll, campanas: Ballot, publicidad: Megaphone, gobierno: Building }

export default function ServiceIcon({ id }) {
  const Icon = icons[id]
  return Icon ? <Icon /> : null
}
