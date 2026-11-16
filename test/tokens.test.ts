/**
 * Vivid's tokens: WCAG AA at EVERY brand hue in 1° steps (the conformance kit samples 15° steps),
 * for the contract's pairs and for the extra pairs Vivid's own stylesheet draws; the accent family
 * follows `--brand-hue` while the neutrals stay put; sizes follow `--radius` and `--density`.
 *
 * The documented safe hue range is therefore the whole circle, 0–359.
 */
import {
  CONTRAST_PAIRS,
  type ColorToken,
  chartVar,
  contrastRatio,
  cssVar,
  parseColor,
  resolveDesignTokens,
} from '@strutvane/ui/design'
import { describe, expect, it } from 'vitest'
import { chartPalette, dark, defaults, fonts, light, scale, vivid } from '../src/index.ts'

const THEMES = ['light', 'dark'] as const

/**
 * Pairs Vivid's stylesheet draws beyond the contract's list: links in a hovered table row, the
 * required marker and errors on the page background, muted labels on hovered menu items and
 * soft accent surfaces.
 */
const VIVID_PAIRS: readonly { fg: ColorToken; bg: ColorToken; min: number }[] = [
  { fg: 'accentText', bg: 'surfaceSubtle', min: 4.5 },
  { fg: 'accentText', bg: 'surfaceMuted', min: 4.5 },
  { fg: 'fgMuted', bg: 'surfaceMuted', min: 4.5 },
  { fg: 'fgMuted', bg: 'accentSubtle', min: 4.5 },
  { fg: 'dangerText', bg: 'bg', min: 4.5 },
  { fg: 'successText', bg: 'bg', min: 4.5 },
  { fg: 'warningText', bg: 'bg', min: 4.5 },
  { fg: 'ring', bg: 'surfaceSubtle', min: 3 },
  { fg: 'input', bg: 'bg', min: 3 },
]

/** Resolved tokens per theme and hue, computed once (360 stylesheets per theme). */
const resolved = new Map<string, Map<string, string>>()
function tokensAt(theme: 'light' | 'dark', hue: number): Map<string, string> {
  const key = `${theme}:${hue}`
  let tokens = resolved.get(key)
  if (!tokens) {
    tokens = resolveDesignTokens(vivid, theme, { brandHue: hue })
    resolved.set(key, tokens)
  }
  return tokens
}

/** The worst ratio of a pair over every hue 0–359. */
function worst(theme: 'light' | 'dark', fg: string, bg: string): { ratio: number; hue: number } {
  let result = { ratio: Number.POSITIVE_INFINITY, hue: -1 }
  for (let hue = 0; hue < 360; hue++) {
    const tokens = tokensAt(theme, hue)
    const a = parseColor(tokens.get(fg) ?? '')
    const b = parseColor(tokens.get(bg) ?? '')
    if (!a || !b) throw new Error(`${fg} or ${bg} is unreadable at hue ${hue}`)
    expect(a.alpha).toBe(1)
    expect(b.alpha).toBe(1)
    const ratio = contrastRatio(a, b)
    if (ratio < result.ratio) result = { ratio, hue }
  }
  return result
}

describe.each(THEMES)('%s theme contrast at every brand hue (1° steps)', (theme) => {
  const pairs = [
    ...CONTRAST_PAIRS.map((p) => ({ fg: cssVar(p.fg), bg: cssVar(p.bg), min: p.min })),
    ...VIVID_PAIRS.map((p) => ({ fg: cssVar(p.fg), bg: cssVar(p.bg), min: p.min })),
    { fg: chartVar(1), bg: cssVar('surface'), min: 3 },
  ]
  it.each(pairs)('$fg on $bg ≥ $min:1', ({ fg, bg, min }) => {
    const { ratio, hue } = worst(theme, fg, bg)
    expect(ratio, `${fg} on ${bg} is ${ratio.toFixed(2)}:1 at hue ${hue}`).toBeGreaterThanOrEqual(
      min,
    )
  })
})

describe('the brand hue', () => {
  const ACCENT_ROLES = ['accent', 'accentHover', 'accentSubtle', 'accentText', 'ring'] as const
  const NEUTRAL_ROLES = ['bg', 'surface', 'fg', 'fgMuted', 'border', 'input'] as const

  it.each(THEMES)('moves every accent role and leaves the neutrals alone (%s)', (theme) => {
    const a = resolveDesignTokens(vivid, theme, { brandHue: 30 })
    const b = resolveDesignTokens(vivid, theme, { brandHue: 210 })
    for (const role of ACCENT_ROLES) expect(a.get(cssVar(role))).not.toBe(b.get(cssVar(role)))
    for (const role of NEUTRAL_ROLES) expect(a.get(cssVar(role))).toBe(b.get(cssVar(role)))
  })

  it('turns the gradient end 18° past the accent', () => {
    expect(light.color.accentHover).toContain('calc(var(--brand-hue) + 18)')
    expect(dark.color.accentHover).toContain('calc(var(--brand-hue) + 18)')
  })

  it('defaults to Vivid indigo-violet, 274', () => {
    expect(defaults.brandHue).toBe(274)
    expect(resolveDesignTokens(vivid, 'light').get('--sv-accent')).toBe('oklch(0.5 0.2 274)')
  })
})

describe('sizes and fonts', () => {
  it('builds every radius from --radius and controls, rows and spacing from --density', () => {
    for (const token of ['radiusSm', 'radiusMd', 'radiusLg'] as const)
      expect(scale[token]).toContain('var(--radius)')
    for (const token of ['controlHeight', 'rowHeight', 'space'] as const)
      expect(scale[token]).toContain('var(--density)')
  })

  it('is roomier than the plain design: 38px controls, 52px rows, 14px cards at the defaults', () => {
    const t = resolveDesignTokens(vivid, 'light')
    expect(t.get('--sv-control-height')).toContain('calc(38px * 1)')
    expect(t.get('--sv-row-height')).toContain('calc(52px * 1)')
    expect(t.get('--sv-radius-lg')).toBe('calc(8px * 1.75)')
  })

  it('uses Plus Jakarta Sans with system fallbacks, and a monospace stack', () => {
    expect(fonts.sans).toMatch(/^'Plus Jakarta Sans Variable', 'Plus Jakarta Sans',/)
    expect(fonts.sans).toContain('system-ui')
    expect(fonts.mono).toContain('monospace')
  })
})

describe('chart palette', () => {
  it.each(THEMES)('has five distinct series led by the brand (%s)', (theme) => {
    const series = chartPalette[theme]
    expect(series).toHaveLength(5)
    expect(new Set(series).size).toBe(5)
    expect(series[0]).toContain('var(--brand-hue)')
    for (const color of series.slice(1)) expect(color).not.toContain('var(--brand-hue)')
  })
})
