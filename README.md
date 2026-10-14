<div align="center">

  # 🏎️ OMSHREE PARIDA
  ### Creative Developer & AI Engineer Portfolio

  <p align="center">
    <strong>A high-performance, visually immersive 3D personal portfolio engineered with Next.js 16, React 19, Three.js, GSAP, and Framer Motion.</strong>
  </p>

  <p align="center">
    <a href="https://omshree.is-a.dev/"><strong>Explore Live Experience »</strong></a>
    <br />
    <br />
    <a href="https://github.com/omshree59">GitHub</a>
    ·
    <a href="https://linkedin.com/in/omshree-parida">LinkedIn</a>
    ·
    <a href="mailto:paridaomshree@gmail.com">Contact</a>
  </p>

  <!-- Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/GSAP%203-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>

</div>

<br />

---

## 📸 Overview & Highlights

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🎬 Cinematic 3D Hero</h3>
      <p align="center">Scroll-driven perspective with Framer 3D canvas and seamless fading telemetry.</p>
    </td>
    <td width="50%">
      <h3 align="center">⚡ JohnPradeep GSAP Preloader</h3>
      <p align="center">Signature staggered 3D skew text transition curtain with 120 FPS GPU hardware acceleration.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">🌀 OGL Circular Gallery</h3>
      <p align="center">Drag-and-scroll curved cylindrical 3D image gallery rendered with WebGL shaders.</p>
    </td>
    <td width="50%">
      <h3 align="center">🤖 Cloud5 AI Direct Contact</h3>
      <p align="center">Intelligent portfolio chatbot that collects details and dispatches live emails straight to Gmail.</p>
    </td>
  </tr>
</table>

---

## ⚡ Key Features

