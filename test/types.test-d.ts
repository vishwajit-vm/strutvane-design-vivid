/**
 * Type-level tests: the public API is typed the way the contract says, and misuse fails to
 * compile (a wrong variant, a missing icon name, a non-component icon, a colour that isn't one).
 */
import type { Design, IconProps, ThemeTokens } from '@strutvane/ui/design'
import type { ComponentType } from 'react'
import { describe, expectTypeOf, it } from 'vitest'
import {
  Button,
  createIconSkin,
  Icon,
  light,
  lookupIcon,
  VIVID_ICONS,
  type VividIconComponent,
  vivid,
  vividStylesheet,
  withIcons,
} from '../src/index.ts'

describe('public types', () => {
  it('vivid and withIcons() are checked Designs', () => {
    expectTypeOf(vivid).toEqualTypeOf<Design>()
    expectTypeOf(withIcons).returns.toEqualTypeOf<Design>()
  })

  it('the Icon skin is a contract Icon component', () => {
    expectTypeOf(Icon).toEqualTypeOf<ComponentType<IconProps>>()
    expectTypeOf(createIconSkin).returns.toEqualTypeOf<ComponentType<IconProps>>()
    expectTypeOf(lookupIcon(VIVID_ICONS, 'home')).toEqualTypeOf<VividIconComponent | undefined>()
  })

  it('tokens are contract theme tokens', () => {
    expectTypeOf(light).toEqualTypeOf<ThemeTokens>()
  })

  it('the stylesheet takes only public overrides', () => {
    expectTypeOf(vividStylesheet)
      .parameter(0)
      .toEqualTypeOf<import('@strutvane/ui/design').PublicOverrides | undefined>()
  })
})

describe('misuse fails to compile', () => {
  it('rejects a button variant the contract does not know', () => {
    // @ts-expect-error 'gradient' is not a ButtonVariant
    void Button({ variant: 'gradient' })
  })

  it('requires an icon name', () => {
    // @ts-expect-error name is required
    void Icon({ size: 'sm' })
  })

  it('rejects an icon set entry that is not a component', () => {
    // @ts-expect-error a string is not an icon component
    void withIcons({ truck: 'truck.svg' })
  })

  it('rejects a colour token that is not a supported colour form', () => {
    const bad: ThemeTokens = {
      ...light,
      // @ts-expect-error 'red' is not a CssColor (hex, rgb(), rgba() or oklch())
      color: { ...light.color, accent: 'red' },
    }
    void bad
  })

  it('rejects an override that is not a length', () => {
    // @ts-expect-error radius must be a px, rem, calc() or var() length
    void vividStylesheet({ radius: 'big' })
  })
})
