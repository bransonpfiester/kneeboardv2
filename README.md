# Savora

Savora is a mobile-first cooking companion built with React, TypeScript, and Tailwind CSS. It guides new home cooks through calming, step-by-step recipes and remembers their preferences directly in the browser.

## Features

- **Intentional onboarding** – welcome, goal selection, diet preferences, and a confirmation screen that stores data in `localStorage` so returning cooks jump straight into the experience.
- **Cook Mode** – focuses on one step at a time with clear progress, back/next controls, and saved position so you can pause and resume without losing momentum.
- **Beginner-friendly recipes** – three curated dishes with ingredient lists, time and serving info, and progress indicators for quick resumes.
- **Liquid glass UI** – blurred, semi-transparent panels with soft gradients, rounded edges, and motion for a soothing kitchen aesthetic.
- **Offline-ready PWA** – installable manifest plus a vanilla service worker for caching core assets and enabling add-to-home-screen flows.

## Getting started

```bash
npm install
npm run dev
```

The app is fully responsive. Open it on a mobile-sized viewport for the intended experience.

## Available scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check and create an optimized production build.
- `npm run lint` – lint the project with ESLint.
- `npm run preview` – locally preview the production build after running `build`.

## Progressive Web App details

- `public/manifest.json` describes the installable app shell, theme colors, and icons.
- `public/service-worker.js` precaches core assets and serves them offline-first.
- The service worker registers automatically in `src/main.tsx` in supported browsers.

## Tech stack

- React 19 with TypeScript
- Tailwind CSS 3 for utility-first styling
- Vite 7 for lightning-fast dev and build tooling
- Local storage + React context for persistent state
