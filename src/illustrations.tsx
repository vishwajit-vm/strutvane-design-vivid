/**
 * Vivid's illustrations: original, hand-written SVG spot art for empty and error states, the
 * sign-in brand panel and the logo mark. No third-party art.
 *
 * Every fill and stroke is a `--sv-*` token, so each picture recolours with the app's brand hue and
 * looks native in dark mode, and the contrast and "no hard-coded colours" rules cover it. All of
 * them are decorative (`aria-hidden`): the text around them always says what matters.
 *
 * Gradient ids come from `useId`, so two pictures on one page never share (and break) a gradient.
 *
 * @module
 */

import type { IllustrationProps } from '@strutvane/ui/design'
import { type ReactElement, useId } from 'react'

const cx = (...names: (string | undefined)[]): string => names.filter(Boolean).join(' ')

/** The brand gradient (accent → its 18°-turned far end) as an SVG `<linearGradient>`. */
function BrandGradient({ id }: { readonly id: string }): ReactElement {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="var(--sv-accent)" />
      <stop offset="1" stopColor="var(--sv-accent-hover)" />
    </linearGradient>
  )
}

/**
 * Empty state: an open tray, two floating record cards and a magnifier.
 *
 * @example
 * <Empty className="svv-illustration" />
 */
export function Empty({ className }: IllustrationProps): ReactElement {
  const shade = useId()
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-illustration', className)}
      data-sv-illustration="empty"
    >
      <defs>
        <BrandGradient id={shade} />
      </defs>
      <ellipse cx="100" cy="136" rx="80" ry="7" fill="var(--sv-surface-muted)" />
      <circle cx="100" cy="68" r="58" fill="var(--sv-accent-subtle)" />
      <rect
        x="60"
        y="32"
        width="62"
        height="76"
        rx="9"
        fill="var(--sv-surface)"
        stroke="var(--sv-border)"
        strokeWidth="2"
        transform="rotate(-9 91 70)"
      />
      <rect
        x="78"
        y="26"
        width="62"
        height="78"
        rx="9"
        fill="var(--sv-surface)"
        stroke="var(--sv-border)"
        strokeWidth="2"
      />
      <rect x="88" y="40" width="34" height="6" rx="3" fill="var(--sv-accent)" />
      <rect x="88" y="54" width="42" height="5" rx="2.5" fill="var(--sv-surface-muted)" />
      <rect x="88" y="65" width="30" height="5" rx="2.5" fill="var(--sv-surface-muted)" />
      <rect x="88" y="76" width="38" height="5" rx="2.5" fill="var(--sv-surface-muted)" />
      <path d="M50 100h100l-9 27a6 6 0 0 1-5.7 4H64.7a6 6 0 0 1-5.7-4Z" fill={`url(#${shade})`} />
      <path
        d="M50 100h30a20 10 0 0 0 40 0h30"
        fill="none"
        stroke="var(--sv-accent-fg)"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <circle
        cx="152"
        cy="50"
        r="15"
        fill="var(--sv-surface)"
        stroke="var(--sv-accent)"
        strokeWidth="5"
      />
      <path d="M163 61l12 12" stroke="var(--sv-accent)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="38" cy="42" r="4" fill="var(--sv-chart-3)" />
      <circle cx="168" cy="106" r="3" fill="var(--sv-chart-2)" />
    </svg>
  )
}

/**
 * Not found: a dashed trail that ends at an empty map pin.
 *
 * @example
 * <NotFound />
 */
export function NotFound({ className }: IllustrationProps): ReactElement {
  const shade = useId()
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-illustration', className)}
      data-sv-illustration="not-found"
    >
      <defs>
        <BrandGradient id={shade} />
      </defs>
      <ellipse cx="100" cy="136" rx="80" ry="7" fill="var(--sv-surface-muted)" />
      <circle cx="100" cy="70" r="58" fill="var(--sv-accent-subtle)" />
      <path
        d="M30 128c22-10 30-34 56-30s34 24 58 12"
        fill="none"
        stroke="var(--sv-fg-muted)"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
      <path
        d="M120 30c-17 0-30 13-30 29 0 22 30 47 30 47s30-25 30-47c0-16-13-29-30-29Z"
        fill={`url(#${shade})`}
      />
      <circle cx="120" cy="59" r="12" fill="var(--sv-surface)" />
      <circle cx="120" cy="59" r="4" fill="var(--sv-accent)" />
      <path
        d="M156 118l10 10m0-10-10 10"
        stroke="var(--sv-danger)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="40" cy="46" r="4" fill="var(--sv-chart-3)" />
      <circle cx="170" cy="40" r="3" fill="var(--sv-chart-2)" />
    </svg>
  )
}

/**
 * Forbidden: a shield with a closed padlock.
 *
 * @example
 * <Forbidden />
 */
export function Forbidden({ className }: IllustrationProps): ReactElement {
  const shade = useId()
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-illustration', className)}
      data-sv-illustration="forbidden"
    >
      <defs>
        <BrandGradient id={shade} />
      </defs>
      <ellipse cx="100" cy="136" rx="80" ry="7" fill="var(--sv-surface-muted)" />
      <circle cx="100" cy="70" r="58" fill="var(--sv-accent-subtle)" />
      <path
        d="M100 18 140 32v32c0 28-17 48-40 60-23-12-40-32-40-60V32Z"
        fill={`url(#${shade})`}
        strokeLinejoin="round"
      />
      <rect x="82" y="64" width="36" height="30" rx="6" fill="var(--sv-surface)" />
      <path
        d="M89 64v-8a11 11 0 0 1 22 0v8"
        fill="none"
        stroke="var(--sv-surface)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="77" r="4" fill="var(--sv-accent)" />
      <rect x="98.5" y="79" width="3" height="8" rx="1.5" fill="var(--sv-accent)" />
      <circle cx="44" cy="40" r="4" fill="var(--sv-chart-3)" />
      <circle cx="160" cy="104" r="3" fill="var(--sv-chart-2)" />
    </svg>
  )
}

