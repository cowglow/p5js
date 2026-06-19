# Sketch System

## Anatomy of a sketch

Every sketch file exports two things:

```ts
export const meta: SketchMeta = {
  title: 'My Sketch',
  date: '2026-01-01',
  description: 'What it does and how to interact with it.',
  tags: ['interactive', 'geometry'],
};

export default (p: p5) => {
  // p5 instance-mode sketch
};
```

`SketchMeta` feeds the gallery card. The default export is mounted as `new p5(sketch.content, container)` and torn down with `instance.remove()` on navigation — so cleanup happens automatically as long as you don't attach listeners outside of p5's lifecycle.

## Auto-discovery

`src/sketches/index.ts` uses `import.meta.glob('./prototype-*.ts', { eager: true })` to collect every matching file at build time. No manual registration is needed — drop a new `prototype-NNN.ts` and it appears in the gallery.

Use `npm run prototype` to scaffold the next file from the template.

## Bootstrap utilities

Most sketches call two helpers at the top of their default function:

### `bootstrapCanvas(p, background?, loop?)`

Sets up `p.setup` with:
- `p.frameRate(30)`
- Full-window canvas (`window.innerWidth × window.innerHeight`)
- `p.colorMode(HSB, 360, 100, 100)`
- Optional background fill (default `0` — black)
- Optional loop flag (default `true`; pass `false` for static sketches)

### `bootstrapEventListener(p, { filename })`

Binds `p.keyTyped` with two global shortcuts available in every sketch that uses it:

| Key | Action |
|-----|--------|
| `s` | Save canvas via `p5.saveCanvas` (p5 native, PNG) |
| `p` | Export canvas via the Export button pipeline (`exportCanvas`) — timestamped PNG download |

Both write the same image; `s` goes through p5's renderer, `p` goes through the DOM canvas API (same path as the header Export button).

## Export pipeline

`src/lib/export-canvas.ts` is the shared export function used by both the header Export button and the `p` key shortcut. It:
1. Grabs the first `<canvas>` element in the DOM
2. Calls `.toDataURL('image/png')`
3. Creates a temporary `<a>` and triggers a download named `{filename}-{timestamp}.png`

`getTimestamp()` formats as `MM-DD-YYYY_HHmm` for sortable filenames.

## Sketches with custom setup (prototype-009+)

Some sketches bypass `bootstrapCanvas` and `bootstrapEventListener` when they need finer control — custom loop state, off-screen buffers, or their own `keyPressed` handler. In these cases, keyboard shortcuts must be wired manually. The convention is:

- `s` → `p.saveCanvas(...)`
- `p` → `exportCanvas(filename)` (import from `lib/export-canvas`)
- `r` → clear / reset
- `d` → undo last action (where applicable)

## Infrastructure improvements

| Change | Where | Effect |
|--------|--------|--------|
| `p` key export | `bootstrapEventListener` | All bootstrap sketches (001–008) get keyboard-triggered export matching the Export button |
| `p` key export | `prototype-009` | Same shortcut wired into the custom handler |
| `exportCanvas` import removed dead stub | `bootstrapEventListener` | Removed the no-op `p.exportCanvas` stub and the `@ts-ignore` |
| Cluster history + `d` to undo | `prototype-009` | Clusters stored in array; redraw from scratch on delete |
| Logarithmic ring spacing | `prototype-009` | Rings pack tighter at center, breathe outward |
| Per-ring fill alpha ramp | `prototype-009` | Inner annuli more opaque to compensate for narrow gaps |
| Per-ring hue shift | `prototype-009` | Each cluster cycles through a slice of the hue wheel |
| Sinusoidal stroke weight | `prototype-009` | Stroke pulses thin→thick→thin across rings |
| Fixed quick-click radius | `prototype-009` | Single click uses the full random radius set at mousedown, not a sub-range |