- 🏎️ **F1 & Cyberpunk Visual Identity** — Inspired by telemetry racing HUDs and futuristic dark-mode aesthetics with glowing cyan (`#06b6d4`) and electric orange (`#f97316`) accents.
- 🎭 **JohnPradeep-Inspired GSAP Preloader** — Signature staggered 3D skew reveal (`Designer,` `Developer,` `Dominator.`) pulling up into the site with smooth `height: 0vh` easing.
- 💾 **Persistent Device Cache Storage** — Native browser `CacheStorage` API and a background Service Worker (`sw.js`) cache all 40+ media assets on the visitor's device for instant 0ms reload speed.
- 🖱️ **Zero-Latency 120 FPS Custom Cursor** — Ultra-responsive lerp tracking (`0.45`), instant coordinate initialization, and native event bubbling with difference blend mode.
- 💬 **Cloud5 AI Contact Agent with Live Gmail Dispatch** — Visitors can type *"Connect me to Omshree"* to enter an interactive conversation or fill an inline card. Powered by `nodemailer` with Google App Passwords to deliver live emails directly to `paridaomshree@gmail.com`.
- 🌀 **OGL WebGL Cylindrical Gallery** — Interactive curved cylinder gallery powered by lightweight OGL with smooth scroll friction and GPU texture decoding.
- 🌌 **Reactive Aurora Shader** — Custom WebGL background shader with dynamic wave amplitude, speed, and multi-color blending.
- 📊 **Bento Stats & GitHub Contributions** — Live GitHub contribution calendar combined with technical accomplishments and personal metrics.
- 📱 **Fully Responsive & Accessible** — Optimized across mobile, tablet, and ultra-wide displays with comprehensive `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack & Architecture

```
                       ┌──────────────────────────────────────────────┐
                       │          Next.js 16 App Router               │
                       └──────┬────────────────────────────────┬──────┘
                              │                                │
                ┌─────────────▼──────────────┐   ┌─────────────▼──────────────┐
                │        Frontend UI         │   │       Serverless API       │
                ├────────────────────────────┤   ├────────────────────────────┤
                │ • React 19                 │   │ • /api/send-email          │
                │ • Tailwind CSS v4          │   │   └─ Nodemailer + Gmail    │
                │ • Framer Motion            │   │ • /api/chat                │
                │ • GSAP 3                   │   │   └─ Bytez Llama 3 SDK     │
                │ • Lucide Icons             │   │ • Route Handlers           │
                └─────────────┬──────────────┘   └────────────────────────────┘
                              │
                ┌─────────────▼──────────────┐
                │   3D & WebGL Pipeline      │
                ├────────────────────────────┤
                │ • Three.js                 │
                │ • @react-three/fiber       │
                │ • @react-three/drei        │
                │ • OGL (Minimal WebGL)      │
                │ • Custom GLSL Shaders      │
                └────────────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | [Next.js 16](https://nextjs.org/) | App Router, Turbopack, dynamic routing & serverless API |
| **UI Library** | [React 19](https://react.dev/) | Concurrent rendering, hooks & component state |
| **3D & Shaders** | [Three.js](https://threejs.org/) & [OGL](https://github.com/oframe/ogl) | 3D rendering, mesh geometry, texture decoders & GLSL aurora |
| **React 3D** | [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [drei](https://github.com/pmndrs/drei) | Declarative Three.js scene graphs for Certifications |
| **Motion & FX** | [GSAP 3](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/) | Cinematic preloader animations & viewport scroll reveals |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS engine with hardware-accelerated utilities |
| **Email Transport** | [Nodemailer](https://nodemailer.com/) | Gmail SMTP delivery via secure Google App Passwords |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, lightweight SVG icon system |
| **Offline Cache** | [Service Worker + Cache API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) | Local asset persistence on user device for instant reloads |

---

## 📁 Repository Structure

```plaintext
portfolio-main/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts            # Bytez Llama-3 AI agent API
│   │   └── send-email/
│   │       └── route.ts            # Direct Gmail SMTP transport
│   ├── globals.css                 # Global styles & Tailwind base
│   ├── layout.tsx                  # Root layout, cursor & ambient canvas
│   └── page.tsx                    # Main orchestrator & lazy-mount gates
│
├── components/
│   ├── ui/
│   │   ├── particle-effect-for-hero.tsx
│   │   └── pixelated-canvas.tsx
│   ├── About.tsx                   # F1 track parallax & 3D text cube
│   ├── AmbientBackground.tsx       # Subtle floating ambient particles
│   ├── Aurora.tsx                  # WebGL aurora wave shader
│   ├── BentoStats.tsx              # GitHub calendar & technical bento grid
│   ├── BlobCursor.tsx              # Zero-latency 120 FPS magnetic cursor
│   ├── Certifications.tsx          # 18+ Credential badges & 3D spiral
│   ├── CircularGallery.tsx         # OGL curved cylindrical WebGL carousel
│   ├── Contact.tsx                 # Cloud5 AI interactive direct email chatbox
│   ├── Footer.tsx                  # Social links & copyright telemetry
│   ├── HeroFramer.tsx              # Framer 3D interactive hero canvas
│   ├── InfiniteSpiral.tsx          # Three.js fiber spiral scene
│   ├── InteractiveGallery.tsx      # Chapter-based slide showcase
│   ├── LoadingScreen.tsx           # JohnPradeep GSAP staggered preloader
│   ├── Navbar.tsx                  # Floating pill navigation
│   ├── Projects.tsx                # Featured projects with live links
│   ├── TechStack.tsx               # Interactive skill telemetry cards
│   ├── TextType.tsx                # Dynamic typewriter text animator
│   └── Timeline.tsx                # Education & experience timeline
│
├── lib/
│   └── preloader.ts                # CacheStorage manager & GPU texture pre-warmer
│
├── public/
│   ├── images/                     # Skill badges & project screenshots
│   ├── sw.js                       # Service Worker for local device caching
│   └── track.jpg                   # High-res cinematic background
│
├── .env.example                    # Environment variable template
├── next.config.ts                  # Next.js production configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── package.json                    # Project dependencies & scripts
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/omshree59/portfolio.git
cd portfolio-main

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your credentials:

```env
# Google App Password for live Contact Chatbox emails
EMAIL_USER=paridaomshree@gmail.com
EMAIL_PASS=your_16_character_app_password

# (Optional) Bytez API Key for Cloud5 LLM server
BYTEZ_API_KEY=your_bytez_api_key
```

> **How to get a Gmail App Password:**
> 1. Turn on **2-Step Verification** in [Google Account Security](https://myaccount.google.com/security).
> 2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
> 3. Create an app named `Portfolio` and paste the generated 16-character code into `EMAIL_PASS`.

### 3. Launch Development Server

```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## 📜 Available NPM Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles an optimized production build |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint across all TypeScript and TSX files |

---

## 🏎️ Performance Optimizations

- **Non-Blocking Asset Pre-Warming**: Critical textures are fetched into `CacheStorage` in the background with small batch intervals (`requestIdleCallback`) so the UI thread never drops frames.
- **Hardware-Accelerated Skew Animations**: GSAP transitions operate exclusively on `transform` and `opacity` with `force3D: true` to leverage the GPU compositor.
- **Deferred Heavy Mounting**: Heavy WebGL canvases (`Aurora`, `CircularGallery`, `InfiniteSpiral`) mount 80ms after the preloader curtain lifts, granting 100% CPU priority to the hero entry.
- **Instant Cursor Snapping**: `BlobCursor` snaps directly to initial mouse coordinates on frame 1 to eliminate off-screen catch-up latency.

---

## 📬 Contact & Connect

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-omshree.is--a.dev-06b6d4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://omshree.is-a.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-omshree59-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omshree59)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Omshree%20Parida-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/omshree-parida)
[![Email](https://img.shields.io/badge/Email-paridaomshree%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:paridaomshree@gmail.com)

<br />

<sub>Designed & Engineered with ❤️ and high-octane passion by <strong>Omshree Parida</strong></sub>

</div>