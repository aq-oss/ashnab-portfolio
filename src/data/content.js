/* All page copy in one place so components stay lean and content edits are one-file. */

export const projects = [
  {
    num: '01', title: 'Masafi Ecommerce Store', bg: 'bg-bg',
    industry: 'FMCG · Ecommerce', role: 'Product UI/UX Designer', duration: '2025 → Present',
    summary: 'Product UI for the masafi.com ecommerce storefront. Wireframes and high fidelity prototypes, iterated in agile sprints with product managers and researchers.',
    chip: '+25% user engagement',
    mock: { type: 'phones', front: '/project-images/masafi-app-2.jpg', back: '/project-images/masafi-app.jpg', frontAlt: 'Masafi app splash screen', backAlt: 'Masafi app store screen' },
    caseStudy: null,
  },
  {
    num: '02', title: 'Masafi Ecommerce Website', bg: 'bg-surface',
    industry: 'FMCG · Ecommerce', role: 'Product UI/UX Designer', duration: '2025 → Present',
    summary: 'Responsive UI for the masafi.com ecommerce website, from wireframes through to high fidelity screens, documented so engineering could implement it consistently across breakpoints.',
    chip: '30% faster time to market',
    mock: { type: 'browser', src: '/project-images/masafi-ecom.jpg', alt: 'Masafi ecommerce website' },
    caseStudy: '/case-studies/masafi',
  },
  {
    num: '03', title: 'Mindful Companion', bg: 'bg-bg',
    industry: 'Mobile App · Health & Wellness', role: 'UI/UX Designer', duration: 'To be confirmed',
    summary: 'Temporary placeholder project. A calm, habit forming meditation app covering onboarding, mood tracking and daily practice flows.',
    chip: '+42% 30-day retention',
    mock: { type: 'phones', front: '/project-images/aimi-home.jpeg', back: '/project-images/aimi-splash.jpeg', frontAlt: 'Mindful Companion home screen', backAlt: 'Mindful Companion splash screen' },
    caseStudy: null,
  },
  {
    num: '04', title: 'Neto AI', bg: 'bg-surface',
    industry: 'AI Assistant · Productivity', role: 'UI/UX Designer', duration: 'To be confirmed',
    summary: 'Temporary placeholder project. A conversational AI product covering chat UX, system states and the trust patterns around them.',
    chip: '92% task completion rate',
    mock: { type: 'browser', src: '/project-images/natoai-dashboard.jpeg', alt: 'Neto AI dashboard', mid: true },
    caseStudy: null,
  },
  {
    num: '05', title: 'Deepswan', bg: 'bg-dark', dark: true,
    industry: 'AI Startup · Brand & Product', role: 'UI/UX Designer', duration: 'To be confirmed',
    summary: 'Temporary placeholder project. Brand to product design covering the marketing site, onboarding and core product UI.',
    chip: 'Seed round closed in 6 weeks',
    mock: { type: 'browser', src: '/project-images/deepswan-courses.jpeg', alt: 'Deepswan courses platform', mid: true },
    caseStudy: null,
  },
]

export const experience = [
  { period: '2025 → Present', co: 'Masafi Corp', role: 'Group Graphic Multimedia Designer, Product UI/UX', desc: 'Product UI for the masafi.com ecommerce website. Wireframes, high fidelity prototypes and Figma sticker sheets for the design system library, delivered in agile sprints.' },
  { period: '2023 → 2025', co: 'INOI Global Mobile Phones LLC', role: 'User Interface Designer, Graphic Designer', desc: 'Storyboards, user flows and sitemaps for the INOI web store, plus a custom UI design system for the Android Warranty app and Amazon A+ content.' },
  { period: '2021 → 2023', co: 'Rex Technologies', role: 'UI Designer, Graphic Designer', desc: 'Wireframes, mockups and interactive prototypes in Figma and Adobe XD. Ran usability and A/B testing on three mobile app projects and supported developer handoff.' },
  { period: '2017 → 2021', co: 'Superior University', role: 'BSc Computer Sciences, HCI & Digital Design', desc: 'BSc Computer Sciences with a focus on Human Computer Interaction and Digital Design, including a hands on UI/UX and web design internship.' },
]

export const skills = [
  ['01', 'Information Architecture', 'Structuring content and navigation so people always know where they are.'],
  ['02', 'Interaction Design', 'Designing flows and states that feel obvious the first time you use them.'],
  ['03', 'Usability & A/B Testing', 'Validating decisions with real users, then iterating on what the data shows.'],
  ['04', 'Design Systems', 'Component libraries, variants and states that keep products consistent.'],
  ['05', 'Wireframing & Prototyping', 'Low fidelity wireframes through to interactive high fidelity prototypes.'],
  ['06', 'Motion & Micro-interactions', 'Micro-interactions built in LottieFiles and After Effects to add UI polish.'],
  ['07', 'UX Writing', 'Clear, honest interface copy that helps people move forward.'],
  ['08', 'Responsive Design', 'Layouts that hold up across mobile, tablet and desktop breakpoints.'],
]

export const process = [
  ['01', 'Discover', 'Research and stakeholder conversations to document the problem space.'],
  ['02', 'Define', 'Information architecture, user flows and sitemaps that frame the solution.'],
  ['03', 'Design', 'Wireframes and high fidelity UI in Figma, built on a component library.'],
  ['04', 'Validate', 'Interactive prototypes, usability testing and A/B testing, then iterate.'],
  ['05', 'Deliver', 'Specs, sticker sheets and handoff, with sign off across the teams involved.'],
]

