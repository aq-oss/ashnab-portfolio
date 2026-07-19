import { useEffect, useRef } from 'react'

export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Reveal-on-scroll: adds .in when the element enters the viewport. */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (REDUCED) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/* Count-up number when scrolled into view. */
export function useCountUp(to, suffix = '') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (REDUCED) { el.textContent = to + suffix; return }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return
        let start = null
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min(1, (ts - start) / 900)
          el.textContent = Math.floor(p * to) + (p === 1 ? suffix : '')
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])
  return ref
}

/* Magnetic hover pull for buttons. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [strength])
  return ref
}

/* 3D tilt + cursor-follow spotlight for cards. */
export function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', px * 100 + '%')
      el.style.setProperty('--my', py * 100 + '%')
      el.style.transform = `perspective(800px) rotateY(${(px - 0.5) * 6}deg) rotateX(${(0.5 - py) * 6}deg) translateY(-4px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [])
  return ref
}

/* Per-route document title + description. */
export function useMeta(title, description) {
  useEffect(() => {
    document.title = title
    const m = document.querySelector('meta[name="description"]')
    if (m && description) m.setAttribute('content', description)
  }, [title, description])
}
