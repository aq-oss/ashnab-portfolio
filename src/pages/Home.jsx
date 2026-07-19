import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Magnetic, PhoneMock, BrowserMock } from '../components/ui'
import { useCountUp, useTilt, useMeta, REDUCED } from '../hooks/hooks'
import { projects, experience, skills, process, tools, education } from '../data/content'

/* ---------------- small local pieces ---------------- */

function Stat({ to, suffix = '', label }) {
  const n = useCountUp(to, suffix)
  return (
    <div>
      <div ref={n} className="font-display text-[34px] font-medium">0</div>
      <div className="mt-1 max-w-[120px] text-[13px] text-ink-3">{label}</div>
    </div>
  )
}

function SkillCard({ n, t, d, delay }) {
  const ref = useTilt()
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="group relative flex min-h-0 flex-col gap-3.5 overflow-hidden rounded-md border border-line-2 bg-surface p-6 transition duration-300 ease-quart will-change-transform hover:border-accent/35 hover:shadow-[0_22px_48px_-26px_rgba(37,71,244,.4)] lg:min-h-[200px]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(150%_100%_at_var(--mx,50%)_var(--my,0%),rgba(37,71,244,.12),transparent_55%)]" />
        <span className="text-xs font-semibold tracking-[.08em] text-accent">{n}</span>
        <span className="font-display text-[19px] font-medium leading-tight">{t}</span>
        <span className="text-[13.5px] leading-relaxed text-ink-2">{d}</span>
      </div>
    </Reveal>
  )
}

function MetaRow({ k, v, dark }) {
  return (
    <div className={`mb-3 flex justify-between border-b pb-3 text-[13px] last:mb-0 last:border-b-0 last:pb-0 ${dark ? 'border-white/10' : 'border-line'}`}>
      <span className={dark ? 'text-white/40' : 'text-ink-3'}>{k}</span>
      <span className={`font-medium ${dark ? 'text-white/90' : ''}`}>{v}</span>
    </div>
  )
}

