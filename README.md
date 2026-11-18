<div align="center">

# Strutvane Design: Vivid

**Colourful, modern dashboards for the Strutvane admin: soft-shadow cards, a gradient active pill, a sidebar that folds into an icon rail, gradient charts and a split sign-in. Light and dark, any brand hue, WCAG AA throughout.**

[![Status: pre-release](https://img.shields.io/badge/status-pre--release-orange)](https://github.com/vishwajit-vm/strutvane/blob/main/docs/14-roadmap.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Part of Strutvane](https://img.shields.io/badge/ecosystem-Strutvane-1f3a5f)](https://github.com/vishwajit-vm/strutvane)

</div>

> [!NOTE]
> **Status: `0.2.0-next.0`, implemented and tested, not yet released to npm.** It implements the `@strutvane/ui` v2 Design contract and passes `designConformance()` in full. It ships with the core train (`0.2.0-next.N`) and needs `@strutvane/ui` `^0.2.0-next.1`.

## What it is

[Strutvane](https://github.com/vishwajit-vm/strutvane) is a TypeScript framework for enterprise B2B apps. Its admin UI is split in two: `@strutvane/ui` holds **what the admin does** (screens, tables, forms, filters, the command palette, shortcuts, accessibility) and has no look of its own; a **design package** holds **how it looks**.

Vivid is the colourful design. Crisp (`@strutvane/design-crisp`) is the quiet default. Both implement the same contract, so you can switch at any time and no screen changes.

| | Crisp (default) | **Vivid** |
|---|---|---|
| Feel | clean, minimal, quiet colours, dense readable tables | colourful, soft-shadow cards, gradient charts, roomier spacing |
| Good for | back office, ERP, finance, B2B SaaS admin | analytics, customer-facing dashboards, product consoles |

The look is documented in **[DESIGN.md](DESIGN.md)** (mood, palette, type, spacing, components, do and don't).

## Install

New apps pick it in the installer (`npm create strutvane@latest` → *Vivid*, or `--design vivid`). In an existing app:

```bash
node strut design:use vivid
```

or by hand:

```bash
npm install @strutvane/design-vivid
```

`@strutvane/ui` (`^0.2.0-next.1`) and `react` (`^19.2.0`) are peer dependencies.

## Use

```tsx
import { DesignProvider } from '@strutvane/ui/design'
import { StrutvaneApp } from '@strutvane/ui/react'
import { vivid } from '@strutvane/design-vivid'
import '@strutvane/design-vivid/fonts.css' // Plus Jakarta Sans, self-hosted by your bundler

export function App({ nonce }: { nonce?: string }) {
  return (
    <DesignProvider design={vivid} nonce={nonce}>
      <StrutvaneApp apiUrl="/api" appName="Acme" />
    </DesignProvider>
  )
}
```

| Import | What |
|---|---|
| `@strutvane/design-vivid` | `vivid` (the design), `withIcons()`, `vividStylesheet()`, and every part (tokens, slots, skins, illustrations) for eject and for designs built on Vivid |
| `@strutvane/design-vivid/vivid.css` | the complete stylesheet as a file (Vivid's defaults), for apps that serve CSS instead of injecting it |
| `@strutvane/design-vivid/fonts.css` | Plus Jakarta Sans (OFL) through `@fontsource-variable/plus-jakarta-sans`; no font CDN |

### Your brand

The four public override tokens work on Vivid like on every design:

```css
/* resources/ui/theme.css */
:root {
  --brand-hue: 150;                         /* any hue 0–359 stays WCAG AA */
  --font-sans: "Acme Sans", system-ui, sans-serif;
  --radius: 10px;                           /* every corner scales from it */
  --density: 0.9;                           /* controls, rows and spacing */
}
```

or `<DesignProvider design={vivid} overrides={{ brandHue: 150, radius: '10px' }}>`. Invalid values are dropped, never written into CSS.

**Safe hue range: 0–359, all of it.** Every text and control pair is checked at every brand hue in 1° steps, in light and dark.

### Strict Content-Security-Policy

- Pass the request's nonce: `<DesignProvider design={vivid} nonce={nonce}>`. Vivid itself never sets an inline `style` attribute.
- Or turn injection off and serve the CSS as a file: `<DesignProvider design={vivid} injectStyles={false}>` plus `import '@strutvane/design-vivid/vivid.css'`, or write your own brand into a file with `vividStylesheet({ brandHue: 150 })`. Both are byte-for-byte what the provider would inject.

### Icons

The `Icon` skin draws [Tabler Icons](https://tabler.io/icons) by name. Vivid ships the ~120 an admin needs (`VIVID_ICONS`: navigation, CRUD actions, common resource kinds) rather than all ~6,000, so your bundle only carries those. Add your own:

```ts
import { IconTruckDelivery } from '@tabler/icons-react'
import { withIcons } from '@strutvane/design-vivid'

export const design = withIcons({ 'truck-delivery': IconTruckDelivery })
```

An unknown name draws nothing (as the contract says); in the sidebar the item then shows its first letter, so it never disappears in the icon rail.

### The icon rail

On screens 1024px and wider the sidebar collapses to a 76px icon rail with the toggle beside the mark. The choice is remembered per browser under `strutvane:vivid:rail`; blocked storage just means it isn't remembered. Below 1024px the sidebar is a drawer.

## Quality

| Check | Result |
|---|---|
| `designConformance(vivid)` | all 15 rules: slots, contrast (light and dark, every hue), no hard-coded colours, overrides (computed and injected with the nonce), no fixed width over 375px, and axe 0 violations + no overflow on all 9 reference screens |
| Extra screens | dark theme on 7 screens, the icon rail and brand overrides: axe 0 violations, no overflow |
| Contrast | every contract pair plus Vivid's own pairs at every hue 0–359 in 1° steps, both themes |
| Tests | Vitest, coverage ≥ 90/90/85/90, type-level tests for misuse |
| Package | `publint --strict`, `@arethetypeswrong/cli` (esm-only), tarball content check |

Run the gate: `npm run ci` (Biome → `tsc` → Vitest with coverage → tsdown → CSS files).

**What jsdom can't check:** before a release, run the browser pass in the contract guide (`@strutvane/ui` `docs/design-contract.md` §9): both themes, 375×812, `scrollWidth <= innerWidth` on every reference screen, Lighthouse contrast.

## Ecosystem

| Package | Role |
|---|---|
| [`@strutvane/framework`](https://github.com/vishwajit-vm/strutvane-framework) | Backend and database: models, migrations, CRUD API, OpenAPI |
| [`@strutvane/auth`](https://github.com/vishwajit-vm/strutvane-auth) | Identity, RBAC/ABAC, tenancy |
| [`@strutvane/ui`](https://github.com/vishwajit-vm/strutvane-ui) | Behaviour-only admin UI and the Design contract |
| `@strutvane/design-crisp` | The default design: clean and business-first |
| **`@strutvane/design-vivid`** | **This design: colourful, modern dashboards** |
| [`create-strutvane`](https://github.com/vishwajit-vm/create-strutvane) | Project starter |

## Links

- [Strutvane blueprint](https://github.com/vishwajit-vm/strutvane) · [v2 blueprint §5.1 (UI designs)](https://github.com/vishwajit-vm/strutvane/blob/main/docs/18-v2-blueprint.md)
- [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Changelog](CHANGELOG.md) · [License: MIT](LICENSE)
