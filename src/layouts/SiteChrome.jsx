import { Cursor, ScrollProgress, Nav } from '../components/ui'

/* Shared chrome around every route: ambient atmosphere, grain, cursor,
   scroll progress and the fixed glass nav. */
export default function SiteChrome({ children }) {
  return (
    <>
      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 -top-40 h-[540px] w-[540px] rounded-full opacity-45 blur-[90px] [background:radial-gradient(circle,rgba(37,71,244,.18),transparent_68%)]" />
        <div className="absolute -right-40 top-[46%] h-[500px] w-[500px] rounded-full opacity-45 blur-[90px] [background:radial-gradient(circle,rgba(124,92,255,.14),transparent_68%)]" />
        <div className="absolute -bottom-36 left-[34%] h-[460px] w-[460px] rounded-full opacity-45 blur-[90px] [background:radial-gradient(circle,rgba(37,71,244,.10),transparent_68%)]" />
      </div>
      <div aria-hidden className="grain" />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <div className="relative z-[3]">{children}</div>
    </>
  )
}
