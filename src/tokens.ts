/**
 * Vivid's tokens: every colour, shadow, size and font of the design, for light and dark.
 *
 * This is the ONLY file of the package that may contain colour literals. The conformance kit's
 * "no hard-coded colours" rule scans every other file (and the generated stylesheet), so a colour
 * can only reach the screen through a `--sv-*` role defined here. That is what makes dark mode,
 * an app's brand hue and the contrast proof cover every pixel.
 *
 * Why OKLCH: equal lightness steps look equal across hues, so the accent can follow any
 * `--brand-hue` an app picks and stay readable, and the contrast check computes exact luminance
 * from the text. Every accent role is built from `var(--brand-hue)`; the far end of the brand
 * gradient (`accentHover`) is the same family turned 18° further, which is what gives Vivid's
 * active pill and primary buttons their two-tone sheen.
 *
 * Neutrals carry a faint cool tint (hue 274, Vivid's own indigo) on purpose: they stay the same
 * when an app rebrands, so a green or orange brand still sits on Vivid's calm, cool canvas.
 *
 * @module
 */
import type {
  ChartPalette,
  DesignFonts,
  PublicDefaults,
  ScaleTokens,
  ThemeTokens,
} from '@strutvane/ui/design'

/**
 * Vivid's light theme: pure white cards floating on a faintly tinted page, deep-ink text and a
 * strong indigo-violet accent.
 *
 * @example
 * light.color.surface // 'oklch(1 0 0)'
 */
export const light: ThemeTokens = {
  color: {
    bg: 'oklch(0.972 0.006 274)',
    surface: 'oklch(1 0 0)',
    surfaceSubtle: 'oklch(0.958 0.008 274)',
    surfaceMuted: 'oklch(0.94 0.012 274)',
    fg: 'oklch(0.29 0.03 274)',
    fgMuted: 'oklch(0.5 0.025 274)',
    border: 'oklch(0.915 0.01 274)',
    input: 'oklch(0.62 0.02 274)',
    accent: 'oklch(0.5 0.2 var(--brand-hue))',
    accentHover: 'oklch(0.46 0.19 calc(var(--brand-hue) + 18))',
    accentFg: 'oklch(1 0 0)',
    accentSubtle: 'oklch(0.948 0.03 var(--brand-hue))',
    accentText: 'oklch(0.47 0.19 var(--brand-hue))',
    ring: 'oklch(0.55 0.2 var(--brand-hue))',
    danger: 'oklch(0.54 0.2 25)',
    dangerHover: 'oklch(0.49 0.19 25)',
    dangerFg: 'oklch(1 0 0)',
    dangerSubtle: 'oklch(0.955 0.03 20)',
    dangerText: 'oklch(0.5 0.19 25)',
    success: 'oklch(0.55 0.14 155)',
    successSubtle: 'oklch(0.95 0.045 155)',
    successText: 'oklch(0.47 0.12 155)',
    warning: 'oklch(0.66 0.15 65)',
    warningSubtle: 'oklch(0.955 0.055 80)',
    warningText: 'oklch(0.5 0.12 60)',
    overlay: 'oklch(0.22 0.03 274 / 0.5)',
    mark: 'oklch(0.93 0.1 95)',
    markFg: 'oklch(0.29 0.03 274)',
  },
  shadow: {
    sm: '0 1px 3px oklch(0.3 0.04 274 / 0.07), 0 2px 6px oklch(0.3 0.04 274 / 0.05)',
    pop: '0 20px 50px oklch(0.3 0.04 274 / 0.18)',
  },
}

/**
 * Vivid's dark theme: a deep indigo-navy page (never pure black), cards one clear step lighter
 * with a visible hairline, and status text that flips light-on-dark.
 *
 * @example
 * dark.color.bg // 'oklch(0.2 0.022 274)'
 */
