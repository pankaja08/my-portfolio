# 🚀 Pankaja Yunidu — Personal Portfolio

> A modern, interactive developer portfolio built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion** — featuring glassmorphism UI, animated backgrounds, an interactive SVG robot contact bot, and a real-time anti-gravity particle effect.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📸 Preview

| Section | Feature |
|---|---|
| Hero | Animated typewriter + floating gradient orbs |
| Skills | Anti-gravity mouse-spotlight particle field |
| Projects | Airbnb-style cards with GitHub link animations |
| Contact | Interactive SVG robot that watches you type |

---

## 🗂️ Project Structure

```
MY_PORTFOLIO/
├── portfolio-temp/               # Next.js application root
│   ├── public/                   # Static assets (PDFs, images, certs)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout, fonts, metadata
│   │   │   ├── page.tsx          # Single-page composition (all sections)
│   │   │   └── globals.css       # Global styles, CSS variables, keyframes
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Sticky nav with active-section highlighting
│   │   │   ├── GlassCard.tsx     # Reusable glassmorphism card primitive
│   │   │   ├── PageLoader.tsx    # Full-screen intro animation
│   │   │   └── SocialIcons.tsx   # GitHub, LinkedIn SVG icon components
│   │   └── sections/
│   │       ├── Hero.tsx          # Landing hero with typewriter effect
│   │       ├── Skills.tsx        # Anti-gravity particle background
│   │       ├── Experience.tsx    # Timeline of work/education
│   │       ├── Projects.tsx      # Project showcase cards
│   │       ├── Certifications.tsx# Certificate gallery
│   │       ├── Contact.tsx       # Bot + contact form
│   │       └── Footer.tsx        # Social links & copyright
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🛠️ Technology Stack

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 (App Router) | React meta-framework, SSR, routing |
| **React** | 19 | UI component model |
| **TypeScript** | 5 | Static typing across all components |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | v4 | Utility-first CSS (`@import "tailwindcss"` — new CSS-first config) |
| **Vanilla CSS** | — | Custom keyframes, CSS variables, glassmorphism |

> **Note:** Tailwind v4 dropped `tailwind.config.js`. Configuration is done via `@theme` blocks directly in `globals.css`.

### Animation

| Technology | Version | Purpose |
|---|---|---|
| **Framer Motion** | 11 | Page transitions, scroll animations, spring physics |
| **CSS Keyframes** | — | `ag-float`, `ag-sway`, `pulse-blob`, `spin-slow` particle animations |
| **requestAnimationFrame** | Web API | 60 fps mask-image lerp for the spotlight effect |

### Form & Communication

| Technology | Purpose |
|---|---|
| **Formspree** | Serverless form backend — no backend code needed |
| **React state machine** | `idle → loading → success/error` form submission flow |

---

## ✨ Key Features & How They Work

### 1. 🌌 Anti-Gravity Particle Background (Skills Section)

**File:** [`src/sections/Skills.tsx`](portfolio-temp/src/sections/Skills.tsx)

**How it works:**

```
Mouse moves on <section>
      ↓
onMouseMove → writes to mouseRef (no re-render)
      ↓
requestAnimationFrame loop (60fps) reads mouseRef
      ↓
Lerps cx/cy toward cursor: cx += (target - cx) * 0.12
      ↓
Updates maskImage on the icon layer div directly (DOM mutation)
      ↓
radial-gradient spotlight reveals floating icons
```

**Key implementation details:**

- **28 particles** generated with a seeded LCG (`Math.sin` based) — deterministic on both server and client, preventing React hydration mismatches
- All float values rounded to **4 decimal places** (`Math.round(n * 1e4) / 1e4`) so SSR HTML exactly matches client HTML
- Mouse tracking on the `<section>` element — events bubble through z-index:10 cards naturally
- The particle `<div>` has `pointerEvents: "none"` so card clicks are never blocked
- **`mounted` guard** (`useState(false)` + `useEffect(() => setMounted(true))`) skips SSR rendering entirely, eliminating hydration mismatches

```tsx
// Seeded random — same output on server and client
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// RAF-based spotlight lerp
function tick() {
  cx += (mouseRef.current.x - cx) * 0.12;
  cy += (mouseRef.current.y - cy) * 0.12;
  el.style.maskImage = `radial-gradient(circle 350px at ${cx}px ${cy}px, ...)`;
  rafRef.current = requestAnimationFrame(tick);
}
```

---

### 2. 🤖 Interactive SVG Robot (Contact Section)

**File:** [`src/sections/Contact.tsx`](portfolio-temp/src/sections/Contact.tsx)

**How it works:**

```
User types in any form field
      ↓
