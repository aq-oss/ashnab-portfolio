/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Breakpoints mirror the approved design's max-width cuts (560/720/980/1180)
    screens: {
      sm: '561px',
      md: '721px',
      lg: '981px',
      xl: '1181px',
    },
    extend: {
      colors: {
        bg: '#F4F4F2',
        warm: '#F7F6F3',
        surface: '#FFFFFF',
        ink: { DEFAULT: '#111213', 2: '#55585E', 3: '#8A8D93' },
        accent: { DEFAULT: '#2547F4', 2: '#7C5CFF' },
        line: { DEFAULT: '#DCDCD8', 2: '#E8E8E4' },
        dark: '#101114',
        masafi: {
          blue: '#12539E',
          navy: '#0C2E5C',
          sky: '#DCE8F5',
          cloud: '#F2F6FB',
          ink: '#14181F',
          slate: '#5A6B8C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        quart: 'cubic-bezier(.22,1,.36,1)',
      },
      boxShadow: {
        phone: '0 30px 66px -20px rgba(17,18,19,.34), 0 0 56px -26px rgba(37,71,244,.38)',
        browser: '0 30px 76px -22px rgba(17,18,19,.4), 0 0 66px -30px rgba(37,71,244,.36)',
        heroshot: '0 40px 90px -30px rgba(17,18,19,.22)',
        chip: '0 18px 44px rgba(17,18,19,.14)',
        subnav: '0 10px 28px -10px rgba(17,18,19,.14)',
        ctaHover: '0 16px 40px -10px rgba(37,71,244,.6)',
        emailBtn: '0 14px 40px -8px rgba(37,71,244,.55)',
        mock: '0 30px 70px -24px rgba(17,18,19,.2)',
      },
      backgroundImage: {
        grad: 'linear-gradient(120deg,#2547F4,#7C5CFF)',
      },
    },
  },
  plugins: [],
}