export const tools = [
  ['Design & Prototyping', ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Wireframing', 'Prototyping']],
  ['Motion & 3D', ['LottieFiles', 'After Effects', 'Blender']],
  ['Handoff & Delivery', ['Design specs', 'Sticker sheets', 'Basic HTML/CSS']],
]

export const education = [
  ['Education', 'Superior University · BSc Computer Sciences (HCI & Digital Design), 2017 to 2021'],
  ['Google Certificates', 'Foundations of UX Design · UX Design Process: Empathize, Define, Ideate · Wireframes and Low-Fidelity Prototypes · Conduct UX Research and Test Early Concepts'],
  ['Udemy Certificates', 'Figma UI UX Design Essentials · User Experience Design Essentials, Adobe XD'],
]

/* ----- Masafi case study content ----- */
export const cs = {
  constraints: [
    ['Broad catalogue', 'Multiple ranges and pack sizes competing for the same attention on one page.'],
    ['Promo heavy', 'Always-on offers had to feel premium, not like a discount flyer.'],
    ['Sprint cadence', 'New screens shipped continuously, so the UI had to be systematised, not bespoke.'],
  ],
  goals: [
    ['01', 'Make the range scannable', 'Let a shopper understand what Masafi sells, and pick a pack size, without hunting.'],
    ['02', 'Merchandise offers with restraint', 'Give promotions real estate and hierarchy so they convert without cheapening the brand.'],
    ['03', 'Ship faster with engineering', 'Replace one-off screens with documented components so build time drops sprint on sprint.'],
    ['04', 'Hold up across breakpoints', 'One layout system that degrades gracefully from desktop to mobile.'],
  ],
  methods: ['Storefront audit', 'Stakeholder interviews', 'Catalogue mapping', 'Competitor review', 'Usability testing', 'A/B testing'],
  insights: [
    ['01', 'Shoppers buy by pack, not by product', 'Size and quantity mattered more than the product name, so cards had to lead with format.'],
    ['02', 'Offers were doing the navigating', 'Promotions were the main entry point, so they needed structure rather than suppression.'],
    ['03', 'Every screen was bespoke', 'Repeated patterns were rebuilt each time, which is where the delivery time was going.'],
  ],
  flow1: [
    ['Landing', 'Range overview'], ['Category', 'Water · Hygiene'], ['Product detail', 'Pack, size, price', true],
    ['Cart', 'Review & edit'], ['Checkout', 'Delivery & pay'], ['Confirmation', 'Order placed'],
  ],
  flow2: [
    ['Campaign', 'Buy 5 get 1', true], ['Deals page', 'Offer grid'], ['Product detail', 'Pack, size, price'], ['Cart', 'Review & edit'],
  ],
  palette: [
    ['Masafi Blue', '#12539E', 'Primary actions, links'],
    ['Deep Navy', '#0C2E5C', 'Headlines, footer'],
    ['Sky', '#DCE8F5', 'Merchandising bands', true],
    ['Cloud', '#F2F6FB', 'Section backgrounds', true],
    ['Ink', '#14181F', 'Body copy'],
    ['Slate', '#5A6B8C', 'Secondary copy'],
  ],
  typeScale: [
    ['Display', '44 / 118 / -1.5', 34],
    ['Heading', '28 / 130 / -1', 24],
    ['Subhead', '20 / 140 / -0.5', 18],
    ['Body', '16 / 165 / 0', 15, 'The quick brown fox'],
    ['Caption', '13 / 150 / 0', 12.5, 'The quick brown fox'],
  ],
  details: [
    ['c1', 'Header & navigation', 'Range-led categories with search, wishlist and account'],
    ['c2', 'Merchandising band', 'Three fixed offer slots so campaigns swap without redesign'],
    ['c3', 'Product grid', 'Cards lead with pack format, price and a single add action'],
  ],
  decisions: [
    ['01', 'Offers were doing the navigating', 'Gave promotions a dedicated band with three fixed slots directly under the header, instead of scattering them through the page.', 'Campaigns now ship by swapping content, not by redesigning a layout.'],
    ['02', 'Pack format was buried in product copy', 'Restructured the product card to lead with format and quantity, with price and a single add action beneath.', 'Shoppers compare like for like without opening every product.'],
    ['03', 'Every template was being rebuilt by hand', 'Documented a sticker sheet of buttons, cards, chips, inputs and badges with their variants and states.', 'Engineering builds from one source, which is where the delivery time was recovered.'],
  ],
  stats: [
    ['+25%', 'User engagement', 'Measured after the storefront and prototype work shipped.'],
    ['30%', 'Faster time to market', 'Delivery time recovered by building from documented components.'],
    ['1', 'Shared component library', 'Sticker sheet now used across Masafi product surfaces.'],
  ],
  learnings: [
    ['Systems earn their keep in sprint three', 'The library felt like overhead in week one and paid for itself the moment campaigns started shipping weekly.'],
    ['Merchandising is an IA problem', 'Treating offers as structure rather than decoration was what stopped the page feeling like a flyer.'],
    ['Documenting the why speeds sign-off', 'Writing down the problem and solution space turned review meetings from opinion into comparison.'],
  ],
}
