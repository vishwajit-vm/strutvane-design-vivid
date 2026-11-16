/**
 * Vivid's stylesheet as a file, for apps that serve CSS instead of injecting it.
 *
 * `<DesignProvider>` injects the design's CSS in a `<style nonce>` (CONSISTENCY item 119). An app whose
 * Content-Security-Policy has no nonce for styles can turn that off (`injectStyles={false}`) and
 * link a static file instead: the published `@strutvane/design-vivid/vivid.css` (Vivid's
 * defaults), or the output of {@link vividStylesheet} with its own brand baked in. Both are the
 * exact text the provider would inject, so the two paths can never drift.
 *
 * @module
 */
import { designStylesheet, type PublicOverrides } from '@strutvane/ui/design'
import { vivid } from './vivid.ts'

/**
 * The complete Vivid stylesheet (tokens for both themes, then the design's CSS), with optional
 * public overrides baked in. Invalid override values are dropped, never written.
 *
 * @example
 * // scripts/write-theme.ts in an app with a strict CSP
 * writeFileSync('public/vivid.css', vividStylesheet({ brandHue: 150, radius: '10px' }))
 */
export function vividStylesheet(overrides: PublicOverrides = {}): string {
  return designStylesheet(vivid, { overrides })
}

/**
 * The text of `@strutvane/design-vivid/fonts.css`: Plus Jakarta Sans (variable, OFL) from
 * `@fontsource-variable/plus-jakarta-sans`, a dependency of this package. A bundler (Vite,
 * webpack, Rollup with a CSS plugin) resolves the import and self-hosts the font files; no
 * request ever goes to a third-party font CDN.
 *
 * @example
 * FONTS_CSS.includes('@fontsource-variable/plus-jakarta-sans') // true
 */
export const FONTS_CSS: string = `/* Plus Jakarta Sans (OFL-1.1), self-hosted by your bundler. Import once in your app's entry. */
@import "@fontsource-variable/plus-jakarta-sans";
`