export const dark: ThemeTokens = {
  color: {
    bg: 'oklch(0.19 0.02 274)',
    surface: 'oklch(0.225 0.024 274)',
    surfaceSubtle: 'oklch(0.265 0.026 274)',
    surfaceMuted: 'oklch(0.29 0.03 274)',
    fg: 'oklch(0.93 0.012 274)',
    fgMuted: 'oklch(0.75 0.02 274)',
    border: 'oklch(0.33 0.026 274)',
    input: 'oklch(0.58 0.03 274)',
    accent: 'oklch(0.66 0.18 var(--brand-hue))',
    accentHover: 'oklch(0.63 0.18 calc(var(--brand-hue) + 18))',
    accentFg: 'oklch(0.16 0.02 274)',
    accentSubtle: 'oklch(0.32 0.075 var(--brand-hue))',
    accentText: 'oklch(0.83 0.1 var(--brand-hue))',
    ring: 'oklch(0.72 0.15 var(--brand-hue))',
    danger: 'oklch(0.55 0.19 25)',
    dangerHover: 'oklch(0.5 0.18 25)',
    dangerFg: 'oklch(1 0 0)',
    dangerSubtle: 'oklch(0.32 0.06 20)',
    dangerText: 'oklch(0.8 0.11 22)',
    success: 'oklch(0.7 0.14 155)',
    successSubtle: 'oklch(0.31 0.05 155)',
    successText: 'oklch(0.82 0.12 155)',
    warning: 'oklch(0.76 0.14 75)',
    warningSubtle: 'oklch(0.32 0.05 70)',
    warningText: 'oklch(0.85 0.11 80)',
    overlay: 'oklch(0.1 0.02 274 / 0.65)',
    mark: 'oklch(0.45 0.09 95)',
    markFg: 'oklch(0.97 0.02 95)',
  },
  shadow: {
    sm: '0 1px 3px oklch(0.05 0.02 274 / 0.32), 0 2px 6px oklch(0.05 0.02 274 / 0.2)',
    pop: '0 20px 50px oklch(0.05 0.02 274 / 0.55)',
  },
}

/**
 * Sizes. Radii follow `--radius` (8px by default: 6px badges, 8px controls, 14px cards), and
 * controls, rows and spacing follow `--density`. Vivid is roomier than Crisp: 38px controls and
 * 52px table rows at density 1.
 *
 * @example
 * scale.radiusLg // 'calc(var(--radius) * 1.75)'
 */
export const scale: ScaleTokens = {
  radiusSm: 'calc(var(--radius) * 0.75)',
  radiusMd: 'var(--radius)',
  radiusLg: 'calc(var(--radius) * 1.75)',
  controlHeight: 'calc(38px * var(--density))',
  rowHeight: 'calc(52px * var(--density))',
  space: 'calc(4px * var(--density))',
  sidebarWidth: '260px',
  fontSizeSm: '0.8125rem',
  fontSize: '0.875rem',
  fontSizeLg: '1.5rem',
}

/**
 * Chart colours, series 1 first. Series 1 is the brand (it follows `--brand-hue`); the others are
 * fixed cyan, amber, pink and green, spaced for colour-blind separation and lifted in dark mode.
 *
 * @example
 * chartPalette.light[0] // the brand series
 */
export const chartPalette: ChartPalette = {
  light: [
    'oklch(0.55 0.2 var(--brand-hue))',
    'oklch(0.7 0.13 195)',
    'oklch(0.78 0.15 75)',
    'oklch(0.64 0.2 350)',
    'oklch(0.66 0.15 155)',
  ],
  dark: [
    'oklch(0.7 0.16 var(--brand-hue))',
    'oklch(0.74 0.12 195)',
    'oklch(0.8 0.14 75)',
    'oklch(0.7 0.18 350)',
    'oklch(0.72 0.14 155)',
  ],
}

/**
 * Vivid's defaults for the public override tokens: an indigo-violet brand (hue 274), 8px corners
 * and the design's own density. An app changes them in `resources/ui/theme.css` or through
 * `<DesignProvider overrides>`.
 *
 * @example
 * defaults.brandHue // 274
 */
export const defaults: PublicDefaults = { brandHue: 274, radius: '8px', density: 1 }

/**
 * Fonts. UI text is Plus Jakarta Sans (OFL; geometric and friendly, with distinct numerals),
 * self-hosted through `@strutvane/design-vivid/fonts.css`; until it loads, or when an app doesn't
 * import it, the system UI font takes over. `--font-sans` replaces the whole stack.
 *
 * @example
 * fonts.sans.startsWith("'Plus Jakarta Sans Variable'") // true
 */
export const fonts: DesignFonts = {
  sans: "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "ui-monospace, 'SFMono-Regular', 'Cascadia Code', Menlo, Consolas, monospace",
}
