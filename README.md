# Ashnab Jamshad — Portfolio (React + Tailwind)

Vite + React 18 + Tailwind CSS 3.4 + React Router 6 migration of the approved portfolio and the Masafi Ecommerce Website case study.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Structure

- `src/pages` — `Home` (landing) and `MasafiCaseStudy` (`/case-studies/masafi`)
- `src/layouts/SiteChrome` — atmosphere, grain, cursor, scroll progress, glass nav
- `src/components/ui.jsx` — Reveal, Magnetic, SectionHead, Cursor, ScrollProgress, Nav, PhoneMock, BrowserMock
- `src/hooks/hooks.js` — useReveal, useCountUp, useMagnetic, useTilt, useMeta, reduced-motion flag
- `src/data/content.js` — all copy and project data (single source for content edits)
- `src/styles/index.css` — Tailwind layers + the few effects Tailwind can't express (keyframes, grain, clip reveals)
- `tailwind.config.js` — design tokens: colors, fonts, shadows, easing, breakpoints (561/721/981/1181 mirroring the approved 560/720/980/1180 cuts)

## Deploy (Vercel)

Framework preset: Vite. `vercel.json` includes the SPA rewrite so `/case-studies/masafi` works on direct access and refresh.
