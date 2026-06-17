# cowglow/p5js

A digital garden of generative art sketches built with p5.js. Each prototype explores a different idea — mouse as brush, algorithmic fill, ambient loops, mathematical structures. Browse the gallery, open a sketch, read the intent behind it.

---

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000/p5js/` and browse the gallery.

---

## Adding a sketch

Scaffold a new file:

```bash
npm run prototype
```

This creates `src/sketches/prototype-NNN.ts` from the template. Add an exported `meta` object and a default sketch function — the gallery picks it up automatically via glob, no registration needed.

```ts
export const meta: SketchMeta = {
  title: 'Your Title',
  date: '2025-01-01',
  description: 'What you were trying to do and what surprised you.',
  tags: ['interactive', 'mouse'],
};

export default (p: p5) => {
  // sketch here
};
```

---

## Deploy to GitHub Pages

Push to `main` on a GitHub repo with Pages enabled (**Settings → Pages → Source: GitHub Actions**). The workflow at `.github/workflows/deploy-to-gh-pages.yml` builds and deploys automatically.

Live URL will be: `https://<username>.github.io/p5js/`

---

## Design inspiration

The visual aesthetic draws from the work of [Joshua Davis](https://joshuadavis.com/) — specifically the PrayStation v2 and v3 series. Dark, minimal, technical. Thin structural lines, muted typography, and sparse chrome so the sketches stay in focus.

- [ps2-praystation-v2](https://joshuadavis.com/ps2-praystation-v2)
- [ps2-praystation-v3](https://joshuadavis.com/ps2-praystation-v3)

---

## Stack

| | |
|---|---|
| Creative | p5.js 1.9 |
| Language | TypeScript 6 |
| Build | Vite 8 |
| Deploy | GitHub Pages via GitHub Actions |

---

## Project structure

```
src/
  main.ts              — router entry point
  style.css            — design tokens + layout
  sketches/            — one file per prototype
    index.ts           — auto-discovers all prototype-*.ts via import.meta.glob
    prototype-NNN.ts   — sketch function + meta export
  views/
    gallery.ts         — grid of sketch cards
    sketch-detail.ts   — canvas + writing panel
  lib/
    router.ts          — query-param routing (?sketch=prototype-NNN.ts)
    bootstrap-canvas.ts
    bootstrap-event-listener.ts
  classes/             — reusable p5 entity classes
scripts/
  create-new-prototype.js  — scaffolds a new prototype file
.github/workflows/
  deploy-to-gh-pages.yml   — GitHub Pages deploy
```
