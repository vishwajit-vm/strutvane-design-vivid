/**
 * The stylesheet and its file form: identical to what the provider injects, overrides baked in
 * only when valid, nothing that can escape the `<style>` element or a declaration, every rule
 * scoped to Vivid, and no inline styles anywhere in the source (CONSISTENCY item 119: styles come
 * only from the nonce'd `<style>` or a file).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  customPropertiesFor,
  designStylesheet,
  type PublicOverrides,
  resolveDeclarations,
} from '@strutvane/ui/design'
import { describe, expect, it } from 'vitest'
import { FONTS_CSS, VIVID_STYLESHEET, vivid, vividStylesheet } from '../src/index.ts'

/** Every top-level selector in the design's own CSS (at-rule bodies flattened). */
function selectors(css: string): string[] {
  const out: string[] = []
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}@]+)\{[^{}]*\}/g))
    out.push(...(m[1] ?? '').split(',').map((s) => s.trim()))
  return out.filter((s) => s !== '')
}

describe('vividStylesheet()', () => {
  it('is exactly what <DesignProvider> injects', () => {
    expect(vividStylesheet()).toBe(designStylesheet(vivid))
    const overrides: PublicOverrides = { brandHue: 150, radius: '10px', density: 0.9 }
    expect(vividStylesheet(overrides)).toBe(designStylesheet(vivid, { overrides }))
  })

  it('bakes valid overrides into the root', () => {
    const css = vividStylesheet({ brandHue: 150, fontSans: '"Acme Sans", sans-serif' })
    const root = customPropertiesFor(css, (s) => s === '[data-sv-design="vivid"]')
    expect(resolveDeclarations(root).get('--brand-hue')).toBe('150')
    expect(root.get('--font-sans')).toBe('"Acme Sans", sans-serif')
  })

  it.each([
    ['a brand hue that breaks out', { brandHue: '1;}</style><script>' as unknown as number }],
    ['a font stack with a rule', { fontSans: 'x;}body{display:none' }],
    ['a radius with a comment', { radius: '4px/**/' as unknown as `${number}px` }],
    ['a density out of range', { density: 40 }],
  ])('drops %s instead of writing it', (_name, overrides) => {
    const css = vividStylesheet(overrides as PublicOverrides)
    expect(css).toBe(designStylesheet(vivid))
    expect(css).not.toMatch(/<\/?\s*(?:style|script)/i)
  })
})

describe('VIVID_STYLESHEET', () => {
  it('scopes every rule to Vivid: its root, its svv- classes or its own keyframes', () => {
    const allowed = /^(?:\[data-sv-design="vivid"\]|\.svv-|from$|to$)/
    const stray = selectors(VIVID_STYLESHEET).filter((s) => !allowed.test(s))
    expect(stray).toEqual([])
  })

  it('never contains a style tag, an @import or !important', () => {
    expect(VIVID_STYLESHEET).not.toMatch(/<\/?\s*style/i)
    expect(VIVID_STYLESHEET).not.toContain('@import')
    expect(VIVID_STYLESHEET).not.toContain('!important')
  })

  it('reads every public token through its --sv- role', () => {
    for (const use of [
      'var(--sv-accent',
      'var(--sv-ring',
      'var(--sv-font-sans',
      'var(--sv-radius-',
      'var(--sv-control-height',
      'var(--sv-row-height',
    ])
      expect(VIVID_STYLESHEET).toContain(use)
  })

  it('only uses --sv- custom properties that the contract or the design declares', () => {
    const declared = new Set(
      [...designStylesheet(vivid).matchAll(/(--sv-[\w-]+)\s*:/g)].map((m) => m[1]),
    )
    const used = new Set([...VIVID_STYLESHEET.matchAll(/var\((--sv-[\w-]+)/g)].map((m) => m[1]))
    const unknown = [...used].filter((name) => !declared.has(name))
    expect(unknown).toEqual([])
  })

  it('stops motion for viewers who ask for less', () => {
    expect(VIVID_STYLESHEET).toMatch(
      /@media \(prefers-reduced-motion:reduce\)\{[^}]*animation:none;transition:none\}/,
    )
  })
})

describe('fonts.css', () => {
  it('self-hosts Plus Jakarta Sans through the fontsource package (no font CDN)', () => {
    expect(FONTS_CSS).toContain('@import "@fontsource-variable/plus-jakarta-sans";')
    expect(FONTS_CSS).not.toMatch(/https?:\/\//)
  })
})

describe('the source', () => {
  const files = readdirSync('src', { recursive: true, encoding: 'utf8' })
    .filter((f) => /\.tsx?$/.test(f))
    .map((f) => [f, readFileSync(join('src', f), 'utf8')] as const)

  it('has files to check', () => {
    expect(files.length).toBeGreaterThan(5)
  })

  it.each(files)('%s sets no inline style and no innerHTML', (_file, text) => {
    expect(text).not.toMatch(/\bstyle=\{/)
    expect(text).not.toContain('dangerouslySetInnerHTML')
    expect(text).not.toMatch(/\.innerHTML\s*=/)
  })
})