/* -------- stacked sticky project cards (layered scroll) -------- */
function ProjectStack() {
  const stackRef = useRef(null)
  const cardRefs = useRef([])
  const N = projects.length

  useEffect(() => {
    if (REDUCED) return
    const isDesktop = () => matchMedia('(min-width: 981px)').matches
    let tick = false
    const update = () => {
      const stack = stackRef.current
      if (!stack || !isDesktop()) {
        cardRefs.current.forEach((c) => {
          if (!c) return
          c.style.transform = ''; c.style.opacity = ''; c.style.zIndex = ''; c.style.pointerEvents = ''
        })
        return
      }
      const range = stack.offsetHeight - innerHeight
      const t = range > 0 ? Math.min(1, Math.max(0, -stack.getBoundingClientRect().top / range)) : 0
      const cf = t * (N - 1)
      cardRefs.current.forEach((c, k) => {
        if (!c) return
        const d = k - cf
        let y, op, sc
        if (d >= 1) { y = 101; op = 0; sc = 1 }
        else if (d > 0) { y = d * 100; op = 1; sc = 1 }
        else if (d > -1) { y = 0; op = 1 + d; sc = 1 + d * 0.05 }
        else { y = 0; op = 0; sc = 0.95 }
        c.style.transform = `translate3d(0,${y}%,0) scale(${sc})`
        c.style.opacity = op.toFixed(3)
        c.style.zIndex = String(k + 1)
        c.style.pointerEvents = op > 0.5 ? 'auto' : 'none'
        const mock = c.querySelector('[data-mock]')
        const ghost = c.querySelector('[data-ghost]')
        if (mock) mock.style.transform = `translateY(${-d * 20}px)`
        if (ghost) ghost.style.transform = `translateY(${-d * 44}px)`
      })
    }
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => { update(); tick = false })
    }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    update()
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }, [N])

  return (
    <div ref={stackRef} className="relative lg:h-[calc(100vh+340vh)]">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        {projects.map((p, i) => (
          <article
            key={p.num}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`relative overflow-hidden pad-landing lg:absolute lg:inset-0 lg:flex lg:h-screen lg:items-center lg:py-0 lg:will-change-transform ${p.bg} ${p.dark ? 'text-white' : ''}`}
          >
            <span className={`absolute right-10 top-8 z-[3] text-[13px] font-medium tracking-[.3em] max-lg:hidden ${p.dark ? 'text-white/50' : 'text-ink-3'}`}>
              {p.num} / 05
            </span>
            <span
              data-ghost
              aria-hidden
              className={`pointer-events-none absolute -right-[2%] top-[6%] z-0 font-display text-[clamp(180px,30vw,440px)] font-medium leading-none tracking-[-.02em] will-change-transform ${p.dark ? 'text-white/5' : 'text-ink/5'}`}
            >
              {p.num}
            </span>
            <div className="wrap relative z-[2] grid w-full items-center gap-9 lg:grid-cols-[440px_1fr] lg:gap-[60px]">
              <div>
                <Reveal className="flex items-center gap-4">
                  <span className="font-display text-[clamp(56px,7vw,88px)] font-medium leading-none tracking-[-.02em]">{p.num}</span>
                  <span className="h-0.5 w-[60px] bg-accent" />
                </Reveal>
                <Reveal delay={1} as="h3" className="mt-6 font-display text-[clamp(30px,3.6vw,46px)] font-medium leading-[1.1] tracking-[-.015em]">
                  {p.title}
                </Reveal>
                <Reveal delay={2} className="mt-7">
                  <MetaRow k="Industry" v={p.industry} dark={p.dark} />
                  <MetaRow k="Role" v={p.role} dark={p.dark} />
                  <MetaRow k="Duration" v={p.duration} dark={p.dark} />
                </Reveal>
                <Reveal delay={2} as="p" className={`mt-6 text-[15.5px] leading-relaxed ${p.dark ? 'text-white/65' : 'text-ink-2'}`}>
                  {p.summary}
                </Reveal>
                <Reveal delay={3} className="mt-8">
                  <Magnetic>
                    {p.caseStudy ? (
                      <Link to={p.caseStudy} className={`cta-pill ${p.dark ? '!bg-accent' : ''}`}>View case study <span>→</span></Link>
                    ) : (
                      <a href="#" onClick={(e) => e.preventDefault()} className={`cta-pill ${p.dark ? '!bg-accent' : ''}`}>View case study <span>→</span></a>
                    )}
                  </Magnetic>
                </Reveal>
              </div>
              <div className="relative max-lg:aspect-[4/3] max-lg:max-h-[470px] max-lg:overflow-hidden max-lg:rounded-[14px] max-lg:bg-ink/[.03] lg:h-[640px]">
                <div data-mock className="absolute inset-0 will-change-transform">
                  {p.mock.type === 'phones' ? (
                    <>
                      <PhoneMock src={p.mock.front} alt={p.mock.frontAlt} className="absolute z-[2] h-[400px] w-[200px] max-lg:left-1/2 max-lg:top-10 max-lg:-translate-x-[80%] lg:left-[18%] lg:top-[30px] lg:h-[580px] lg:w-[290px]" />
                      <PhoneMock src={p.mock.back} alt={p.mock.backAlt} className="absolute z-[1] h-[400px] w-[200px] origin-top-left scale-[.82] opacity-95 max-lg:left-1/2 max-lg:top-[90px] max-lg:translate-x-[5%] lg:left-[55%] lg:top-[110px] lg:h-[580px] lg:w-[290px]" />
                    </>
                  ) : (
                    <BrowserMock src={p.mock.src} alt={p.mock.alt} mid={p.mock.mid} className="absolute left-1/2 top-1/2 aspect-[640/440] w-[90%] -translate-x-1/2 -translate-y-1/2 lg:w-[min(640px,100%)]" />
                  )}
                </div>
                <span className={`absolute z-[4] inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium shadow-chip backdrop-blur-xl max-lg:bottom-4 max-lg:left-4 lg:bottom-[70px] lg:left-0 lg:px-5 lg:py-3 lg:text-[13px] ${p.dark ? 'border-white/10 bg-[#14161b]/70 text-white' : 'border-line-2 bg-white/[.62] text-ink'}`}>
                  <i className="h-2 w-2 rounded-full bg-accent not-italic" />{p.chip}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ---------------- page ---------------- */

export default function Home() {
  useMeta(
    'Ashnab Jamshad, UX/UI Product Designer',
    'Portfolio of Ashnab Jamshad, UX/UI Product Designer based in Dubai, UAE. 4+ years designing ecommerce websites, product UI and mobile apps across Tech and FMCG in the GCC.'
  )

  return (
    <main className="page-fade">
      {/* HERO */}
      <section className="wrap pb-[72px] pt-[130px] xl:pb-[110px] xl:pt-[170px]">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div>
            <Reveal className="mb-7 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="eyebrow">UX/UI Product Designer</span>
            </Reveal>
            <h1 className="font-display text-[clamp(42px,6vw,76px)] font-medium leading-[1.04] tracking-[-.02em]">
              <ClipLine>Hello, I'm</ClipLine>
              <ClipLine delay={120}>Ashnab</ClipLine>
              <ClipLine delay={240}>Jamshad.</ClipLine>
            </h1>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-8 lg:w-[460px]">
            <Reveal delay={1} as="p" className="text-[17px] leading-[1.55] text-ink-2 xl:text-xl">
              I design digital products end to end, from information architecture and interaction design to prototypes, design systems and high fidelity UI in Figma.
            </Reveal>
            <Reveal delay={2}>
              <MetaRow k="Location" v="Dubai, UAE" />
              <MetaRow k="Experience" v="4+ years" />
              <MetaRow k="Status" v="Open to select projects" />
            </Reveal>
          </div>
        </div>
        <div className="mt-[72px] flex items-center justify-between">
          <span className="anim-bob font-display text-[34px]">↓</span>
          <span className="text-[13px] text-ink-3">Selected work, 2021 → 2026</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="wrap pt-14 md:pt-[72px] xl:pt-[110px]">
        <SectionHead num="01" label="About" />
        <div className="flex flex-col justify-between gap-10 pb-14 pt-14 md:pb-[72px] lg:flex-row lg:gap-20 xl:pb-[110px]">
          <div className="flex max-w-[640px] flex-col gap-8">
            <Reveal as="h2" className="font-display text-[clamp(26px,3vw,40px)] font-medium leading-[1.18] tracking-[-.01em]">
              I turn complex product problems into clear, usable interfaces.
            </Reveal>
            <Reveal delay={1} as="p" className="text-[17px] leading-[1.65] text-ink-2">
              For 4+ years I have designed products across Tech and FMCG in the GCC, working on ecommerce websites, product UI and mobile apps from first wireframe to shipped interface.
            </Reveal>
            <Reveal delay={2} as="p" className="text-[17px] leading-[1.65] text-ink-2">
              I think in systems: information architecture, reusable components and clear hierarchy. I document the problem and solution space, then iterate quickly on feedback, usability testing and user validation.
            </Reveal>
            <Reveal delay={3} className="flex gap-9 pt-4 xl:gap-12">
              <Stat to={4} suffix="+" label="Years of experience" />
              <Stat to={3} label="Companies across the GCC" />
              <Stat to={6} label="Google and Udemy certifications" />
            </Reveal>
          </div>
          <Reveal delay={2} className="w-full max-w-[420px] shrink-0 lg:w-[380px]">
            <div className="flex aspect-[380/460] w-full flex-col items-center justify-center gap-2 rounded-md border border-line-2 [background:linear-gradient(160deg,#e9edfb,#dfe4f7)]">
              <span className="font-display text-5xl font-medium text-accent/40">AJ</span>
              <span className="text-[11px] tracking-[.02em] text-accent/45">Placeholder: add headshot</span>
            </div>
            <div className="mt-3.5 flex justify-between text-[13px]">
              <span>Ashnab Jamshad</span><span className="text-ink-3">Dubai, UAE</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="wrap">
        <SectionHead num="02" label="Experience" />
        <Reveal as="h2" className="h2-display pb-14 pt-9">Where I've worked</Reveal>
        <div className="pb-14 md:pb-[72px] xl:pb-[110px]">
          {experience.map((e) => (
            <Reveal
              key={e.co}
              className="group relative grid gap-2 border-t border-line py-6 last:border-b lg:grid-cols-[180px_1fr_1.1fr] lg:gap-10 lg:py-8"
            >
              <span className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-[1] rounded-xl bg-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="text-[13px] text-ink-3">{e.period}</div>
              <div>
                <div className="font-display text-2xl font-medium leading-snug transition-colors duration-300 group-hover:text-accent">{e.co}</div>
                <div className="mt-1.5 text-sm font-medium text-accent">{e.role}</div>
              </div>
              <div className="text-[15px] leading-relaxed text-ink-2">{e.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="wrap">
        <SectionHead num="03" label="Expertise" />
        <Reveal as="h2" className="h2-display pb-14 pt-9">What I do best</Reveal>
        <div className="grid grid-cols-1 gap-4 pb-14 pt-0 sm:grid-cols-2 md:pb-[72px] xl:grid-cols-4 xl:pb-[110px]">
          {skills.map(([n, t, d], i) => (
            <SkillCard key={n} n={n} t={t} d={d} delay={i % 4} />
          ))}
        </div>
      </section>

      {/* PROJECTS intro */}
      <section id="work" className="wrap">
        <SectionHead num="04" label="Selected Work" />
        <div className="flex items-baseline justify-between pb-[90px] pt-9">
          <Reveal as="h2" className="h2-display">Selected projects</Reveal>
          <span className="text-[13px] text-ink-3 max-md:hidden">5 projects, temporary selection</span>
        </div>
      </section>

      <ProjectStack />

      {/* PROCESS */}
      <section id="process" className="wrap">
        <SectionHead num="05" label="Design Process" />
        <Reveal as="h2" className="h2-display pb-14 pt-9">How I work</Reveal>
        <div className="grid gap-0 pb-14 md:pb-[72px] lg:grid-cols-5 lg:gap-6 xl:pb-[110px]">
          {process.map(([n, t, d], i) => (
            <Reveal
              key={n}
              delay={Math.min(i, 3)}
              className="group flex flex-row items-baseline gap-5 border-t border-line py-[18px] lg:flex-col lg:gap-3.5 lg:border-t-2 lg:border-ink lg:pt-5 lg:transition-colors lg:hover:border-accent"
            >
              <span className="text-xs font-semibold tracking-[.08em] text-accent">{n}</span>
              <span className="min-w-[120px] font-display text-lg font-medium lg:text-[21px]">{t}</span>
              <span className="text-[13px] leading-relaxed text-ink-2">{d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="wrap">
        <SectionHead num="06" label="Tools" />
        <Reveal as="h2" className="h2-display pb-14 pt-9">My everyday stack</Reveal>
        <div className="pb-14 md:pb-[72px] xl:pb-[110px]">
          {tools.map(([label, items]) => (
            <Reveal key={label} className="flex flex-col justify-between gap-3.5 border-t border-line py-7 last:border-b lg:flex-row lg:gap-14">
              <span className="min-w-[260px] text-[15px] font-medium">{label}</span>
              <span className="flex max-w-[780px] flex-wrap gap-2.5 lg:justify-end">
                {items.map((t) => <span key={t} className="tchip">{t}</span>)}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="wrap">
        <SectionHead num="07" label="Education & Certifications" />
        <Reveal as="h2" className="h2-display pb-14 pt-9">Where I learned the craft</Reveal>
        <div className="pb-14 md:pb-[72px] xl:pb-[110px]">
          {education.map(([label, text]) => (
            <Reveal key={label} className="flex flex-col justify-between gap-3.5 border-t border-line py-7 last:border-b lg:flex-row lg:gap-14">
              <span className="min-w-[260px] text-[15px] font-medium">{label}</span>
              <span className="max-w-[700px] text-[15px] leading-relaxed text-ink-2 lg:text-right">{text}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-dark pb-10 text-white pad-landing">
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 -translate-y-[42%] rounded-full blur-[46px] [background:radial-gradient(circle,rgba(37,71,244,.26),transparent_60%)]" />
        <div className="wrap relative">
          <Reveal as="span" className="eyebrow !text-ink-3">08 / Contact</Reveal>
          <Reveal delay={1} as="h2" className="mt-5 max-w-[900px] font-display text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.12] tracking-[-.015em]">
            Have a product to build?<br />Let's make it usable.
          </Reveal>
          <Reveal delay={2} className="mt-16 flex flex-wrap items-center justify-between gap-10">
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href="mailto:ashnabjamshaid@gmail.com" className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-base font-medium text-white shadow-emailBtn transition duration-300 ease-quart hover:-translate-y-[3px] hover:shadow-[0_20px_50px_-8px_rgba(37,71,244,.85)]">
                  ashnabjamshaid@gmail.com <span>↗</span>
                </a>
              </Magnetic>
              <a href="#" onClick={(e) => e.preventDefault()} className="px-2 py-4 text-[15px] font-medium text-ink-3 transition-colors hover:text-white">Download résumé</a>
            </div>
            <div className="flex gap-7">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ink-3 transition-colors hover:text-white">LinkedIn</a>
              <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ink-3 transition-colors hover:text-white">Behance</a>
            </div>
          </Reveal>
          <div className="mt-[74px] flex flex-wrap justify-between gap-4 border-t border-white/[.14] pt-6">
            <span className="text-[13px] font-medium text-[#8ea2ff]">Ashnab Jamshad, 2026</span>
            <span className="text-[13px] text-ink-3">Designed in Figma · Built with care in Dubai</span>
          </div>
        </div>
      </section>
    </main>
  )
}

/* Hero clip-reveal line: animates on mount. */
function ClipLine({ children, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (REDUCED) { el.classList.add('in'); return }
    const t = setTimeout(() => el.classList.add('in'), 120 + delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <span ref={ref} className="clip-line"><span>{children}</span></span>
  )
}
