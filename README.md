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

## 💬 Ask Marco chat

A floating chat widget answers visitors' questions using only the content in `content/` — the same data the page renders.

- Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` to try it locally (rate limiting is skipped in dev without Upstash).
- In production the widget stays hidden unless `OPENAI_API_KEY` **and** Upstash credentials are set.
- Limits: 20 messages per IP per hour, 500 characters per message, 20 messages per conversation, 400 output tokens per reply.
- Set a monthly hard spend limit in the OpenAI dashboard as a cost backstop.
- Edit `content/*.ts` to change what the site shows *and* what the bot knows. Run `npm test` after editing.
