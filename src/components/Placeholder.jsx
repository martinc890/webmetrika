// Imagen de ejemplo: reemplazar por la foto real pasando `src`.
export default function Placeholder({ src, alt = '', ratio = '4 / 3', label = 'Imagen de ejemplo' }) {
  if (src) {
    return <img className="photo" src={src} alt={alt} style={{ aspectRatio: ratio }} />
  }
  return (
    <div className="ph" style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}
