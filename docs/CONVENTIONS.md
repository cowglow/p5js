# Sketch System Conventions

## Asset Naming & Location

Static assets (SVG, PNG, data) live under `src/assets/[sketch-id]/`:

```
src/assets/prototype-006/C.png
src/assets/prototype-010/leaf.svg
```

Keeping assets in `src/` (not `public/`) makes them visible to Vite's `import.meta.glob`, enabling auto-discovery. Vite also fingerprints and optimizes them at build time.

Discover all assets for a sketch at build time and load them in `preload`:

```ts
const tileUrls = Object.values(
  import.meta.glob<{ default: string }>('../assets/prototype-006/*.png', { query: '?url', eager: true })
).map(m => m.default);

p.preload = () => {
  for (const url of tileUrls) {
    tiles.push(p.loadImage(url));
  }
};
```

Adding a new asset to the folder is enough — no code changes needed.

## Resource Loading

Use p5's `preload` lifecycle for all asset loading. It is p5-specific but correct: p5 guarantees all `preload` loads complete before `setup` runs. Do not load assets in constructors or in `setup`.

Do not read image dimensions (`.width`, `.height`) inside `preload`. Image metadata is only available after the load completes. Move any dimension-dependent calculations to `setup`.

For SVGs that need path-level access (not just image rendering), load via `fetch()` inside `preload` using p5's load counter trick, or load as a plain image if rendering only.

## Canvas Bootstrap

`bootstrapCanvas(p, background?)` sets `p.setup` with full-window canvas, `colorMode(HSB, 360, 100, 100)`, and `frameRate(30)`. Always call it first — it registers `p.setup` on the instance.

`bootstrapEventListener(p, { filename })` sets `p.keyTyped` for `s` → `saveCanvas` and `p` → `exportCanvas`. Both helpers are called at the module level (not inside setup or draw).

When a sketch needs additional initialization after canvas creation (e.g. dimension-dependent calculations, state derived from loaded assets), extend the bootstrapped setup rather than replacing it:

```ts
bootstrapCanvas(p, 0);

const baseSetup = p.setup!;
p.setup = () => {
  baseSetup();
  // canvas and colorMode are ready here
  originX = p.width * 0.5;
  const columns = Math.round(p.width / tile.width);
};
```

Never define `p.setup` from scratch in a sketch — that silently drops the bootstrap behavior.

## What Goes Where

| Location | Purpose |
|---|---|
| `src/sketches/prototype-NNN.ts` | All drawing logic, state, event handlers for that piece |
| `src/lib/` | Reusable setup helpers and utilities (no sketch-specific logic) |
| `src/classes/` | Stateful reusable objects (shape generators, particle systems) |
| `src/assets/prototype-NNN/` | Static assets owned by that sketch |

Class constructors must be synchronous. No loading, no async calls, no side effects on the p5 instance beyond what the class needs internally.

## Opacity & Layers

When stacking visual layers at different opacities, set `globalAlpha` once per layer before drawing all tiles in that layer — not per tile. This keeps the intent clear and avoids per-draw-call overhead.

```ts
ctx.globalAlpha = layer.opacity;
for (const tile of layer.tiles) { /* draw */ }
ctx.globalAlpha = 1; // reset after all layers
```

Opacities follow an arithmetic sequence from a base value. For four layers:

```ts
const EXTRA_LAYERS = 3;
const LAYER_START = 2 / 3;
const LAYER_STEP = LAYER_START / EXTRA_LAYERS;
const LAYER_OPACITIES = [1, ...Array.from({ length: EXTRA_LAYERS }, (_, i) => LAYER_START - i * LAYER_STEP)];
// → [1, 0.667, 0.444, 0.222]
```

Never override layer opacity for interactive effects (hover, selection). Keep opacity as a property of the layer, not the interaction state.

## Hover & Interactive Scale

Hover effects use per-element lerp, not timers or sudden snaps. Each element carries a `hoverScale` value that lerps toward its target each frame. Use asymmetric rates so the response feels snappy in and slow out:

```ts
const HOVER_LERP_IN = 0.12;   // fast grow
const HOVER_LERP_OUT = 0.04;  // slow ease back (~2s natural linger)

const targetHoverScale = key === hoveredKey ? HOVER_SCALE : 1;
const lerpRate = targetHoverScale > tile.hoverScale ? HOVER_LERP_IN : HOVER_LERP_OUT;
tile.hoverScale += (targetHoverScale - tile.hoverScale) * lerpRate;
```

Track the hovered cell with a single `hoveredKey: string | null`. Set it in `p.mouseMoved`, clear it on canvas `mouseleave` via a DOM listener in `setup`. No timers, no maps — the slow lerp-out IS the linger.

```ts
(p.drawingContext as CanvasRenderingContext2D).canvas.addEventListener('mouseleave', () => {
  hoveredKey = null;
});
```

## Spring Physics

For animated element placement, use a simple per-element spring rather than a physics engine:

```ts
tile.vx += SPRING * (tile.targetX - tile.x);
tile.vy += SPRING * (tile.targetY - tile.y);
tile.vx *= DAMPING;
tile.vy *= DAMPING;
tile.x += tile.vx;
tile.y += tile.vy;
```

Tune `SPRING` (0.04–0.08) for speed and `DAMPING` (0.82–0.90) for bounciness. Lower damping = more oscillation. Add inter-element repulsion for collision feel:

```ts
const force = ((minDist - dist) / minDist) * REPULSION;
a.vx += force * nx; a.vy += force * ny;
b.vx -= force * nx; b.vy -= force * ny;
```

Only run repulsion between unsettled elements — filter the active set each frame to avoid O(n²) cost on settled tiles.

Canvas clears and redraws every frame when physics are active. Static buffer compositing only works for non-moving content.

## Texture Direction (010+)

Future sketches move from opacity-stacking to mark-density for texture. The core shift:

- **Out:** layering semi-transparent circles and rings
- **In:** accumulating many small marks (short lines, tapered strokes, dots, bezier slivers) with tight random ranges on angle and weight

SVG files may serve as stamp libraries — load via `p.loadImage` for direct rendering, or parse as XML if path coordinates are needed for programmatic variation. Each shape variant lives in `src/assets/prototype-NNN/`.

The composition model follows Joshua Davis's early work: define a vocabulary of shapes and transforms, set constrained random ranges, let accumulation create the image. The sketch author sets the rules; chance performs.