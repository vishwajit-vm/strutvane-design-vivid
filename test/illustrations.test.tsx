// @vitest-environment jsdom
/**
 * The illustrations: decorative, token-coloured, no inline styles, and gradient ids that never
 * collide when two pictures share a page.
 */

import type { IllustrationProps } from '@strutvane/ui/design'
import { cleanup, render } from '@testing-library/react'
import type { ComponentType } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { AuthArt, Empty, ErrorPicture, Forbidden, LogoMark, NotFound, vivid } from '../src/index.ts'

afterEach(cleanup)

const PICTURES: [string, ComponentType<IllustrationProps>][] = [
  ['Empty', Empty],
  ['NotFound', NotFound],
  ['Forbidden', Forbidden],
  ['ErrorPicture', ErrorPicture],
  ['AuthArt', AuthArt],
  ['LogoMark', LogoMark],
]

/** Paint values an illustration may use: a token, a gradient by id, or none. */
const ALLOWED_PAINT = /^(?:var\(--sv-[a-z0-9-]+\)|url\(#[^)]+\)|none|currentColor)$/

describe.each(PICTURES)('%s', (_name, Picture) => {
  it('is a decorative, unfocusable SVG that keeps the given class', () => {
    const { container } = render(<Picture className="extra" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(svg?.getAttribute('focusable')).toBe('false')
    expect(svg?.getAttribute('class')).toContain('extra')
  })

  it('paints only with tokens and its own gradients, never an inline style', () => {
    const { container } = render(<Picture />)
    expect(container.querySelectorAll('[style]')).toHaveLength(0)
    for (const el of container.querySelectorAll('*'))
      for (const attr of ['fill', 'stroke', 'stop-color']) {
        const value = el.getAttribute(attr)
        if (value !== null) expect(value).toMatch(ALLOWED_PAINT)
      }
  })
})

it('gives each copy of a picture its own gradient id', () => {
  const { container } = render(
    <>
      <Empty />
      <Empty />
      <LogoMark />
    </>,
  )
  const ids = [...container.querySelectorAll('linearGradient')].map((g) => g.id)
  expect(ids).toHaveLength(3)
  expect(new Set(ids).size).toBe(3)
  for (const id of ids) expect(container.querySelector(`[fill="url(#${id})"]`)).not.toBeNull()
})

it('is what the design hands the empty and error states', () => {
  expect(vivid.illustrations).toEqual({
    Empty,
    NotFound,
    Forbidden,
    Error: ErrorPicture,
  })
})
