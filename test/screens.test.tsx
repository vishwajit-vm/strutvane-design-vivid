// @vitest-environment jsdom
/**
 * The reference screens beyond what `designConformance()` renders: the dark theme, the icon rail
 * and an app's brand overrides. Each must stay axe-clean and free of overflow, and no element
 * Vivid draws may carry an inline style (CSP: styles come only from the nonce'd `<style>`).
 */
import { axeViolations, checkOverflowDom, renderReferenceScreen } from '@strutvane/ui/testing'
import { afterEach, describe, expect, it } from 'vitest'
import { RAIL_STORAGE_KEY, vivid } from '../src/index.ts'

afterEach(() => localStorage.clear())

/** Inline styles on elements that carry a Vivid class. */
function vividInlineStyles(container: Element): string[] {
  return [...container.querySelectorAll('[style]')]
    .filter((el) => /\bsvv-/.test(el.getAttribute('class') ?? ''))
    .map((el) => el.outerHTML.slice(0, 80))
}

describe('dark theme', () => {
  it.each([
    'sign-in',
    'list',
    'empty-list',
    'form-errors',
    'delete-dialog',
    'detail',
    'related',
  ] as const)('"%s" is axe-clean and does not overflow', async (name) => {
    const screen = await renderReferenceScreen(vivid, name, { theme: 'dark' })
    try {
      expect(screen.container.querySelector('[data-sv-theme="dark"]')).not.toBeNull()
      expect(await axeViolations(screen.container)).toEqual([])
      expect(checkOverflowDom(screen.container)).toEqual([])
      expect(vividInlineStyles(screen.container)).toEqual([])
    } finally {
      await screen.unmount()
    }
  })
})

describe('icon rail', () => {
  it('keeps the list screen axe-clean with the sidebar collapsed', async () => {
    localStorage.setItem(RAIL_STORAGE_KEY, 'rail')
    const screen = await renderReferenceScreen(vivid, 'list')
    try {
      expect(screen.container.querySelector('[data-sv-part="shell"][data-rail]')).not.toBeNull()
      const toggle = screen.container.querySelector('[data-sv-part="rail-toggle"]')
      expect(toggle?.getAttribute('aria-expanded')).toBe('false')
      expect(await axeViolations(screen.container)).toEqual([])
      expect(checkOverflowDom(screen.container)).toEqual([])
    } finally {
      await screen.unmount()
    }
  })
})

describe('brand overrides', () => {
  it('renders the list with an app brand, radius and density, still axe-clean', async () => {
    const screen = await renderReferenceScreen(vivid, 'list', {
      overrides: { brandHue: 150, radius: '12px', density: 0.85 },
    })
    try {
      const css = screen.container.querySelector('style')?.textContent ?? ''
      expect(css).toContain(
        '[data-sv-design="vivid"]{--brand-hue:150;--radius:12px;--density:0.85;}',
      )
      expect(await axeViolations(screen.container)).toEqual([])
    } finally {
      await screen.unmount()
    }
  })
})

describe('sidebar on the real app', () => {
  it('marks the current page with the pill and names the rail toggle after the nav', async () => {
    const screen = await renderReferenceScreen(vivid, 'list')
    try {
      const nav = screen.container.querySelector('nav[data-sv-part="sidebar"]')
      const current = nav?.querySelector('a[aria-current="page"]')
      expect(current?.className).toContain('svv-nav-link')
      const toggle = nav?.querySelector('[data-sv-part="rail-toggle"]')
      expect(toggle?.getAttribute('aria-label')).toBe(nav?.getAttribute('aria-label'))
    } finally {
      await screen.unmount()
    }
  })
})
