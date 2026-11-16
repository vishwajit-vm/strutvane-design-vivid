// @vitest-environment jsdom
/**
 * The Icon skin: decorative SVGs from the curated Tabler set, nothing for unknown names (never an
 * inherited property picked up as a component), and `withIcons` for more.
 */

import { validateDesign } from '@strutvane/ui/design'
import { IconTruckDelivery } from '@tabler/icons-react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createIconSkin, Icon, lookupIcon, VIVID_ICONS, vivid, withIcons } from '../src/index.ts'

afterEach(cleanup)

describe('lookupIcon', () => {
  it('finds Vivid icons by Tabler name', () => {
    expect(lookupIcon(VIVID_ICONS, 'users')).toBeDefined()
    expect(lookupIcon(VIVID_ICONS, 'arrow-left')).toBeDefined()
  })

  it.each(['constructor', '__proto__', 'toString', 'hasOwnProperty', 'valueOf', ''])(
    'never resolves the inherited or empty name %j',
    (name) => {
      expect(lookupIcon(VIVID_ICONS, name)).toBeUndefined()
    },
  )

  it('is frozen, so no code can swap an icon out from under the design', () => {
    expect(Object.isFrozen(VIVID_ICONS)).toBe(true)
  })
})

describe('Icon', () => {
  it('draws a decorative, unfocusable SVG in the text colour', () => {
    const { container } = render(<Icon name="home" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(svg?.getAttribute('focusable')).toBe('false')
    expect(svg?.getAttribute('stroke')).toBe('currentColor')
    expect(svg?.getAttribute('width')).toBe('20')
    expect(svg?.getAttribute('class')).toContain('svv-icon svv-icon-md')
  })

  it('has a small size', () => {
    const { container } = render(<Icon name="home" size="sm" />)
    expect(container.querySelector('svg')?.getAttribute('height')).toBe('16')
  })

  it('draws nothing for a name it does not know (the contract allows it)', () => {
    const { container } = render(<Icon name="constructor" />)
    expect(container.innerHTML).toBe('')
  })

  it('renders every icon of the set without an inline style', () => {
    const names = Object.keys(VIVID_ICONS)
    expect(names.length).toBeGreaterThan(100)
    const { container } = render(
      <div>
        {names.map((name) => (
          <Icon key={name} name={name} />
        ))}
      </div>,
    )
    expect(container.querySelectorAll('svg')).toHaveLength(names.length)
    expect(container.querySelectorAll('[style]')).toHaveLength(0)
  })
})

describe('withIcons', () => {
  it('returns a valid design that also draws the extra icons, leaving vivid untouched', () => {
    const design = withIcons({ 'truck-delivery': IconTruckDelivery })
    expect(validateDesign(design)).toEqual([])
    expect(design.name).toBe('vivid')
    expect(Object.isFrozen(design)).toBe(true)
    const Extended = design.skins.Icon
    const { container } = render(
      <>
        <Extended name="truck-delivery" />
        <vivid.skins.Icon name="truck-delivery" />
      </>,
    )
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  it('lets an extra icon replace one of Vivid’s own', () => {
    const Custom = createIconSkin({ ...VIVID_ICONS, home: IconTruckDelivery })
    const { container } = render(<Custom name="home" />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain(
      'tabler-icon-truck-delivery',
    )
  })
})
