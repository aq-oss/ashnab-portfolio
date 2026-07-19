import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useReveal, useMagnetic, REDUCED } from '../hooks/hooks'

/* ---------- Reveal wrapper ---------- */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  const d = delay ? ` d${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal${d} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* ---------- Magnetic wrapper (for pills/CTAs) ---------- */
export function Magnetic({ as: Tag = 'span', className = '', children, ...rest }) {
  const ref = useMagnetic()
  return (
    <Tag ref={ref} className={`inline-block ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* ---------- Section header (rule + numbered label + accent dot) ---------- */
export function SectionHead({ num, label }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal flex flex-col gap-[18px]">
      <div className="sec-rule" />
      <div className="flex items-center justify-between">
        <span className="eyebrow">{num} / {label}</span>
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
      </div>
    </div>
  )
}

/* ---------- Custom cursor (dot + easing ring) ---------- */
export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (REDUCED || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => { if (e.target.closest('a,button') && ring.current) ring.current.dataset.hover = '1' }
    const out = (e) => { if (e.target.closest('a,button') && ring.current) delete ring.current.dataset.hover }
    addEventListener('mousemove', onMove, { passive: true })
    addEventListener('mouseover', over)
    addEventListener('mouseout', out)
    raf = requestAnimationFrame(loop)
    return () => { removeEventListener('mousemove', onMove); removeEventListener('mouseover', over); removeEventListener('mouseout', out); cancelAnimationFrame(raf) }
  }, [])
  if (typeof window !== 'undefined' && (REDUCED || !window.matchMedia('(hover:hover) and (pointer:fine)').matches)) return null
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-accent" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[999] h-9 w-9 rounded-full border-[1.5px] border-accent/40 transition-[width,height,background-color,border-color] duration-200 data-[hover]:h-14 data-[hover]:w-14 data-[hover]:border-transparent data-[hover]:bg-accent/10" />
    </>
  )
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    let tick = false
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight
        if (bar.current) bar.current.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%'
        tick = false
      })
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div aria-hidden className="fixed left-0 top-0 z-[80] h-0.5 w-full">
      <span ref={bar} className="block h-full w-0 bg-grad" />
    </div>
  )
}

/* ---------- Shared nav (fixed, glass on scroll, hide on scroll-down) ---------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)
  const { pathname } = useLocation()
  const home = pathname === '/'
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY
      setScrolled(y > 40)
      setHidden(y > last.current && y > 400)
      last.current = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  const anchor = (hash, label) =>
    home ? (
      <a key={hash} href={`#${hash}`} className="relative text-sm font-medium text-ink-2 transition-colors hover:text-ink max-md:hidden">{label}</a>
    ) : (
      <Link key={hash} to={`/#${hash}`} className="relative text-sm font-medium text-ink-2 transition-colors hover:text-ink max-md:hidden">{label}</Link>
    )
  return (
    <header
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between wrap transition-all duration-500 ease-quart
        ${scrolled ? 'border-b border-line-2 bg-white/[.62] py-4 backdrop-blur-[18px] backdrop-saturate-150' : 'border-b border-transparent py-6 xl:py-8'}
        ${hidden ? '-translate-y-[110%]' : ''}`}
    >
      <Link to="/" className="font-display text-2xl font-bold">aj<span className="text-accent">.</span></Link>
      <nav className="flex items-center gap-7 xl:gap-9">
        {anchor('work', 'Work')}
        {anchor('about', 'About')}
        {anchor('process', 'Process')}
        {anchor('contact', 'Contact')}
        <a href="mailto:ashnabjamshaid@gmail.com" className="rounded-full bg-ink px-[18px] py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent">Let's talk</a>
      </nav>
    </header>
  )
}

/* ---------- Device mockups ---------- */
export function PhoneMock({ src, alt, className = '' }) {
  return (
    <div className={`rounded-[40px] bg-[#16181d] p-3 shadow-phone ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[#e9e9e6]">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute left-1/2 top-3 z-[3] h-[18px] w-20 -translate-x-1/2 rounded-[9px] bg-[#16181d]" />
      </div>
    </div>
  )
}

export function BrowserMock({ src, alt, mid = false, className = '', imgClass = '' }) {
  return (
    <div className={`overflow-hidden rounded-[14px] border border-line-2 bg-white shadow-browser ${className}`}>
      <div className="flex h-[9.5%] min-h-6 items-center gap-2 bg-[#f0f0ee] pl-[18px]">
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#bfbfbd]" />)}
      </div>
      <img src={src} alt={alt} loading="lazy" className={`h-[90.5%] w-full object-cover ${mid ? 'object-[center_top]' : 'object-top'} ${imgClass}`} />
    </div>
  )
}
