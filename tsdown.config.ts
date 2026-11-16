import { defineConfig } from 'tsdown'

// One JS entry: the `vivid` design and its parts. The CSS files (`vivid.css`, `fonts.css`) are
// written after this by scripts/build-css.mjs from the built design, so the static file and the
// injected `<style>` can never differ. React, @strutvane/ui and the icon and font packages stay
// external (peers and dependencies).
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: 'esm',
  platform: 'neutral',
  // .mjs / .d.mts like every other Strutvane package (platform 'neutral' would otherwise emit .js).
  fixedExtension: true,
  target: 'es2024',
  dts: true,
  sourcemap: true,
  clean: true,
})