onChange fires → handleTyping()
      ↓
setIsTyping(true) + debounce timer reset (1200ms)
      ↓
Framer Motion springs react to isTyping boolean:
  • Head chassis: x:-12, rotate:-6° (stiffness:180)
  • Eye pupils:   x:-16, y:+4, scaleY:0.9 (stiffness:220)
  • Mouth path:   scaleX:0.6, x:-4 (stiffness:200)
      ↓
1.2s of silence → setIsTyping(false) → robot re-centers
```

**Key implementation details:**

- All robot parts are **pure inline SVG** — zero image dependencies
- `motion.path` cannot animate `scaleX` directly in SVG context → wrapped in `<motion.g>` instead
- Spring physics used throughout (not tween) for natural, physical feel
- Debounce uses `useRef<NodeJS.Timeout>` to avoid stale closures
- `AnimatePresence` handles the "I see you typing!" callout bubble entrance/exit

```tsx
// Debounced typing detection
const handleTyping = useCallback(() => {
  setIsTyping(true);
  if (typingTimer.current) clearTimeout(typingTimer.current);
  typingTimer.current = setTimeout(() => setIsTyping(false), 1200);
}, []);
```

---

### 3. 🃏 Project Cards (Projects Section)

**File:** [`src/sections/Projects.tsx`](portfolio-temp/src/sections/Projects.tsx)

**How it works:**

- Airbnb-inspired card layout: image top, gradient overlay, content below
- GitHub button uses animated `max-width` transition on hover (reveal effect)
- Card image area uses a CSS gradient overlay for text readability
- `GithubIcon` imported from local `SocialIcons.tsx` component (avoids lucide-react build errors)

---

### 4. 🎨 Glassmorphism Design System

**File:** [`src/app/globals.css`](portfolio-temp/src/app/globals.css)

Core CSS variables used site-wide:

```css
/* Glassmorphism layers */
.glass        → backdrop-blur(12px) + bg white/5 + border white/10
.glass-heavy  → backdrop-blur(24px) + bg white/8 + border white/15

/* Brand colors */
--color-sky:    #38bdf8   (cyan accent)
--color-indigo: #818cf8   (purple accent)

/* Text gradient */
.text-gradient → linear-gradient(135deg, #38bdf8, #818cf8)
```

---

### 5. 📬 Contact Form — State Machine

**File:** [`src/sections/Contact.tsx`](portfolio-temp/src/sections/Contact.tsx)

```
FormState: "idle" | "loading" | "success" | "error"

idle    → user fills form → clicks submit
loading → fetch POST to Formspree API
success → AnimatePresence shows success screen
error   → inline error message shown
```

Fields have **three visual states** managed by `focused` state:
- **Default** — dark border, grey icon
- **Focused** — cyan border glow + `0 0 0 3px` outer ring + gradient left accent bar + cyan icon
- **Error** — red border + animated error message (`motion.p` slide-in)

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/pankaja08/my-portfolio.git
cd my-portfolio/portfolio-temp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Vercel (Recommended — free)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. **Add New Project** → Import `pankaja08/my-portfolio`
3. Set **Root Directory** → `portfolio-temp`
4. Click **Deploy**

Your site will be live at `https://my-portfolio-pankaja.vercel.app`

### Environment Variables (for Contact Form)

Update this line in `Contact.tsx` with your Formspree form ID:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

Get a free form ID at [formspree.io](https://formspree.io) (50 submissions/month free).

---

## 📦 NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Turbopack dev server on port 3000 |
| `npm run build` | Build optimised production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint across all source files |

---

## 🔑 Key React Patterns Used

| Pattern | Where Used | Why |
|---|---|---|
| `useRef` for RAF | Skills, Contact | Avoids re-renders in animation loops |
| `useCallback` | Skills, Contact | Stable event handler references |
| `mounted` guard | Skills | Prevents SSR hydration mismatch |
| `AnimatePresence` | Contact, Navbar | Smooth mount/unmount transitions |
| `whileInView` | All sections | Scroll-triggered entrance animations |
| Seeded LCG random | Skills | Deterministic particles (no hydration errors) |
| `motion.g` wrapper | Contact SVG | Fix: `scaleX` not animatable on SVG `<path>` |

---

## 📄 License

MIT © [Pankaja Yunidu](https://github.com/pankaja08)

---

<div align="center">
  <p>Built with ❤️ using Next.js, Tailwind CSS & Framer Motion</p>
  <a href="https://github.com/pankaja08/my-portfolio">⭐ Star this repo if you found it helpful!</a>
</div>
