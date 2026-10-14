import { useEffect, useRef, useState } from 'react'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Marca `inView` cuando el elemento entra en pantalla (una sola vez por defecto).
export function useInView({ threshold = 0.2, once = true, rootMargin = '0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => reducedMotion() || !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}

// Activa la animación al pasar el mouse (PC) o al ver el elemento al hacer scroll (celular).
export function useActivate() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (canHover()) {
      const on = () => setActive(true)
      const off = () => setActive(false)
      el.addEventListener('pointerenter', on)
      el.addEventListener('pointerleave', off)
      el.addEventListener('focusin', on)
      el.addEventListener('focusout', off)
      return () => {
        el.removeEventListener('pointerenter', on)
        el.removeEventListener('pointerleave', off)
        el.removeEventListener('focusin', on)
        el.removeEventListener('focusout', off)
      }
    }

    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, active]
}