/**
 * Error: a card that came apart, with a warning badge.
 *
 * @example
 * <ErrorPicture />
 */
export function ErrorPicture({ className }: IllustrationProps): ReactElement {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-illustration', className)}
      data-sv-illustration="error"
    >
      <ellipse cx="100" cy="136" rx="80" ry="7" fill="var(--sv-surface-muted)" />
      <circle cx="100" cy="70" r="58" fill="var(--sv-danger-subtle)" />
      <path
        d="M54 34h44l-8 26 10 18-6 30H54a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8Z"
        fill="var(--sv-surface)"
        stroke="var(--sv-border)"
        strokeWidth="2"
      />
      <path
        d="M108 40h40a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8h-42l6-30-10-18Z"
        fill="var(--sv-surface)"
        stroke="var(--sv-border)"
        strokeWidth="2"
        transform="rotate(6 130 76)"
      />
      <rect x="58" y="48" width="26" height="6" rx="3" fill="var(--sv-danger)" />
      <rect x="58" y="62" width="22" height="5" rx="2.5" fill="var(--sv-surface-muted)" />
      <rect x="116" y="56" width="28" height="5" rx="2.5" fill="var(--sv-surface-muted)" />
      <path d="M140 92 158 122h-36Z" fill="var(--sv-warning)" strokeLinejoin="round" />
      <rect x="138.5" y="101" width="3" height="11" rx="1.5" fill="var(--sv-surface)" />
      <circle cx="140" cy="116" r="1.8" fill="var(--sv-surface)" />
      <circle cx="40" cy="44" r="4" fill="var(--sv-chart-2)" />
    </svg>
  )
}

/**
 * The sign-in brand panel's art: translucent "glass" dashboard cards (a chart, a donut and a row
 * of people) drawn in the text colour that sits on the brand gradient.
 *
 * @example
 * <AuthArt className="svv-auth-art" />
 */
export function AuthArt({ className }: IllustrationProps): ReactElement {
  const glass = 'var(--sv-accent-fg)'
  return (
    <svg
      viewBox="0 0 440 340"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-auth-art', className)}
      data-sv-illustration="auth"
    >
      <rect
        x="40"
        y="40"
        width="300"
        height="180"
        rx="18"
        fill={glass}
        fillOpacity="0.14"
        stroke={glass}
        strokeOpacity="0.3"
      />
      <rect x="64" y="64" width="90" height="10" rx="5" fill={glass} fillOpacity="0.75" />
      <rect x="64" y="82" width="56" height="8" rx="4" fill={glass} fillOpacity="0.4" />
      <path
        d="M64 186c26-6 38-34 64-36s34 22 60 14 30-48 58-52 40 14 66 2"
        fill="none"
        stroke={glass}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M64 186c26-6 38-34 64-36s34 22 60 14 30-48 58-52 40 14 66 2V200H64Z"
        fill={glass}
        fillOpacity="0.12"
      />
      <circle cx="246" cy="112" r="7" fill={glass} />
      <circle cx="246" cy="112" r="13" fill={glass} fillOpacity="0.25" />
      <rect
        x="270"
        y="150"
        width="140"
        height="150"
        rx="18"
        fill={glass}
        fillOpacity="0.2"
        stroke={glass}
        strokeOpacity="0.32"
      />
      <circle
        cx="340"
        cy="212"
        r="34"
        fill="none"
        stroke={glass}
        strokeOpacity="0.25"
        strokeWidth="12"
      />
      <circle
        cx="340"
        cy="212"
        r="34"
        fill="none"
        stroke={glass}
        strokeWidth="12"
        strokeDasharray="150 214"
        strokeLinecap="round"
        transform="rotate(-90 340 212)"
      />
      <rect x="300" y="266" width="80" height="8" rx="4" fill={glass} fillOpacity="0.5" />
      <rect
        x="18"
        y="238"
        width="220"
        height="70"
        rx="16"
        fill={glass}
        fillOpacity="0.2"
        stroke={glass}
        strokeOpacity="0.32"
      />
      {[52, 80, 108].map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy="273"
          r="15"
          fill={glass}
          fillOpacity={0.9 - index * 0.2}
          stroke="var(--sv-accent)"
          strokeWidth="3"
        />
      ))}
      <rect x="138" y="262" width="80" height="9" rx="4.5" fill={glass} fillOpacity="0.75" />
      <rect x="138" y="278" width="52" height="7" rx="3.5" fill={glass} fillOpacity="0.4" />
      <path d="M380 54l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={glass} fillOpacity="0.8" />
      <circle cx="24" cy="120" r="5" fill={glass} fillOpacity="0.5" />
      <circle cx="410" cy="120" r="3" fill={glass} fillOpacity="0.5" />
    </svg>
  )
}

/**
 * Vivid's mark: a rounded square on the brand gradient with an abstract rising spark. Shown
 * before the app name in the sidebar (alone in the icon rail) and on the sign-in screen.
 *
 * @example
 * <LogoMark />
 */
export function LogoMark({ className }: IllustrationProps): ReactElement {
  const shade = useId()
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cx('svv-logo', className)}
    >
      <defs>
        <BrandGradient id={shade} />
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${shade})`} />
      <path
        d="M9 21.5 14 16l3.5 3.5L23 12"
        fill="none"
        stroke="var(--sv-accent-fg)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="12" r="2.4" fill="var(--sv-accent-fg)" />
    </svg>
  )
}
