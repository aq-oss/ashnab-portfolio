import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MasafiCaseStudy from './pages/MasafiCaseStudy'
import SiteChrome from './layouts/SiteChrome'

/* Scroll to top (or to #hash target) on route change. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <SiteChrome>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/masafi" element={<MasafiCaseStudy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </SiteChrome>
    </>
  )
}
