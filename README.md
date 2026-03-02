# Marco Ruslie — Portfolio

A futuristic, cyberpunk-styled portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- Custom animated cursor with spring physics
- Glitch effect on hero name
- Scroll-triggered reveal animations
- Animated stat counters
- Timeline-based experience section
- Terminal-style contact card
- Scanline + grain texture overlay
- Floating ambient orbs
- Responsive design

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Next/font** (Google Fonts: Syne, Space Mono, Share Tech Mono)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout, fonts, metadata
│   ├── page.tsx         # Main page assembly
│   └── globals.css      # Global styles, CSS variables
├── components/
│   ├── Background.tsx   # Grid + floating orbs
│   ├── Cursor.tsx       # Custom animated cursor
│   ├── Navbar.tsx       # Fixed navigation
│   ├── Hero.tsx         # Hero section with glitch
│   ├── About.tsx        # About + animated stats
│   ├── Skills.tsx       # Tech stack grid
│   ├── Experience.tsx   # Timeline experience
│   ├── Contact.tsx      # Contact + terminal card
│   ├── Footer.tsx       # Footer
│   └── ui.tsx           # Shared UI primitives
```

## 🎨 Customization

Update your details in the components:
- **Hero.tsx** — Your name & tagline
- **About.tsx** — Bio & stats
- **Skills.tsx** — Add/remove skills
- **Experience.tsx** — Work history
- **Contact.tsx** — Email, GitHub, LinkedIn URLs

## 🚢 Deploy

Deploy instantly with [Vercel](https://vercel.com/):

```bash
npx vercel
```
