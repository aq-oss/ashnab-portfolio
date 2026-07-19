import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, Magnetic } from '../components/ui'
import { useMeta } from '../hooks/hooks'
import { cs } from '../data/content'

const ECOM = '/project-images/masafi-ecom.jpg'

/* ---------- local pieces ---------- */

function CsSection({ id, num, label, surface = false, children }) {
  return (
    <section id={id} className={`wrap pad-cs ${surface ? 'bg-surface' : ''}`}>
      <Reveal className="flex flex-col gap-[18px]">
        <div className="sec-rule" />
        <div className="flex items-center justify-between">
          <span className="eyebrow">{num} / {label}</span>
          <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
        </div>
      </Reveal>
      {children}
    </section>
  )
}

const H2 = ({ children, className = '' }) => (
  <Reveal delay={1} as="h2" className={`mt-[30px] font-display text-[26px] font-medium leading-[1.18] tracking-[-.015em] md:text-[34px] xl:text-[44px] ${className}`}>{children}</Reveal>
)
const Lead = ({ children }) => (
  <Reveal delay={2} as="p" className="mt-[18px] max-w-[760px] text-[15px] leading-[1.68] text-ink-2 md:text-base xl:text-[17px]">{children}</Reveal>
)

function CsBrowser({ crop, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-heroshot ${className}`}>
      <div className="relative flex h-6 items-center gap-2 bg-[#f0f0ee] pl-3.5 md:h-[30px] md:pl-5 xl:h-[46px]">
        {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#bfbfbd] md:h-2 md:w-2 xl:h-[11px] xl:w-[11px]" />)}
        <span className="absolute left-1/2 hidden -translate-x-1/2 rounded-[11px] bg-white px-11 py-1 text-[11px] text-ink-3 xl:block">masafi.com</span>
      </div>
      <div className={`aspect-[1240/772] w-full bg-no-repeat [background-size:100%_100%] ${crop || ''}`} style={{ backgroundImage: `url(${ECOM})` }} />
    </div>
  )
}

/* wireframe tile: blocks drawn with divs (no image weight) */
function Wire({ kind, cap, delay }) {
  const B = ({ x, y, w, h, c = '#E3E6EB', r = 4 }) => (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, background: c, borderRadius: r }} />
  )
  return (
    <Reveal delay={delay}>
      <div className="relative aspect-[250/330] overflow-hidden rounded-[10px] border border-line bg-[#FBFBFA]">
        <B x={0} y={0} w={100} h={8} c="#EDEFF3" r={0} /><B x={6} y={2.7} w={22} h={2.4} c="#C9CFD8" />
        {kind === 'landing' && (<><B x={6} y={12} w={88} h={26} c="#DCE3EC" r={6} /><B x={10} y={17} w={36} h={2.4} c="#B9C3D0" /><B x={10} y={22} w={24} h={2} c="#CBD3DC" />{[0, 1, 2].map((i) => <B key={i} x={6 + i * 31} y={43} w={27} h={22} r={6} />)}<B x={6} y={70} w={88} h={3} c="#E9ECF1" />{[0, 1, 2].map((i) => <B key={'b' + i} x={6 + i * 31} y={77} w={27} h={18} r={6} />)}</>)}
        {kind === 'category' && (<><B x={6} y={12} w={88} h={3} c="#D6DBE3" /><B x={6} y={19} w={20} h={66} c="#EDEFF3" r={6} />{[0, 1, 2, 3].map((i) => <B key={i} x={30 + (i % 2) * 33} y={19 + Math.floor(i / 2) * 27} w={30} h={22} r={6} />)}<B x={30} y={76} w={60} h={2.4} c="#DDE2E9" /></>)}
        {kind === 'pdp' && (<><B x={6} y={12} w={42} h={45} r={6} /><B x={54} y={13} w={40} h={3} c="#C9CFD8" /><B x={54} y={19} w={32} h={2.4} c="#DDE2E9" />{[0, 1, 2].map((i) => <B key={i} x={54 + i * 14} y={30} w={11} h={6} c="#E9ECF1" r={6} />)}<B x={54} y={42} w={40} h={8} c="#12539E" r={6} /><B x={6} y={62} w={88} h={2.4} /><B x={6} y={74} w={88} h={18} c="#F0F2F6" r={6} /></>)}
        {kind === 'checkout' && (<><B x={6} y={12} w={56} h={3} c="#D6DBE3" />{[0, 1, 2].map((i) => <B key={i} x={6} y={19 + i * 12} w={56} h={9} c="#EDEFF3" r={6} />)}<B x={67} y={19} w={27} h={42} c="#F0F2F6" r={6} /><B x={67} y={55} w={27} h={7} c="#12539E" r={6} /></>)}
      </div>
      <div className="mt-3.5 text-sm font-medium">{cap}</div>
    </Reveal>
  )
}

/* ---------- page ---------- */

export default function MasafiCaseStudy() {
  useMeta(
    'Masafi Ecommerce Website, Case Study · Ashnab Jamshad',
    'Case study: rebuilding the masafi.com ecommerce storefront around clarity, faster delivery and a component library that scales.'
  )

  /* sticky sub-nav active state */
  const ids = ['overview', 'challenge', 'research', 'flows', 'system', 'screens', 'impact']
  const [active, setActive] = useState(0)
  useEffect(() => {
    let tick = false
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        let a = 0
        ids.forEach((id, i) => {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= innerHeight * 0.35) a = i
        })
        setActive(a)
        tick = false
      })
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="page-fade">
      {/* HERO */}
      <section className="wrap pt-28 xl:pt-[132px]">
        <Link to="/#work" className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink-3 transition hover:text-accent">
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to work
        </Link>
        <Reveal className="mb-[26px] mt-11 flex flex-wrap items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="eyebrow">Case study</span>
          <span className="eyebrow !text-ink-3">· FMCG ecommerce</span>
        </Reveal>
        <Reveal delay={1} as="h1" className="font-display text-4xl font-medium leading-[1.02] tracking-[-.025em] md:text-[56px] xl:text-[88px]">
          Masafi Ecommerce<br />Website
        </Reveal>
        <Reveal delay={2} as="p" className="mb-9 mt-[18px] max-w-[820px] text-[15px] leading-normal text-ink-2 md:mb-14 md:text-base xl:mt-[26px] xl:text-2xl">
          Rebuilding the masafi.com storefront around clarity, faster delivery and a component library the team could actually scale.
        </Reveal>
        <Reveal delay={3} className="grid grid-cols-1 gap-[18px] border-t border-line pt-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {[['Client', 'Masafi Corp'], ['Industry', 'FMCG · Beverages'], ['Role', 'Product UI/UX Designer'], ['Timeline', '2025 → Present']].map(([k, v]) => (
            <div key={k}><div className="mb-2 text-[12.5px] text-ink-3">{k}</div><div className="text-sm font-medium md:text-[15px] xl:text-base">{v}</div></div>
          ))}
        </Reveal>
      </section>

      <Reveal className="wrap mt-12 md:mt-16 xl:mt-24"><CsBrowser /></Reveal>

      {/* STICKY SUB NAV */}
      <div className="wrap sticky top-0 z-[60] mt-10 md:mt-[52px] xl:mt-[72px]">
        <div className="flex items-center justify-between gap-4 rounded-full border border-line bg-white/[.86] py-2.5 pl-4 pr-2.5 shadow-subnav backdrop-blur-2xl backdrop-saturate-150 xl:pl-[22px]">
          <div className="flex items-center gap-[26px] overflow-hidden">
            {ids.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className={`whitespace-nowrap text-[13px] font-medium capitalize transition-colors
                  ${i === active ? 'rounded-full bg-ink px-4 py-2 text-white' : 'text-ink-2 hover:text-ink'}
                  ${i > 0 ? 'max-md:hidden' : ''} ${i > 3 ? 'max-xl:hidden' : ''}`}
              >
                {id === 'system' ? 'Design system' : id}
              </a>
            ))}
          </div>
          <Link to="/#work" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-[18px] py-[9px] text-[13px] font-medium text-white transition duration-300 ease-quart hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(37,71,244,.6)]">
            Next project <span>→</span>
          </Link>
        </div>
      </div>

      {/* 01 AT A GLANCE */}
      <CsSection id="overview" num="01" label="At a glance">
        <div className="mt-11 grid items-center gap-8 xl:grid-cols-[1fr_370px] xl:gap-[90px]">
          <Reveal delay={1}>
            <h2 className="font-display text-[26px] font-medium leading-[1.18] tracking-[-.015em] md:text-[34px] xl:text-[44px]">A national FMCG brand's storefront, rebuilt to scale.</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink-2">Masafi is one of the UAE's best known FMCG brands. The masafi.com storefront needed product discovery that worked across a wide catalogue, promotional merchandising that did not overwhelm the page, and a UI that engineering could build consistently across breakpoints.</p>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink-2">I owned the product UI end to end: wireframes, high fidelity screens and an interactive prototype, plus the Figma sticker sheet and component library that the wider team designs and builds from today.</p>
          </Reveal>
          <Reveal delay={2}>
            <div className="rounded-[14px] border border-line bg-surface p-[26px]">
              {[['Platform', 'Responsive web'], ['Team', 'PM, researcher, engineering'], ['Tools', 'Figma, FigJam, LottieFiles'], ['Deliverables', 'Wireframes, hi-fi UI, prototype, design system']].map(([k, v], i) => (
                <div key={k} className={i > 0 ? 'mt-3.5 border-t border-line-2 pt-3.5' : ''}>
                  <div className="mb-[5px] text-[12.5px] text-ink-3">{k}</div>
                  <div className="text-[15px] font-medium">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {[['+25%', 'user engagement'], ['30%', 'faster time to market']].map(([n, l]) => (
                <div key={n} className="flex items-baseline gap-3 rounded-xl bg-accent px-[22px] py-[18px] text-white">
                  <b className="font-display text-[22px] font-medium md:text-[26px] xl:text-[28px]">{n}</b>
                  <span className="text-[12.5px] font-medium opacity-85 md:text-sm">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </CsSection>

      {/* 02 CHALLENGE */}
      <CsSection id="challenge" num="02" label="The challenge" surface>
        <H2>Three product ranges, one storefront, and no shared system.</H2>
        <Lead>Water, hygiene and tissue behave like different products with different buying logic. The storefront had to make each range easy to find and compare, carry heavy promotional merchandising without turning into noise, and stay consistent as new categories and campaigns shipped every sprint.</Lead>
        <div className="mt-9 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:mt-[54px] xl:grid-cols-3 xl:gap-5">
          {cs.constraints.map(([t, d], i) => (
            <Reveal key={t} delay={Math.min(i, 3)} className="rounded-[14px] bg-bg p-6 xl:p-7">
              <h3 className="font-display text-lg font-medium leading-snug md:text-[19px] xl:text-xl">{t}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2 xl:text-[14.5px]">{d}</p>
            </Reveal>
          ))}
        </div>
      </CsSection>

      {/* 03 GOALS */}
      <CsSection num="03" label="Goals & objectives">
        <H2>What we optimised for</H2>
        <div className="mt-9 border-t border-line xl:mt-[52px]">
          {cs.goals.map(([n, t, d]) => (
            <Reveal key={n} className="grid grid-cols-[34px_1fr] items-start gap-4 border-b border-line py-[22px] xl:grid-cols-[60px_400px_1fr] xl:gap-10 xl:py-[30px]">
              <span className="text-[13px] font-semibold tracking-[.08em] text-accent">{n}</span>
              <h3 className="font-display text-lg font-medium leading-snug md:text-xl xl:text-[22px]">{t}</h3>
              <p className="col-start-2 mt-2 text-sm leading-relaxed text-ink-2 md:text-[14.5px] xl:col-start-3 xl:mt-0 xl:text-[15px]">{d}</p>
            </Reveal>
          ))}
        </div>
      </CsSection>

      {/* 04 RESEARCH */}
      <CsSection id="research" num="04" label="Research & discovery" surface>
        <div className="mt-11 grid items-center gap-8 xl:grid-cols-[1fr_410px] xl:gap-[90px]">
          <Reveal delay={1}>
            <h2 className="font-display text-[26px] font-medium leading-[1.18] tracking-[-.015em] md:text-[34px] xl:text-[44px]">Understanding the shelf before redesigning it</h2>
            <p className="mt-[18px] max-w-[760px] text-[15px] leading-[1.68] text-ink-2 xl:text-[17px]">I audited the existing storefront with the product manager and researcher, mapped the catalogue structure, and documented the problem and solution space so every later decision had something to point back to.</p>
            <div className="mt-[22px] flex flex-wrap gap-2.5">
              {cs.methods.map((m) => <span key={m} className="rounded-full bg-bg px-4 py-[9px] text-[13px] text-ink-2">{m}</span>)}
            </div>
          </Reveal>
          <Reveal delay={2}>
            {cs.insights.map(([n, t, d], i) => (
              <div key={n} className={`rounded-[14px] bg-bg p-6 ${i > 0 ? 'mt-3.5' : ''}`}>
                <span className="text-[11.5px] font-semibold tracking-[.1em] text-accent">{n}</span>
                <h3 className="mt-2 font-display text-lg font-medium leading-snug">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </CsSection>

      {/* 05 FLOWS */}
      <CsSection id="flows" num="05" label="Information architecture & user flows">
        <H2>Mapping the routes to purchase</H2>
        <Lead>Two entry points carried most of the traffic: browsing a category, and arriving through a promotion. Both reach the same product detail and checkout path.</Lead>
        <Reveal className="mt-8 rounded-[18px] border border-line bg-surface p-5 md:p-8 xl:mt-[50px] xl:px-8 xl:pb-8 xl:pt-[46px]">
          {[['Primary purchase flow', cs.flow1], ['Promotional entry flow', cs.flow2]].map(([label, nodes], li) => (
            <div key={label} className={li > 0 ? 'mt-[26px] border-t border-line-2 pt-[26px]' : ''}>
              <div className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[.1em] text-ink-3">{label}</div>
              <div className="flex flex-col items-stretch gap-2 xl:flex-row xl:items-center xl:gap-2.5">
                {nodes.map(([t, s, key], i) => (
                  <FlowNode key={t + i} t={t} s={s} highlight={!!key} last={i === nodes.length - 1} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </CsSection>

      {/* 06 WIREFRAMES */}
      <CsSection num="06" label="Wireframes" surface>
        <H2>Structure before surface</H2>
        <Lead>Low fidelity layouts to agree hierarchy, merchandising slots and the shape of each template before any visual design started.</Lead>
        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:mt-[50px] xl:grid-cols-4 xl:gap-[22px]">
          <Wire kind="landing" cap="Landing" delay={0} />
          <Wire kind="category" cap="Category" delay={1} />
          <Wire kind="pdp" cap="Product detail" delay={2} />
          <Wire kind="checkout" cap="Cart & checkout" delay={3} />
        </div>
      </CsSection>

      {/* 07 DESIGN SYSTEM */}
      <CsSection id="system" num="07" label="Design system">
        <H2>A sticker sheet the team builds from</H2>
        <Lead>Tokens, components and states documented in Figma so the same button, card and badge appear identically across every template.</Lead>

        <Reveal className="mt-[54px]">
          <div className="mb-[22px] text-[11.5px] font-semibold uppercase tracking-[.12em] text-ink-3">Colour</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {cs.palette.map(([nm, hex, use, bordered]) => (
              <div key={nm}>
                <div className={`h-16 rounded-xl md:h-[76px] xl:h-[88px] ${bordered ? 'border border-line' : ''}`} style={{ background: hex }} />
                <div className="mt-3 text-[13.5px] font-medium">{nm}</div>
                <div className="mt-[3px] text-xs text-ink-3">{hex}</div>
                <div className="mt-[3px] text-[11.5px] leading-snug text-ink-3">{use}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[54px]">
          <div className="mb-[22px] text-[11.5px] font-semibold uppercase tracking-[.12em] text-ink-3">Type scale</div>
          <div className="border-t border-line">
            {cs.typeScale.map(([nm, spec, size, sample]) => (
              <div key={nm} className="grid grid-cols-1 gap-2 border-b border-line py-4 xl:grid-cols-[180px_220px_1fr] xl:items-center xl:gap-10 xl:py-[22px]">
                <div className="flex items-baseline justify-between xl:block">
                  <span className="text-[15px] font-medium">{nm}</span>
                  <span className="text-[13px] text-ink-3 xl:hidden">{spec}</span>
                </div>
                <span className="hidden text-[13px] text-ink-3 xl:block">{spec}</span>
                <span className="font-display font-medium leading-snug" style={{ fontSize: size }}>{sample || 'Aa Masafi'}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[54px]">
          <div className="mb-[22px] text-[11.5px] font-semibold uppercase tracking-[.12em] text-ink-3">Components</div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4 xl:gap-[22px]">
            <Panel title="Buttons">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-lg bg-masafi-blue px-[22px] py-[13px] text-[13.5px] font-medium text-white">Shop all</span>
                <span className="rounded-lg border-[1.5px] border-masafi-blue px-[21px] py-3 text-[13.5px] font-medium text-masafi-blue">Learn more</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5"><span className="rounded-lg bg-masafi-cloud px-[22px] py-[13px] text-[13.5px] font-medium text-masafi-slate">Disabled</span></div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-[7px] bg-masafi-blue px-4 py-[9px] text-xs font-medium text-white">Add to cart</span>
                <span className="text-[12.5px] font-medium text-masafi-blue">View all →</span>
              </div>
            </Panel>
            <Panel title="Filters & badges">
              <div className="flex flex-wrap gap-2">
                {['All', 'Water', 'Hygiene', 'Tissue'].map((f, i) => (
                  <span key={f} className={`rounded-full px-3.5 py-2 text-[12.5px] font-medium ${i === 0 ? 'bg-masafi-blue text-white' : 'bg-masafi-cloud text-masafi-slate'}`}>{f}</span>
                ))}
              </div>
              <div><span className="inline-block rounded-full bg-masafi-blue p-3.5 text-center text-[11px] font-medium leading-tight text-white">Buy 5<br />Get 1 FREE</span></div>
              <div className="flex gap-2">
                <span className="rounded-md bg-masafi-cloud px-3 py-[7px] text-[11.5px] font-medium text-masafi-slate">Out of stock</span>
                <span className="rounded-md bg-[#E8F1E8] px-3 py-[7px] text-[11.5px] font-medium text-[#2E6B3F]">In stock</span>
              </div>
            </Panel>
            <Panel title="Product card">
              <div className="rounded-xl border border-line bg-white p-[13px] pb-[15px]">
                <div className="h-[70px] rounded-lg bg-masafi-cloud" />
                <div className="mt-2.5 text-[13px] font-medium">Masafi Zero 500ml</div>
                <div className="mt-1 text-[11.5px] text-ink-3">Pack of 12</div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-masafi-navy">AED 18.00</span>
                  <span className="rounded-[7px] bg-masafi-blue px-[11px] py-1.5 text-[13px] text-white">+</span>
                </div>
              </div>
            </Panel>
            <Panel title="Inputs & stepper">
              <div className="rounded-lg border border-line bg-white px-3.5 py-[13px] text-[13px] text-ink-3">Search products</div>
              <div className="rounded-lg border-2 border-masafi-blue bg-white px-[13px] py-3 text-[13px] font-medium">Masafi Pure</div>
              <div className="flex items-center justify-between rounded-lg border border-line px-4 py-2.5 text-[13px]">
                <span className="text-masafi-blue">−</span><span>2</span><span className="text-masafi-blue">+</span>
              </div>
            </Panel>
          </div>
        </Reveal>
      </CsSection>

      {/* 08 KEY SCREENS */}
      <CsSection id="screens" num="08" label="Key screens" surface>
        <H2>The storefront, shipped</H2>
        <Lead>A calm neutral canvas so the packaging does the talking, a merchandising band with a fixed rhythm for campaigns, and a product grid that leads with pack format.</Lead>
        <Reveal className="mt-8 xl:mt-[50px]">
          <CsBrowser />
          <div className="mt-3.5 text-[13.5px] text-ink-3">Landing · full storefront with promotional merchandising above the product grid</div>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-[26px] xl:mt-10 xl:grid-cols-3 xl:gap-5">
          {cs.details.map(([crop, t, c], i) => (
            <Reveal key={t} delay={Math.min(i, 3)}>
              <div
                className={`aspect-video rounded-xl border border-line bg-no-repeat [background-size:200%] xl:aspect-[354/210]
                  ${crop === 'c1' ? '[background-position:2%_2%]' : crop === 'c2' ? '[background-position:50%_30%]' : '[background-position:8%_94%]'}`}
                style={{ backgroundImage: `url(${ECOM})` }}
              />
              <div className="mt-3 text-[15px] font-medium">{t}</div>
              <div className="mt-1.5 text-[13px] leading-relaxed text-ink-3">{c}</div>
            </Reveal>
          ))}
        </div>
      </CsSection>

      {/* 09 DECISIONS */}
      <CsSection num="09" label="Decisions that mattered">
        <H2>Three calls that shaped the build</H2>
        <div className="mt-9 border-t border-line xl:mt-[52px]">
          {cs.decisions.map(([n, p, d, i]) => (
            <Reveal key={n} className="grid grid-cols-1 items-start gap-3.5 border-b border-line py-6 xl:grid-cols-[50px_300px_340px_1fr] xl:gap-10 xl:py-[34px]">
              <div className="flex items-start gap-3 xl:block">
                <span className="text-[13px] font-semibold tracking-[.08em] text-accent">{n}</span>
                <h3 className="font-display text-[17px] font-medium leading-snug xl:hidden">{p}</h3>
              </div>
              <div className="hidden xl:block">
                <div className="mb-2 text-xs text-ink-3">Problem</div>
                <h3 className="font-display text-[19px] font-medium leading-snug">{p}</h3>
              </div>
              <div>
                <div className="mb-2 hidden text-xs text-ink-3 xl:block">Decision</div>
                <p className="text-sm leading-relaxed text-ink-2 xl:text-[15px]">{d}</p>
              </div>
              <div>
                <div className="mb-2 hidden text-xs text-ink-3 xl:block">Impact</div>
                <p className="rounded-[10px] bg-bg px-3.5 py-3 text-[13.5px] font-medium leading-relaxed text-accent xl:bg-transparent xl:p-0 xl:text-[15px]">{i}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </CsSection>

      {/* 10 RESPONSIVE */}
      <CsSection num="10" label="Responsive" surface>
        <H2>One system, three widths</H2>
        <Lead>The merchandising band collapses from three slots to one carousel, the product grid steps from five columns to two, and navigation condenses into a drawer.</Lead>
        <Reveal className="mt-8 flex flex-col gap-[22px] xl:mt-[50px] xl:flex-row xl:items-end xl:gap-[30px]">
          <div className="flex-1">
            <CsBrowser className="!shadow-mock" />
            <div className="mt-3.5 text-[13.5px] font-medium">Desktop · 1440</div>
          </div>
          <div className="flex gap-3.5 xl:contents">
            <div className="flex-1 xl:w-[280px] xl:flex-none">
              <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-mock">
                <div className="h-[22px] bg-[#f0f0ee]" />
                <div className="aspect-[280/370] bg-no-repeat [background-position:50%_0] [background-size:200%]" style={{ backgroundImage: `url(${ECOM})` }} />
              </div>
              <div className="mt-3.5 text-[13.5px] font-medium">Tablet · 768</div>
            </div>
            <div className="flex-1 xl:w-[190px] xl:flex-none">
              <MobileMock />
              <div className="mt-3.5 text-[13.5px] font-medium">Mobile · 390</div>
            </div>
          </div>
        </Reveal>
      </CsSection>

      {/* 11 IMPACT */}
      <CsSection id="impact" num="11" label="Outcome & impact">
        <H2>What changed after launch</H2>
        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:mt-[54px] xl:grid-cols-3 xl:gap-5">
          {cs.stats.map(([n, t, d], i) => (
            <Reveal key={n} delay={Math.min(i, 3)} className="rounded-2xl border border-line bg-surface p-[26px] xl:px-[30px] xl:py-[34px]">
              <div className="font-display text-[38px] font-medium leading-none tracking-[-.02em] text-accent md:text-[44px] xl:text-[58px]">{n}</div>
              <h3 className="mt-2.5 font-display text-lg font-medium xl:text-xl">{t}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-[26px] max-w-[820px] text-[15px] leading-[1.68] text-ink-2 xl:mt-10 xl:text-[17px]">
          Alongside the numbers, design reviews moved faster: stakeholders signed off against a documented system rather than debating one-off screens.
        </Reveal>
      </CsSection>

      {/* 12 LEARNINGS */}
      <CsSection num="12" label="Key learnings" surface>
        <H2>What I'd carry into the next build</H2>
        <div className="mt-8 grid grid-cols-1 gap-3.5 xl:mt-[52px] xl:grid-cols-3 xl:gap-5">
          {cs.learnings.map(([t, d], i) => (
            <Reveal key={t} delay={Math.min(i, 3)} className="rounded-2xl bg-bg p-[26px] xl:px-7 xl:py-[30px]">
              <span className="text-[11.5px] font-semibold tracking-[.1em] text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3.5 font-display text-[19px] font-medium leading-snug xl:text-[21px]">{t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </CsSection>

      {/* 13 NEXT */}
      <section className="bg-dark pb-12 text-white wrap pad-cs">
        <Reveal className="flex flex-col gap-[18px]">
          <div className="h-px w-full bg-white/[.14]" />
          <div className="flex items-center justify-between">
            <span className="eyebrow !text-white/55">13 / Next project</span>
            <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          </div>
        </Reveal>
        <div className="mt-6 flex flex-col items-start justify-between gap-6 xl:mt-[46px] xl:flex-row xl:items-center xl:gap-[60px]">
          <Reveal delay={1}>
            <div className="eyebrow !text-white/50">Up next</div>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-.02em] md:text-[40px] xl:text-[56px]">Masafi Ecommerce Store</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60 xl:text-[17px]">Product UI for the storefront app, from wireframes to high fidelity prototypes.</p>
          </Reveal>
          <Reveal delay={2}>
            <Magnetic>
              <Link to="/#work" className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-accent px-[26px] py-4 text-sm font-medium text-white transition duration-300 ease-quart hover:-translate-y-[3px] hover:shadow-[0_18px_44px_-10px_rgba(37,71,244,.7)] xl:px-[34px] xl:py-5 xl:text-base">
                View case study <span>→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
        <div className="mt-[70px] flex flex-col justify-between gap-2.5 border-t border-white/[.14] pt-6 md:flex-row md:gap-4">
          <span className="text-[13px] font-medium text-[#8ea2ff]">Ashnab Jamshad, 2026</span>
          <div className="flex flex-col gap-2 md:flex-row md:gap-7">
            <Link to="/#work" className="text-[13px] font-medium text-white/55 transition-colors hover:text-white">Back to all work</Link>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-white/55 transition-colors hover:text-white">LinkedIn</a>
            <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-white/55 transition-colors hover:text-white">Behance</a>
          </div>
        </div>
      </section>
    </main>
  )
}

function Panel({ title, children }) {
  return (
    <div className="flex flex-col gap-[18px] rounded-[14px] border border-line bg-surface p-[22px] xl:gap-6 xl:px-7 xl:py-8">
      <div className="text-[13.5px] font-medium text-ink-2">{title}</div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function FlowNode({ t, s, highlight, last }) {
  return (
    <>
      <div className={`flex-1 rounded-xl px-4 py-[18px] ${highlight ? 'bg-accent' : 'border border-line bg-bg'}`}>
        <div className={`text-sm font-medium leading-snug ${highlight ? 'text-white' : ''}`}>{t}</div>
        <div className={`mt-1 text-[11.5px] leading-snug ${highlight ? 'text-white/80' : 'text-ink-3'}`}>{s}</div>
      </div>
      {!last && <span className="shrink-0 self-center text-[13px] text-ink-3 max-xl:rotate-90 xl:text-[15px]">→</span>}
    </>
  )
}

/* CSS-drawn Masafi mobile mock (mirrors the vanilla implementation) */
function MobileMock() {
  const B = ({ x, y, w, h, c, r = 0 }) => (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, background: c, borderRadius: r }} />
  )
  return (
    <div className="relative aspect-[190/392] overflow-hidden rounded-[22px] border border-line bg-white shadow-mock">
      <B x={6} y={2.2} w={26} h={2.4} c="#12539E" r={2} />
      <B x={0} y={8} w={100} h={19} c="#DCE8F5" />
      <B x={7} y={12} w={40} h={3} c="#12539E" r={2} />
      <B x={7} y={17.5} w={30} h={2} c="#5A6B8C" r={2} />
      <div className="absolute rounded-full bg-masafi-blue" style={{ left: '68%', top: '10.5%', width: '24%', height: '11%' }} />
      <B x={7} y={30} w={86} h={1.8} c="#DDE3EC" r={2} />
      {[0, 1, 2, 3].map((i) => {
        const x = 7 + (i % 2) * 44, y = 34 + Math.floor(i / 2) * 23
        return (
          <span key={i}>
            <B x={x} y={y} w={41} h={22} c="#F2F6FB" r={6} />
            <B x={x + 6} y={y + 2} w={28} h={11} c="#E4EAF3" r={4} />
            <B x={x + 4} y={y + 15.5} w={24} h={1.4} c="#C4CDDA" r={2} />
            <B x={x + 27} y={y + 17} w={10} h={2.6} c="#12539E" r={3} />
          </span>
        )
      })}
      {[0, 1, 2, 3].map((i) => <B key={'t' + i} x={10 + i * 23} y={94.5} w={6} h={3} c={i === 0 ? '#12539E' : '#C9D2DE'} r={2} />)}
    </div>
  )
}
