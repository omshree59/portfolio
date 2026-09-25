# 🌐 Omshree Parida — Portfolio

> A high-performance, visually immersive personal portfolio built with **Next.js 16**, **React 19**, **Three.js**, and **Framer Motion** — designed to push the boundaries of creative web development.

🔗 **Live Site → [omshree.is-a.dev](https://omshree.is-a.dev/)**

---

## ✨ Features

- 🎬 **Cinematic Hero Section** — scroll-triggered fade with a full-screen interactive entry experience
- 🌀 **WebGL Circular Gallery** — drag/scroll-based 3D image carousel powered by OGL
- 🌊 **Aurora Background** — reactive WebGL aurora shader (cyan × orange × violet)
- 🖱️ **Blob Cursor & Custom Cursor** — silky-smooth magnetic blob that follows your mouse
- 📜 **Scroll Reveal Animations** — viewport-triggered entrance animations via Framer Motion
- 📊 **Bento Stats Grid** — GitHub activity calendar + personal achievements at a glance
- 🏅 **Certifications Showcase** — AWS, Databricks, Google Cloud, IBM, Neo4j, TCS, and more
- 🛠️ **Tech Stack Section** — animated display of languages, frameworks, and tools
- 📆 **Timeline** — professional journey rendered as an interactive vertical timeline
- 🎮 **Interactive Gallery** — project screenshots with hover interactions
- 💬 **AI Chat Ai**
- 🌙 **Ambient Background** — subtle always-on ambient lighting layer
- 📬 **Contact Section** — clean contact form / links
- ♿ **Reduced Motion Support** — all animations respect `prefers-reduced-motion`
- ⚡ **Aggressive Code Splitting** — every below-the-fold component is lazy-loaded; nothing renders until the hero is done

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| 3D / WebGL | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [OGL](https://github.com/oframe/ogl) |
| Physics | [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Post-processing | [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) |
| GitHub Stats | [react-github-calendar](https://grubersjoe.github.io/react-github-calendar/) |
| Language | TypeScript 5 |

---

## 📁 Project Structure

```
portfolio-main/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint
│   ├── globals.css               # Global styles & Tailwind base
│   ├── layout.tsx                # Root layout (metadata, cursor, ambient bg)
│   └── page.tsx                  # Main page — orchestrates all sections
│
├── components/
│   ├── ui/
│   │   ├── particle-effect-for-hero.tsx
│   │   └── pixelated-canvas.tsx
│   ├── About.tsx
│   ├── AmbientBackground.tsx     # Always-on ambient glow layer
│   ├── Aurora.tsx                # WebGL aurora shader background
│   ├── BentoStats.tsx            # Stats bento grid + GitHub calendar
│   ├── BlobCursor.tsx            # Magnetic blob cursor
│   ├── Certifications.tsx        # Certification badges showcase
│   ├── CircularGallery.tsx       # OGL-powered 3D rotating gallery
│   ├── Contact.tsx               # Contact form / social links
│   ├── CustomCursor.tsx          # Secondary custom cursor layer
│   ├── DepthText.tsx             # 3D depth text effect
│   ├── Footer.tsx
│   ├── HeroFramer.tsx            # Hero entry animation (Framer Motion)
│   ├── InfiniteSpiral.tsx        # Scroll-driven spiral animation
│   ├── InteractiveGallery.tsx    # Project screenshots gallery
│   ├── Navbar.tsx
│   ├── Overlay.tsx
│   ├── ParticleText.tsx          # Text dissolve into particles
│   ├── PeekingCat.tsx            # Easter egg 🐱
│   ├── PixelBlast.tsx            # Pixel explosion effect
│   ├── Projects.tsx              # Featured projects section
│   ├── ScrollProgress.tsx        # Top scroll-progress bar
│   ├── ScrollyCanvas.tsx         # Scroll-synced canvas animation
│   ├── SpotlightCard.tsx         # Mouse-spotlight hover card
│   ├── TechStack.tsx             # Tech icons / skills display
│   ├── TextType.tsx              # Typewriter text component
│   └── Timeline.tsx              # Career / education timeline
│
├── public/
│   ├── images/                   # Certification badges & project screenshots
│   └── sequence/                 # Frame-by-frame image sequence (hero animation)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or `pnpm` / `yarn`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/omshree59/portfolio.git
cd portfolio-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server with hot-reload |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the project |

---

## ⚡ Performance Architecture

The site uses a **progressive loading strategy** to guarantee the hero experience always loads first:

1. **Hero mounts immediately** — only `Navbar` + `HeroFramer` are in the initial render.
2. **Scroll is locked** (`overflow: hidden`) while the hero loads.
3. **After `onLoaded` fires** — the `isHeroReady` gate opens and all other sections mount.
4. **Every below-the-fold component** uses `next/dynamic` with `ssr: false` to split them into separate chunks.
5. **`ScrollReveal` wrapper** — all sections fade/slide in on viewport entry (skipped if `prefers-reduced-motion` is set).

---



```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

For other platforms (Netlify, AWS, etc.), run `npm run build` and serve the `.next/` output directory.

---

## 📄 License

This project is for personal portfolio use. Feel free to take inspiration, but please don't clone it wholesale and present it as your own work.

---

<div align="center">
  <sub>Built with 💙 by <strong>Omshree Parida</strong></sub>
</div>